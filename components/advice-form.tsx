"use client"

import type React from "react"

import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { createAdviceQuery } from "@/lib/api"
import { useOfflineSync } from "@/hooks/use-offline-sync"

interface AdviceFormProps {
  serviceId: number
  typeAdviceId: number
  onSuccess: () => void
}

export function AdviceForm({ serviceId, typeAdviceId, onSuccess }: AdviceFormProps) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { toast } = useToast()
  const { addToSyncQueue } = useOfflineSync()
  const [prompt, setPrompt] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    if (!prompt.trim()) {
      toast({
        title: t("services.error"),
        description: t("services.emptyPrompt"),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const data = {
      prompt,
      userId: user.id,
      serviceId,
      typeAdviceId,
    }

    try {
      // Add to sync queue for offline support
      addToSyncQueue({
        endpoint: "/api/v1/AdviceQuery",
        method: "POST",
        data,
        entityType: "adviceQuery",
        entityId: "new",
      })

      await createAdviceQuery(data)

      toast({
        title: t("services.success"),
        description: t("services.adviceRequestSent"),
      })

      onSuccess()
    } catch (error) {
      toast({
        title: t("services.error"),
        description: t("services.errorSendingRequest"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prompt">{t("services.prompt")}</Label>
        <Textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t("services.promptPlaceholder")}
          rows={5}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onSuccess}>
          {t("common.cancel")}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("services.sending") : t("services.send")}
        </Button>
      </div>
    </form>
  )
}

