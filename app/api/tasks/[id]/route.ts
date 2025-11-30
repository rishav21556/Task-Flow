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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const task = tasks.find((t) => t.id === params.id)
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }
  return NextResponse.json(task)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const index = tasks.findIndex((t) => t.id === params.id)
    if (index === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }
    tasks[index] = { ...tasks[index], ...body }
    return NextResponse.json(tasks[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const index = tasks.findIndex((t) => t.id === params.id)
  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }
  tasks.splice(index, 1)
  return NextResponse.json({ success: true })
}
