import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun, Monitor } from "lucide-react";

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
              <span className="text-sm text-muted-foreground">
                Welcome back, {user?.firstName}! Keep your streak alive 🔥
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <div className="flex items-center space-x-1 bg-card border border-border rounded-lg p-1">
                <Button variant={theme === 'light' ? 'default' : 'ghost'}
                        size="sm" onClick={() => setTheme('light')} className="h-8 w-8 p-0"><Sun className="h-4 w-4" /></Button>
                <Button variant={theme === 'auto' ? 'default' : 'ghost'}
                        size="sm" onClick={() => setTheme('auto')} className="h-8 w-8 p-0"><Monitor className="h-4 w-4" /></Button>
                <Button variant={theme === 'dark' ? 'default' : 'ghost'}
                        size="sm" onClick={() => setTheme('dark')} className="h-8 w-8 p-0"><Moon className="h-4 w-4" /></Button>
              </div>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </Button>
              {/* Logout */}
              <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
            </div>
          </header>
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;