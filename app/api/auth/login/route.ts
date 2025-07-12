import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import * as jose from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const { email, password, rememberMe } = await request.json()

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await db`
      SELECT id, email, name, password, is_admin, points_balance 
      FROM users 
      WHERE email = ${email}
      LIMIT 1
    `

    if (user.length === 0 || !user[0].password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Verify password - with additional validation
    const storedHash = user[0].password;
    if (!storedHash || typeof storedHash !== 'string') {
      return NextResponse.json(
        { error: "Authentication system error" },
        { status: 500 }
      )
    }

    const passwordMatch = await bcrypt.compare(password, storedHash)
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Generate JWT token
    const secretKey = new TextEncoder().encode(JWT_SECRET)
    const token = await new jose.SignJWT({
      id: user[0].id,
      email: user[0].email,
      name: user[0].name,
      isAdmin: user[0].is_admin
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(rememberMe ? '30d' : '1d')
      .sign(secretKey)

    // Create response
    const response = NextResponse.json(
      { 
        user: {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          isAdmin: user[0].is_admin,
          pointsBalance: user[0].points_balance
        },
        message: "Login successful" 
      },
      { status: 200 }
    )

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
      path: '/',
      sameSite: 'strict'
    })

    return response

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}