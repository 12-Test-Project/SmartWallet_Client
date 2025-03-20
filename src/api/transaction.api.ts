import { AccountAPI } from ".";

export interface TransactionSchema {
   id: number;
   amount: number;
   type: string;
   userId: string;
   version: number;
}

interface TransactionResponse {
   suceded: boolean;
   message: string;
   errors: string | null;
   data: Array<Omit<TransactionSchema, "version">>;
}

interface TransactionGeneralResponse {
   success: boolean;
}

type Transaction = Pick<TransactionSchema, "id" | "version">;

type TransactionCreateData = Omit<TransactionSchema, "id">

// POST
async function create(
   transaction: TransactionCreateData,
   token: string,
): Promise<TransactionResponse> {
   const uri = `/api/v${transaction.version}/Transaction/`;

   const reqBody: Omit<TransactionCreateData, "version"> = {
      amount: transaction.amount,
      type: transaction.type,
      userId: transaction.userId
   }

   try {
      const res = await fetch(uri, {
         method: "POST",
         headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
         },
         body: JSON.stringify(reqBody)
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = (await res.json()) as TransactionResponse;
      return data;
   } catch (error) {
      throw new Error(`@@ Retrieval failed with error: ${error}`);
   }
}


// GET
async function getById(
   transaction: Transaction,
   token: string,
): Promise<TransactionResponse> {
   const uri = `/api/v${transaction.version}/Transaction/${transaction.id}`;

   try {
      const res = await fetch(uri, {
         method: "GET",
         headers: {
            "Accept": "application/json",
            "Authorization": `bearer ${token}`,
         },
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = (await res.json()) as TransactionResponse;
      return data;
   } catch (error) {
      throw new Error(`@@ Retrieval failed with error: ${error}`);
   }
}

async function getAll(
   version: number,
   token: string,
   userId: string
): Promise<TransactionResponse> {
   const uri = `/api/v${version}/Transaction`;

   try {
      const res = await AccountAPI.fetchWithAuth(uri, {
         method: "GET",
         headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
         },
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = (await res.json()) as TransactionResponse;
      console.log('@@ All transactions: ', data.data)
      const filteredtransactions = data.data.filter(f => f.userId === userId)
      data.data = filteredtransactions
      return data;
   } catch (error) {
      throw new Error(`@@ Retrieval failed with error: ${error}`);
   }
}

// PUT
async function update(
   transaction: TransactionSchema,
   token: string,
): Promise<TransactionResponse> {
   const uri = `/api/v${transaction.version}/Transaction/${transaction.id}`;

   try {
      const res = await fetch(uri, {
         method: "PUT",
         headers: {
            "Accept": "*/*",
            "Authorization": `bearer ${token}`,
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            id: transaction.id,
            amount: transaction.amount,
            type: transaction.type,
            userId: transaction.userId
         } as TransactionSchema)
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = (await res.json()) as TransactionResponse;
      return data;
   } catch (error) {
      throw new Error(`@@ Update failed with error: ${error}`);
   }
}

// DELETE
async function deleteById(
   transaction: Transaction,
   token: string,
): Promise<TransactionGeneralResponse> {
   const uri = `/api/v${transaction.version}/Transaction/${transaction.id}`;

   try {
      const res = await fetch(uri, {
         method: "DELETE",
         headers: {
            "Accept": "*/*",
            "Authorization": `bearer ${token}`,
         },
      });

      if (!res.ok) throw new Error(res.statusText);

      return {
         success: true,
      };
   } catch (error) {
      throw new Error(`@@ Deletion failed with error: ${error}`);
   }
}

export default {
   create,
   getAll,
   getById,
   update,
   deleteById
};
