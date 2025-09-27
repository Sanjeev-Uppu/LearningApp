import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy,
  Medal,
  Crown,
  Flame,
  TrendingUp,
  Users,
  Target,
  Calendar,
  Star,
  Zap,
  Filter,
  RefreshCw
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const globalLeaders = [
  {
    rank: 1,
    name: "Elena Rodriguez",
    avatar: "/api/placeholder/40/40",
    streak: 127,
    xp: 45850,
    chainsCompleted: 12,
    country: "Spain",
    badge: "Learning Master"
  },
  {
    rank: 2,
    name: "Marcus Chen",
    avatar: "/api/placeholder/40/40", 
    streak: 98,
    xp: 42300,
    chainsCompleted: 11,
    country: "Singapore",
    badge: "Consistency King"
  },
  {
    rank: 3,
    name: "Aisha Patel",
    avatar: "/api/placeholder/40/40",
    streak: 156,
    xp: 41200,
    chainsCompleted: 9,
    country: "India",
    badge: "Streak Legend"
  },
  {
    rank: 4,
    name: "David Kim",
    avatar: "/api/placeholder/40/40",
    streak: 89,
    xp: 38900,
    chainsCompleted: 10,
    country: "South Korea",
    badge: "Knowledge Seeker"
  },
  {
    rank: 5,
    name: "Sarah Johnson",
    avatar: "/api/placeholder/40/40",
    streak: 76,
    xp: 36500,
    chainsCompleted: 8,
    country: "USA",
    badge: "Fast Learner"
  }
];

const weeklyLeaders = [
  {
    rank: 1,
    name: "Alex Thompson",
    avatar: "/api/placeholder/40/40",
    weeklyXP: 1250,
    hoursStudied: 18.5,
    tasksCompleted: 42,
    country: "Canada"
  },
  {
    rank: 2,
    name: "Lisa Wang",
    avatar: "/api/placeholder/40/40",
    weeklyXP: 1180,
    hoursStudied: 16.8,
    tasksCompleted: 38,
    country: "China"
  },
  {
    rank: 3,
    name: "Mohammed Ali",
    avatar: "/api/placeholder/40/40",
    weeklyXP: 1050,
    hoursStudied: 15.2,
    tasksCompleted: 35,
    country: "Egypt"
  },
  {
    rank: 4,
    name: "Emma Wilson",
    avatar: "/api/placeholder/40/40",
    weeklyXP: 980,
    hoursStudied: 14.5,
    tasksCompleted: 32,
    country: "UK"
  },
  {
    rank: 5,
    name: "Carlos Silva",
    avatar: "/api/placeholder/40/40",
    weeklyXP: 920,
    hoursStudied: 13.8,
    tasksCompleted: 30,
    country: "Brazil"
  }
];

const chainLeaders = [
  {
    chain: "React Mastery",
    leader: {
      name: "Frontend Master",
      avatar: "/api/placeholder/40/40",
      progress: 100,
      timeToComplete: "32 days",
      xp: 3200
    },
    category: "Frontend"
  },
  {
    chain: "Python Fundamentals", 
    leader: {
      name: "Code Ninja",
      avatar: "/api/placeholder/40/40",
      progress: 100,
      timeToComplete: "28 days", 
      xp: 2800
    },
    category: "Programming"
  },
  {
    chain: "Machine Learning",
    leader: {
      name: "AI Enthusiast",
      avatar: "/api/placeholder/40/40",
      progress: 100,
      timeToComplete: "45 days",
      xp: 4500
    },
    category: "AI/ML"
  },
  {
    chain: "Design Principles",
    leader: {
      name: "Design Guru",
      avatar: "/api/placeholder/40/40",
      progress: 100,
      timeToComplete: "25 days",
      xp: 2500
    },
    category: "Design"
  }
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [userRank] = useState(247);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200";
      case 2: return "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800/20 dark:to-gray-700/20 border-gray-200";
      case 3: return "bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200";
      default: return "bg-card border-border";
    }
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
            <p className="text-muted-foreground">Compete with learners worldwide and celebrate achievements</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Your Rank */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-primary text-white shadow-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Your Global Rank</h3>
                <p className="text-white/90">Keep climbing! You're in the top 15%</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">#{userRank}</div>
              <div className="text-white/80 text-sm">out of 12,547</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Leaderboard Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="global">Global Leaders</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="chains">By Chain</TabsTrigger>
          </TabsList>

          {/* Global Leaderboard */}
          <TabsContent value="global" className="space-y-4 mt-6">
            <div className="space-y-3">
              {globalLeaders.map((user, index) => (
                <Card 
                  key={user.rank} 
                  className={`p-4 ${getRankBg(user.rank)} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-foreground">{user.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {user.country}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary text-xs">
                          {user.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-muted-foreground">{user.streak} days</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4 text-success" />
                          <span className="text-sm text-muted-foreground">{user.chainsCompleted} chains</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{user.xp.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">XP</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Weekly Leaderboard */}
          <TabsContent value="weekly" className="space-y-4 mt-6">
            <div className="mb-4">
              <Card className="p-4 bg-gradient-secondary text-white shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">This Week's Competition</h3>
                    <p className="text-white/90 text-sm">Resets every Monday • 3 days remaining</p>
                  </div>
                  <Calendar className="w-6 h-6" />
                </div>
              </Card>
            </div>

            <div className="space-y-3">
              {weeklyLeaders.map((user) => (
                <Card 
                  key={user.rank} 
                  className={`p-4 ${getRankBg(user.rank)} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-foreground">{user.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {user.country}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="text-sm text-muted-foreground">{user.hoursStudied}h</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{user.tasksCompleted} tasks</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{user.weeklyXP}</div>
                      <div className="text-sm text-muted-foreground">Weekly XP</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Chain Leaders */}
          <TabsContent value="chains" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chainLeaders.map((chain, index) => (
                <Card key={index} className="p-6 bg-card shadow-card hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{chain.chain}</h3>
                      <Badge variant="outline">{chain.category}</Badge>
                    </div>
                    <Star className="w-6 h-6 text-warning" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chain.leader.avatar} />
                      <AvatarFallback>{chain.leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{chain.leader.name}</h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4 text-warning" />
                          <span className="text-sm text-muted-foreground">{chain.leader.xp} XP</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{chain.leader.timeToComplete}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Completion</span>
                      <span className="text-sm font-medium text-foreground">{chain.leader.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full" 
                        style={{ width: `${chain.leader.progress}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Achievements Section */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-hero text-white shadow-glow">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Join the Elite!</h3>
            <p className="text-white/90 mb-6">
              Climb the leaderboard and earn recognition in our global learning community
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Top 1%</p>
                <p className="text-xs text-white/80">Global Elite</p>
              </div>
              <div className="text-center">
                <Crown className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Top 5%</p>
                <p className="text-xs text-white/80">Master Learner</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Top 10%</p>
                <p className="text-xs text-white/80">Rising Star</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;