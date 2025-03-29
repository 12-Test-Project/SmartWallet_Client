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
import { useIncome } from "@/hooks/use-income"

interface IncomeFormProps {
  income?: any
  onSuccess: () => void
}

export function IncomeForm({ income, onSuccess }: IncomeFormProps) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { toast } = useToast()
  const { createIncome, updateIncome } = useIncome()

  const [formData, setFormData] = useState({
    amount: income?.amount || 0,
    timeLapse: income?.timeLapse || "mensual",
    current: income?.current !== undefined ? income.current : true,
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
        title: t("income.error"),
        description: t("income.invalidAmount"),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      if (income) {
        // Update existing income
        await updateIncome(income.id, {
          id: income.id,
          amount: Number(formData.amount),
          timeLapse: formData.timeLapse,
          current: formData.current,
          userId: user.id,
        })

        toast({
          title: t("income.updated"),
          description: t("income.updatedDescription"),
        })
      } else {
        // Create new income
        await createIncome({
          amount: Number(formData.amount),
          timeLapse: formData.timeLapse,
          current: formData.current,
          userId: user.id,
        })

        toast({
          title: t("income.created"),
          description: t("income.createdDescription"),
        })
      }

      onSuccess()
    } catch (error) {
      toast({
        title: t("income.error"),
        description: income ? t("income.errorUpdating") : t("income.errorCreating"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">{t("income.amount")}</Label>
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
        <Label htmlFor="timeLapse">{t("income.timeLapse")}</Label>
        <Select value={formData.timeLapse} onValueChange={(value) => handleChange("timeLapse", value)}>
          <SelectTrigger id="timeLapse">
            <SelectValue placeholder={t("income.selectTimeLapse")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diario">{t("income.daily")}</SelectItem>
            <SelectItem value="semanal">{t("income.weekly")}</SelectItem>
            <SelectItem value="quincenal">{t("income.biweekly")}</SelectItem>
            <SelectItem value="mensual">{t("income.monthly")}</SelectItem>
            <SelectItem value="anual">{t("income.yearly")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          {t("common.cancel")}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? income
              ? t("common.updating")
              : t("common.creating")
            : income
              ? t("common.update")
              : t("common.create")}
        </Button>
      </div>
    </form>
  )
}

