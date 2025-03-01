import Hero from "@/components/hero.component"
import { rootRoute } from "./__root"
import { createRoute, Link } from "@tanstack/react-router"

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Home() {
    return (
      <div className="p-2">
        <Hero />
        {/* 2 */}
        <div className="py-27 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            ¿Qué Ofrece Smartwallet?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-yellow-700 mb-4">Registro Financiero</h3>
              <p className="text-gray-600">
                Organiza tus ingresos, gastos, deudas y créditos en un solo lugar. Mantén un registro claro y ordenado de tus finanzas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-yellow-700 mb-4">Inteligencia Artificial</h3>
              <p className="text-gray-600">
                Obtén recomendaciones personalizadas basadas en tus datos financieros para tomar decisiones más informadas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-yellow-700 mb-4">Metas Financieras</h3>
              <p className="text-gray-600">
                Establece y monitorea tus metas, ya sea ahorrar para un proyecto, saldar deudas o gestionar inversiones.
              </p>
            </div>
          </div>
        </div>
        {/* 3 */}
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Beneficios de Usar Smartwallet
          </h2>
          <div className="max-w-4xl mx-auto">
            <ul className="list-disc list-inside text-lg text-gray-600 space-y-4">
              <li>Acceso a herramientas prácticas para gestionar tus finanzas de manera eficiente.</li>
              <li>Interfaz moderna e intuitiva que facilita la navegación y el uso.</li>
              <li>Compatibilidad con múltiples plataformas (web y móvil) para acceder desde cualquier dispositivo.</li>
              <li>Educación financiera interactiva que te ayuda a tomar decisiones más responsables.</li>
            </ul>
          </div>
          <div className="text-center mt-12">
            <Link to="/signup" className="select-none rounded-lg bg-yellow-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-700/20 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="true">
              Regístrate Gratis
            </Link>
          </div>
        </div>
      </div>
    )
  },
})
