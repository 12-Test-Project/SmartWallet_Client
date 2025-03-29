import { AccountAPI } from ".";

export interface IncomeSchema {
   id: number;
   amount: number;
   timeLapse: string;
   createDate?: string;
   lastUpdatedDate?: string;
   current: boolean;
   userId: string;
}

interface IncomeResponse {
   suceded: boolean;
   message: string;
   errors: string | null;
   data: Array<Omit<IncomeSchema, "version">>;
}

interface IncomeGeneralResponse {
   success: boolean;
}

type Income = Pick<IncomeSchema, "id" | "version">;

type IncomeCreateData = Omit<IncomeSchema, "id">

// POST
async function create(
   transaction: IncomeCreateData,
   token: string,
): Promise<IncomeResponse> {
   const uri = `/api/v${transaction.version}/Income/`;

   const reqBody: Omit<IncomeCreateData, "version"> = {
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

      const data = (await res.json()) as IncomeResponse;
      return data;
   } catch (error) {
      throw new Error(`@@ Retrieval failed with error: ${error}`);
   }
}


// GET
async function getById(
   transaction: Income,
   token: string,
): Promise<IncomeResponse> {
   const uri = `/api/v${transaction.version}/Income/${transaction.id}`;

   try {
      const res = await fetch(uri, {
         method: "GET",
         headers: {
            "Accept": "application/json",
            "Authorization": `bearer ${token}`,
         },
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = (await res.json()) as IncomeResponse;
      return data;
   } catch (error) {
      throw new Error(`@@ Retrieval failed with error: ${error}`);
   }
}

async function getAll(
   version: number,
   token: string,
   userId: string
): Promise<IncomeResponse> {
   const uri = `/api/v${version}/Income`;

   try {
      const res = await AccountAPI.fetchWithAuth(uri, {
         method: "GET",
         headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
         },
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = (await res.json()) as IncomeResponse;
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
   transaction: IncomeSchema,
   token: string,
): Promise<IncomeResponse> {
   const uri = `/api/v${transaction.version}/Income/${transaction.id}`;

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
         } as IncomeSchema)
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = (await res.json()) as IncomeResponse;
      return data;
   } catch (error) {
      throw new Error(`@@ Update failed with error: ${error}`);
   }
}

// DELETE
async function deleteById(
   transaction: Income,
   token: string,
): Promise<IncomeGeneralResponse> {
   const uri = `/api/v${transaction.version}/Income/${transaction.id}`;

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
