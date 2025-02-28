import { redirect } from "@tanstack/react-router";
import { utilGetToken } from ".";

export async function hasAccess() {
  const token = await utilGetToken();
  if (!token) {
    console.error("Unauthorized");
    throw redirect({ to: "/signin", replace: true });
  }
}