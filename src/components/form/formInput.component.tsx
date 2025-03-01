import { Role } from "@api/account.api";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

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
  value?: string | number | readonly string[] | undefined,
  defaultValue?: string | number | readonly string[] | undefined
}

export default function FormInput(prop: FormInputProps) {
  if (prop.type === "select") return <FormInputSelect id={prop.id} name={prop.name} classes={prop.classes} label={prop.label} />

  return (
    <>
      {/* <div className={`${prop.classes.container}`}>
        <label htmlFor={prop.id} className={`block text-sm/6 font-medium text-gray-900 ${prop.classes.label}`}>{prop.label}</label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div>
            <input type={prop.type} value={prop.value} defaultValue={prop.defaultValue} name={prop.name} id={prop.id} className={`block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${prop.classes.input}`} />
          </div>
        </div>
      </div> */}
      {prop.type === "checkbox" ?
        (
          <div className={`flex items-center ${prop.classes.container}`}>
            <div className="mt-2">
              <div className="flex items-center gap-2 rounded-md bg-white pl-3 pr-2.5 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <label htmlFor={prop.id} className={`block text-sm/6 font-medium text-gray-900 ${prop.classes.label}`}>{prop.label}</label>
                <input type={prop.type} value={prop.value} defaultValue={prop.defaultValue} name={prop.name} id={prop.id} className={`block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${prop.classes.input}`} />
              </div>
            </div>
          </div>
        ) :
        (
          <div className={`${prop.classes.container}`}>
            <label htmlFor={prop.id} className={`block text-sm/6 font-medium text-gray-900 ${prop.classes.label}`}>{prop.label}</label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                {/* <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div> */}
                <input type={prop.type} value={prop.value} defaultValue={prop.defaultValue} name={prop.name} id={prop.id} className={`block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${prop.classes.input}`} />
              </div>
            </div>
          </div>
        )}
    </>
  )
}

function FormInputSelect(prop: Omit<FormInputProps, "type">) {
  return (
    <div className={`grid shrink-0 grid-cols-1 focus-within:relative ${prop.classes.container}`}>
      <div className={`grid shrink-0 grid-cols-1 focus-within:relative ${prop.classes.container}`}>
        <label htmlFor={prop.id} className={`block text-sm/6 font-medium text-gray-900 ${prop.classes.label}`}>{prop.label}</label>
        <div className="mt-2">
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[select:focus-within]:outline-2 has-[select:focus-within]:-outline-offset-2 has-[select:focus-within]:outline-indigo-600">
            <select name={prop.name} id={prop.id} className={`col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-0 focus:-outline-offset-0 focus:outline-indigo-600 sm:text-sm/6 ${prop.classes.input}`}>
              {Object.values(Role).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}