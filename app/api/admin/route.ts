import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getEmailFromAuthToken } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const email = await getEmailFromAuthToken(request);
    if (!email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const adminUser = await db`
      SELECT id, is_admin 
      FROM users 
      WHERE email = ${email}
    `;

    if (adminUser.length === 0 || !adminUser[0].is_admin) {
      return NextResponse.json(
        { error: "Admin privileges required" },
        { status: 403 }
      );
    }

    const [pendingCount, approvedCount, flaggedCount, rejectedCount] = await Promise.all([
      db`SELECT COUNT(*) as count FROM items WHERE status = 'pending'`,
      db`SELECT COUNT(*) as count FROM items WHERE status = 'approved' AND created_at >= CURRENT_DATE`,
      db`SELECT COUNT(*) as count FROM items WHERE status = 'flagged'`,
      db`SELECT COUNT(*) as count FROM items WHERE status = 'rejected' AND created_at >= CURRENT_DATE`
    ]);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const limit = Math.min(Number(searchParams.get('limit')) || 20, 100); 
    const offset = Number(searchParams.get('offset')) || 0;

    const items = await db`
      SELECT 
        i.id,
        i.title,
        i.description,
        i.category,
        i.condition,
        i.points_value as "pointsValue",
        i.created_at as "createdAt",
        u.name as "uploader",
        u.id as "uploaderId",
        (SELECT image_url FROM item_images WHERE item_id = i.id AND is_primary = true LIMIT 1) as "imageUrl"
      FROM items i
      JOIN users u ON i.user_id = u.id
      WHERE i.status = 'pending'
      ORDER BY i.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    return NextResponse.json({
      stats: {
        pendingItems: Number(pendingCount[0].count),
        approvedToday: Number(approvedCount[0].count),
        flaggedItems: Number(flaggedCount[0].count),
        rejectedToday: Number(rejectedCount[0].count)
      },
      items
    });

  } catch (error) {
    console.error("Admin panel error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const email = await getEmailFromAuthToken(request);
    if (!email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const adminUser = await db`
      SELECT id FROM users 
      WHERE email = ${email} AND is_admin = true
    `;

    if (adminUser.length === 0) {
      return NextResponse.json(
        { error: "Admin privileges required" },
        { status: 403 }
      );
    }

    const { itemId, action } = await request.json();

    if (!itemId || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const itemExists = await db`
      SELECT id FROM items WHERE id = ${itemId}
    `;
    
    if (itemExists.length === 0) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    const adminId = adminUser[0].id;
    let updatedItem;

    switch (action) {
      case 'approve':
        [updatedItem] = await Promise.all([
          db`
            UPDATE items
            SET status = 'available',
            approved = TRUE
            WHERE id = ${itemId}
            RETURNING *
          `,
          db`
            UPDATE users u
            SET points_balance = points_balance + (
              SELECT points_value 
              FROM items 
              WHERE id = ${itemId}
            )
            WHERE u.id = (
              SELECT user_id 
              FROM items 
              WHERE id = ${itemId}
            )
          `
        ]);
        break;

      case 'reject':
        [updatedItem] = await Promise.all([
          db`
            UPDATE items
            SET status = 'rejected',
            approved = FALSE
            WHERE id = ${itemId}
            RETURNING *
          `,
        ]);
        break;

      case 'remove':
        case 'clear_flag':
        default:
          return NextResponse.json(
            { error: "Invalid action" },
            { status: 400 }
          );
    }

    return NextResponse.json(updatedItem[0]);

  } catch (error) {
    console.error("Admin action error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}