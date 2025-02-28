import { getUser } from "@data/user.data";

export const utilGetUserData = async (id: string) => {
  try {
      const response = await getUser(id);
      if (response.success) {
          return response.data
      } else {
          return null
      }
  } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`)
  }
};