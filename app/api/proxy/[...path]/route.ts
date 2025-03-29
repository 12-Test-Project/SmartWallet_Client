import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "http://localhost:5800"

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")
  const searchParams = request.nextUrl.searchParams.toString()
  const url = `${API_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ""}`

  const headers: HeadersInit = {}

  // Forward authorization header if present
  const authHeader = request.headers.get("authorization")
  if (authHeader) {
    headers["Authorization"] = authHeader
  }

  try {
    console.log(`Proxying GET request to: ${url}`)

    const response = await fetch(url, {
      method: "GET",
      headers,
    })

    console.log(`Response status: ${response.status}`)

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 })
    }

    const data = await response.json().catch((e) => {
      console.error("Error parsing JSON response:", e)
      return null
    })

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error(`Error proxying GET request to ${url}:`, error)
    return NextResponse.json({ error: "Error connecting to API server" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")
  const searchParams = request.nextUrl.searchParams.toString()
  const url = `${API_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ""}`

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  // Forward authorization header if present
  const authHeader = request.headers.get("authorization")
  if (authHeader) {
    headers["Authorization"] = authHeader
  }

  try {
    console.log(`Proxying POST request to: ${url}`)

    let body = null
    try {
      body = await request.json()
    } catch (e) {
      console.log("No JSON body or empty body")
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    console.log(`Response status: ${response.status}`)

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 })
    }

    const data = await response.json().catch((e) => {
      console.error("Error parsing JSON response:", e)
      return null
    })

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error(`Error proxying POST request to ${url}:`, error)
    return NextResponse.json({ error: "Error connecting to API server" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")
  const searchParams = request.nextUrl.searchParams.toString()
  const url = `${API_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ""}`

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  // Forward authorization header if present
  const authHeader = request.headers.get("authorization")
  if (authHeader) {
    headers["Authorization"] = authHeader
  }

  try {
    console.log(`Proxying PUT request to: ${url}`)

    let body = null
    try {
      body = await request.json()
    } catch (e) {
      console.log("No JSON body or empty body")
    }

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    console.log(`Response status: ${response.status}`)

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 })
    }

    const data = await response.json().catch((e) => {
      console.error("Error parsing JSON response:", e)
      return null
    })

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error(`Error proxying PUT request to ${url}:`, error)
    return NextResponse.json({ error: "Error connecting to API server" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join("/")
  const searchParams = request.nextUrl.searchParams.toString()
  const url = `${API_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ""}`

  const headers: HeadersInit = {}

  // Forward authorization header if present
  const authHeader = request.headers.get("authorization")
  if (authHeader) {
    headers["Authorization"] = authHeader
  }

  try {
    console.log(`Proxying DELETE request to: ${url}`)

    const response = await fetch(url, {
      method: "DELETE",
      headers,
    })

    console.log(`Response status: ${response.status}`)

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 })
    }

    const data = await response.json().catch((e) => {
      console.error("Error parsing JSON response:", e)
      return null
    })

    return NextResponse.json(data, {
      status: response.status,
    })
  } catch (error) {
    console.error(`Error proxying DELETE request to ${url}:`, error)
    return NextResponse.json({ error: "Error connecting to API server" }, { status: 500 })
  }
}

