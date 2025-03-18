import { homeRoute, aboutRoute, signUpRoute, adviceRoute, salaryRoute } from ".";
import {
   createRootRoute,
   createRouter,
   Outlet,
   useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { signInRoute } from "./signIn.route";
import { transactionsRoute } from "./transactions.route";
import { Header } from "@/components";
import Footer from "@/components/footer.component";

export const rootRoute = createRootRoute({
   component: () => {
      const currentLocation = useLocation()

      return (
         <>
            <Header />
            <div className="mx-auto max-w-[1600px] p-6 lg:px-8 mb-20">
               <Outlet />
            </div>
            {
               currentLocation.pathname.includes('transactions') ? null : (
                  <Footer />
               )
            }
            <TanStackRouterDevtools />
         </>
      )
   },
});

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute, signUpRoute, signInRoute, transactionsRoute, adviceRoute, salaryRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router;
   }
}
