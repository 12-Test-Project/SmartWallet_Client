import { Link } from "@tanstack/react-router";

export default function Hero() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r py-20 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs opacity-50 mb-3 font-bold">
          Toma el Control de Tus Finanzas
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Smartwallet
        </h1>
        <p className="text-lg sm:text-lg opacity-75 mb-8">
          Smartwallet es tu aliado para gestionar ingresos, gastos, deudas y metas financieras de manera fácil y segura. Con herramientas inteligentes y recomendaciones personalizadas, lograrás una estabilidad económica sin estrés.
        </p>
        <Link to="/signin" className="select-none rounded-lg bg-yellow-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-700/20 transition-all hover:shadow-lg hover:shadow-yellow-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" data-ripple-light="true">
          Comienza Ahora
        </Link>
      </div>
    </div>
  )
}
