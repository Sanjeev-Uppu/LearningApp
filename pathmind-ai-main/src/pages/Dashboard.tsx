import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  TrendingUp, 
  Zap, 
  Calendar, 
  Clock,
  Trophy,
  Users,
  BookOpen,
  Plus,
  ArrowRight,
  Flame,
  Loader2,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    currentStreak: 0,
    totalXP: 0,
    activeChains: 0,
    weeklyStudyTime: 0,
    weeklyProgress: [],
    activeChainsData: []
  });

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      setIsLoading(true);
      // In a real app, you'd fetch this from the API
      setTimeout(() => {
        setUserStats({
          currentStreak: user?.currentStreak || 0,
          totalXP: user?.xp || 0,
          activeChains: 0, // Will be fetched from API
          weeklyStudyTime: 0, // Will be calculated from API
          weeklyProgress: [
            { day: "Mon", hours: 0, streak: user?.currentStreak || 0 },
            { day: "Tue", hours: 0, streak: user?.currentStreak || 0 },
            { day: "Wed", hours: 0, streak: user?.currentStreak || 0 },
            { day: "Thu", hours: 0, streak: user?.currentStreak || 0 },
            { day: "Fri", hours: 0, streak: user?.currentStreak || 0 },
            { day: "Sat", hours: 0, streak: user?.currentStreak || 0 },
            { day: "Sun", hours: 0, streak: user?.currentStreak || 0 },
          ],
          activeChainsData: []
        });
        setIsLoading(false);
      }, 1000);
    };

    if (user) {
      loadUserData();
    }
  }, [user]);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.firstName || 'Learner'}!
            </h1>
            <p className="text-muted-foreground">
              {userStats.currentStreak > 0 
                ? `You're doing amazing! Keep up the momentum 🔥` 
                : `Ready to start your learning journey? Let's begin! 🚀`
              }
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Learning Chain
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-primary text-white shadow-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Current Streak</p>
                <p className="text-3xl font-bold">{userStats.currentStreak}</p>
                <p className="text-white/80 text-sm">days</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-success text-white shadow-success">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total XP</p>
                <p className="text-3xl font-bold">{userStats.totalXP.toLocaleString()}</p>
                <p className="text-white/80 text-sm">points earned</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Chains</p>
                <p className="text-3xl font-bold text-foreground">{userStats.activeChains}</p>
                <p className="text-muted-foreground text-sm">in progress</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">This Week</p>
                <p className="text-3xl font-bold text-foreground">{userStats.weeklyStudyTime}h</p>
                <p className="text-muted-foreground text-sm">study time</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Weekly Progress</h3>
              <Badge variant="secondary">This Week</Badge>
            </div>
            {userStats.weeklyProgress.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userStats.weeklyProgress}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="hsl(220, 25%, 35%)" 
                    fill="url(#colorGradient)" 
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(220, 25%, 35%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(220, 25%, 35%)" stopOpacity={0}/>
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
        </motion.div>

        {/* Learning Chains Progress */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Active Chains</h3>
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            {userStats.activeChainsData.length > 0 ? (
              <div className="space-y-4">
                {userStats.activeChainsData.map((chain, index) => (
                  <div key={index} className="space-y-2">
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
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Chain
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Today's Focus</h3>
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {userStats.activeChains > 0 ? (
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
            <Button variant="outline" className="w-full mt-4">
              <BookOpen className="w-4 h-4 mr-2" />
              {userStats.activeChains > 0 ? 'View Full Plan' : 'Get Started'}
            </Button>
          </Card>
        </motion.div>

        {/* AI Coach Suggestions */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-gradient-secondary text-white shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Coach</h3>
              <Zap className="w-5 h-5" />
            </div>
            <p className="text-white/90 text-sm mb-4">
              {userStats.currentStreak > 0 
                ? "Great progress! Keep maintaining your daily learning habit. Consider exploring new topics to expand your knowledge."
                : "Welcome to ConsistAI! Start with a small, achievable goal to build your learning habit. Even 15 minutes a day can make a difference."
              }
            </p>
            <Button variant="secondary" className="w-full">
              Get Personalized Plan
            </Button>
          </Card>
        </motion.div>

        {/* Community Highlights */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Community</h3>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Global Rank</span>
                <Badge variant="secondary">
                  {userStats.totalXP > 0 ? 'Calculating...' : 'Unranked'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Weekly Challenge</span>
                <Badge className="bg-success/10 text-success">
                  {userStats.currentStreak > 0 ? 'Active' : 'Not Started'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Study Buddies</span>
                <span className="text-sm text-muted-foreground">
                  {userStats.activeChains > 0 ? 'Finding...' : '0 online'}
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Join Community
            </Button>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;