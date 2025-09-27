import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import {
  TrendingUp, Calendar, Clock, Target, Trophy, BarChart3, PieChart, Activity, Download, Filter, Eye, EyeOff
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

const fetchProgressData = async () => {
  const res = await axios.get(`${API_BASE}/user/progress`, {
    headers: { 'x-auth-token': localStorage.getItem("token") || "" }
  });
  return res.data;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Progress = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [showDetails, setShowDetails] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProgress"],
    queryFn: fetchProgressData
  });

  if (isLoading) return <div className="p-6 text-center">Loading progress data...</div>;
  if (isError || !data) return <div className="p-6 text-center text-destructive">Failed to load progress data.</div>;

  const stats = data.stats;
  const progressData = data.progressData;

  return (
    <motion.div className="p-6 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Progress & Analytics</h1>
            <p className="text-muted-foreground">Track your learning journey and celebrate achievements</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => {/* Implement export report functionality */}}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showDetails ? "Hide Details" : "Show Details"}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
            <Card className="p-6 bg-gradient-primary text-white shadow-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Study Time</p>
                  <p className="text-3xl font-bold">{stats.totalStudyTime.toFixed(1)}h</p>
                  <p className="text-white/80 text-sm">this {timeRange}</p>
                </div>
                <Clock className="w-12 h-12 text-white/50" />
              </div>
            </Card>
          </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-success text-white shadow-success">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Completion Rate</p>
                <p className="text-3xl font-bold">{stats.completionRate}%</p>
                <p className="text-white/80 text-sm">tasks completed</p>
              </div>
              <Target className="w-12 h-12 text-white/50" />
            </div>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-secondary text-white shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Current Streak</p>
                <p className="text-3xl font-bold">{stats.currentStreak}</p>
                <p className="text-white/80 text-sm">days</p>
              </div>
              <Activity className="w-12 h-12 text-white/50" />
            </div>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Level</p>
                <p className="text-3xl font-bold text-foreground">{stats.level}</p>
                <p className="text-muted-foreground text-sm">{stats.totalXP} XP</p>
              </div>
              <Trophy className="w-12 h-12 text-primary" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="streaks">Streaks</TabsTrigger>
          </TabsList>

          {/* Weekly Progress */}
          <TabsContent value="weekly" className="space-y-4 mt-6">
            <Card className="p-6 bg-card shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Weekly Study Progress</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="tasks" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Monthly Progress */}
          <TabsContent value="monthly" className="space-y-4 mt-6">
            <Card className="p-6 bg-card shadow-card">
              <h3 className="text-xl font-semibold text-foreground mb-6">Monthly Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3B82F6" />
                  <Bar dataKey="tasks" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Subject Breakdown */}
          <TabsContent value="subjects" className="space-y-4 mt-6">
            <Card className="p-6 bg-card shadow-card">
              <h3 className="text-xl font-semibold text-foreground mb-6">Subject Distribution</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={progressData.subjectBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {progressData.subjectBreakdown.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Subject Details</h4>
                  {progressData.subjectBreakdown.map((subject: any) => (
                    <div key={subject.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: subject.color }} />
                        <span className="text-sm text-foreground">{subject.name}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{subject.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Streak Tracking */}
          <TabsContent value="streaks" className="space-y-4 mt-6">
            <Card className="p-6 bg-card shadow-card">
              <h3 className="text-xl font-semibold text-foreground mb-6">Streak History</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData.streakData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="streak" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {showDetails && (
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Detailed Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Study Patterns</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average daily time</span>
                    <span className="text-sm font-medium">{stats.averageDailyTime.toFixed(1)}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Best day</span>
                    <span className="text-sm font-medium">Thursday ({stats.bestDayHours}h)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total tasks</span>
                    <span className="text-sm font-medium">{stats.totalTasks}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Achievements</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Longest streak</span>
                    <span className="text-sm font-medium">{stats.longestStreak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total XP earned</span>
                    <span className="text-sm font-medium">{stats.totalXP.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Level progress</span>
                    <span className="text-sm font-medium">{((stats.totalXP % 1000) / 1000 * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Goals & Targets</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Weekly goal</span>
                    <span className="text-sm font-medium">20h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Goal progress</span>
                    <span className="text-sm font-medium">{(stats.totalStudyTime / 20 * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Next milestone</span>
                    <span className="text-sm font-medium">Level {stats.level + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-secondary text-white shadow-card">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5" />
            <h3 className="text-xl font-semibold">Insights & Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">What's Working Well</h4>
              <ul className="space-y-2 text-sm text-white/90">
                {data.insights.workingWell.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm text-white/90">
                {data.insights.improvements.map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <Button variant="secondary" className="mt-4">
            Get Personalized Recommendations
          </Button>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Progress;