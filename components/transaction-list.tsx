"use client"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowDownCircle, ArrowUpCircle, Edit, Gift, Trash } from "lucide-react"
import { TransactionForm } from "@/components/transaction-form"
import { useTransactions } from "@/hooks/use-transactions"
import { useToast } from "@/components/ui/use-toast"

interface TransactionListProps {
  transactions: any[]
  isLoading: boolean
}

export function TransactionList({ transactions, isLoading }: TransactionListProps) {
  const { t } = useTranslation()
  const { deleteTransaction } = useTransactions()
  const { toast } = useToast()
  const [editingTransaction, setEditingTransaction] = useState<any>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<any>(null)

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction)
  }

  const handleDelete = (transaction: any) => {
    setTransactionToDelete(transaction)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!transactionToDelete) return

    try {
      await deleteTransaction(transactionToDelete.id)
      toast({
        title: t("transactions.deleted"),
        description: t("transactions.deletedDescription"),
      })
    } catch (error) {
      toast({
        title: t("transactions.error"),
        description: t("transactions.errorDeleting"),
        variant: "destructive",
      })
    } finally {
      setShowDeleteDialog(false)
      setTransactionToDelete(null)
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "ingreso":
        return <ArrowUpCircle className="h-4 w-4 text-green-500" />
      case "gasto":
        return <ArrowDownCircle className="h-4 w-4 text-red-500" />
      case "bono":
        return <Gift className="h-4 w-4 text-purple-500" />
      default:
        return <ArrowUpCircle className="h-4 w-4 text-blue-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(3)
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

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">{t("transactions.noTransactions")}</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getTransactionIcon(transaction.type)}
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(transaction.createDate)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className={`font-medium ${transaction.type === "gasto" ? "text-red-500" : "text-green-500"}`}>
                  {transaction.type === "gasto" ? "-" : "+"}${transaction.amount.toLocaleString()}
                </p>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(transaction)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">{t("common.edit")}</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(transaction)}>
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">{t("common.delete")}</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {editingTransaction && (
        <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("transactions.editTransaction")}</DialogTitle>
              <DialogDescription>{t("transactions.editTransactionDescription")}</DialogDescription>
            </DialogHeader>
            <TransactionForm transaction={editingTransaction} onSuccess={() => setEditingTransaction(null)} />
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("transactions.confirmDelete")}</DialogTitle>
            <DialogDescription>{t("transactions.confirmDeleteDescription")}</DialogDescription>
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

