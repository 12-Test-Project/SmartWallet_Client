import Dexie, { type EntityTable } from "dexie";

interface User {
    id: string;
    userName: string;
    name: string;
    email: string;
    roles: string[];
    isActive: boolean;
    hasError: boolean;
    error: string | null;
    jwToken: string;
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

// CREATE or UPDATE
export async function saveUser(user: User): Promise<UserActionResponse<string | null>> {
    try {
        await db.users.put(user);
        return { success: true, data: "User saved successfully" };
    } catch (error) {
        throw new Error(`Error saving user: ${error}`);
    }
}

// READ
export async function getUser(userId: string): Promise<UserActionResponse<User | null>> {
    try {
        const user = await db.users.get(userId);
        return { success: true, data: user || null };
    } catch (error) {
        console.error("Error retrieving user:", error);
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
