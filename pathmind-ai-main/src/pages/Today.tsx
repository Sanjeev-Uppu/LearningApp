import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  ArrowLeft,
  ArrowRight,
  Zap,
  BookOpen,
  PenTool,
  Save
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Today = () => {
  const [yesterdayWork, setYesterdayWork] = useState("Completed React Hooks chapter and built a custom hook for API calls. Struggled with useCallback optimization but figured it out after reading the documentation.");
  const [todayPlan, setTodayPlan] = useState("Focus on React Context API and state management patterns. Build a shopping cart with context.");
  const [tomorrowPlan, setTomorrowPlan] = useState("Start Redux toolkit and compare with Context API approach.");

  const todayTasks = [
    {
      id: 1,
      title: "Complete React Context chapter",
      chain: "React Mastery",
      estimatedTime: "45 min",
      completed: false,
      priority: "high"
    },
    {
      id: 2,
      title: "Build shopping cart with Context",
      chain: "React Mastery", 
      estimatedTime: "90 min",
      completed: false,
      priority: "high"
    },
    {
      id: 3,
      title: "Review Python list comprehensions",
      chain: "Python Fundamentals",
      estimatedTime: "30 min",
      completed: true,
      priority: "medium"
    },
    {
      id: 4,
      title: "Practice algorithm problems",
      chain: "Data Structures",
      estimatedTime: "60 min",
      completed: false,
      priority: "medium"
    }
  ];

  const [tasks, setTasks] = useState(todayTasks);

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive";
      case "medium": return "bg-warning/10 text-warning";
      case "low": return "bg-success/10 text-success";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Today's Focus</h1>
            <p className="text-muted-foreground">Plan your day, track your progress, and stay consistent</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-success/10 text-success">
              {completedTasks}/{totalTasks} tasks completed
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-primary text-white shadow-primary">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">Daily Progress</h3>
              <p className="text-white/80">Keep up the momentum! 🔥</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
              <div className="text-white/80 text-sm">complete</div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </Card>
      </motion.div>

      {/* Three-Day View */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="yesterday" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Yesterday
            </TabsTrigger>
            <TabsTrigger value="today" className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Today
            </TabsTrigger>
            <TabsTrigger value="tomorrow" className="flex items-center">
              Tomorrow
              <ArrowRight className="w-4 h-4 ml-2" />
            </TabsTrigger>
          </TabsList>

          {/* Yesterday */}
          <TabsContent value="yesterday" className="space-y-4">
            <Card className="p-6 bg-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Yesterday's Work</h3>
                <Button variant="outline" size="sm">
                  <PenTool className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
              <Textarea
                value={yesterdayWork}
                onChange={(e) => setYesterdayWork(e.target.value)}
                placeholder="Reflect on yesterday's learning..."
                className="min-h-[120px] resize-none"
              />
              <div className="flex justify-end mt-4">
                <Button size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Reflection
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Today */}
          <TabsContent value="today" className="space-y-6">
            {/* Today's Tasks */}
            <Card className="p-6 bg-card shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Today's Tasks</h3>
                <Button variant="outline" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
              
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 ${
                      task.completed 
                        ? 'bg-success/5 border-success/20' 
                        : 'bg-card border-border hover:bg-muted/30'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        task.completed
                          ? 'bg-success border-success text-white'
                          : 'border-muted-foreground hover:border-primary'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                    
                    <div className="flex-1">
                      <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {task.chain}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)} variant="secondary">
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{task.estimatedTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Today's Focus */}
            <Card className="p-6 bg-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Today's Learning Plan</h3>
                <Button variant="outline" size="sm">
                  <PenTool className="w-4 h-4 mr-2" />
                  Edit Plan
                </Button>
              </div>
              <Textarea
                value={todayPlan}
                onChange={(e) => setTodayPlan(e.target.value)}
                placeholder="What's your focus for today?"
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-end mt-4">
                <Button size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Update Plan
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Tomorrow */}
          <TabsContent value="tomorrow" className="space-y-4">
            <Card className="p-6 bg-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Tomorrow's Plan</h3>
                <Button variant="outline" size="sm">
                  <Zap className="w-4 h-4 mr-2" />
                  AI Suggestions
                </Button>
              </div>
              <Textarea
                value={tomorrowPlan}
                onChange={(e) => setTomorrowPlan(e.target.value)}
                placeholder="Plan tomorrow's learning..."
                className="min-h-[120px] resize-none"
              />
              <div className="flex justify-end mt-4">
                <Button size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Plan
                </Button>
              </div>
            </Card>

            {/* AI Suggestions */}
            <Card className="p-6 bg-gradient-secondary text-white shadow-card">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-5 h-5" />
                <h3 className="text-lg font-semibold">AI Coach Suggestions</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white/10 rounded-lg">
                  <p className="text-sm text-white/90">
                    "Based on your React progress, consider diving into Redux tomorrow to complete your state management knowledge."
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <p className="text-sm text-white/90">
                    "You're making great progress! Don't forget to review Python basics to maintain your streak in that chain."
                  </p>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Get Detailed Plan
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default Today;