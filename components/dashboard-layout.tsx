"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { DashboardHeader } from "./dashboard-header"
import { PortfolioCards } from "./portfolio-cards"
import { LoanTrackingTable } from "./loan-tracking-table"
import { ESGChart } from "./esg-chart"
import { AIAnalysisPanel } from "./ai-analysis-panel"
import { DashboardProvider } from "@/lib/dashboard-context"

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DashboardProvider>
      <div className="flex h-screen bg-background">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />

          <main className="flex-1 overflow-auto bg-background">
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Portfolio Overview Cards */}
              <div id="dashboard">
                <PortfolioCards />
              </div>

              {/* Charts and Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-2">
                  <ESGChart />
                </div>
                <div>
                  <AIAnalysisPanel />
                </div>
              </div>

              {/* Loan Tracking Table */}
              <div id="loans">
                <LoanTrackingTable />
              </div>
            </div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  )
}
