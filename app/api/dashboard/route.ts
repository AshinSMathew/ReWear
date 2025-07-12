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

    const user = await db`
      SELECT id, name, email, points_balance, created_at 
      FROM users 
      WHERE email = ${email}
      LIMIT 1
    `;

    if (user.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const items = await db`
      SELECT 
        id, 
        title, 
        category, 
        item_type as "itemType", 
        size, 
        condition, 
        points_value as "pointsValue",
        status,
        created_at as "createdAt"
      FROM items
      WHERE user_id = ${user[0].id}
      ORDER BY created_at DESC
    `;

    const ongoingSwaps = await db`
      SELECT 
        s.id,
        s.status,
        s.created_at as "createdAt",
        i.title as "itemTitle",
        u.name as "partnerName"
      FROM swaps s
      JOIN items i ON s.item_id = i.id
      JOIN users u ON s.requester_id = u.id
      WHERE s.status IN ('pending', 'approved', 'in_transit')
      AND (i.user_id = ${user[0].id} OR s.requester_id = ${user[0].id})
      ORDER BY s.created_at DESC
    `;

    const completedSwaps = await db`
      SELECT 
        s.id,
        s.completed_at as "completedAt",
        i.title as "itemTitle",
        u.name as "partnerName"
      FROM swaps s
      JOIN items i ON s.item_id = i.id
      JOIN users u ON s.requester_id = u.id
      WHERE s.status = 'completed'
      AND (i.user_id = ${user[0].id} OR s.requester_id = ${user[0].id})
      ORDER BY s.completed_at DESC
      LIMIT 5
    `;

    const itemsListed = items.length;
    const availableItems = items.filter(item => item.status === 'available').length;
    const completedSwapsCount = completedSwaps.length;

    return NextResponse.json({
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        pointsBalance: user[0].points_balance,
        memberSince: user[0].created_at
      },
      stats: {
        pointsBalance: user[0].points_balance,
        itemsListed,
        availableItems,
        completedSwaps: completedSwapsCount
      },
      items,
      ongoingSwaps,
      completedSwaps
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}