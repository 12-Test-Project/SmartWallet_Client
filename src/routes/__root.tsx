import { homeRoute, aboutRoute, signUpRoute } from ".";
import {
  createRootRoute,
  createRouter,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { signInRoute } from "./signIn.route";
import { transactionsRoute } from "./transactions.route";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>{" "}
        <Link to="/signup" className="[&.active]:font-bold">
          SignUp
        </Link>{" "}
        <Link to="/signin" className="[&.active]:font-bold">
          SignIn
        </Link>{" "}
        <Link to="/transactions" className="[&.active]:font-bold">
          Transactions
        </Link>{" "}
      </div>
      <hr />
      <Outlet />
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
