import { saveUser } from "@data/user.data"
import Account from "@api/account.api"
import { FormEvent } from "react"

export default function UserAuthentication() {
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
      try {
        const response = await saveUser(authenticationResult);
        alert(response.data); // Show success message
      } catch (error: any) {
          alert(`Error: ${error.message}`);
      }
    }
  }
  
  return (
    <form onSubmit={submit}>
    <button>Submit</button>
  </form> 
  )
}