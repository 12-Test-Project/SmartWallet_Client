import { Role } from "@api/account.api";

export interface FormInputProps {
  id: string,
  name: string,
  label: string,
  type: React.HTMLInputTypeAttribute | "select",
  classes: {
    container: string,
    label: string,
    input: string
  },
}

export default function FormInput(prop: FormInputProps) {
  if (prop.type === "select") return <FormInputSelect id={prop.id} name={prop.name} classes={prop.classes} label={prop.label} />

  return  (
    <div className={prop.classes.container}>
      <label htmlFor={prop.id} className={prop.classes.label}>{prop.label}</label>
      <input type={prop.type} name={prop.name} id={prop.id} className={prop.classes.input} />
    </div>
  )
}

function FormInputSelect(prop: Omit<FormInputProps, "type">) {
  return (
    <div className={prop.classes.container}>
    <label htmlFor={prop.id} className={prop.classes.label}>{prop.label}</label>
      <select name={prop.name} id={prop.id} className={prop.classes.input}>
        {Object.values(Role).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>  
    </div>
  )
}