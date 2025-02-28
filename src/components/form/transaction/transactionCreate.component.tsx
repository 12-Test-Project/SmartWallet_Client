import Transaction from "@/api/transaction.api"
import { utilGetUserData } from "@utils/userData.util"
import { FormEvent } from "react"

export default function TransactionCreate() {

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const userData = await utilGetUserData("75ce4a2d-d6da-406d-b107-d6fc3a5048b5")

    if(!userData) return

    const createTransactionResult = await Transaction.create({
      amount: Number(formData.get('amount')),
      type: String(formData.get("type")),
      userId: userData.id,
      version: 1
    }, userData.jwToken)

    if (!createTransactionResult.suceded) {
      console.log(`@@ Create Transaction Status: failed: `, createTransactionResult)
    } else {
      console.log(`@@ Create Transaction Status: success: `, createTransactionResult)
    }
  }

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <form onSubmit={submit}>
        <button>Submit</button>
      </form>
    </div>
  )
}