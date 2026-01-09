"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useDashboard } from "@/lib/dashboard-context"

export function LoanTrackingTable() {
  const { data } = useDashboard()

  if (data.loans.length === 0) {
    return (
      <Card className="border-border bg-card">
        <div className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">Active Loan Portfolio</h2>
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No loans analyzed yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Upload and analyze a sustainability report to see loan updates
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card">
      <div className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">Active Loan Portfolio</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-foreground">Borrower</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-foreground">Loan Amount</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-foreground">Base Rate</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-foreground">ESG Score</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-foreground">Adjusted Rate</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-foreground">Risk</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-4 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.loans.map((loan) => (
                <tr key={loan.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-3 md:py-4 px-2 md:px-4 font-medium text-foreground text-xs md:text-sm">
                    {loan.borrower}
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-foreground text-xs md:text-sm">{loan.loanAmount}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-foreground text-xs md:text-sm">{loan.baseRate}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4">
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="w-8 md:w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent transition-all" style={{ width: `${loan.esgScore}%` }} />
                      </div>
                      <span className="font-semibold text-accent text-xs">{loan.esgScore}</span>
                    </div>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-4">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-foreground text-xs md:text-sm">{loan.adjustedRate}</span>
                      {loan.esgScore >= 75 ? (
                        <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-accent flex-shrink-0" />
                      ) : (
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-destructive flex-shrink-0" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-4">
                    <Badge
                      variant={
                        loan.riskLevel === "Low" ? "default" : loan.riskLevel === "Medium" ? "secondary" : "destructive"
                      }
                      className="text-xs"
                    >
                      {loan.riskLevel}
                    </Badge>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-4">
                    <Badge variant={loan.status === "Verified" ? "default" : "secondary"} className="text-xs">
                      {loan.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
