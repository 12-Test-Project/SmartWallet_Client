import { TransactionCreate, TransactionList } from "@/components"
import { rootRoute } from "./__root"
import { createRoute } from "@tanstack/react-router"
import { getUser } from "@/data/user.data"
import { useAtom } from "jotai"
import { redirectToAtom, UserAtom, UserLoader } from "@/stores/user.store"
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
    const [_redirectTo, setRedirectTo] = useAtom(redirectToAtom)

    const setUserData = async () => {
      const getUserResult = await getUser()
      setUser(getUserResult.data)
    }

    useEffect(() => {
      setRedirectTo(null)
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
        { label: "Todas", type: "all", action: () => setActiveTransactionSorting("all") },
        { label: "Tipo", type: "type", action: () => setActiveTransactionSorting("type") },
        { label: "Cantidad", type: "amount", action: () => setActiveTransactionSorting("amount") }
      ]

    return (
      <div className="p-2">
        {/* Control Panel */}
        <div className="relative p-6 gap-4 flex justify-between rounded-xl bg-white bg-clip-border text-gray-700 ">
          <div className="flex flex-wrap gap-4">
            {listOfFilters.map((filter) => (
              <button key={filter.type} onClick={filter.action} data-ripple-light="true" className="select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase shadow-md shadow-yellow-700/20 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">{filter.label}</button>
            ))}
          </div>
          <div className="">
            <button
              className="select-none rounded-lg bg-yellow-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-700/20 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
              onClick={handleCreateTransactionButtonClick} disabled={isTransactionCreateFormActive}
            >
              +
            </button>
          </div>
          {userData && isTransactionCreateFormActive ? <TransactionCreate userId={userData.id} userToken={userData.jwToken} closeTransactionForm={setIsTransactionCreateFormActive} /> : null}
        </div>
        <br />
        {/* Transactions */}
        <div>
          {userData && <TransactionList />}
        </div>
      </div>
    )
  },
})
