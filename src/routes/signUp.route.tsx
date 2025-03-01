import { UserRegistration } from "@/components"
import { rootRoute } from "./__root"
import { createRoute } from "@tanstack/react-router"

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: function SignUp() {
    return (
      <div>
        <UserRegistration />
      </div>
    )
  },
})
