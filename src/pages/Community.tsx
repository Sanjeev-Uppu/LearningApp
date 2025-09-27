import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, MessageSquare, Send, Search, Filter, Trophy, Star, Heart, Share2, 
  Plus, Calendar, Clock, MapPin, User, ChevronRight, TrendingUp, Award
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const API_BASE = import.meta.env.VITE_API_URL || "";

// API functions
const fetchCommunityPosts = async () => {
  const res = await axios.get(`${API_BASE}/community/posts`);
  return res.data;
};

const fetchStudyGroups = async () => {
  const res = await axios.get(`${API_BASE}/community/groups`);
  return res.data;
};

const fetchLeaderboard = async () => {
  const res = await axios.get(`${API_BASE}/community/leaderboard`);
  return res.data;
};

const postMessage = async (payload: { content: string; type: string }) => {
  const res = await axios.post(`${API_BASE}/community/posts`, payload, {
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

const Community = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState("achievement");

  // Fetch community data
  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["communityPosts"],
    queryFn: fetchCommunityPosts
  });

  const { data: studyGroups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ["studyGroups"],
    queryFn: fetchStudyGroups
  });

  const { data: leaderboard = [], isLoading: leaderboardLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard
  });

  // Post mutation
  const postMutation = useMutation({
    mutationFn: postMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityPosts"] });
      setNewPost("");
    }
  });

  const handlePost = () => {
    if (!newPost.trim()) return;
    postMutation.mutate({ content: newPost, type: postType });
  };

  const filteredPosts = posts.filter((post: any) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Community</h1>
            <p className="text-muted-foreground">Connect with fellow learners and share your journey</p>
          </div>
          <Badge className="bg-gradient-primary text-white">
            <Users className="w-4 h-4 mr-1" />
            {posts.length} Active Members
          </Badge>
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-primary text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-white/50" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-success text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Study Groups</p>
                <p className="text-2xl font-bold">{studyGroups.length}</p>
              </div>
              <Users className="w-8 h-8 text-white/50" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-secondary text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Active Today</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <TrendingUp className="w-8 h-8 text-white/50" />
            </div>
          </Card>
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Your Rank</p>
                <p className="text-2xl font-bold text-foreground">#12</p>
              </div>
              <Trophy className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Community Feed */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Community Feed</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
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

            {/* Create Post */}
            <Card className="p-4 mb-6 bg-muted/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="achievement">Share Achievement</option>
                    <option value="question">Ask Question</option>
                    <option value="tip">Share Tip</option>
                    <option value="motivation">Motivation</option>
                  </select>
                </div>
              </div>
              <Textarea
                placeholder="What's on your mind? Share your learning progress, ask questions, or motivate others..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-4 resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Image
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule
                  </Button>
                </div>
                <Button onClick={handlePost} disabled={!newPost.trim() || postMutation.isPending}>
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </div>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {postsLoading ? (
                <div className="text-center py-8">Loading posts...</div>
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post: any, index: number) => (
                  <Card key={index} className="p-4 bg-card shadow-card">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-foreground">{post.author}</h4>
                          <Badge variant="outline" className="text-xs">
                            {post.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{post.time}</span>
                        </div>
                        <p className="text-foreground mb-3">{post.content}</p>
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No posts found. Be the first to share something!</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Study Groups */}
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Study Groups</h3>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Create
              </Button>
            </div>
            <div className="space-y-3">
              {groupsLoading ? (
                <div className="text-center py-4">Loading groups...</div>
              ) : studyGroups.length > 0 ? (
                studyGroups.map((group: any, index: number) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-foreground">{group.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {group.members} members
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{group.schedule}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                        Join <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No study groups yet</p>
                </div>
              )}
            </div>
          </Card>

          {/* Leaderboard */}
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Weekly Leaderboard</h3>
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {leaderboardLoading ? (
                <div className="text-center py-4">Loading leaderboard...</div>
              ) : leaderboard.length > 0 ? (
                leaderboard.map((user: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      {index < 3 ? (
                        <Award className={`w-4 h-4 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-orange-600'}`} />
                      ) : (
                        <span className="text-sm font-medium text-foreground">#{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.xp} XP</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {user.streak} day streak
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <Trophy className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Leaderboard coming soon</p>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-gradient-secondary text-white shadow-card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start">
                <Star className="w-4 h-4 mr-2" />
                Share Achievement
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Find Study Buddy
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask Question
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Community;