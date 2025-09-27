import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

const fetchSettings = async () => {
  const res = await axios.get(`${API_BASE}/user/settings`, {
    headers: { 'x-auth-token': localStorage.getItem("token") || "" }
  });
  return res.data;
};

const updateSettings = async (settings: any) => {
  const res = await axios.put(`${API_BASE}/user/settings`, settings, {
    headers: { 'x-auth-token': localStorage.getItem("token") || "" }
  });
  return res.data;
};

const Settings = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings
  });
  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["settings"] })
  });

  const [settings, setSettings] = useState<any>({
    theme: "light",
    notifications: {},
    study: {},
    privacy: {},
  });

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  const handleSave = () => {
    mutation.mutate(settings);
  };

  if (isLoading) return <div className="p-10 text-center">Loading settings...</div>;
  if (isError) return <div className="p-10 text-center text-destructive">Failed to load settings.</div>;

  return (
    <motion.div className="p-6 space-y-6" initial="hidden" animate="visible">
      {/* Header */}
      <motion.div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Customize your experience</p>
          </div>
          <Button onClick={handleSave} disabled={mutation.isPending}>
            Save All Changes
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="study">Study</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Appearance</h2>
            <Select value={settings.theme} onValueChange={(val) => setSettings({...settings, theme: val})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">System</SelectItem>
              </SelectContent>
            </Select>
          </Card>
          {/* Additional general settings here */}
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Notification Preferences</h2>
            {/* Notification switches */}
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center mb-2">
                <span>{key}</span>
                <Switch checked={value as boolean} onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: {...settings.notifications, [key]: checked}
                })}/>
              </div>
            ))}
          </Card>
        </TabsContent>

        {/* Study */}
        <TabsContent value="study" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Study Settings</h2>
            {/* Example: Daily Goal */}
            <Label>Daily Study Goal (hours)</Label>
            <Select value={settings.study.dailyGoal || "2"} onValueChange={(val) => setSettings({
              ...settings,
              study: {...settings.study, dailyGoal: val}
            })}>
              {[1, 2, 3, 4, 5].map(n => (
                <SelectItem key={n} value={n.toString()}>{n} hour{n > 1 ? "s" : ""}</SelectItem>
              ))}
            </Select>
            {/* Other study settings */}
          </Card>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Privacy Settings</h2>
            {Object.entries(settings.privacy).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center mb-2">
                <span>{key}</span>
                <Switch checked={value as boolean} onCheckedChange={(checked) => setSettings({
                  ...settings,
                  privacy: {...settings.privacy, [key]: checked}
                })}/>
              </div>
            ))}
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Account Management</h2>
            <Button variant="outline" className="mb-2" onClick={() => {/* Navigate to password change page */}}>
              Change Password
            </Button>
            <Button variant="outline" className="mb-2" onClick={() => {/* Navigate to 2FA page */}}>
              Two-Factor Authentication
            </Button>
            <Button variant="destructive" onClick={() => {/* Account deletion logic with confirmation */}}>
              Delete Account
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Settings;