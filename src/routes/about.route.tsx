import { rootRoute } from "./__root"
import { createRoute } from "@tanstack/react-router"

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: function About() {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Acerca de Smartwallet</h1>
          <p className="mt-4 text-lg text-gray-600">
            Conoce más sobre nuestra aplicación y el equipo detrás de ella.
          </p>
        </div>

        {/* Section 1: About the App */}
        <div className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Sobre la Aplicación</h2>
          <p className="mt-4 text-gray-600">
            Smartwallet es una aplicación diseñada para facilitar la gestión financiera personal mediante un sistema intuitivo que permite registrar y organizar ingresos, gastos, deudas y créditos.
          </p>
          <p className="mt-4 text-gray-600">
            Utiliza inteligencia artificial para analizar datos y ofrecer recomendaciones personalizadas, ayudando a los usuarios a tomar decisiones informadas. La aplicación incluye módulos para establecer y monitorear metas financieras, promueve la accesibilidad tecnológica como una Progressive Web App compatible con múltiples plataformas, y ofrece una interfaz moderna y amigable desarrollada con React. Con un back-end robusto en C#, garantiza seguridad y escalabilidad, mientras fomenta la educación financiera a través de herramientas interactivas. Además, facilita la gestión de deudas y préstamos, y busca reducir el estrés financiero, convirtiéndose en un aliado confiable para lograr estabilidad económica.
          </p>
          <p className="mt-4 text-gray-600">
            Desarrollada con tecnología de vanguardia, Smartwallet garantiza que tus datos estén seguros y tu experiencia sea fluida. Ya seas un principiante en la gestión de presupuestos o un experto financiero, Smartwallet tiene algo para todos.
          </p>
        </div>

        {/* Section 2: About the Developers */}
        <div className="mt-12 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Sobre los Desarrolladores</h2>
          <p className="mt-4 text-gray-600">
            Smartwallet fue creada por un equipo apasionado de desarrolladores dedicados a construir herramientas que empoderen a las personas para gestionar sus finanzas de manera efectiva. Nuestro equipo combina experiencia en desarrollo de software, diseño de experiencia de usuario y tecnología financiera para ofrecer un producto potente y fácil de usar.
          </p>
          {/* <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900">Meet the Team</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="Developer 1"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">John Doe</p>
                  <p className="text-gray-600">Lead Developer</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="Developer 2"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">Jane Smith</p>
                  <p className="text-gray-600">UI/UX Designer</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="Developer 3"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-gray-600">Backend Developer</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  },
})
