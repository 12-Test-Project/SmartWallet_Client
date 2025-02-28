import { getUser } from "@data/user.data";

export const utilGetUserData = async () => {
  try {
    const response = await getUser();
    if (response.success) {
      return response.data
    } else {
      return null
    }
  } catch (error: any) {
    throw new Error(`Error fetching user: ${error.message}`)
  }
};

export async function utilGetToken(): Promise<string | null> {
  try {
    const userResponse = await getUser();
    if (userResponse.success && userResponse.data) return userResponse.data.jwToken || null;
    return null;
  } catch (error) {
    console.error("Error retrieving token from Dexie:", error);
    return null;
  }
}
