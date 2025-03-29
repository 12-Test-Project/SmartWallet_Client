"use client"

import { useTranslation } from "@/hooks/use-translation"
import { formatDate } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckSquare, HelpCircle } from "lucide-react"

interface TaskListProps {
  tasks: any[]
  isLoading: boolean
}

export function TaskList({ tasks, isLoading }: TaskListProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-muted"></div>
                  <div className="h-3 w-16 rounded bg-muted"></div>
                </div>
                <div className="h-6 w-16 rounded bg-muted"></div>
              </div>
            </Card>
          ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">{t("tasks.noTasks")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {task.isCompleted ? (
                <CheckSquare className="h-5 w-5 text-green-500" />
              ) : (
                <HelpCircle className="h-5 w-5 text-amber-500" />
              )}
              <div>
                <p className="font-medium">{task.key}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <p>{formatDate(task.createDate)}</p>
                  <span>•</span>
                  <Badge variant="outline">{task.status}</Badge>
                </div>
              </div>
            </div>
          </div>
          {task.answer && (
            <div className="mt-2 border-t pt-2">
              <p className="text-sm">{task.answer}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

