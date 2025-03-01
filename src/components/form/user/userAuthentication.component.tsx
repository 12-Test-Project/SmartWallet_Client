import { User } from "@data/user.data"
import Account from "@api/account.api"
import { FormEvent, useEffect, useState } from "react"
import { FormInput, TFormInput } from "@/components"
import { redirectToAtom, UserSetter } from "@/stores/user.store";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "@tanstack/react-router";

export default function UserAuthentication() {
  const [, setUser] = useAtom(UserSetter);
  const router = useRouter()
  const redirectTo = useAtomValue(redirectToAtom)
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

  useEffect(() => {
    if(redirectTo)
      router.navigate({to: redirectTo})
  }, [redirectTo])

  return (
    <form onSubmit={submit} className="mx-auto max-w-[400px] p-6 lg:px-8">
      <div className="flex flex-col gap-4">
        {formInputList.map((formInput) => (
          <FormInput key={formInput.id} classes={formInput.classes} type={formInput.type} name={formInput.name} id={formInput.id} label={formInput.label} />
        ))}
      </div>
      <br />
      <button
        className="select-none rounded-lg bg-yellow-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-700/20 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="submit"
        data-ripple-light="true"
      >
        Sign In
      </button>
    </form>
  )
}