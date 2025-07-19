import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in environment variables.");
}

export const db = neon(process.env.DATABASE_URL);

const schema = async () => {
  try {
    await db`
      CREATE TABLE IF NOT EXISTS USERS (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        location TEXT DEFAULT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        points_balance INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await db`
      CREATE TABLE IF NOT EXISTS ITEMS (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        item_type TEXT NOT NULL,
        size TEXT NOT NULL,
        condition TEXT NOT NULL,
        points_value INTEGER NOT NULL,
        status TEXT DEFAULT 'available', -- 'available', 'pending', 'swapped'
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        approved BOOLEAN DEFAULT FALSE, -- For admin approval
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES USERS(id)
      )
    `;

    await db`
      CREATE TABLE IF NOT EXISTS ITEM_IMAGES (
        id SERIAL PRIMARY KEY,
        item_id INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        is_primary BOOLEAN DEFAULT FALSE,
        CONSTRAINT fk_item FOREIGN KEY (item_id) REFERENCES ITEMS(id) ON DELETE CASCADE
      )
    `;

    await db`
      CREATE TABLE IF NOT EXISTS SWAPS (
        id SERIAL PRIMARY KEY,
        requester_id INTEGER NOT NULL,
        item_id INTEGER NOT NULL,
        status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'completed'
        created_at TIMESTAMP DEFAULT NOW(),
        completed_at TIMESTAMP,
        CONSTRAINT fk_requester FOREIGN KEY (requester_id) REFERENCES USERS(id),
        CONSTRAINT fk_item FOREIGN KEY (item_id) REFERENCES ITEMS(id)
      )
    `;

    await db`
      CREATE TABLE IF NOT EXISTS TAGS (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      )
    `;

    await db`
      CREATE TABLE IF NOT EXISTS ITEM_TAGS (
        item_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (item_id, tag_id),
        CONSTRAINT fk_item FOREIGN KEY (item_id) REFERENCES ITEMS(id) ON DELETE CASCADE,
        CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES TAGS(id)
      )
    `;

    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};

schema();