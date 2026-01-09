"use client"

import { Search, Bell, Settings, User, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

export function DashboardHeader() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setShowInstallPrompt(false)
      }
      setDeferredPrompt(null)
    }
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-30">
      <div className="flex items-center justify-between p-4 md:p-6 gap-4">
        <div className="flex-1 max-w-md hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search borrowers, loans..." className="pl-10 bg-background border-border" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showInstallPrompt && (
            <Button
              size="sm"
              variant="default"
              onClick={handleInstall}
              className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground hidden sm:flex"
            >
              <Download className="w-4 h-4" />
              Install App
            </Button>
          )}

          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
