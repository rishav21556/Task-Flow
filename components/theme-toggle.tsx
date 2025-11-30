"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const savedTheme = localStorage.getItem("theme")
    setIsDark(savedTheme ? savedTheme === "dark" : prefersDark)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const html = document.documentElement
    if (isDark) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark, mounted])

  if (!mounted) return null

  return (
    <Button
      onClick={() => setIsDark(!isDark)}
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-lg hover:bg-secondary"
    >
      {isDark ? "☀️" : "🌙"}
    </Button>
  )
}
