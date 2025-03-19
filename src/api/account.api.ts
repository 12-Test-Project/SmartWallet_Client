import { getUser, updateUserToken } from "@/data/user.data"
import { utilGetToken } from "@/utils";

export enum Role {
  ADMIN = "Admin",
  DEVELOPER = "Developer",
  CLIENT = "Client",
}

enum AccountEndpoint {
  AUTHENTICATE = "/api/Account/authenticate",
  REGISTER = "/api/Account/Registro",
  REGISTERUSER = "/api/Account/RegistrarUsuario",
}

export interface AccountSchema {
  id: string;
  name: string;
  phoneNumber: string;
  role: Role;
  roles: Array<Role>;
  userName: string;
  password: string;
  email: string;
  active: boolean;
  isActive: boolean;
  jwToken: string;
}

interface AccountPublicAuthResponseExtended extends AccountSchema {
  hasError: boolean;
  error: string | null;
}

interface AccountRegisterResponse {
  error: boolean | string | null
  hasError: boolean
  userId: string | null
}

type AccountPublicAuth = Pick<AccountSchema, "email" | "password">;

type AccountPublicAuthResponse = Omit<
  AccountPublicAuthResponseExtended,
  "phoneNumber" | "role" | "password" | "active"
>;

type AccountRegister = Omit<
  AccountSchema,
  "id" | "roles" | "isActive" | "jwToken"
>;

// POST
async function authenticate(
  account: AccountPublicAuth,
): Promise<AccountPublicAuthResponse> {
  
  const queryParams = new URLSearchParams({
    email: account.email,
    password: account.password,
  });

  const uri = `${AccountEndpoint.AUTHENTICATE}?${queryParams.toString()}`;

  try {
    const res = await fetch(uri, {
      method: "POST",
      headers: {
        "Accept": "*/*",
      },
      body: "", // Explicitly setting body to match the CURL request
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = (await res.json()) as AccountPublicAuthResponse;
    return data;
  } catch (error) {
    throw new Error(`@@ Authenticate failed with error: ${error}`);
  }
}

async function reAuthenticateUser(): Promise<string | null> {
   try {
     const userResponse = await getUser();
     if (!userResponse.success || !userResponse.data) {
       throw new Error("User not found in IndexedDB");
     }
 
     const { email, password } = userResponse.data;
 
     if (!email || !password) {
       throw new Error("User credentials not found in IndexedDB");
     }
 
     // Call the authenticate function to get a new token
     const authResponse = await authenticate({ email, password });
 
     if (authResponse.hasError || !authResponse.jwToken) {
       throw new Error("Re-authentication failed");
     }
 
     // Update the token in IndexedDB
     await updateUserToken(userResponse.data.id, authResponse.jwToken)
 
     return authResponse.jwToken;
   } catch (error) {
     console.error("Error re-authenticating user:", error);
     return null;
   }
 }

async function register(
  account: AccountRegister,
): Promise<AccountRegisterResponse> {
  // const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const queryParams = new URLSearchParams({
    name: account.name,
    phoneNumber: account.phoneNumber,
    role: account.role,
    userName: account.userName,
    password: account.password,
    email: account.email,
    active: account.active.toString(),
  });

  const uri = `${AccountEndpoint.REGISTER}?${queryParams.toString()}`;

  try {
    const res = await fetch(uri, {
      method: "POST",
      headers: {
        "Accept": "*/*",
      },
      body: "", // Explicitly setting body to match the CURL request
    });

    if (!res.ok) {
      const errorText = await res.text(); // Get error response if available
      throw new Error(`@@ Register failed: ${res.status} ${errorText}`);
    }

    return await res.json() as AccountRegisterResponse;
  } catch (error) {
    throw new Error(`Register failed with error: ${error}`);
  }
}

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
   let token = await utilGetToken();
   if (!token) {
     throw new Error("No token available");
   }
 
   options.headers = {
     ...options.headers,
     Authorization: `Bearer ${token}`,
   };
 
   console.log("@@ Fetching With Auth")

   let response = await fetch(url, options);
 
   if (response.status === 401) {
     // Token might be expired, try to re-authenticate
     const newToken = await reAuthenticateUser();
     if (!newToken) {
       throw new Error("Failed to re-authenticate user");
     }
 
     // Update the token in the headers
     options.headers = {
       ...options.headers,
       Authorization: `Bearer ${newToken}`,
     };
 
     // Retry the request with the new token
     response = await fetch(url, options);
   }
 
   return response;
 }

export default {
  authenticate,
  reAuthenticateUser,
  register,
  fetchWithAuth
}