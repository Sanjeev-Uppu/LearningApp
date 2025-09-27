import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User,
  Edit,
  Trophy,
  Target,
  Calendar,
  MapPin,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Save,
  Camera,
  Settings,
  Shield,
  Bell,
  Palette
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    bio: "Passionate learner on a journey to master web development. Currently focusing on React and Python. Love sharing knowledge with the community!",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    github: "alexjohnson",
    twitter: "alexjohnson_dev",
    linkedin: "alexjohnson"
  });

  const achievements = [
    {
      title: "Streak Master",
      description: "Maintained a 21-day learning streak",
      icon: "🔥",
      date: "Earned today",
      rarity: "Common"
    },
    {
      title: "React Expert", 
      description: "Completed React Mastery chain with 95% score",
      icon: "⚛️",
      date: "3 days ago",
      rarity: "Rare"
    },
    {
      title: "Community Helper",
      description: "Helped 10 community members",
      icon: "🤝",
      date: "1 week ago",
      rarity: "Uncommon"
    },
    {
      title: "Early Bird",
      description: "Studied for 30 consecutive days before 9 AM",
      icon: "🌅",
      date: "2 weeks ago",
      rarity: "Epic"
    }
  ];

  const learningStats = [
    { label: "Total XP", value: "12,750", icon: Trophy },
    { label: "Chains Completed", value: "8", icon: Target },
    { label: "Study Hours", value: "156", icon: Calendar },
    { label: "Current Streak", value: "21", icon: "🔥" }
  ];

  const recentActivity = [
    {
      type: "completed",
      description: "Completed React Hooks chapter",
      chain: "React Mastery",
      time: "2 hours ago"
    },
    {
      type: "streak",
      description: "Maintained 21-day streak",
      time: "Today"
    },
    {
      type: "community",
      description: "Helped Sarah with Python debugging",
      time: "Yesterday"
    },
    {
      type: "achievement",
      description: "Earned 'React Expert' badge",
      time: "3 days ago"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-muted/10 text-muted-foreground";
      case "Uncommon": return "bg-success/10 text-success";
      case "Rare": return "bg-primary/10 text-primary";
      case "Epic": return "bg-warning/10 text-warning";
      case "Legendary": return "bg-destructive/10 text-destructive";
      default: return "bg-muted/10 text-muted-foreground";
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
            <p className="text-muted-foreground">Manage your profile and view your learning journey</p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-primary text-white shadow-primary">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white/20">
                <AvatarImage src="/api/placeholder/96/96" />
                <AvatarFallback className="text-2xl">{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="icon" className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-primary hover:bg-white/90">
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 resize-none"
                    rows={3}
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
                  <p className="text-white/90 mb-4">{profileData.bio}</p>
                  <div className="flex items-center space-x-4 text-white/80">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{profileData.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Joined March 2024</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="text-right">
              <Badge className="bg-white/20 text-white border-white/30 mb-2">
                Level 12
              </Badge>
              <div className="text-2xl font-bold">2,850 XP</div>
              <div className="text-white/80 text-sm">to next level</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {learningStats.map((stat, index) => (
            <Card key={index} className="p-6 bg-card shadow-card text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                {typeof stat.icon === 'string' ? (
                  <span className="text-2xl">{stat.icon}</span>
                ) : (
                  <stat.icon className="w-6 h-6 text-primary" />
                )}
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Tabs Content */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 bg-card shadow-card hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                        <Badge className={getRarityColor(achievement.rarity)} variant="secondary">
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Activity */}
          <TabsContent value="activity" className="space-y-4 mt-6">
            <Card className="p-6 bg-card shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border/40 last:border-b-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.description}</p>
                      {activity.chain && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          {activity.chain}
                        </Badge>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="p-6 bg-card shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                    <Input
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Website</label>
                    <Input
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    />
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              <Card className="p-6 bg-card shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Social Links</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="GitHub username"
                      value={profileData.github}
                      onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Twitter className="w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Twitter username"
                      value={profileData.twitter}
                      onChange={(e) => setProfileData({...profileData, twitter: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="LinkedIn username"
                      value={profileData.linkedin}
                      onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                    />
                  </div>
                </div>
              </Card>

              {/* Preferences */}
              <Card className="p-6 bg-card shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">Email Notifications</span>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Palette className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">Theme</span>
                    </div>
                    <Button variant="outline" size="sm">Dark</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">Privacy</span>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </Card>

              {/* Account Actions */}
              <Card className="p-6 bg-card shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Account</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Advanced Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy & Security
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default Profile;