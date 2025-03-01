import Hero from "@/components/hero.component"
import { rootRoute } from "./__root"
import { createRoute } from "@tanstack/react-router"

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Home() {
    return (
      <div className="p-2">
        <Hero />
      </div>
    )
  },
})
