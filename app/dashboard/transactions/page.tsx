"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TransactionList } from "@/components/transaction-list"
import { TransactionForm } from "@/components/transaction-form"
import { useTransactions } from "@/hooks/use-transactions"
import { Plus } from "lucide-react"

export default function TransactionsPage() {
  const { t } = useTranslation()
  const { transactions, isLoading } = useTransactions()
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("transactions.title")}</h1>
        <p className="text-muted-foreground">{t("transactions.description")}</p>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder={t("transactions.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("transactions.filterType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("transactions.all")}</SelectItem>
              <SelectItem value="ingreso">{t("transactions.income")}</SelectItem>
              <SelectItem value="gasto">{t("transactions.expense")}</SelectItem>
              <SelectItem value="bono">{t("transactions.bonus")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("transactions.newTransaction")}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t("transactions.newTransaction")}</CardTitle>
            <CardDescription>{t("transactions.newTransactionDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionForm onSuccess={() => setShowForm(false)} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t("transactions.list")}</CardTitle>
          <CardDescription>{t("transactions.listDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionList transactions={filteredTransactions} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}

