import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(request: Request) {
  try {
    const { report } = await request.json()

    if (!report || report.trim().length === 0) {
      return Response.json({ error: "Report text is required" }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      return Response.json({ error: "Google API key not configured" }, { status: 500 })
    }

    const client = new GoogleGenerativeAI(apiKey)
    const model = client.getGenerativeModel({ model: "gemini-2.5-flash" })

    const prompt = `You are an ESG (Environmental, Social, Governance) Specialist. Analyze this sustainability report and provide:
1. An ESG Score out of 100 based on environmental impact, social responsibility, and governance practices
2. A brief 2-sentence summary of key findings
3. Whether to increase or decrease the loan interest rate

Report:
${report}

Respond in this exact JSON format (no markdown, no extra text):
{
  "esgScore": <number 0-100>,
  "summary": "<2-sentence summary>",
  "rateAdjustment": "<text: 'increase by 0.5%' or 'decrease by 0.5%'>"
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("Failed to parse Gemini response")
    }

    const parsed = JSON.parse(jsonMatch[0])

    // Parse rate adjustment to extract numeric value
    const rateAdjustmentText = parsed.rateAdjustment || "decrease by 0.5%"
    const isIncrease = rateAdjustmentText.toLowerCase().includes("increase")
    const numberMatch = rateAdjustmentText.match(/[\d.]+/)
    const adjustmentValue = numberMatch ? Number.parseFloat(numberMatch[0]) : 0.5
    const finalAdjustment = isIncrease ? adjustmentValue : -adjustmentValue

    return Response.json({
      score: Math.min(100, Math.max(0, parsed.esgScore)),
      recommendation: parsed.summary,
      rateAdjustment: `${isIncrease ? "+" : ""}${finalAdjustment.toFixed(2)}%`,
    })
  } catch (error) {
    console.error("ESG Analysis error:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to analyze report" },
      { status: 500 },
    )
  }
}
