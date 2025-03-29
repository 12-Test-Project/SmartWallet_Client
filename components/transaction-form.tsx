"use client"

import type React from "react"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useTransactions } from "@/hooks/use-transactions"

interface TransactionFormProps {
  transaction?: any
  onSuccess: () => void
}

export function TransactionForm({ transaction, onSuccess }: TransactionFormProps) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { toast } = useToast()
  const { createTransaction, updateTransaction } = useTransactions()

  const [formData, setFormData] = useState({
    amount: transaction?.amount || 0,
    type: transaction?.type || "ingreso",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    if (formData.amount <= 0) {
      toast({
        title: t("transactions.error"),
        description: t("transactions.invalidAmount"),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      if (transaction) {
        // Update existing transaction
        await updateTransaction(transaction.id, {
          id: transaction.id,
          amount: Number(formData.amount),
          type: formData.type,
          userId: user.id,
        })

        toast({
          title: t("transactions.updated"),
          description: t("transactions.updatedDescription"),
        })
      } else {
        // Create new transaction
        await createTransaction({
          amount: Number(formData.amount),
          type: formData.type,
          userId: user.id,
        })

        toast({
          title: t("transactions.created"),
          description: t("transactions.createdDescription"),
        })
      }

      onSuccess()
    } catch (error) {
      toast({
        title: t("transactions.error"),
        description: transaction ? t("transactions.errorUpdating") : t("transactions.errorCreating"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">{t("transactions.amount")}</Label>
        <Input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">{t("transactions.type")}</Label>
        <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
          <SelectTrigger id="type">
            <SelectValue placeholder={t("transactions.selectType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ingreso">{t("transactions.income")}</SelectItem>
            <SelectItem value="gasto">{t("transactions.expense")}</SelectItem>
            <SelectItem value="bono">{t("transactions.bonus")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          {t("common.cancel")}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? transaction
              ? t("common.updating")
              : t("common.creating")
            : transaction
              ? t("common.update")
              : t("common.create")}
        </Button>
      </div>
    </form>
  )
}

