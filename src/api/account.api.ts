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

export default {
  authenticate,
  register
}