// Get token from localStorage
export function getToken(): string | null {
  if (typeof window === "undefined") return null

  try {
    const user = localStorage.getItem("user")
    if (!user) return null

    const userData = JSON.parse(user)
    return userData.jwToken || null
  } catch (error) {
    console.error("Error getting token:", error)
    return null
  }
}

// Check if token is expired
export function isTokenExpired(token: string): boolean {
  if (!token) return true

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const expiryTime = payload.exp * 1000 // Convert to milliseconds
    return Date.now() >= expiryTime
  } catch (error) {
    console.error("Error checking token expiry:", error)
    return true
  }
}

