"use client"

import { Card } from "@/components/ui/card"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"
import { useDashboard } from "@/lib/dashboard-context"

export function ESGChart() {
  const { data } = useDashboard()

  if (data.chartData.length === 0) {
    return (
      <Card className="border-border bg-card p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">ESG Performance vs Interest Rate</h2>
        <div className="flex flex-col items-center justify-center h-80">
          <p className="text-muted-foreground">No data to display</p>
          <p className="text-sm text-muted-foreground mt-1">Analyze a report to populate the chart</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">ESG Performance vs Interest Rate</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data.chartData}>
          <defs>
            <linearGradient id="colorEsg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--color-accent))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--color-accent))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
          <XAxis dataKey="month" stroke="hsl(var(--color-foreground))" />
          <YAxis yAxisId="left" stroke="hsl(var(--color-accent))" />
          <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--color-primary))" />
          <Tooltip
            contentStyle={{ backgroundColor: "hsl(var(--color-card))", border: "1px solid hsl(var(--color-border))" }}
            labelStyle={{ color: "hsl(var(--color-foreground))" }}
          />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="esg"
            stroke="hsl(var(--color-accent))"
            fill="url(#colorEsg)"
            name="ESG Score"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="rateReduction"
            stroke="hsl(var(--color-primary))"
            strokeWidth={2}
            name="Rate Reduction (%)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
