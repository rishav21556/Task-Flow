import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users: Record<string, { password: string; email: string }> = {
  demouser: { password: "demo123", email: "demo@example.com" },
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const user = users[username]
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({
      user: { username, email: user.email },
      token: "demo-token-123",
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
