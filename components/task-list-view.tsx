"use client"

import { Card } from "@/components/ui/card"
import TaskCard from "@/components/task-card"

interface Task {
  id: string
  title: string
  description?: string
  priority: "LOW" | "MEDIUM" | "HIGH"
  deadline?: string
  completed: boolean
  createdAt: string
}

interface TaskListViewProps {
  tasks: Task[]
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function TaskListView({ tasks, onToggleComplete, onEdit, onDelete }: TaskListViewProps) {
  if (tasks.length === 0) {
    return (
      <Card className="p-16 text-center glass border border-border/50">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No tasks yet</h3>
        <p className="text-muted-foreground">Create your first task to get started with organizing your day.</p>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggleComplete={onToggleComplete} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
