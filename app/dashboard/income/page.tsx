"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IncomeForm } from "@/components/income-form"
import { IncomeList } from "@/components/income-list"
import { useIncome } from "@/hooks/use-income"
import { Plus } from "lucide-react"

export default function IncomePage() {
  const { t } = useTranslation()
  const { income, incomeHistory, isLoading } = useIncome()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("income.title")}</h1>
        <p className="text-muted-foreground">{t("income.description")}</p>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("income.newIncome")}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t("income.newIncome")}</CardTitle>
            <CardDescription>{t("income.newIncomeDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <IncomeForm onSuccess={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("income.current")}</CardTitle>
            <CardDescription>{t("income.currentDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-6 w-24 animate-pulse rounded bg-muted"></div>
                <div className="h-10 w-48 animate-pulse rounded bg-muted"></div>
              </div>
            ) : income ? (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">{income.timeLapse}</div>
                <div className="text-3xl font-bold">${income.amount.toLocaleString()}</div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">{t("income.noIncome")}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("income.history")}</CardTitle>
            <CardDescription>{t("income.historyDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <IncomeList incomeHistory={incomeHistory} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

