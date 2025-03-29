"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceListProps {
  services: any[]
  selectedService: any
  onSelectService: (service: any) => void
}

export function ServiceList({ services, selectedService, onSelectService }: ServiceListProps) {
  return (
    <>
      {services.map((service) => (
        <Card
          key={service.id}
          className={`cursor-pointer transition-colors hover:border-primary ${
            selectedService && selectedService.id === service.id ? "border-primary" : ""
          }`}
          onClick={() => onSelectService(service)}
        >
          <CardHeader className="pb-2">
            <CardTitle>{service.name}</CardTitle>
            <CardDescription>{formatDate(service.createDate)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{service.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

