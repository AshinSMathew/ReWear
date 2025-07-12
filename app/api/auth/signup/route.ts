import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, location } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db`
      SELECT id FROM users WHERE email = ${email} LIMIT 1
    `

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 }
      )
    }

    // Hash password with salt rounds
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user with explicit column names
    await db`
      INSERT INTO users (
        email,
        name,
        password,
        location,
        points_balance,
        is_admin,
        created_at
      ) VALUES (
        ${email},
        ${`${firstName} ${lastName}`},
        ${hashedPassword},
        ${location || null},
        0,
        false,
        NOW()
      )
    `

    return NextResponse.json(
      { 
        success: true,
        message: "Account created successfully. Please login." 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}