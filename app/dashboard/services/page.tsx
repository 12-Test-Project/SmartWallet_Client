"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceList } from "@/components/service-list"
import { AdviceForm } from "@/components/advice-form"
import { getServices, getTypeAdvice } from "@/lib/api"

export default function ServicesPage() {
  const { t } = useTranslation()
  const [services, setServices] = useState([])
  const [typeAdvices, setTypeAdvices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [selectedTypeAdvice, setSelectedTypeAdvice] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAdviceForm, setShowAdviceForm] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesData = await getServices()
        setServices(servicesData)

        if (servicesData.length > 0) {
          setSelectedService(servicesData[0])

          const typeAdvicesData = await getTypeAdvice()
          const filteredTypeAdvices = typeAdvicesData.filter((type: any) => type.serviceId === servicesData[0].id)

          setTypeAdvices(filteredTypeAdvices)

          if (filteredTypeAdvices.length > 0) {
            setSelectedTypeAdvice(filteredTypeAdvices[0])
          }
        }
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleServiceSelect = async (service: any) => {
    setSelectedService(service)
    setShowAdviceForm(false)

    try {
      const typeAdvicesData = await getTypeAdvice()
      const filteredTypeAdvices = typeAdvicesData.filter((type: any) => type.serviceId === service.id)

      setTypeAdvices(filteredTypeAdvices)

      if (filteredTypeAdvices.length > 0) {
        setSelectedTypeAdvice(filteredTypeAdvices[0])
      } else {
        setSelectedTypeAdvice(null)
      }
    } catch (error) {
      console.error("Error fetching type advices:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("services.title")}</h1>
        <p className="text-muted-foreground">{t("services.description")}</p>
      </div>

      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services">{t("services.services")}</TabsTrigger>
          <TabsTrigger value="advice">{t("services.advice")}</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 w-24 rounded bg-muted"></div>
                      <div className="h-4 w-32 rounded bg-muted"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 rounded bg-muted"></div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <ServiceList
                services={services}
                selectedService={selectedService}
                onSelectService={handleServiceSelect}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="advice" className="mt-4">
          {selectedService ? (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{selectedService.name}</CardTitle>
                  <CardDescription>{selectedService.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {typeAdvices.map((type: any) => (
                      <Card
                        key={type.id}
                        className={`cursor-pointer transition-colors ${
                          selectedTypeAdvice && selectedTypeAdvice.id === type.id ? "border-primary" : ""
                        }`}
                        onClick={() => setSelectedTypeAdvice(type)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{type.name}</CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setShowAdviceForm(true)} disabled={!selectedTypeAdvice}>
                    {t("services.requestAdvice")}
                  </Button>
                </CardFooter>
              </Card>

              {showAdviceForm && selectedTypeAdvice && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("services.adviceForm")}</CardTitle>
                    <CardDescription>
                      {t("services.adviceFormDescription", {
                        service: selectedService.name,
                        type: selectedTypeAdvice.name,
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdviceForm
                      serviceId={selectedService.id}
                      typeAdviceId={selectedTypeAdvice.id}
                      onSuccess={() => setShowAdviceForm(false)}
                    />
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <p className="mb-4 text-muted-foreground">{t("services.selectService")}</p>
                <Button onClick={() => document.querySelector('[value="services"]')?.click()}>
                  {t("services.goToServices")}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

