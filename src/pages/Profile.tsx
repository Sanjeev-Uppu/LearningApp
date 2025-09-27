import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User, Mail, Edit, Save, Camera,
  Trophy, Target, Calendar,
  Settings, Shield, Bell, Palette,
  Github, Twitter, Linkedin
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  location: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  avatarUrl?: string;
  level?: number;
  xp?: number;
}

// Fetch user profile
const fetchUserProfile = async () => {
  const res = await axios.get(`${API_BASE}/user/profile`, {
    headers: { 'x-auth-token': localStorage.getItem("token") || "" }
  });
  return res.data;
};

// Update user profile
const updateUserProfile = async (profile: ProfileData) => {
  const res = await axios.put(`${API_BASE}/user/profile`, profile, {
    headers: { 'x-auth-token': localStorage.getItem("token") || "" }
  });
  return res.data;
};

const Profile = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile
  });

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    github: "",
    twitter: "",
    linkedin: "",
    avatarUrl: "",
    level: 1,
    xp: 0,
  });

  useEffect(() => {
    if (profile) setProfileData(profile);
  }, [profile]);

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setEditing(false);
    }
  });

  if (isLoading) return <div className="p-10 text-center">Loading profile...</div>;
  if (isError) return <div className="p-10 text-center text-destructive">Failed to load profile.</div>;

  return (
    <motion.div className="p-6 space-y-6" initial="hidden" animate="visible">
      <motion.div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your profile and view your learning journey</p>
          </div>
          <Button
            onClick={() => (editing ? mutation.mutate(profileData) : setEditing(true))}
            disabled={mutation.isPending}
          >
            {editing ? <><Save className="mr-2" /> Save Changes</> : <><Edit className="mr-2" /> Edit Profile</>}
          </Button>
        </div>
      </motion.div>

      {/* Profile Header */}
      <motion.div>
        <Card className="p-6 bg-gradient-primary text-white shadow-primary">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white/20">
                {profileData.avatarUrl ?
                  <AvatarImage src={profileData.avatarUrl} /> :
                  <AvatarFallback>{profileData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                }
              </Avatar>
              {editing && (
                <Button size="icon" className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-primary hover:bg-white/90">
                  <Camera />
                </Button>
              )}
            </div>
            <div className="flex-1">
              {editing ? (
                <>
                  <Input
                    value={profileData.name}
                    onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                    className="bg-white/90 text-black"
                    placeholder="Name"
                  />
                  <Textarea
                    value={profileData.bio}
                    onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                    className="bg-white/90 text-black resize-none mt-2"
                    rows={3}
                    placeholder="Bio"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{profileData.name}</h2>
                  <p>{profileData.bio}</p>
                </>
              )}
            </div>
            <div className="text-right">
              <Badge className="bg-white/20 text-white border-white/30 mb-2">Level {profileData.level}</Badge>
              <div className="text-2xl font-bold">{profileData.xp?.toLocaleString() ?? 0} XP</div>
              <div className="text-white/80 text-sm">Next level progress</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Additional Profile Info and Tabs */}
      <motion.div>
        <Tabs defaultValue="achievements">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Achievements Tab — Assume achievements fetched separately */}
          <TabsContent value="achievements" className="space-y-6">
            {/* Render dynamic achievements */}
            <Card>/* Achievements content here */</Card>
          </TabsContent>

          {/* Activity Tab — Assume activity fetched dynamically */}
          <TabsContent value="activity" className="space-y-6">
            {/* Render recent activity */}
            <Card>/* Recent activity content here */</Card>
          </TabsContent>

          {/* Settings Tab — Link to Settings page or inline */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <Button onClick={() => {/* Navigate to /settings or open modal */}}>Manage Settings</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default Profile;