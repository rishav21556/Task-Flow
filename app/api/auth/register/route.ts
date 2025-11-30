import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users: Record<string, { password: string; email: string }> = {
  demouser: { password: "demo123", email: "demo@example.com" },
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json()

    if (users[username]) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    users[username] = { password, email }

    return NextResponse.json(
      {
        user: { username, email },
        token: "demo-token-123",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
