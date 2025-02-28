import Account, { Role } from "@api/account.api"
import { FormEvent } from "react"

export default function UserRegistration() {
  const submit = async (e: FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const registrationResult = await Account.register({
      name: String(formData.get('name')),
      phoneNumber: String(formData.get('phoneNumber')),
      role: Role.DEVELOPER,
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
      <button>Submit</button>
    </form>
  )
}