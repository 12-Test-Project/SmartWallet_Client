import { atom } from "jotai";

export type TSorting = "all" | "type" | "amount" | "amount-up-down" | "amount-down-up"

export const IsTransactionUpdatedAtom = atom<boolean>(false);

export const ActiveTransactionSortingdAtom = atom<TSorting>("all")