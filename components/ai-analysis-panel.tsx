"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles } from "lucide-react"
import { useDashboard } from "@/lib/dashboard-context"

interface AnalysisResult {
  score: number
  recommendation: string
  rateAdjustment: string
}

export function AIAnalysisPanel() {
  const [report, setReport] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")
  const { updateDashboardData } = useDashboard()

  const handleAnalyze = async () => {
    if (!report.trim()) {
      setError("Please paste a sustainability report")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/analyze-esg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze report")
      }

      const data = await response.json()
      setResult(data)
      setReport("")

      const newScore = data.score
      const rateAdjustmentValue = Number.parseFloat(data.rateAdjustment) || 0.5

      // Update portfolio cards
      updateDashboardData({
        portfolioEsgAverage: newScore,
        pendingReviews: 0,
      })

      // Update chart data
      updateDashboardData({
        chartData: [
          { month: "Jan", esg: Math.max(newScore - 15, 40), rateReduction: -0.0 },
          { month: "Feb", esg: Math.max(newScore - 12, 45), rateReduction: -0.05 },
          { month: "Mar", esg: Math.max(newScore - 9, 50), rateReduction: -0.12 },
          { month: "Apr", esg: Math.max(newScore - 6, 55), rateReduction: -0.18 },
          { month: "May", esg: Math.max(newScore - 3, 60), rateReduction: -0.25 },
          { month: "Jun", esg: newScore, rateReduction: -rateAdjustmentValue },
        ],
      })

      // Update loans with new rates
      updateDashboardData({
        loans: [
          {
            id: "1",
            borrower: "Global Oil Corp",
            loanAmount: "$450M",
            baseRate: "4.5%",
            esgScore: newScore,
            adjustedRate: `${(4.5 - rateAdjustmentValue).toFixed(2)}%`,
            riskLevel: newScore > 75 ? "Low" : "High",
            status: "Verified",
          },
        ],
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gemini analysis failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border bg-card p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-bold text-foreground">AI Compliance Assistant (Gemini)</h2>
      </div>

      {result ? (
        <div className="space-y-4 flex-1">
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <div className="text-3xl font-bold text-accent mb-2">{result.score}/100</div>
            <p className="text-sm text-foreground">ESG Score</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Recommendation</p>
            <p className="text-sm text-foreground">{result.recommendation}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Rate Adjustment</p>
            <p className="text-sm text-foreground">{result.rateAdjustment}</p>
          </div>

          <Button onClick={() => setResult(null)} variant="outline" className="w-full mt-4">
            Analyze Another Report
          </Button>
        </div>
      ) : (
        <>
          <Textarea
            placeholder="Paste the company sustainability report here..."
            value={report}
            onChange={(e) => setReport(e.target.value)}
            className="flex-1 resize-none mb-4 bg-background border-border text-foreground"
          />

          {error && <p className="text-sm text-destructive mb-4">{error}</p>}

          <Button
            onClick={handleAnalyze}
            disabled={loading || !report.trim()}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gemini is analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze ESG Report
              </>
            )}
          </Button>
        </>
      )}
    </Card>
  )
}
