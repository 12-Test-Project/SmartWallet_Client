import { TransactionCreate, TransactionList } from "@/components"
import { rootRoute } from "./__root"
import { createRoute } from "@tanstack/react-router"
import { getUser } from "@/data/user.data"
import { useAtom } from "jotai"
import { UserAtom, UserLoader } from "@/stores/user.store"
import { useEffect, useState } from "react"
import { useAtomValue } from "jotai"
import { ActiveTransactionSortingdAtom, TSorting } from "@/stores/transaction.store"
import { hasAccess } from "@/utils"

export const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  async beforeLoad(_ctx) {
    await hasAccess()
  },
  path: '/transactions',
  component: function Transactions() {
    const [isTransactionCreateFormActive, setIsTransactionCreateFormActive] = useState(false)
    const [_activeTransactionSorting, setActiveTransactionSorting] = useAtom(ActiveTransactionSortingdAtom)
    const userData = useAtomValue(UserAtom)
    const [_, setUser] = useAtom(UserLoader);

    const setUserData = async () => {
      const getUserResult = await getUser()
      setUser(getUserResult.data)
    }

    useEffect(() => {
      setUserData()
    }, [])

    const handleCreateTransactionButtonClick = () => {
      if (!userData) return
      setIsTransactionCreateFormActive(true)
    }

    const listOfFilters: Array<{
      label: string,
      type: TSorting,
      action: () => void
    }> = [
        { label: "All", type: "all", action: () => setActiveTransactionSorting("all") },
        { label: "Type", type: "type", action: () => setActiveTransactionSorting("type") },
        { label: "Amount", type: "amount", action: () => setActiveTransactionSorting("amount") }
      ]

    return (
      <div className="p-2">
        {/* Control Panel */}
        <div>
          {listOfFilters.map((filter) => (
            <button key={filter.type} onClick={filter.action}>{filter.label}</button>
          ))}
          <br />
          <button onClick={handleCreateTransactionButtonClick} disabled={isTransactionCreateFormActive}>
            +
          </button>
          {userData && isTransactionCreateFormActive ? <TransactionCreate userId={userData.id} userToken={userData.jwToken} closeTransactionForm={setIsTransactionCreateFormActive} /> : null}
        </div>
        {/* Transactions */}
        <div>
          {userData && <TransactionList />}
        </div>
      </div>
    )
  },
})
