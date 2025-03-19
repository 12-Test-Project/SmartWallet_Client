import { getUser } from "@data/user.data";
import { AccountAPI } from "@/api";
import { isTokenExpired } from "./auth.util";

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

// export async function utilGetToken(): Promise<string | null> {
//   try {
//     const userResponse = await getUser();
//     if (userResponse.success && userResponse.data) return userResponse.data.jwToken || null;
//     return null;
//   } catch (error) {
//     console.error("Error retrieving token from Dexie:", error);
//     return null;
//   }
// }

export async function utilGetToken(): Promise<string | null> {
   try {
     const userResponse = await getUser();
     if (!userResponse.success || !userResponse.data) {
       return null;
     }
 
     const token = userResponse.data.jwToken;
     if (!token) {
       return null;
     }
 
     // Check if the token is expired
     if (isTokenExpired(token)) {
       const newToken = await AccountAPI.reAuthenticateUser();
       if (!newToken) {
         return null;
       }
       return newToken;
     }
 
     return token;
   } catch (error) {
     console.error("Error retrieving token:", error);
     return null;
   }
 }