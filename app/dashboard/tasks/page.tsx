"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-list"
import { getTasks } from "@/lib/api"

export default function TasksPage() {
  const { t } = useTranslation()
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks()
        setTasks(tasksData)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const pendingTasks = tasks.filter((task: any) => !task.isCompleted)
  const completedTasks = tasks.filter((task: any) => task.isCompleted)

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("tasks.title")}</h1>
        <p className="text-muted-foreground">{t("tasks.description")}</p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">{t("tasks.pending")}</TabsTrigger>
          <TabsTrigger value="completed">{t("tasks.completed")}</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("tasks.pendingTasks")}</CardTitle>
              <CardDescription>{t("tasks.pendingTasksDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList tasks={pendingTasks} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("tasks.completedTasks")}</CardTitle>
              <CardDescription>{t("tasks.completedTasksDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList tasks={completedTasks} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

