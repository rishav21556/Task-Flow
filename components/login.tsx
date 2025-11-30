"use client"

import type React from "react"
import { getAuthUrl } from "@/lib/api-config"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/logo"

interface LoginProps {
  onLoginSuccess: () => void
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isSignup) {
        const res = await fetch(getAuthUrl("/"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        })
        if (!res.ok) throw new Error("Signup failed")
      } else {
        const res = await fetch(getAuthUrl("/login"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        })
        if (!res.ok) throw new Error("Login failed")
        const data = await res.json()
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      onLoginSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Logo size="lg" />
        </div>

        {/* Card */}
        <Card className="p-8 shadow-xl border border-border/50 glass">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{isSignup ? "Create Account" : "Welcome Back"}</h1>
            <p className="text-muted-foreground">
              {isSignup ? "Join us and start managing your tasks" : "Sign in to your account to continue"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 bg-input/50"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 bg-input/50"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6 h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200"
            >
              {loading ? "Loading..." : isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => {
                  setIsSignup(!isSignup)
                  setError("")
                  setUsername("")
                  setPassword("")
                }}
                className="text-primary hover:underline font-semibold transition-colors"
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-xs mt-8">
          © 2025 TaskFlow. Your tasks, organized beautifully.
        </p>
      </div>
    </div>
  )
}
