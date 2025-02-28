import { TTransaction } from "@/api"
import Transaction from "@/api/transaction.api"
import { FormInput, TFormInput } from "@/components"
import { IsTransactionUpdatedAtom } from "@/stores/transaction.store"
import { useAtom } from "jotai"
import { FormEvent, useState } from "react"

interface TransactionCreateFormProps {
  userId: string,
  userToken: string,
  closeTransactionForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TransactionCreate(prop: TransactionCreateFormProps) {
  const [_isTransactionUpdated, setIsTransactionUpdated] = useAtom(IsTransactionUpdatedAtom)
  const [_, setTransactionList] = useState<Array<TTransaction>>([])

  const [formInputList] = useState<Array<TFormInput>>([
    {
      id: crypto.randomUUID(),
      name: "amount",
      label: "Amount",
      type: "number",
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

    const createTransactionResult = await Transaction.create({
      amount: Number(formData.get('amount')),
      type: String(formData.get("type")),
      userId: prop.userId,
      version: 1
    }, prop.userToken)

    if (!createTransactionResult.suceded) {
      console.log(`@@ Create Transaction Status: failed: `, createTransactionResult)
    } else {
      console.log(`@@ Create Transaction Status: success: `, createTransactionResult)
      setTransactionList(createTransactionResult.data)
      setIsTransactionUpdated(true)
      prop.closeTransactionForm(false)
    }
  }

  return (
    <div className="p-2">
      <form onSubmit={submit}>
        {formInputList.map((formInput) => (
          <FormInput key={formInput.id} classes={formInput.classes} type={formInput.type} name={formInput.name} id={formInput.id} label={formInput.label} />
        ))}
        <button type="submit">Create</button>
      </form>
    </div>
  )
}