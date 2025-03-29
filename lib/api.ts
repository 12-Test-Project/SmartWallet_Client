import { getToken } from "@/lib/auth"

// Cambiamos la URL base para usar nuestro proxy
const API_URL = "/api/proxy"
const API_VERSION = "v1"

// Helper function to handle API requests
async function apiRequest(endpoint: string, method = "GET", data?: any) {
  const token = getToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const config: RequestInit = {
    method,
    headers,
  }

  if (data && method !== "GET") {
    config.body = JSON.stringify(data)
  }

  console.log(`Making ${method} request to ${API_URL}${endpoint}`)

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config)

    console.log(`Response status: ${response.status}`)

    if (response.status === 204) {
      return null // No content
    }

    const result = await response.json()

    if (!response.ok) {
      console.error("API request failed:", result)
      throw new Error(result.message || "API request failed")
    }

    return result.data || result
  } catch (error) {
    console.error(`Error in API request to ${endpoint}:`, error)
    throw error
  }
}

// Auth
export async function authenticateUser(email: string, password: string) {
  try {
    console.log(`Authenticating user: ${email}`)
    const result = await apiRequest(
      `/api/Account/authenticate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      "POST",
    )
    console.log("Authentication result:", result)
    return result
  } catch (error) {
    console.error("Authentication error:", error)
    throw error
  }
}

export async function registerUser(data: {
  name: string
  phoneNumber: string
  role: string
  userName: string
  password: string
  email: string
  active: boolean
}) {
  const queryParams = new URLSearchParams({
    name: data.name,
    phoneNumber: data.phoneNumber,
    role: data.role,
    userName: data.userName,
    password: data.password,
    email: data.email,
    active: data.active.toString(),
  }).toString()

  return await apiRequest(`/api/Account/Registro?${queryParams}`, "POST")
}

// Transactions
export async function getTransactions() {
  return await apiRequest(`/api/${API_VERSION}/Transaction`)
}

export async function getTransaction(id: number | string) {
  return await apiRequest(`/api/${API_VERSION}/Transaction/${id}`)
}

export async function createTransaction(data: any) {
  return await apiRequest(`/api/${API_VERSION}/Transaction`, "POST", data)
}

export async function updateTransaction(id: number | string, data: any) {
  return await apiRequest(`/api/${API_VERSION}/Transaction/${id}`, "PUT", data)
}

export async function deleteTransaction(id: number | string) {
  return await apiRequest(`/api/${API_VERSION}/Transaction/${id}`, "DELETE")
}

// Income
export async function getIncome() {
  return await apiRequest(`/api/${API_VERSION}/Income`)
}

export async function getIncomeById(id: number | string) {
  return await apiRequest(`/api/${API_VERSION}/Income/${id}`)
}

export async function createIncome(data: any) {
  return await apiRequest(`/api/${API_VERSION}/Income`, "POST", data)
}

export async function updateIncome(id: number | string, data: any) {
  return await apiRequest(`/api/${API_VERSION}/Income/${id}`, "PUT", data)
}

export async function deleteIncome(id: number | string) {
  return await apiRequest(`/api/${API_VERSION}/Income/${id}`, "DELETE")
}

// News Subscription
export async function getNewsSubscription() {
  return await apiRequest(`/api/${API_VERSION}/NewsSubscription`)
}

export async function getNewsSubscriptionById(id: number | string) {
  return await apiRequest(`/api/${API_VERSION}/NewsSubscription/${id}`)
}

export async function createNewsSubscription(data: any) {
  return await apiRequest(`/api/${API_VERSION}/NewsSubscription`, "POST", data)
}

export async function updateNewsSubscription(id: number | string, data: any) {
  return await apiRequest(`/api/${API_VERSION}/NewsSubscription/${id}`, "PUT", data)
}

export async function deleteNewsSubscription(id: number | string) {
  return await apiRequest(`/api/${API_VERSION}/NewsSubscription/${id}`, "DELETE")
}

// Services
export async function getServices() {
  return await apiRequest(`/api/${API_VERSION}/Service`)
}

export async function getServiceById(id: number | string) {
  return await apiRequest(`/api/${API_VERSION}/Service/${id}`)
}

// Type Advice
export async function getTypeAdvice() {
  return await apiRequest(`/api/${API_VERSION}/TypeAdvice`)
}

export async function getTypeAdviceById(id: number | string) {
  return await apiRequest(`/api/${API_VERSION}/TypeAdvice/${id}`)
}

// Advice Query
export async function createAdviceQuery(data: any) {
  return await apiRequest(`/api/${API_VERSION}/AdviceQuery`, "POST", data)
}

export async function getAdviceQueries() {
  return await apiRequest(`/api/${API_VERSION}/AdviceQuery`)
}

// Tasks
export async function getTasks() {
  return await apiRequest(`/api/${API_VERSION}/TaskApp`)
}

export async function getTaskById(id: number | string) {
  return await apiRequest(`/api/${API_VERSION}/TaskApp/${id}`)
}

