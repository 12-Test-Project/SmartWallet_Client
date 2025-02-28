import FormInput, { FormInputProps } from "./form/formInput.component"
import UserRegistration from "./form/user/userRegistration.component"
import UserAuthentication from "./form/user/userAuthentication.component"
import TransactionList from "./lists/transactionList.component"
import TransactionCreate from "./form/transaction/transactionCreate.component"
import TransactionUpdate from "./form/transaction/transactionUpdate.component"

type TFormInput = FormInputProps

export {
  FormInput,
  UserRegistration,
  UserAuthentication,
  TransactionList,
  TransactionCreate,
  TransactionUpdate,
  type TFormInput,
}