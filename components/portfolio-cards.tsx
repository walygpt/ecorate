import { Card } from "@/components/ui/card"
import { TrendingUp, Shield, AlertCircle } from "lucide-react"
import { useDashboard } from "@/lib/dashboard-context"

export function PortfolioCards() {
  const { data } = useDashboard()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Green Portfolio */}
      <Card className="border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Total Green Portfolio</p>
            <h3 className="text-3xl font-bold text-foreground mt-2">{data.portfolioValue}</h3>
            <p className="text-sm text-accent mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +8.2% this quarter
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-accent" />
          </div>
        </div>
      </Card>

      {/* Portfolio ESG Average */}
      <Card className="border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Portfolio ESG Average</p>
            <h3 className="text-3xl font-bold text-foreground mt-2">
              {data.portfolioEsgAverage !== null ? `${data.portfolioEsgAverage}/100` : "--"}
            </h3>
            <p className="text-sm text-foreground mt-2">
              <span
                className={data.portfolioEsgAverage !== null ? "text-accent font-semibold" : "text-muted-foreground"}
              >
                {data.portfolioEsgAverage !== null ? "High Compliance" : "Pending Analysis"}
              </span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-accent" />
          </div>
        </div>
      </Card>

      {/* Pending Reviews */}
      <Card className="border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Pending ESG Reviews</p>
            <h3 className="text-3xl font-bold text-foreground mt-2">{data.pendingReviews}</h3>
            <p className="text-sm text-destructive mt-2">
              <span className="font-semibold">{data.pendingReviews > 0 ? "Action Required" : "All Verified"}</span>
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${data.pendingReviews > 0 ? "bg-destructive/10" : "bg-accent/10"}`}
          >
            <AlertCircle className={`w-6 h-6 ${data.pendingReviews > 0 ? "text-destructive" : "text-accent"}`} />
          </div>
        </div>
      </Card>
    </div>
  )
}
