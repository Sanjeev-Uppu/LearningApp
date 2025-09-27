import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LandingPage from "@/components/LandingPage";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Dashboard from "@/pages/Dashboard";
import Chains from "@/pages/Chains";
import Today from "@/pages/Today";
import Progress from "@/pages/Progress";
import Coach from "@/pages/Coach";
import Community from "@/pages/Community";
import Leaderboard from "@/pages/Leaderboard";
import Library from "@/pages/Library";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Monitor } from "lucide-react";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-16 border-b border-border/40 bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="text-sm text-muted-foreground">
                Welcome back, {user?.firstName}! Keep your streak alive 🔥
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <div className="flex items-center space-x-1 bg-card border border-border rounded-lg p-1">
                <Button
                  variant={theme === 'light' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('light')}
                  className="h-8 w-8 p-0"
                >
                  <Sun className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === 'auto' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('auto')}
                  className="h-8 w-8 p-0"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                  className="h-8 w-8 p-0"
                >
                  <Moon className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
              </Button>

              {/* User Menu */}
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </header>
          
          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
              <Route path="/chains" element={<AppLayout><Chains /></AppLayout>} />
              <Route path="/today" element={<AppLayout><Today /></AppLayout>} />
              <Route path="/progress" element={<AppLayout><Progress /></AppLayout>} />
              <Route path="/coach" element={<AppLayout><Coach /></AppLayout>} />
              <Route path="/community" element={<AppLayout><Community /></AppLayout>} />
              <Route path="/leaderboard" element={<AppLayout><Leaderboard /></AppLayout>} />
              <Route path="/library" element={<AppLayout><Library /></AppLayout>} />
              <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
              <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;