import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Target, Clock, PenTool, BookOpen, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "";

interface Task {
  id: number;
  title: string;
  chain: string;
  estimatedTime: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

// Fetch tasks and plans
const fetchDailyData = async () => {
  const res = await axios.get(`${API_BASE}/today`, {
    headers: { "x-auth-token": localStorage.getItem("token") || "" },
  });
  return res.data;
};

// Update task completion
const updateTaskStatus = async ({ id, completed }: { id: number; completed: boolean }) => {
  const res = await axios.patch(`${API_BASE}/tasks/${id}`, { completed });
  return res.data;
};

const Today = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todayData"],
    queryFn: fetchDailyData
  });

  const [reflection, setReflection] = useState({
    yesterday: "",
    today: "",
    tomorrow: "",
  });

  useEffect(() => {
    if (data) {
      setReflection({
        yesterday: data.yesterdayWork,
        today: data.todayPlan,
        tomorrow: data.tomorrowPlan,
      });
    }
  }, [data]);

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (data) setTasks(data.todayTasks);
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todayData"] }),
  });

  const toggleTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    mutation.mutate({ id, completed: !task.completed });
  };

  if (isLoading) return <div className="p-10 text-center">Loading today's plan...</div>;
  if (isError) return <div className="p-10 text-center text-destructive">Failed to load data.</div>;

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const completionPercent = totalCount ? (completedCount / totalCount) * 100 : 0;

  return (
    <motion.div className="p-6 space-y-6" initial="hidden" animate="visible">
      <motion.div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Today's Focus</h1>
        </div>
      </motion.div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span>
            {completedCount} / {totalCount} tasks completed
          </span>
          <Badge>{Math.round(completionPercent)}%</Badge>
        </div>
        <div className="mb-4">
          <div className="h-2 w-full bg-gray-300 rounded">
            <div
              className="h-2 rounded bg-green-500 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        <Tabs defaultValue="today">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="yesterday">
              <ArrowLeft className="mr-2" /> Yesterday
            </TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">
              Tomorrow <ArrowRight className="ml-2" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="yesterday" className="space-y-4">
            <Card>
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold">Yesterday's Reflection</h2>
                <Button size="sm" onClick={() => navigate("/today/edit/yesterday")}>
                  <PenTool className="mr-1" /> Edit
                </Button>
              </div>
              <Textarea
                value={reflection.yesterday}
                readOnly
                className="resize-none"
                rows={5}
              />
            </Card>
          </TabsContent>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold">Today's Tasks</h2>
                <Button size="sm" onClick={() => navigate("/today/edit/tasks")}>
                  <PenTool className="mr-1" /> Manage
                </Button>
              </div>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-4 rounded ${
                    task.completed ? "bg-green-100" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`h-6 w-6 flex items-center justify-center rounded-full border-2 ${
                        task.completed ? "bg-green-500 border-green-500" : "border-gray-400"
                      }`}
                      aria-label={`Mark task ${task.completed ? "incomplete" : "complete"}`}
                    >
                      {task.completed && <CheckCircle2 className="text-white" />}
                    </button>
                    <div>
                      <div className={`${task.completed ? "line-through text-gray-500" : ""}`}>
                        {task.title}
                      </div>
                      <Badge>{task.chain}</Badge>
                    </div>
                  </div>
                  <span className="text-sm">{task.estimatedTime}</span>
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="tomorrow" className="space-y-4">
            <Card>
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold">Tomorrow's Plan</h2>
                <Button size="sm" onClick={() => navigate("/today/edit/tomorrow")}>
                  <PenTool className="mr-1" /> Edit
                </Button>
              </div>
              <Textarea
                value={reflection.tomorrow}
                readOnly
                className="resize-none"
                rows={5}
              />
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <div className="flex items-center mb-4 space-x-3">
            <Zap className="text-yellow-400" />
            <h3 className="font-semibold">AI Coach Suggestions</h3>
          </div>
          <div className="space-y-3">
            {(data.suggestions || []).map((suggestion: string, idx: number) => (
              <div key={idx} className="p-3 bg-yellow-50 rounded">
                {suggestion}
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full" onClick={() => navigate("/coach")}>
            Get Detailed Plan
          </Button>
        </Card>
      </Card>
    </motion.div>
  );
};

export default Today;