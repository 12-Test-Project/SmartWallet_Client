interface TransactionSchema {
	id: number;
	amount: number;
	type: string;
	userId: string;
	version: string;
}

interface TransactionResponse {
	suceded: boolean;
	message: string;
	errors: string | null;
	data: Omit<TransactionSchema, "version">;
}

interface TransactionGeneralResponse {
	success: boolean;
}

type Transaction = Pick<TransactionSchema, "id" | "version">;

// POST

// GET
async function getById(
	transaction: Transaction,
	token: string,
): Promise<TransactionResponse> {
	const { id, version } = transaction;
	const uri = `/api/v${version}/Transacction/${id}`;

	try {
		const res = await fetch(uri, {
			method: "GET",
			headers: {
				accept: "*/*",
				Authorization: token,
			},
		});

		if (!res.ok) throw new Error(res.statusText);

		const data = (await res.json()) as TransactionResponse;
		return data;
	} catch (error) {
		throw new Error(`@@ Retrieval failed with error: ${error}`);
	}
}

// PUT
async function update(
	transaction: Transaction,
	token: string,
): Promise<TransactionGeneralResponse> {
	const { id, version } = transaction;
	const uri = `/api/v${version}/Transacction/${id}`;

	try {
		const res = await fetch(uri, {
			method: "PUT",
			headers: {
				accept: "*/*",
				Authorization: token,
			},
		});

		if (!res.ok) throw new Error(res.statusText);

		return {
			success: true,
		};
	} catch (error) {
		throw new Error(`@@ Update failed with error: ${error}`);
	}
}

// DELETE
async function deleteById(
	transaction: Transaction,
	token: string,
): Promise<TransactionGeneralResponse> {
	const { id, version } = transaction;
	const uri = `/api/v${version}/Transacction/${id}`;

	try {
		const res = await fetch(uri, {
			method: "DELETE",
			headers: {
				accept: "*/*",
				Authorization: token,
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
  getById,
  update,
  deleteById
};
