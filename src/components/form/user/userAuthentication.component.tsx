import { User } from "@data/user.data"
import Account from "@api/account.api"
import { FormEvent, useState } from "react"
import { FormInput, TFormInput } from "@/components"
import { UserSetter } from "@/stores/user.store";
import { useAtom } from "jotai";

export default function UserAuthentication() {
  const [, setUser] = useAtom(UserSetter);
  const [formInputList] = useState<Array<TFormInput>>([
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
      name: "password",
      label: "Password",
      type: "password",
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

    const authenticationResult = await Account.authenticate({
      email: String(formData.get('email')),
      password: String(formData.get('password')),
    })

    if (authenticationResult.hasError) {
      console.log(`@@ Authentication Status: failed: `, authenticationResult)
    } else {
      console.log(`@@ Authentication Status: success: `, authenticationResult)
      setUser(authenticationResult as User)
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