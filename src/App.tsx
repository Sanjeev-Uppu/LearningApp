import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import AppLayout from "@/components/AppLayout"; // (your sidebar/topbar/layout)
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

const queryClient = new QueryClient();

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