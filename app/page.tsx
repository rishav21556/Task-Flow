"use client"

import { useState, useEffect } from "react"
import Login from "@/components/login"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated via backend
    const verifyAuth = async () => {
      try {
        const res = await fetch("http://localhost:8000/auth/auth-verify", {
          method: "GET",
          credentials: "include"
        })
        
        if (res.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          localStorage.removeItem("user")
        }
      } catch (error) {
        console.error("Auth verification failed:", error)
        setIsAuthenticated(false)
        localStorage.removeItem("user")
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return isAuthenticated ? (
    <Dashboard onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <Login onLoginSuccess={() => setIsAuthenticated(true)} />
  )
}
