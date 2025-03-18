import { Link } from "@tanstack/react-router";

export default function Footer() {

   const routeList: Array<{
      to: string,
      label: string,
   }> = [
         {
            to: "/",
            label: "Inicio"
         },
         {
            to: "/transactions",
            label: "Transacciones"
         },
         {
            to: "/salary",
            label: "Salario"
         },
         {
            to: "/about",
            label: "Acerca De"
         }
      ]


   return (
      <footer className="bg-gray-900 text-white py-12">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {/* Columna 1: Logo y Descripción */}
               <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">Smartwallet</h2>
                  <p className="text-gray-400">
                     Tu aliado para una gestión financiera inteligente y sin complicaciones.
                  </p>
               </div>

               {/* Columna 2: Enlaces Rápidos */}
               <div>
                  <h3 className="text-lg font-semibold text-yellow-500 mb-4">Enlaces Rápidos</h3>
                  <ul className="space-y-2">
                     {routeList.map((route) => (
                        <li key={route.to}>
                           <Link to={route.to} className="text-sm/6 font-semibold text-gray-400 hover:text-yellow-500 transition-all">
                              {route.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Columna 3: Contacto */}
               <div>
                  <h3 className="text-lg font-semibold text-yellow-500 mb-4">Contacto</h3>
                  <ul className="text-gray-400 space-y-2">
                     <li>Email: info@smartwallet.com</li>
                     <li>Teléfono: +1 234 567 890</li>
                     <li>Dirección: Calle Falsa 123, Ciudad, País</li>
                  </ul>
               </div>

               {/* Columna 4: Redes Sociales */}
               <div>
                  <h3 className="text-lg font-semibold text-yellow-500 mb-4">Síguenos</h3>
                  <div className="flex space-x-4">
                     <a
                        href="https://facebook.com/smartwallet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-yellow-500 transition-all"
                     >
                        <svg
                           className="w-6 h-6"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                           aria-hidden="true"
                        >
                           <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                     </a>
                     <a
                        href="https://twitter.com/smartwallet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-yellow-500 transition-all"
                     >
                        <svg
                           className="w-6 h-6"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                           aria-hidden="true"
                        >
                           <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                     </a>
                     <a
                        href="https://linkedin.com/smartwallet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-yellow-500 transition-all"
                     >
                        <svg
                           className="w-6 h-6"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                           aria-hidden="true"
                        >
                           <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                        </svg>
                     </a>
                  </div>
               </div>
            </div>

            {/* Derechos de Autor */}
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
               <p>&copy; {new Date().getFullYear()} Smartwallet. Todos los derechos reservados.</p>
            </div>
         </div>
      </footer>
   )
}