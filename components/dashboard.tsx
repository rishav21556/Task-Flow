"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import TopNavigation from "@/components/top-navigation"
import SidePanel from "@/components/side-panel"
import TaskListView from "@/components/task-list-view"
import AddTaskModal from "@/components/add-task-modal"
import { getTasksUrl } from "@/lib/api-config"

interface Task {
  id: string
  title: string
  description?: string
  priority: "LOW" | "MEDIUM" | "HIGH"
  deadline?: string
  completed: boolean
  createdAt: string
}

interface DashboardProps {
  onLogout: () => void
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [tasks, setTasks] = useState<Task[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await fetch(getTasksUrl(), {credentials: 'include'})
      if (res.ok) {
        const data = await res.json()
        setTasks(data)
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
    try {
      const res = await fetch(getTasksUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
        credentials: 'include'
      })
      if (res.ok) {
        const newTask = await res.json()
        setTasks([...tasks, newTask])
        setShowAddModal(false)
      }
    } catch (error) {
      console.error("Failed to add task:", error)
    }
  }

  const handleUpdateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      const res = await fetch(getTasksUrl(`/${id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
        credentials: 'include'
      })
      if (res.ok) {
        const updated = await res.json()
        setTasks(tasks.map((t) => (t.id === id ? updated : t)))
        setEditingTask(null)
        setShowAddModal(false)
      }
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      const res = await fetch(getTasksUrl(`/${id}`), { method: "DELETE", credentials: 'include' })
      if (res.ok) {
        setTasks(tasks.filter((t) => t.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  const handleToggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      handleUpdateTask(id, { completed: !task.completed })
    }
  }

  const getFilteredTasks = () => {
    switch (activeTab) {
      case "pending":
        return tasks.filter((t) => !t.completed)
      case "completed":
        return tasks.filter((t) => t.completed)
      case "high-priority":
        return tasks.filter((t) => !t.completed && t.priority === "HIGH")
      default:
        return tasks
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Side Panel */}
      <SidePanel activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation onLogout={onLogout} />

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {activeTab === "all" && "All Tasks"}
                  {activeTab === "pending" && "Pending Tasks"}
                  {activeTab === "completed" && "Completed Tasks"}
                  {activeTab === "high-priority" && "High Priority"}
                </h1>
                <p className="text-muted-foreground">
                  {getFilteredTasks().length} {getFilteredTasks().length === 1 ? "task" : "tasks"}
                </p>
              </div>
              <Button
                onClick={() => {
                  setEditingTask(null)
                  setShowAddModal(true)
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-10"
              >
                + Add Task
              </Button>
            </div>

            {/* Task List */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <TaskListView
                tasks={getFilteredTasks()}
                onToggleComplete={handleToggleComplete}
                onEdit={(task) => {
                  setEditingTask(task)
                  setShowAddModal(true)
                }}
                onDelete={handleDeleteTask}
              />
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Task Modal */}
      {showAddModal && (
        <AddTaskModal
          task={editingTask}
          onClose={() => {
            setShowAddModal(false)
            setEditingTask(null)
          }}
          onSubmit={(taskData) => {
            if (editingTask) {
              handleUpdateTask(editingTask.id, taskData)
            } else {
              handleAddTask(taskData as Omit<Task, "id" | "createdAt">)
            }
          }}
        />
      )}
    </div>
  )
}
