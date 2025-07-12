import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const items = await db`
      SELECT 
        i.id,
        i.title,
        i.description,
        i.category,
        i.item_type as "itemType",
        i.size,
        i.condition,
        i.points_value as "pointsValue",
        i.status,
        i.created_at as "createdAt",
        u.name as "userName",
        u.location,
        (SELECT image_url FROM item_images 
         WHERE item_id = i.id AND is_primary = true LIMIT 1) as "imageUrl"
      FROM items i
      JOIN users u ON i.user_id = u.id
      WHERE i.approved = true
      AND i.status = 'available'
      ORDER BY i.created_at DESC
    `;

    return NextResponse.json(items);
  } catch (error) {
    console.error("Browse error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}