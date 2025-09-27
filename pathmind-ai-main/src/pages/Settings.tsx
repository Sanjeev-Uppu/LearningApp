import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Save,
  User,
  Mail,
  Lock,
  Eye,
  Moon,
  Sun,
  Smartphone,
  Clock,
  Target,
  Zap
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    streak: true,
    achievements: true,
    community: false,
    marketing: false
  });
  
  const [studySettings, setStudySettings] = useState({
    dailyGoal: "2",
    reminderTime: "09:00",
    weeklyGoal: "14",
    autoBreak: true,
    aiCoach: true,
    streakReminders: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    progressVisible: true,
    achievementsVisible: true,
    activityVisible: false,
    allowMessages: true,
    shareData: false
  });

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Customize your ConsistAI experience</p>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="study">Study</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appearance */}
              <Card className="p-6 bg-card shadow-card">
                <div className="flex items-center space-x-3 mb-4">
                  <Palette className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center space-x-2">
                            <Sun className="w-4 h-4" />
                            <span>Light</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center space-x-2">
                            <Moon className="w-4 h-4" />
                            <span>Dark</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center space-x-2">
                            <SettingsIcon className="w-4 h-4" />
                            <span>System</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Regional */}
              <Card className="p-6 bg-card shadow-card">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Regional</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="p-6 bg-card shadow-card">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
              </div>
              
              <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">General Updates</p>
                          <p className="text-xs text-muted-foreground">Weekly progress reports and updates</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Streak Reminders</p>
                          <p className="text-xs text-muted-foreground">Daily reminders to maintain your streak</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.streak}
                        onCheckedChange={(checked) => setNotifications({...notifications, streak: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className="w-4 h-4 bg-warning" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Achievement Unlocked</p>
                          <p className="text-xs text-muted-foreground">When you earn new badges and achievements</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.achievements}
                        onCheckedChange={(checked) => setNotifications({...notifications, achievements: checked})}
                      />
                    </div>
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="border-t pt-6">
                  <h4 className="font-medium text-foreground mb-4">Push Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Mobile Push</p>
                          <p className="text-xs text-muted-foreground">Receive notifications on your mobile device</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Community Activity</p>
                          <p className="text-xs text-muted-foreground">Comments, likes, and community interactions</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.community}
                        onCheckedChange={(checked) => setNotifications({...notifications, community: checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Study Settings */}
          <TabsContent value="study" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Study Goals */}
              <Card className="p-6 bg-card shadow-card">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Study Goals</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Daily Goal (hours)</Label>
                    <Select value={studySettings.dailyGoal} onValueChange={(value) => setStudySettings({...studySettings, dailyGoal: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="5">5+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Weekly Goal (hours)</Label>
                    <Input 
                      type="number" 
                      value={studySettings.weeklyGoal}
                      onChange={(e) => setStudySettings({...studySettings, weeklyGoal: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Study Reminder Time</Label>
                    <Input 
                      type="time" 
                      value={studySettings.reminderTime}
                      onChange={(e) => setStudySettings({...studySettings, reminderTime: e.target.value})}
                    />
                  </div>
                </div>
              </Card>

              {/* AI Coach Settings */}
              <Card className="p-6 bg-card shadow-card">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">AI Coach</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Enable AI Coach</p>
                      <p className="text-xs text-muted-foreground">Get personalized learning recommendations</p>
                    </div>
                    <Switch
                      checked={studySettings.aiCoach}
                      onCheckedChange={(checked) => setStudySettings({...studySettings, aiCoach: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Auto Break Suggestions</p>
                      <p className="text-xs text-muted-foreground">Automatically suggest study breaks</p>
                    </div>
                    <Switch
                      checked={studySettings.autoBreak}
                      onCheckedChange={(checked) => setStudySettings({...studySettings, autoBreak: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Streak Reminders</p>
                      <p className="text-xs text-muted-foreground">Daily reminders to maintain streaks</p>
                    </div>
                    <Switch
                      checked={studySettings.streakReminders}
                      onCheckedChange={(checked) => setStudySettings({...studySettings, streakReminders: checked})}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6 mt-6">
            <Card className="p-6 bg-card shadow-card">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Privacy & Visibility</h3>
              </div>
              
              <div className="space-y-6">
                {/* Profile Visibility */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Profile Visibility</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Public Profile</p>
                        <p className="text-xs text-muted-foreground">Allow others to view your profile</p>
                      </div>
                      <Switch
                        checked={privacy.profileVisible}
                        onCheckedChange={(checked) => setPrivacy({...privacy, profileVisible: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Progress Visibility</p>
                        <p className="text-xs text-muted-foreground">Show your learning progress to others</p>
                      </div>
                      <Switch
                        checked={privacy.progressVisible}
                        onCheckedChange={(checked) => setPrivacy({...privacy, progressVisible: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Achievements Visibility</p>
                        <p className="text-xs text-muted-foreground">Display your badges and achievements</p>
                      </div>
                      <Switch
                        checked={privacy.achievementsVisible}
                        onCheckedChange={(checked) => setPrivacy({...privacy, achievementsVisible: checked})}
                      />
                    </div>
                  </div>
                </div>

                {/* Data & Communication */}
                <div className="border-t pt-6">
                  <h4 className="font-medium text-foreground mb-4">Data & Communication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Allow Direct Messages</p>
                        <p className="text-xs text-muted-foreground">Let community members send you messages</p>
                      </div>
                      <Switch
                        checked={privacy.allowMessages}
                        onCheckedChange={(checked) => setPrivacy({...privacy, allowMessages: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Share Learning Data</p>
                        <p className="text-xs text-muted-foreground">Help improve AI recommendations (anonymous)</p>
                      </div>
                      <Switch
                        checked={privacy.shareData}
                        onCheckedChange={(checked) => setPrivacy({...privacy, shareData: checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Security */}
              <Card className="p-6 bg-card shadow-card">
                <div className="flex items-center space-x-3 mb-4">
                  <Lock className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Security</h3>
                </div>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Login Activity
                  </Button>
                </div>
              </Card>

              {/* Data Management */}
              <Card className="p-6 bg-card shadow-card">
                <div className="flex items-center space-x-3 mb-4">
                  <Download className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
                </div>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Learning Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Progress Report
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>

            {/* Danger Zone */}
            <Card className="p-6 bg-destructive/5 border-destructive/20 shadow-card">
              <div className="flex items-center space-x-3 mb-4">
                <Trash2 className="w-5 h-5 text-destructive" />
                <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive">
                Delete Account Permanently
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default Settings;