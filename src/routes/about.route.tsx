import { rootRoute } from "./__root"
import { createRoute } from "@tanstack/react-router"

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    return <div className="p-2">Hello from About!</div>
  },
})
