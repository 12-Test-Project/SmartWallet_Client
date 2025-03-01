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
      label: "Cantidad",
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
      label: "Tipo",
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

  const handleCloseClick = () => {
    prop.closeTransactionForm(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal Content */}
      <div className="relative z-50 mx-auto max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <form onSubmit={submit}>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold mb-2">Creando Transacción</h2>
          </div>
          <div className="flex flex-col gap-4">
            {formInputList.map((formInput) => (
              <FormInput
                key={formInput.id}
                classes={formInput.classes}
                type={formInput.type}
                name={formInput.name}
                id={formInput.id}
                label={formInput.label}
              />
            ))}
          </div>
          <br />
          <div className="flex gap-2">
            <button
              className="select-none rounded-lg bg-red-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-700/20 transition-all hover:shadow-lg hover:shadow-red-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
              onClick={handleCloseClick}
            >
              Cancelar
            </button>
            <button
              className="select-none rounded-lg bg-yellow-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-700/20 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}