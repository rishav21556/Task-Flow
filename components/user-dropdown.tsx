"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface UserDropdownProps {
  onLogout: () => void
}

export default function UserDropdown({ onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        credentials: "include"
      })
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      onLogout()
    }
  }


  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors"
      >
        👤
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 mt-2 w-52 glass border border-border/50 z-40 shadow-xl animate-slideInUp">
            <div className="p-3 space-y-1">
              {/* <div className="px-3 py-2 text-sm text-foreground font-medium border-b border-border/30 mb-2">
                👤 {getUserName()}
              </div> */}
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 text-left text-sm rounded-md hover:bg-destructive/10 transition-colors text-destructive font-medium"
              >
                🚪 Logout
              </button>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
