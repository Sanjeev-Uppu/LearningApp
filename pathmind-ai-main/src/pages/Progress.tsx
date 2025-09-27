import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  Calendar,
  Target,
  Trophy,
  Clock,
  Flame,
  BookOpen,
  Zap,
  Download,
  Filter
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from "recharts";

const weeklyData = [
  { day: "Mon", hours: 2.5, tasks: 8, xp: 120 },
  { day: "Tue", hours: 3.2, tasks: 12, xp: 180 },
  { day: "Wed", hours: 1.8, tasks: 6, xp: 90 },
  { day: "Thu", hours: 4.1, tasks: 15, xp: 220 },
  { day: "Fri", hours: 2.9, tasks: 10, xp: 150 },
  { day: "Sat", hours: 3.7, tasks: 14, xp: 200 },
  { day: "Sun", hours: 2.1, tasks: 8, xp: 110 },
];

const monthlyData = [
  { month: "Jan", hours: 45, xp: 2200 },
  { month: "Feb", hours: 52, xp: 2800 },
  { month: "Mar", hours: 38, xp: 1900 },
  { month: "Apr", hours: 61, xp: 3200 },
  { month: "May", hours: 48, xp: 2500 },
  { month: "Jun", hours: 55, xp: 2900 },
];

const chainProgressData = [
  { name: "React Mastery", value: 75, color: "hsl(270, 91%, 65%)" },
  { name: "Python Fundamentals", value: 45, color: "hsl(295, 91%, 68%)" },
  { name: "Design Principles", value: 90, color: "hsl(158, 68%, 45%)" },
  { name: "Data Structures", value: 30, color: "hsl(35, 91%, 60%)" },
];

const streakData = [
  { week: "Week 1", streak: 7 },
  { week: "Week 2", streak: 6 },
  { week: "Week 3", streak: 7 },
  { week: "Week 4", streak: 5 },
  { week: "Week 5", streak: 7 },
  { week: "Week 6", streak: 7 },
];

const Progress = () => {
  const [timeframe, setTimeframe] = useState("week");

  const stats = {
    totalHours: 156,
    totalXP: 12750,
    longestStreak: 21,
    currentStreak: 21,
    chainsCompleted: 3,
    averageDaily: 2.8
  };

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Progress Analytics</h1>
            <p className="text-muted-foreground">Track your learning journey and celebrate achievements</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="p-4 bg-gradient-primary text-white shadow-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Current Streak</p>
                <p className="text-2xl font-bold">{stats.currentStreak}</p>
              </div>
              <Flame className="w-8 h-8 text-white/80" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Hours</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalHours}</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total XP</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalXP.toLocaleString()}</p>
              </div>
              <Trophy className="w-8 h-8 text-warning" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Longest Streak</p>
                <p className="text-2xl font-bold text-foreground">{stats.longestStreak}</p>
              </div>
              <Target className="w-8 h-8 text-success" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Completed</p>
                <p className="text-2xl font-bold text-foreground">{stats.chainsCompleted}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Daily Avg</p>
                <p className="text-2xl font-bold text-foreground">{stats.averageDaily}h</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Study Hours Chart */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Study Hours</h3>
              <Tabs value={timeframe} onValueChange={setTimeframe}>
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              {timeframe === "week" ? (
                <AreaChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="hsl(270, 91%, 65%)" 
                    fill="url(#colorGradient)" 
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(270, 91%, 65%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(270, 91%, 65%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              ) : (
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="hours" fill="hsl(270, 91%, 65%)" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* XP Progress Chart */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">XP Progress</h3>
              <Badge className="bg-success/10 text-success">
                +1,200 this week
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="xp" 
                  stroke="hsl(158, 68%, 45%)" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(158, 68%, 45%)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Progress by Chain & Streak Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chain Progress */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Progress by Chain</h3>
            <div className="space-y-4">
              {chainProgressData.map((chain, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{chain.name}</span>
                    <span className="text-sm text-muted-foreground">{chain.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${chain.value}%`,
                        backgroundColor: chain.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={chainProgressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {chainProgressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Streak Analysis */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Streak Analysis</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={streakData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Bar 
                  dataKey="streak" 
                  fill="hsl(35, 91%, 60%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gradient-primary/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Flame className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Consistency Score</p>
                    <p className="text-sm text-muted-foreground">85% - Excellent!</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-success" />
                  <div>
                    <p className="font-medium text-foreground">Best Performance</p>
                    <p className="text-sm text-muted-foreground">Week 3 & 5 - Perfect 7 days!</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Achievement Summary */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-secondary text-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Achievement Summary</h3>
            <Trophy className="w-6 h-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">🔥</div>
              <p className="text-sm text-white/90">Streak Master</p>
              <p className="text-xs text-white/70">21-day streak achieved</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">🎯</div>
              <p className="text-sm text-white/90">Goal Crusher</p>
              <p className="text-xs text-white/70">3 chains completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">⚡</div>
              <p className="text-sm text-white/90">Learning Machine</p>
              <p className="text-xs text-white/70">12,750 XP earned</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Progress;