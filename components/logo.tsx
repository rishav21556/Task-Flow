"use client"

interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export default function Logo({ size = "md" }: LogoProps) {
  const sizes = {
    sm: { container: "h-8 w-8", text: "text-base" },
    md: { container: "h-10 w-10", text: "text-lg" },
    lg: { container: "h-12 w-12", text: "text-2xl" },
  }

  const style = sizes[size]

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${style.container} bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg`}
      >
        <span className={`${style.text} font-bold text-primary-foreground`}>✓</span>
      </div>
      <span className="font-bold text-foreground text-lg hidden sm:inline">TaskFlow</span>
    </div>
  )
}
