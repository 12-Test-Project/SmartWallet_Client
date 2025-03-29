"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"
import { IncomeForm } from "@/components/income-form"
import { useIncome } from "@/hooks/use-income"
import { useToast } from "@/components/ui/use-toast"

interface IncomeListProps {
  incomeHistory: any[]
  isLoading: boolean
}

export function IncomeList({ incomeHistory, isLoading }: IncomeListProps) {
  const { t } = useTranslation()
  const { deleteIncome } = useIncome()
  const { toast } = useToast()
  const [editingIncome, setEditingIncome] = useState<any>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [incomeToDelete, setIncomeToDelete] = useState<any>(null)

  const handleEdit = (income: any) => {
    setEditingIncome(income)
  }

  const handleDelete = (income: any) => {
    setIncomeToDelete(income)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!incomeToDelete) return

    try {
      await deleteIncome(incomeToDelete.id)
      toast({
        title: t("income.deleted"),
        description: t("income.deletedDescription"),
      })
    } catch (error) {
      toast({
        title: t("income.error"),
        description: t("income.errorDeleting"),
        variant: "destructive",
      })
    } finally {
      setShowDeleteDialog(false)
      setIncomeToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-muted"></div>
                  <div className="h-3 w-16 rounded bg-muted"></div>
                </div>
                <div className="h-6 w-16 rounded bg-muted"></div>
              </div>
            </Card>
          ))}
      </div>
    )
  }

  if (incomeHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">{t("income.noIncome")}</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {incomeHistory.map((income) => (
          <Card key={income.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">${income.amount.toLocaleString()}</p>
                  {income.current && <Badge variant="outline">{t("income.current")}</Badge>}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <p>{income.timeLapse}</p>
                  <span>•</span>
                  <p>{formatDate(income.createDate)}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(income)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">{t("common.edit")}</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(income)}>
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">{t("common.delete")}</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {editingIncome && (
        <Dialog open={!!editingIncome} onOpenChange={() => setEditingIncome(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("income.editIncome")}</DialogTitle>
              <DialogDescription>{t("income.editIncomeDescription")}</DialogDescription>
            </DialogHeader>
            <IncomeForm income={editingIncome} onSuccess={() => setEditingIncome(null)} />
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("income.confirmDelete")}</DialogTitle>
            <DialogDescription>{t("income.confirmDeleteDescription")}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {t("common.delete")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

