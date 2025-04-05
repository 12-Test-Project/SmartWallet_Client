"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../contexts/AuthContext"
import { useDatabase } from "../../contexts/DatabaseContext"

const AdviceHistory = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { dbService } = useDatabase()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true)
        const adviceQueries = await dbService.getAll("adviceQuery")
        const userQueries = adviceQueries.filter((query) => query.userId === user.id && query.status === "COMPLETED")

        // Sort by date
        userQueries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

        setHistory(userQueries)
      } catch (error) {
        console.error("Error loading advice history:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      loadHistory()
    }
  }, [user, dbService])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (history.length === 0) {
    return <div className="text-center text-gray-500 py-8">{t("advisor.noHistory")}</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{t("advisor.history")}</h2>

      {history.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start mb-2">
            <div className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs mr-2">
              {t(`advisor.adviceTypes.${item.type}`)}
            </div>
            <div className="text-gray-500 text-xs">{new Date(item.timestamp).toLocaleString()}</div>
          </div>

          <div className="font-medium mb-2">{item.prompt}</div>

          <div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{item.response}</div>
        </div>
      ))}
    </div>
  )
}

export default AdviceHistory

