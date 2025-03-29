"use client"

import { useTranslation } from "@/hooks/use-translation"

interface IncomeDisplayProps {
  income: any
}

export function IncomeDisplay({ income }: IncomeDisplayProps) {
  const { t } = useTranslation()

  if (!income) {
    return <div className="text-3xl font-bold">$0</div>
  }

  return (
    <div>
      <div className="text-3xl font-bold">${income.amount.toLocaleString()}</div>
      <p className="text-sm text-muted-foreground">{income.timeLapse}</p>
    </div>
  )
}

