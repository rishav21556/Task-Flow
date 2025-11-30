"use client"
import { Card } from "@/components/ui/card"

interface SidePanelProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function SidePanel({ activeTab, onTabChange }: SidePanelProps) {
  const tabs = [
    { id: "all", label: "All Tasks", icon: "📋" },
    { id: "pending", label: "Pending", icon: "⏳" },
    { id: "completed", label: "Completed", icon: "✓" },
    { id: "high-priority", label: "High Priority", icon: "🔴" },
  ]

  return (
    <aside className="hidden lg:flex lg:w-64 border-r border-border bg-card/50 backdrop-blur-sm flex-col p-6">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground px-3 mb-4">VIEWS</h2>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Stats Card */}
      <Card className="mt-8 p-4 glass border border-border/50">
        <p className="text-xs font-semibold text-muted-foreground mb-3">STATS</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tasks Today</span>
            <span className="font-bold text-foreground">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Overdue</span>
            <span className="font-bold text-destructive">0</span>
          </div>
        </div>
      </Card>
    </aside>
  )
}
