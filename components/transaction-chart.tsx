"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { useTheme } from "next-themes"

interface TransactionChartProps {
  transactions: any[]
}

export function TransactionChart({ transactions }: TransactionChartProps) {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || transactions.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Group transactions by type
    const incomeTotal = transactions.filter((t) => t.type === "ingreso").reduce((sum, t) => sum + t.amount, 0)

    const expenseTotal = transactions.filter((t) => t.type === "gasto").reduce((sum, t) => sum + t.amount, 0)

    const bonusTotal = transactions.filter((t) => t.type === "bono").reduce((sum, t) => sum + t.amount, 0)

    const total = incomeTotal + expenseTotal + bonusTotal

    // Colors
    const colors = {
      income: "#10b981", // green
      expense: "#ef4444", // red
      bonus: "#8b5cf6", // purple
      text: theme === "dark" ? "#ffffff" : "#000000",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw pie chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    let startAngle = 0
    const drawSegment = (value: number, color: string, label: string) => {
      if (value === 0) return

      const segmentAngle = (value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + segmentAngle)
      ctx.closePath()

      ctx.fillStyle = color
      ctx.fill()

      // Draw label
      const midAngle = startAngle + segmentAngle / 2
      const labelX = centerX + Math.cos(midAngle) * (radius * 0.7)
      const labelY = centerY + Math.sin(midAngle) * (radius * 0.7)

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(label, labelX, labelY)

      startAngle += segmentAngle
    }

    // Draw segments
    drawSegment(incomeTotal, colors.income, t("transactions.income"))
    drawSegment(expenseTotal, colors.expense, t("transactions.expense"))
    drawSegment(bonusTotal, colors.bonus, t("transactions.bonus"))

    // Draw legend
    const legendY = canvas.height - 30
    const legendSpacing = 120

    // Income
    ctx.fillStyle = colors.income
    ctx.fillRect(20, legendY, 15, 15)
    ctx.fillStyle = colors.text
    ctx.font = "12px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText(`${t("transactions.income")}: $${incomeTotal.toLocaleString()}`, 40, legendY + 8)

    // Expense
    ctx.fillStyle = colors.expense
    ctx.fillRect(20 + legendSpacing, legendY, 15, 15)
    ctx.fillStyle = colors.text
    ctx.fillText(`${t("transactions.expense")}: $${expenseTotal.toLocaleString()}`, 40 + legendSpacing, legendY + 8)

    // Bonus
    ctx.fillStyle = colors.bonus
    ctx.fillRect(20 + legendSpacing * 2, legendY, 15, 15)
    ctx.fillStyle = colors.text
    ctx.fillText(`${t("transactions.bonus")}: $${bonusTotal.toLocaleString()}`, 40 + legendSpacing * 2, legendY + 8)
  }, [transactions, theme, t])

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">{t("transactions.noTransactionsForChart")}</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <canvas ref={canvasRef} width={600} height={400} className="w-full h-auto"></canvas>
    </div>
  )
}

