import { rootRoute } from "./__root"
import { createRoute } from "@tanstack/react-router"

export const adviceRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/advice',
   component: function Advice() {
      return (
         <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center">
               <h1 className="text-4xl font-bold text-gray-900">Advice</h1>
            </div>
         </div>
      );
   },
})
