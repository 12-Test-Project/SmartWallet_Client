import { TAccountSchema } from "@/api";
import Dexie, { type EntityTable } from "dexie";

export interface User extends TAccountSchema {
    hasError: boolean;
    error: string | null;
}

interface UserActionResponse<T> {
    success: boolean;
    data: T;
}

// Initialize IndexedDB with Dexie
const db = new Dexie("UserDatabase") as Dexie & {
    users: EntityTable<User, "id">;
};

db.version(1).stores({
    users: "id, userName, email, isActive" // Define indexes
});

// CREATE
export async function saveUser(user: User): Promise<UserActionResponse<string | null>> {
    try {
        await db.users.clear(); // Clear the entire users table
        await db.users.put(user);
        return { success: true, data: "User saved successfully" };
    } catch (error) {
        throw new Error(`Error saving user: ${error}`);
    }
}

// READ
export async function getUser(): Promise<UserActionResponse<User | null>> {
    try {
        const user = await db.users.toArray();
        return { success: true, data: user[0] || null };
    } catch (error) {
        console.error("Error retrieving user:", error);
        return { success: false, data: null };
    }
}

export async function updateUserToken(userId: string, jwt: string) {
   try {
      await db.users.update(userId, { jwToken: jwt });
      return { success: true, data: null };
   } catch (error) {
      console.error("Error updating token:", error);
      return { success: false, data: null };
   }
}

// DELETE
export async function deleteUser(userId: string): Promise<UserActionResponse<string | null>> {
    try {
        await db.users.delete(userId);
        return { success: true, data: "User deleted successfully" };
    } catch (error) {
        throw new Error(`Error deleting user: ${error}`);
    }
}
