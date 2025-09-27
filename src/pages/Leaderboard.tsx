import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Trophy, Medal, Crown, Star, Search, Filter, Calendar, Users, 
  TrendingUp, Award, Target, Zap, ChevronLeft, ChevronRight
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const API_BASE = import.meta.env.VITE_API_URL || "";

// API functions
const fetchLeaderboard = async (period: string = "weekly") => {
  const res = await axios.get(`${API_BASE}/community/leaderboard?period=${period}`);
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

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");

  // Fetch leaderboard data
  const { data: leaderboard = [], isLoading } = useQuery({
    queryKey: ["leaderboard", selectedPeriod],
    queryFn: () => fetchLeaderboard(selectedPeriod)
  });

  const filteredLeaderboard = leaderboard.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">🥇 Gold</Badge>;
      case 2:
        return <Badge className="bg-gray-400/10 text-gray-400 border-gray-400/20">🥈 Silver</Badge>;
      case 3:
        return <Badge className="bg-orange-600/10 text-orange-600 border-orange-600/20">🥉 Bronze</Badge>;
      default:
        return <Badge variant="outline">Rank #{rank}</Badge>;
    }
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
            <p className="text-muted-foreground">See how you rank against other learners</p>
          </div>
          <Badge className="bg-gradient-primary text-white">
            <Trophy className="w-4 h-4 mr-1" />
            {leaderboard.length} Active Learners
          </Badge>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-primary text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Participants</p>
                <p className="text-2xl font-bold">{leaderboard.length}</p>
              </div>
              <Users className="w-8 h-8 text-white/50" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-success text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Top XP</p>
                <p className="text-2xl font-bold">{leaderboard[0]?.xp?.toLocaleString() || 0}</p>
              </div>
              <Star className="w-8 h-8 text-white/50" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-secondary text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Longest Streak</p>
                <p className="text-2xl font-bold">{leaderboard[0]?.streak || 0} days</p>
              </div>
              <Zap className="w-8 h-8 text-white/50" />
            </div>
          </Card>
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Your Rank</p>
                <p className="text-2xl font-bold text-foreground">#12</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-card shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Rankings</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search learners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Period Tabs */}
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="all-time">All Time</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedPeriod} className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">Loading leaderboard...</div>
              ) : filteredLeaderboard.length > 0 ? (
                <div className="space-y-3">
                  {filteredLeaderboard.map((user: any, index: number) => (
                    <motion.div
                      key={user.name}
                      variants={itemVariants}
                      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                        index < 3 
                          ? 'bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20' 
                          : 'bg-card hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                          {getRankIcon(index + 1)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-foreground">{user.name}</h4>
                            {index < 3 && (
                              <Badge variant="secondary" className="text-xs">
                                Top {index + 1}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>{user.xp.toLocaleString()} XP</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Zap className="w-3 h-3" />
                              <span>{user.streak} day streak</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {getRankBadge(index + 1)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No learners found</p>
                  <p className="text-sm">Try adjusting your search terms</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>

      {/* Achievement Section */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-secondary text-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Achievements</h3>
            <Trophy className="w-6 h-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="font-medium">Top Performer</span>
              </div>
              <p className="text-sm text-white/80">Consistently in top 10% of learners</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Streak Master</span>
              </div>
              <p className="text-sm text-white/80">Maintained 30+ day learning streak</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-purple-400" />
                <span className="font-medium">XP Collector</span>
              </div>
              <p className="text-sm text-white/80">Earned 10,000+ XP points</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Your Progress */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-card shadow-card">
          <h3 className="text-xl font-semibold text-foreground mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Rank</span>
                <span className="text-lg font-bold text-foreground">#12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Your XP</span>
                <span className="text-lg font-bold text-foreground">8,450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Your Streak</span>
                <span className="text-lg font-bold text-foreground">15 days</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">XP to Next Rank</span>
                <span className="text-lg font-bold text-foreground">1,550</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Weekly Progress</span>
                <span className="text-lg font-bold text-foreground">+12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Best Rank</span>
                <span className="text-lg font-bold text-foreground">#8</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;