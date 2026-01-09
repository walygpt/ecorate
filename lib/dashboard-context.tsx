"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface DashboardData {
  portfolioEsgAverage: number | null
  portfolioValue: string
  pendingReviews: number
  chartData: Array<{ month: string; esg: number; rateReduction: number }>
  loans: Array<{
    id: string
    borrower: string
    loanAmount: string
    baseRate: string
    esgScore: number
    adjustedRate: string
    riskLevel: "Low" | "Medium" | "High"
    status: "Pending" | "Verified"
  }>
}

interface DashboardContextType {
  data: DashboardData
  updateDashboardData: (newData: Partial<DashboardData>) => void
  resetDashboard: () => void
}

const defaultData: DashboardData = {
  portfolioEsgAverage: null,
  portfolioValue: "$0",
  pendingReviews: 0,
  chartData: [],
  loans: [],
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DashboardData>(defaultData)

  const updateDashboardData = (newData: Partial<DashboardData>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }

  const resetDashboard = () => {
    setData(defaultData)
  }

  return (
    <DashboardContext.Provider value={{ data, updateDashboardData, resetDashboard }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider")
  }
  return context
}
