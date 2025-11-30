"use client"
import Logo from "@/components/logo"
import ThemeToggle from "@/components/theme-toggle"
import UserDropdown from "@/components/user-dropdown"

interface TopNavigationProps {
  onLogout: () => void
}

export default function TopNavigation({ onLogout }: TopNavigationProps) {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="px-6 md:px-8 py-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Logo size="sm" />

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="h-8 w-px bg-border" />
          <UserDropdown onLogout={onLogout} />
        </div>
      </div>
    </nav>
  )
}
