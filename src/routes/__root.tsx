import { homeRoute, aboutRoute, signUpRoute } from ".";
import {
  createRootRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { signInRoute } from "./signIn.route";
import { transactionsRoute } from "./transactions.route";
import { Header } from "@/components";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <hr />
      <div className="mx-auto max-w-[1600px] p-6 lg:px-8">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute, signUpRoute, signInRoute, transactionsRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
