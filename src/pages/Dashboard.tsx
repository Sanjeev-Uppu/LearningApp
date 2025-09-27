import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Flame, Trophy, Target, Clock, ArrowRight, BookOpen, Zap, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "";

const fetchDashboardStats = async () => (await fetch(`${API_BASE}/users/dashboard`, {
  headers: { 'x-auth-token': localStorage.getItem("token") || "" }
})).json();

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats
  });

  if (isLoading) return <div className="p-10 text-center">Loading dashboard...</div>;
  if (isError || !stats) return <div className="p-10 text-center text-destructive">Failed to load dashboard</div>;

  // Structure: { currentStreak, totalXP, activeChains, weeklyStudyTime, weeklyProgress, activeChainsData }

  return (
    <motion.div className="p-6 space-y-6" initial="hidden" animate="visible">
      {/* Header */}
      <motion.div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.firstName || 'Learner'}!
            </h1>
            <p className="text-muted-foreground">
              {stats.currentStreak > 0
                ? `You're doing amazing! Keep up the momentum 🔥`
                : `Ready to start your learning journey? Let's begin! 🚀`}
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-primary" onClick={() => navigate("/chains/create")}>
            <Plus className="w-4 h-4 mr-2" />
            New Learning Chain
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-primary text-white shadow-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Current Streak</p>
              <p className="text-3xl font-bold">{stats.currentStreak}</p>
              <p className="text-white/80 text-sm">days</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-success text-white shadow-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Total XP</p>
              <p className="text-3xl font-bold">{stats.totalXP.toLocaleString()}</p>
              <p className="text-white/80 text-sm">points earned</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Active Chains</p>
              <p className="text-3xl font-bold text-foreground">{stats.activeChains}</p>
              <p className="text-muted-foreground text-sm">in progress</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">This Week</p>
              <p className="text-3xl font-bold text-foreground">{stats.weeklyStudyTime}h</p>
              <p className="text-muted-foreground text-sm">study time</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="p-6 bg-card shadow-card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Weekly Progress</h3>
            <Badge variant="secondary">This Week</Badge>
          </div>
          {stats.weeklyProgress?.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats.weeklyProgress}>
                <XAxis dataKey="day" />
                <YAxis />
                <Area type="monotone" dataKey="hours" stroke="hsl(220, 25%, 35%)" fill="url(#colorGradient)" strokeWidth={2} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(220 25% 35%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(220 25% 35%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No study data yet</p>
                <p className="text-sm">Start your first learning session to see progress</p>
              </div>
            </div>
          )}
        </Card>
        {/* Chains in Progress */}
        <Card className="p-6 bg-card shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Active Chains</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate("/chains")}>
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          {stats.activeChainsData?.length ? (
            <div className="space-y-4">
              {stats.activeChainsData.map((chain: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">{chain.name}</h4>
                    <span className="text-sm text-muted-foreground">{chain.completion}%</span>
                  </div>
                  <Progress value={chain.completion} className="h-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">No active learning chains</p>
              <Button variant="outline" className="w-full" onClick={() => navigate("/chains/create")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Chain
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Bottom Cards: Today, Coach, Community */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <Card className="p-6 bg-card shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Today's Focus</h3>
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-3">
            {stats.activeChains > 0 ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">Continue your learning chain</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm text-foreground">Review yesterday's progress</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-sm text-foreground">Set tomorrow's goals</span>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm">No tasks yet</p>
                <p className="text-xs text-muted-foreground">Create a learning chain to get started</p>
              </div>
            )}
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={() => navigate("/today")}>
            <BookOpen className="w-4 h-4 mr-2" />
            {stats.activeChains > 0 ? 'View Full Plan' : 'Get Started'}
          </Button>
        </Card>
        {/* AI Coach */}
        <Card className="p-6 bg-gradient-secondary text-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">AI Coach</h3>
            <Zap className="w-5 h-5" />
          </div>
          <p className="text-white/90 text-sm mb-4">
            {stats.currentStreak > 0
              ? "Great progress! Keep maintaining your daily learning habit. Consider exploring new topics to expand your knowledge."
              : "Welcome to PathMind! Start with a small, achievable goal to build your learning habit. Even 15 minutes a day can make a difference."
            }
          </p>
          <Button variant="secondary" className="w-full" onClick={() => navigate("/coach")}>
            Get Personalized Plan
          </Button>
        </Card>
        {/* Community */}
        <Card className="p-6 bg-card shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Community</h3>
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Global Rank</span>
              <Badge variant="secondary">
                {stats.totalXP > 0 ? 'Calculating...' : 'Unranked'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Weekly Challenge</span>
              <Badge className="bg-success/10 text-success">
                {stats.currentStreak > 0 ? 'Active' : 'Not Started'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Study Buddies</span>
              <span className="text-sm text-muted-foreground">
                {stats.activeChains > 0 ? 'Finding...' : '0 online'}
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={() => navigate("/community")}>
            Join Community
          </Button>
        </Card>
      </div>

    </motion.div>
  );
};

export default Dashboard;