import Dexie, { type EntityTable } from "dexie";

interface TokenActionResponse<T> {
	success: boolean;
	data: T;
}

// Initialize IndexedDB with Dexie
const db = new Dexie("TokenDatabase") as Dexie & {
	tokens: EntityTable<
		{ id: string; value: string },
		"id" // primary key "id"
	>;
};

db.version(1).stores({
	tokens: "id, value", // 'id' as the primary key
});

// CREATE
export async function saveToken(token: string): Promise<TokenActionResponse<string | null>> {
	try {
		await db.tokens.put({ id: "authToken", value: token });
		return { success: true, data: "Token saved successfully" };
	} catch (error) {
		throw new Error(`Error saving token: ${error}`);
	}
}

// READ
export async function getToken(): Promise<TokenActionResponse<string | null>> {
	try {
		const record = await db.tokens.get("authToken");
		return { success: true, data: record ? record.value : null };
	} catch (error) {
		console.error("Error retrieving token:", error);
		return { success: false, data: null };
	}
}

// DELETE
export async function deleteToken(): Promise<TokenActionResponse<string | null>> {
	try {
		await db.tokens.delete("authToken");
		console.log("Token deleted successfully");
		return { success: true, data: null };
	} catch (error) {
		throw new Error(`Error deleting token: ${error}`);
	}
}
