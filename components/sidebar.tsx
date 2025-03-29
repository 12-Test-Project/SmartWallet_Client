"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import {
  BarChart,
  CreditCard,
  DollarSign,
  Home,
  Menu,
  Newspaper,
  Settings,
  ShoppingBag,
  CheckSquare,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const isMobile = useMobile()

  const routes = [
    {
      href: "/dashboard",
      label: t("sidebar.dashboard"),
      icon: Home,
    },
    {
      href: "/dashboard/transactions",
      label: t("sidebar.transactions"),
      icon: CreditCard,
    },
    {
      href: "/dashboard/income",
      label: t("sidebar.income"),
      icon: DollarSign,
    },
    {
      href: "/dashboard/services",
      label: t("sidebar.services"),
      icon: ShoppingBag,
    },
    {
      href: "/dashboard/tasks",
      label: t("sidebar.tasks"),
      icon: CheckSquare,
    },
    {
      href: "/dashboard/news",
      label: t("sidebar.news"),
      icon: Newspaper,
    },
    {
      href: "/dashboard/reports",
      label: t("sidebar.reports"),
      icon: BarChart,
    },
    {
      href: "/dashboard/settings",
      label: t("sidebar.settings"),
      icon: Settings,
    },
  ]

  const SidebarContent = (
    <ScrollArea className="h-full py-6">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Smart Wallet</h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start")}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </ScrollArea>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return <div className="hidden border-r bg-background md:block md:w-64">{SidebarContent}</div>
}

