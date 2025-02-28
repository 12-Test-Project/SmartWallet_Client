import { UserAuthentication } from "@/components"
import { rootRoute } from "./__root"
import { createRoute } from "@tanstack/react-router"

export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: function SignIn() {
    return (
      <div>
        <UserAuthentication />
      </div>
    )
  },
})
