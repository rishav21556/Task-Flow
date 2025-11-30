import { type NextRequest, NextResponse } from "next/server"

// Mock database
const tasks: any[] = [
  {
    id: "1",
    title: "Review project proposal",
    description: "Go through the new project proposal and provide feedback",
    priority: "HIGH",
    deadline: "2025-12-05T14:30:00",
    completed: false,
    createdAt: "2025-11-30T10:00:00",
  },
  {
    id: "2",
    title: "Update documentation",
    description: "Update API documentation with new endpoints",
    priority: "MEDIUM",
    deadline: "2025-12-08T09:00:00",
    completed: false,
    createdAt: "2025-11-30T10:05:00",
  },
  {
    id: "3",
    title: "Fix login bug",
    priority: "HIGH",
    deadline: "2025-12-01T17:00:00",
    completed: true,
    createdAt: "2025-11-29T14:20:00",
  },
]

export async function GET() {
  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newTask = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    }
    tasks.push(newTask)
    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 400 })
  }
}
