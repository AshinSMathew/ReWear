import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Extract ID from URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    const itemId = parseInt(id);
    if (isNaN(itemId)) {
      return NextResponse.json(
        { error: "Invalid item ID" },
        { status: 400 }
      );
    }

    // Get item details
    const [item] = await db`
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
        u.id as "userId",
        u.name as "userName",
        u.location as "userLocation",
        u.created_at as "userCreatedAt",
        (SELECT image_url FROM item_images WHERE item_id = i.id AND is_primary = true LIMIT 1) as "imageUrl"
      FROM items i
      JOIN users u ON i.user_id = u.id
      WHERE i.id = ${itemId}
    `;

    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    // Get all images
    const images = await db`
      SELECT image_url as "url"
      FROM item_images
      WHERE item_id = ${itemId}
      ORDER BY is_primary DESC
    `;

    // Get tags
    const tags = await db`
      SELECT t.name
      FROM tags t
      JOIN item_tags it ON t.id = it.tag_id
      WHERE it.item_id = ${itemId}
    `;

    return NextResponse.json({
      item: {
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        itemType: item.itemType,
        size: item.size,
        condition: item.condition,
        pointsValue: item.pointsValue,
        status: item.status,
        images: images.map(img => img.url),
        tags: tags.map(tag => tag.name),
        uploadDate: new Date(item.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      },
      uploader: {
        id: item.userId,
        name: item.userName,
        location: item.userLocation,
        memberSince: new Date(item.userCreatedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short'
        })
      }
    });

  } catch (error) {
    console.error("Item detail error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}