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
    <div className="flex flex-wrap gap-4">
      {transactionList.map(transaction => (
        <div className="flex-grow-1 relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md" key={`${transaction.userId}_${transaction.id}`}>
          <div className="p-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {transaction.type}
            </h5>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              {transaction.amount}
            </p>
          </div>
          <div className="flex gap-2 justify-end p-6 pt-0">
            <button
              className="select-none rounded-lg bg-yellow-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-700/20 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={() => handleUpdateTransactionClick(transaction.id)} disabled={transactionUpdatingId >= 0}
            >
              Update
            </button>
            <button
              className="select-none rounded-lg bg-red-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-700/20 transition-all hover:shadow-lg hover:shadow-red-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={() => handleDeleteTransactionClick(transaction.id)}
            >
              Delete
            </button>
          </div>
          {userToken && transactionUpdatingId === transaction.id ? (<TransactionUpdate transaction={transaction} token={userToken} setTransactionUpdatingId={setTransactionUpdatingId} setIsTransactionUpdated={setIsTransactionUpdated} />) : null}
        </div>
      ))}

    </div>
  )
}