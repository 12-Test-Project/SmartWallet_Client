import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <WifiOff className="mx-auto h-12 w-12 text-muted-foreground" />
          <CardTitle className="text-2xl font-bold mt-4">Sin conexión</CardTitle>
          <CardDescription>No tienes conexión a internet en este momento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>
            Smart Wallet funciona sin conexión. Puedes seguir usando la aplicación y tus cambios se sincronizarán cuando
            vuelvas a estar en línea.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/login">
                <WifiOff className="mr-2 h-4 w-4" />
                Continuar sin conexión
              </Link>
            </Button>
            <Button asChild>
              <Link href="/">
                <Wifi className="mr-2 h-4 w-4" />
                Intentar de nuevo
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

