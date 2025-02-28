import TransactionAPI, { TransactionSchema } from './transaction.api'
import AccountAPI, {AccountSchema} from './account.api'

type TTransaction = Omit<TransactionSchema, "version">
type TAccountSchema = AccountSchema

export {
  TransactionAPI,
  AccountAPI,
  type TTransaction,
  type TAccountSchema
}