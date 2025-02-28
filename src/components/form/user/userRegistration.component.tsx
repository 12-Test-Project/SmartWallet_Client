import { FormInput, TFormInput } from "@/components"
import Account, { Role } from "@api/account.api"
import { FormEvent, useState } from "react"

export default function UserRegistration() {
  const [formInputList] = useState<Array<TFormInput>>([
    {
      id: crypto.randomUUID(),
      name: "name",
      label: "Name",
      type: "text",
      classes: {
        container: "",
        label: "",
        input: ""
      }
    },
    {
      id: crypto.randomUUID(),
      name: "phoneNumber",
      label: "Phone Number",
      type: "tel",
      classes: {
        container: "",
        label: "",
        input: ""
      }
    },
    {
      id: crypto.randomUUID(),
      name: "rol",
      label: "Rol",
      type: "select",
      classes: {
        container: "",
        label: "",
        input: ""
      },
    },
    {
      id: crypto.randomUUID(),
      name: "userName",
      label: "Username",
      type: "text",
      classes: {
        container: "",
        label: "",
        input: ""
      }
    },
    {
      id: crypto.randomUUID(),
      name: "password",
      label: "Password",
      type: "password",
      classes: {
        container: "",
        label: "",
        input: ""
      }
    },
    {
      id: crypto.randomUUID(),
      name: "email",
      label: "Email",
      type: "email",
      classes: {
        container: "",
        label: "",
        input: ""
      }
    },
    {
      id: crypto.randomUUID(),
      name: "active",
      label: "Active",
      type: "checkbox",
      classes: {
        container: "",
        label: "",
        input: ""
      }
    }
  ])

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const registrationResult = await Account.register({
      name: String(formData.get('name')),
      phoneNumber: String(formData.get('phoneNumber')),
      role: String(formData.get('rol')) as Role,
      userName: String(formData.get('userName')),
      password: String(formData.get('password')),
      email: String(formData.get('email')),
      active: Boolean(formData.get('active')),
    })

    if (registrationResult.hasError) {
      console.log(`@@ Registration Status: failed: `, registrationResult)
    } else {
      console.log(`@@ Registration Status: success: `, registrationResult)
    }
  }

  return (
    <form onSubmit={submit}>
      {formInputList.map((formInput) => (
        <FormInput key={formInput.id} classes={formInput.classes} type={formInput.type} name={formInput.name} id={formInput.id} label={formInput.label} />
      ))}
      <button>Submit</button>
    </form>
  )
}