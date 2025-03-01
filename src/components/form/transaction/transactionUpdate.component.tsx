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

  const handleCloseClick = () => {
    prop.setTransactionUpdatingId(-1)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal Content */}
      <div className="relative z-50 mx-auto max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
        <form onSubmit={submit}>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold mb-2">Editando Transacción</h2>
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
                defaultValue={formInput.defaultValue}
              />
            ))}
          </div>
          <br />
          <div className="flex gap-2">
            <button
              className="select-none rounded-lg bg-red-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-700/20 transition-all hover:shadow-lg hover:shadow-red-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button" // Use type="button" to prevent form submission
              onClick={handleCloseClick}
              data-ripple-light="true"
            >
              Cancelar
            </button>
            <button
              className="select-none rounded-lg bg-yellow-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-700/20 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}