"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Task {
  id: string
  title: string
  description?: string
  priority: "LOW" | "MEDIUM" | "HIGH"
  deadline?: string
  completed: boolean
  createdAt: string
}

interface AddTaskModalProps {
  task?: Task | null
  onClose: () => void
  onSubmit: (task: Partial<Task>) => void
}

export default function AddTaskModal({ task, onClose, onSubmit }: AddTaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM")
  const [deadline, setDeadline] = useState("")

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || "")
      setPriority(task.priority)
      setDeadline(task.deadline || "")
    }
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      priority,
      deadline,
      completed: task?.completed || false,
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md p-6 shadow-xl glass border border-border/50 animate-slideInUp">
          <h2 className="text-2xl font-bold text-foreground mb-6">{task ? "Edit Task" : "Add New Task"}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 bg-input/50"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                placeholder="Add task description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 w-full p-2 rounded-lg bg-input/50 border border-border text-foreground placeholder:text-muted-foreground min-h-[100px] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")}
                  className="mt-2 w-full p-2 rounded-lg bg-input/50 border border-border text-foreground"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="mt-2 bg-input/50"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" onClick={onClose} variant="outline" className="flex-1 h-10 bg-transparent">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!title.trim()}
                className="flex-1 h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {task ? "Update" : "Create"} Task
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  )
}
