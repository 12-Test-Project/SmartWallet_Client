"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionList } from "@/components/transaction-list"
import { TransactionChart } from "@/components/transaction-chart"
import { IncomeDisplay } from "@/components/income-display"
import { useTransactions } from "@/hooks/use-transactions"
import { useIncome } from "@/hooks/use-income"

export default function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { transactions, isLoading: transactionsLoading } = useTransactions()
  const { income, isLoading: incomeLoading } = useIncome()
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    if (transactions.length > 0) {
      const total = transactions.reduce((acc, transaction) => {
        return transaction.type === "ingreso" ? acc + transaction.amount : acc - transaction.amount
      }, 0)
      setTotalBalance(total)
    }
  }, [transactions])

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.welcome", { name: user?.name || "" })}</h1>
        <p className="text-muted-foreground">{t("dashboard.summary")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t("dashboard.balance")}</CardTitle>
            <CardDescription>{t("dashboard.currentBalance")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {transactionsLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                `$${totalBalance.toLocaleString()}`
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t("dashboard.income")}</CardTitle>
            <CardDescription>{t("dashboard.currentIncome")}</CardDescription>
          </CardHeader>
          <CardContent>
            {incomeLoading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
            ) : (
              <IncomeDisplay income={income} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t("dashboard.transactions")}</CardTitle>
            <CardDescription>{t("dashboard.recentTransactions")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {transactionsLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
              ) : (
                transactions.length
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">{t("dashboard.transactions")}</TabsTrigger>
          <TabsTrigger value="chart">{t("dashboard.chart")}</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.recentTransactions")}</CardTitle>
              <CardDescription>{t("dashboard.lastTransactions")}</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionList transactions={transactions} isLoading={transactionsLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chart" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.transactionChart")}</CardTitle>
              <CardDescription>{t("dashboard.transactionSummary")}</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionChart transactions={transactions} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

