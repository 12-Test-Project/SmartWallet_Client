import { atom } from "jotai";
import { saveUser, User } from "@data/user.data";

export const UserAtom = atom<User | null>(null);

export const redirectToAtom = atom<string | null>(null)

export const UserSetter = atom(
  null, // No read function (this is a write-only atom)
  async (_, set, update: User | null) => {
    set(UserAtom, update);

    if (update) {
      console.log("User updated:", update);
      try {
        const response = await saveUser(update);
        if(response.success)
          set(redirectToAtom, "/transactions");
        // alert(response.data); // Show success message
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    } else {
      console.log("User cleared");
    }
  }
);

export const UserLoader = atom(
  null, // No read function (this is a write-only atom)
  async (_, set, update: User | null) => {
    set(UserAtom, update);

    if (update) {
      try {
        console.log("User Loaded"); // Show success message
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    } else {
      console.log("User cleared");
    }
  }
);

export const UserIdAtom = atom((get) => get(UserAtom)?.id || null);
export const UserTokenAtom = atom((get) => get(UserAtom)?.jwToken || null);
export const IsUserActiveAtom = atom((get) => get(UserAtom)?.isActive || false);