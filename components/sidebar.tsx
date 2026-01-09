"use client"

import { Menu, X, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { EcoRateLogo } from "./logo"

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState("dashboard")

  const handleNavClick = (section: string) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      onToggle() // Close sidebar on mobile after navigation
    } else {
      toast({
        title: "Feature Coming Soon",
        description: `The ${section} section is coming in the next update.`,
      })
    }
  }

  return (
    <>
      <aside
        className={`
          fixed md:relative top-0 left-0 h-screen w-60 md:w-64 bg-sidebar border-r border-sidebar-border
          transition-all duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col
        `}
      >
        <div className="p-4 md:p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0 text-sidebar-primary-foreground">
              <EcoRateLogo />
            </div>
            <div className="min-w-0">
              <h1 className="text-base md:text-lg font-bold text-sidebar-primary-foreground truncate">EcoRate</h1>
              <p className="text-xs text-sidebar-accent">AI ESG</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2">
          <NavItem
            label="Dashboard"
            section="dashboard"
            isActive={activeSection === "dashboard"}
            onClick={() => handleNavClick("dashboard")}
          />
          <NavItem
            label="Loans"
            section="loans"
            isActive={activeSection === "loans"}
            onClick={() => handleNavClick("loans")}
          />
          <NavItem
            label="Analytics"
            section="analytics"
            isActive={activeSection === "analytics"}
            onClick={() => handleNavClick("analytics")}
          />
          <NavItem
            label="Reports"
            section="reports"
            isActive={activeSection === "reports"}
            onClick={() => handleNavClick("reports")}
          />
          <NavItem
            label="Settings"
            section="settings"
            isActive={activeSection === "settings"}
            onClick={() => handleNavClick("settings")}
          />
        </nav>

        {/* Footer */}
        <div className="p-3 md:p-4 border-t border-sidebar-border space-y-1 md:space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-xs md:text-sm text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => toast({ title: "Help", description: "Support resources coming soon" })}
          >
            <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">Help</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-xs md:text-sm text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => toast({ title: "Logout", description: "You have been logged out" })}
          >
            <LogOut className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile menu toggle */}
      {open && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={onToggle} />}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Button
          size="icon"
          variant="default"
          onClick={onToggle}
          className="bg-primary hover:bg-primary/90 rounded-full shadow-lg"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>
    </>
  )
}

function NavItem({
  label,
  section,
  isActive,
  onClick,
}: {
  label: string
  section: string
  isActive: boolean
  onClick: () => void
}) {
  const icons: Record<string, string> = {
    dashboard: "📊",
    loans: "💼",
    analytics: "📈",
    reports: "📄",
    settings: "⚙️",
  }

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 md:px-4 py-2 rounded-lg transition-colors text-xs md:text-sm font-medium truncate
        ${isActive ? "bg-sidebar-accent text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/20"}`}
    >
      <span className="text-lg flex-shrink-0">{icons[section]}</span>
      <span className="truncate">{label}</span>
    </button>
  )
}
