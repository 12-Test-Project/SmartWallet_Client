"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { getNewsSubscription, createNewsSubscription, updateNewsSubscription } from "@/lib/api"
import { useOfflineSync } from "@/hooks/use-offline-sync"

export default function NewsPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { toast } = useToast()
  const { addToSyncQueue } = useOfflineSync()
  const [subscription, setSubscription] = useState<any>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return

      try {
        const subscriptions = await getNewsSubscription()
        const userSubscription = subscriptions.find((sub: any) => sub.userId === user.id)

        if (userSubscription) {
          setSubscription(userSubscription)
          setIsSubscribed(userSubscription.subscribed)
        }
      } catch (error) {
        console.error("Error fetching subscription:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [user])

  const handleToggleSubscription = async () => {
    if (!user) return

    const newSubscriptionState = !isSubscribed
    setIsSubscribed(newSubscriptionState)

    try {
      if (subscription) {
        // Update existing subscription
        const data = {
          id: subscription.id,
          subscribed: newSubscriptionState,
          userId: user.id,
        }

        addToSyncQueue({
          endpoint: `/api/v1/NewsSubscription/${subscription.id}`,
          method: "PUT",
          data,
          entityType: "newsSubscription",
          entityId: subscription.id,
        })

        await updateNewsSubscription(subscription.id, data)
      } else {
        // Create new subscription
        const data = {
          subscribed: newSubscriptionState,
          userId: user.id,
        }

        addToSyncQueue({
          endpoint: "/api/v1/NewsSubscription",
          method: "POST",
          data,
          entityType: "newsSubscription",
          entityId: "new",
        })

        const newSubscription = await createNewsSubscription(data)
        setSubscription(newSubscription)
      }

      toast({
        title: newSubscriptionState ? t("news.subscribedTitle") : t("news.unsubscribedTitle"),
        description: newSubscriptionState ? t("news.subscribedDescription") : t("news.unsubscribedDescription"),
      })
    } catch (error) {
      setIsSubscribed(!newSubscriptionState) // Revert UI state on error
      toast({
        title: t("news.error"),
        description: t("news.errorToggling"),
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("news.title")}</h1>
        <p className="text-muted-foreground">{t("news.description")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("news.subscription")}</CardTitle>
          <CardDescription>{t("news.subscriptionDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="subscription"
              checked={isSubscribed}
              onCheckedChange={handleToggleSubscription}
              disabled={isLoading}
            />
            <Label htmlFor="subscription">{isSubscribed ? t("news.subscribed") : t("news.notSubscribed")}</Label>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">{t("news.privacyNote")}</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("news.latestNews")}</CardTitle>
          <CardDescription>{t("news.latestNewsDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isSubscribed ? (
              <>
                <div className="space-y-2">
                  <h3 className="font-medium">{t("news.article1.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("news.article1.date")}</p>
                  <p>{t("news.article1.content")}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">{t("news.article2.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("news.article2.date")}</p>
                  <p>{t("news.article2.content")}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">{t("news.article3.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("news.article3.date")}</p>
                  <p>{t("news.article3.content")}</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="mb-4 text-muted-foreground">{t("news.subscribeToView")}</p>
                <Button onClick={handleToggleSubscription}>{t("news.subscribe")}</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

