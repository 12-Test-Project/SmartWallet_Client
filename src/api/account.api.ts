enum Role {
	ADMIN = "Admin",
	DEVELOPER = "Developer",
	CLIENT = "Client",
}

enum AccountEndpoint {
	AUTHENTICATE = "/api/Account/authenticate",
	REGISTER = "/api/Account/Registro",
	REGISTERUSER = "/api/Account/RegistrarUsuario",
}

interface AccountSchema {
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
	success: boolean;
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
	const { email, password } = account;
	const uri = `${AccountEndpoint.AUTHENTICATE}?email=${email}&password=${password}`;

	try {
		const res = await fetch(uri, {
			method: "POST",
			headers: { accept: "*/*" },
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
	const uri = AccountEndpoint.REGISTER;

	try {
		const res = await fetch(uri, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(account),
		});

		if (!res.ok) throw new Error(res.statusText);

		return {
			success: true,
		};
	} catch (error) {
		throw new Error(`@@ Register failed with error: ${error}`);
	}
}

export default {
  authenticate,
  register
}