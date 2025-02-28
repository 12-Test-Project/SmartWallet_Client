import { TransactionAPI, TTransaction } from "@/api"
import { FormInput, TFormInput } from "@/components"
import { FormEvent, useState } from "react"

interface TransactionUpdateProps {
  transaction: TTransaction,
  token: string,
  setTransactionUpdatingId: React.Dispatch<React.SetStateAction<number>>,
  setIsTransactionUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TransactionUpdate(prop: TransactionUpdateProps) {

  const [formInputList] = useState<Array<TFormInput>>([
    {
      id: crypto.randomUUID(),
      name: "amount",
      label: "Amount",
      type: "number",
      defaultValue: prop.transaction.amount,
      classes: {
        container: "",
        label: "",
        input: ""
      }
    },
    {
      id: crypto.randomUUID(),
      name: "type",
      label: "Type",
      type: "text",
      defaultValue: prop.transaction.type,
      classes: {
        container: "",
        label: "",
        input: ""
      }
    },
  ])

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const allTransactionsResult = await TransactionAPI.update({
      id: prop.transaction.id,
      version: 1,
      amount: Number(formData.get('amount')),
      type: String(formData.get('type')),
      userId: prop.transaction.userId
    }, prop.token)

    if (!allTransactionsResult.suceded) {
      console.log(`@@ Update Transaction Status: failed: `, allTransactionsResult)
    } else {
      console.log(`@@ Update Transaction Status: success: `, allTransactionsResult)
      prop.setTransactionUpdatingId(-1)
      prop.setIsTransactionUpdated(true)
    }
  }

  return (
    <div className="p-2">
      <form onSubmit={submit}>
        {formInputList.map((formInput) => (
          <FormInput key={formInput.id} classes={formInput.classes} type={formInput.type} name={formInput.name} id={formInput.id} label={formInput.label} defaultValue={formInput.defaultValue} />
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  )
}