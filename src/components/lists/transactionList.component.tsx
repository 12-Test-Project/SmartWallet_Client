import { TTransaction, TransactionAPI } from "@/api"
import { ActiveTransactionSortingdAtom, IsTransactionUpdatedAtom } from "@/stores/transaction.store";
import { UserTokenAtom } from "@/stores/user.store";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react"
import { TransactionUpdate } from "..";

export default function TransactionList() {
  const [transactionList, setTransactionList] = useState<Array<TTransaction>>([])
  const activeTransactionSorting = useAtomValue(ActiveTransactionSortingdAtom)

  const [isTransactionUpdated, setIsTransactionUpdated] = useAtom(IsTransactionUpdatedAtom)
  const [transactionUpdatingId, setTransactionUpdatingId] = useState(-1)

  const [userToken] = useAtom(UserTokenAtom);

  const fetchAllTransactions = async () => {

    if (!userToken) return console.log('@@ User Token not found at(transaction list) ')

    const allTransactionsResult = await TransactionAPI.getAll(1, userToken)

    if (!allTransactionsResult.suceded) {
      console.log(`@@ GetAll Transaction Status: failed: `, allTransactionsResult)
    } else {
      console.log(`@@ GetAll Transaction Status: success: `, allTransactionsResult)
      const data = allTransactionsResult.data
      switch (activeTransactionSorting) {
        case "all":
          setTransactionList(data.reverse())
          break
        case "type":
          const sortedTransactionsByType = [...data].sort((a, b) => a.type.localeCompare(b.type));
          setTransactionList(sortedTransactionsByType)
          break;
        case "amount":
          const sortedTransactionsByValue = [...data].sort((a, b) => a.amount - b.amount);
          setTransactionList(sortedTransactionsByValue.reverse())
          break;
        default:
          break;
      }
    }
  }

  const handleDeleteTransactionClick = async (id: number) => {

    if (!userToken) return console.log('@@ User Token not found at(transaction list) ')

    const allTransactionsResult = await TransactionAPI.deleteById({
      id: id,
      version: 1
    }, userToken)

    if (!allTransactionsResult.success) {
      console.log(`@@ Delete Transaction Status: failed: `, allTransactionsResult)
    } else {
      console.log(`@@ Delete Transaction Status: success: `, allTransactionsResult)
      setIsTransactionUpdated(true)
    }
  }

  const handleUpdateTransactionClick = async (id: number) => {
    if (!userToken) return
    setTransactionUpdatingId(id)
  }

  useEffect(() => {
    fetchAllTransactions().then(() => {
      setIsTransactionUpdated(false)
    })
  }, [isTransactionUpdated, activeTransactionSorting])

  return (
    <div>
      {transactionList.map(transaction => (
        <div key={`${transaction.userId}_${transaction.id}`} className="border">
          <h3>{transaction.type}</h3>
          <p>{transaction.amount}</p>
          <button onClick={() => handleUpdateTransactionClick(transaction.id)} disabled={transactionUpdatingId >= 0}>Update</button>
          <button onClick={() => handleDeleteTransactionClick(transaction.id)}>Delete</button>
          | {activeTransactionSorting}
          {userToken && transactionUpdatingId === transaction.id ? (<TransactionUpdate transaction={transaction} token={userToken} setTransactionUpdatingId={setTransactionUpdatingId} setIsTransactionUpdated={setIsTransactionUpdated} />) : null}
        </div>
      ))}
    </div>
  )
}