import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users,
  Heart,
  MessageCircle,
  Share2,
  Search,
  Filter,
  TrendingUp,
  Star,
  BookOpen,
  Trophy,
  Target,
  Clock,
  Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const communityPosts = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      avatar: "/api/placeholder/40/40",
      level: "Expert",
      streak: 45
    },
    content: "Just completed my React mastery chain! 🎉 Took me 42 days but totally worth it. The hooks section was challenging but the AI coach suggestions really helped me push through.",
    chain: "React Mastery",
    likes: 23,
    comments: 8,
    timeAgo: "2 hours ago",
    achievements: ["React Expert", "45-day Streak"]
  },
  {
    id: 2,
    author: {
      name: "Alex Rodriguez",
      avatar: "/api/placeholder/40/40", 
      level: "Intermediate",
      streak: 12
    },
    content: "Struggling with Python data structures. Anyone have good resources for visual learners? The AI coach suggested some but looking for community recommendations too.",
    chain: "Python Fundamentals",
    likes: 15,
    comments: 12,
    timeAgo: "4 hours ago",
    achievements: ["Python Beginner"]
  },
  {
    id: 3,
    author: {
      name: "Maria Silva",
      avatar: "/api/placeholder/40/40",
      level: "Advanced", 
      streak: 78
    },
    content: "Created a comprehensive ML study plan that helped me land my dream job! Sharing it with the community. The key was consistent daily practice and using the AI recovery plans when I fell behind.",
    chain: "Machine Learning",
    likes: 56,
    comments: 24,
    timeAgo: "1 day ago",
    achievements: ["ML Master", "Job Ready", "78-day Streak"]
  }
];

const studyGroups = [
  {
    id: 1,
    name: "React Developers Circle",
    members: 234,
    category: "Frontend",
    description: "Daily React challenges and peer support",
    isJoined: true
  },
  {
    id: 2,
    name: "Python Beginners Hub",
    members: 189,
    category: "Programming",
    description: "Learning Python together, one day at a time",
    isJoined: false
  },
  {
    id: 3,
    name: "Design System Masters",
    members: 156,
    category: "Design",
    description: "Building beautiful, consistent interfaces",
    isJoined: true
  },
  {
    id: 4,
    name: "AI/ML Study Group",
    members: 298,
    category: "AI/ML",
    description: "Machine learning concepts and practical projects",
    isJoined: false
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [searchTerm, setSearchTerm] = useState("");

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Learning Community</h1>
            <p className="text-muted-foreground">Connect, share, and learn together with fellow learners</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-primary text-white shadow-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Active Members</p>
                <p className="text-2xl font-bold">12.5K</p>
              </div>
              <Users className="w-8 h-8 text-white/80" />
            </div>
          </Card>
          
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Study Groups</p>
                <p className="text-2xl font-bold text-foreground">248</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </Card>
          
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Shared Plans</p>
                <p className="text-2xl font-bold text-foreground">1.8K</p>
              </div>
              <BookOpen className="w-8 h-8 text-success" />
            </div>
          </Card>
          
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Success Stories</p>
                <p className="text-2xl font-bold text-foreground">356</p>
              </div>
              <Trophy className="w-8 h-8 text-warning" />
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="groups">Study Groups</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
          </TabsList>

          {/* Community Feed */}
          <TabsContent value="feed" className="space-y-6 mt-6">
            {/* Search and Filter */}
            <Card className="p-4 bg-card shadow-card">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search community posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {communityPosts.map((post) => (
                <Card key={post.id} className="p-6 bg-card shadow-card hover:shadow-lg transition-all duration-300">
                  {/* Post Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-foreground">{post.author.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {post.author.level}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary text-xs">
                          {post.author.streak} day streak
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-foreground mb-3">{post.content}</p>
                    {post.chain && (
                      <Badge className="bg-accent/10 text-accent-foreground">
                        {post.chain}
                      </Badge>
                    )}
                  </div>

                  {/* Achievements */}
                  {post.achievements && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.achievements.map((achievement, index) => (
                        <Badge key={index} className="bg-success/10 text-success text-xs">
                          <Trophy className="w-3 h-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Study Groups */}
          <TabsContent value="groups" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyGroups.map((group) => (
                <Card key={group.id} className="p-6 bg-card shadow-card hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{group.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{group.members} members</span>
                        </div>
                        <Badge variant="outline">{group.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className={`w-full ${group.isJoined ? 'bg-success/10 text-success hover:bg-success/20' : 'bg-gradient-primary hover:opacity-90'}`}
                    variant={group.isJoined ? "outline" : "default"}
                  >
                    {group.isJoined ? "Joined" : "Join Group"}
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Challenges */}
          <TabsContent value="challenges" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Weekly Challenge */}
              <Card className="p-6 bg-gradient-primary text-white shadow-primary">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Weekly Challenge</h3>
                  <Trophy className="w-6 h-6" />
                </div>
                <p className="text-white/90 mb-4">
                  Complete 5 coding challenges this week across any learning chain.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/80">Progress</span>
                  <span className="text-sm font-medium">3/5</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                  <div className="bg-white h-2 rounded-full" style={{ width: "60%" }} />
                </div>
                <Button variant="secondary" className="w-full">
                  Continue Challenge
                </Button>
              </Card>

              {/* Monthly Challenge */}
              <Card className="p-6 bg-gradient-secondary text-white shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Monthly Challenge</h3>
                  <Star className="w-6 h-6" />
                </div>
                <p className="text-white/90 mb-4">
                  Maintain a 30-day learning streak and earn the Consistency Master badge.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/80">Current Streak</span>
                  <span className="text-sm font-medium">21 days</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                  <div className="bg-white h-2 rounded-full" style={{ width: "70%" }} />
                </div>
                <Button variant="secondary" className="w-full">
                  Keep Going
                </Button>
              </Card>

              {/* Community Challenge */}
              <Card className="p-6 bg-card shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Community Challenge</h3>
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground mb-4">
                  Help 3 community members by answering their questions or sharing resources.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Helped</span>
                  <span className="text-sm font-medium text-foreground">1/3</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "33%" }} />
                </div>
                <Button className="w-full">
                  Join Challenge
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default Community;