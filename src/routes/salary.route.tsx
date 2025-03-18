import { rootRoute } from "./__root"
import { createRoute } from "@tanstack/react-router"

export const salaryRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: '/salary',
   component: function Salary() {
      return (
         <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center">
               <h1 className="text-4xl font-bold text-gray-900">Salario</h1>
            </div>
         </div>
      );
   },
})
