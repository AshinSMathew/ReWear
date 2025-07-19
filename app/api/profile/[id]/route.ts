import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop();

    const userQuery = await db`
      SELECT 
        id, 
        name, 
        email, 
        location, 
        points_balance,
        created_at as joined_at,
        is_admin
      FROM users
      WHERE id = ${userId}
    `;

    if (!userQuery[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userQuery[0];

    const itemsCountQuery = await db`
      SELECT COUNT(*) as count FROM items WHERE user_id = ${userId}
    `;
    const itemsCount = itemsCountQuery[0].count;

    const swapsCountQuery = await db`
      SELECT COUNT(*) as count 
      FROM swaps 
      WHERE (requester_id = ${userId} OR item_id IN (SELECT id FROM items WHERE user_id = ${userId}))
      AND status = 'completed'
    `;
    const swapsCount = swapsCountQuery[0].count;

    const itemsQuery = await db`
      SELECT 
        i.id,
        i.title,
        i.category,
        i.condition,
        i.points_value,
        i.status,
        i.created_at,
        (SELECT image_url FROM item_images WHERE item_id = i.id LIMIT 1) as image_url
      FROM items i
      WHERE i.user_id = ${userId}
      ORDER BY i.created_at DESC
    `;

    const response = {
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
        location: user.location,
        joinedAt: user.joined_at,
        pointsBalance: user.points_balance,
        isAdmin: user.is_admin,
        stats: {
          itemsListed: itemsCount,
          successfulSwaps: swapsCount,
        },
      },
      items: itemsQuery.map((item) => ({
        id: item.id,
        title: item.title,
        imageUrl: item.image_url || "/placeholder.svg",
        category: item.category,
        condition: item.condition,
        pointsValue: item.points_value,
        status: item.status,
        createdAt: item.created_at,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}