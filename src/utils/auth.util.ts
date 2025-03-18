import { redirect } from "@tanstack/react-router";
import { utilGetToken } from ".";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
   exp: number;
}

export function isTokenExpired(token: string): boolean {
   const decoded = jwtDecode<DecodedToken>(token);
   const currentTime = Date.now() / 1000; // Convert to seconds
   return decoded.exp < currentTime;
}

export async function hasAccess() {
   const token = await utilGetToken();
   if (!token) {
      console.error("Unauthorized");
      throw redirect({ to: "/signin", replace: true });
   }
}