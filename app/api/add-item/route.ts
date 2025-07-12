import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import { getEmailFromAuthToken } from "@/lib/utils"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const itemType = formData.get("type") as string;
    const size = formData.get("size") as string;
    const condition = formData.get("condition") as string;
    const pointsValue = parseInt(formData.get("pointsValue") as string) || 25;
    const userId = parseInt(formData.get("userId") as string);
    const tags = JSON.parse(formData.get("tags") as string || "[]");
    const isDraft = formData.get("isDraft") === "true";

    const images = formData.getAll("images") as File[];

    if (!title || !description || !category || !itemType || !size || !condition || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (images.length === 0 && !isDraft) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    const uploadedImages = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      try {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "rewear-items",
              resource_type: "image",
              transformation: [
                { width: 800, height: 800, crop: "limit" },
                { quality: "auto" },
                { fetch_format: "auto" }
              ]
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        });

        uploadedImages.push({
          url: (result as any).secure_url,
          isPrimary: i === 0
        });
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    const [newItem] = await db`
      INSERT INTO ITEMS (
        title, description, category, item_type, size, condition, 
        points_value, user_id, status, approved
      ) VALUES (
        ${title}, ${description}, ${category}, ${itemType}, ${size}, 
        ${condition}, ${pointsValue}, ${userId}, 
        ${isDraft ? 'draft' : 'pending'}, ${false}
      )
      RETURNING id
    `;

    const itemId = newItem.id;

    if (uploadedImages.length > 0) {
      for (const image of uploadedImages) {
        await db`
          INSERT INTO ITEM_IMAGES (item_id, image_url, is_primary)
          VALUES (${itemId}, ${image.url}, ${image.isPrimary})
        `;
      }
    }

    if (tags.length > 0) {
      for (const tagName of tags) {
        try {
          let tagId;
          const existingTag = await db`
            SELECT id FROM TAGS WHERE name = ${tagName.toLowerCase()}
          `;
          
          if (existingTag.length > 0) {
            tagId = existingTag[0].id;
          } else {
            const [newTag] = await db`
              INSERT INTO TAGS (name) VALUES (${tagName.toLowerCase()})
              RETURNING id
            `;
            tagId = newTag.id;
          }
          
          await db`
            INSERT INTO ITEM_TAGS (item_id, tag_id)
            VALUES (${itemId}, ${tagId})
          `;
        } catch (tagError) {
          console.log(`Tag "${tagName}" already linked to item ${itemId}`);
        }
      }
    }

    return NextResponse.json(
      {
        message: isDraft ? "Item saved as draft successfully" : "Item submitted for review successfully",
        itemId: itemId,
        status: isDraft ? "draft" : "pending"
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const email = await getEmailFromAuthToken(request);
    if (!email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const result = await db`
      SELECT id FROM users 
      WHERE email = ${email}
      LIMIT 1
    `;

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const user_id = result[0].id;
    console.log(user_id)
    return NextResponse.json({ user_id });
    
  } catch (e) {
    console.error("Error in GET /api/user-id:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}