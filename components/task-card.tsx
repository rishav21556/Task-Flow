"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Task {
  id: string
  title: string
  description?: string
  priority: "LOW" | "MEDIUM" | "HIGH"
  deadline?: string
  completed: boolean
  createdAt: string
}

interface TaskCardProps {
  task: Task
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "MEDIUM":
        return "bg-warning/20 text-warning border-warning/30"
      case "LOW":
        return "bg-success/20 text-success border-success/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return null
    const date = new Date(deadline)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <Card
      className={`p-5 glass border border-border/50 transition-all duration-200 hover:shadow-lg ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="w-5 h-5 mt-1 rounded cursor-pointer accent-primary"
        />
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-base break-words ${
              task.completed ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {task.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      {task.description && !task.completed && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Priority & Deadline */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
            task.priority,
          )}`}
        >
          {task.priority}
        </span>
        {task.deadline && (
          <span className="text-xs text-muted-foreground flex items-center gap-1 bg-muted px-2.5 py-1 rounded-full">
            📅 {formatDeadline(task.deadline)}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-border/30">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 px-2 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors font-medium"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="flex-1 px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors font-medium"
        >
          🗑️ Delete
        </button>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center flex-col gap-3 z-50">
          <p className="text-sm font-medium text-foreground">Delete this task?</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowDeleteConfirm(false)} className="h-8">
              Cancel
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                onDelete(task.id)
                setShowDeleteConfirm(false)
              }}
              className="h-8"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
