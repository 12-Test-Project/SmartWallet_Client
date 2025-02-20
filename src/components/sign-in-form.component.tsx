import type { FormEvent } from "react"
import { EmailSVG } from "@components/svg";
import FormInput from "./form/input.component"

export default function SignInForm() {
  const submit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={submit}>
      <FormInput id="email" label="Email" icon={<EmailSVG />} />
    </form>
  )
}