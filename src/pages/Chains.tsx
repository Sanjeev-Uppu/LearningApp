import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Target, 
  Plus, 
  MoreHorizontal,
  Calendar,
  Clock,
  Trash2,
  Edit,
  Play,
  BookOpen,
  Trophy
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// API Endpoint base URL defined in env variables
const API_BASE = import.meta.env.VITE_API_URL || "";

interface Chain {
  id: number;
  title: string;
  description: string;
  progress: number;
  totalDays: number;
  currentDay: number;
  streak: number;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  xp: number;
  status: "active" | "paused" | "completed";
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-success/10 text-success";
    case "paused": return "bg-warning/10 text-warning";
    case "completed": return "bg-primary/10 text-primary";
    default: return "bg-muted/10 text-muted-foreground";
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": return "bg-success/10 text-success";
    case "Intermediate": return "bg-warning/10 text-warning";
    case "Advanced": return "bg-destructive/10 text-destructive";
    default: return "bg-muted/10 text-muted-foreground";
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Chains = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "paused" | "completed">("all");

  // Fetch chains from API
  const { data: chains = [], isLoading, error } = useQuery<Chain[]>({
    queryKey: ["chains"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/chains`);
      return res.data;
    }
  });

  // Delete chain mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`${API_BASE}/chains/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chains"] })
  });

  const filteredChains = chains.filter((chain) => {
    const matchesSearch = chain.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chain.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || chain.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this learning chain?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-6 text-center">Loading Learning Chains...</div>;
  if (error) return <div className="p-6 text-center text-destructive">Failed to load chains.</div>;

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Learning Chains</h1>
            <p className="text-muted-foreground">Manage your learning paths and track progress</p>
          </div>
          <Button
            className="bg-gradient-primary hover:opacity-90 shadow-primary"
            onClick={() => navigate("/chains/create")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Chain
          </Button>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants}>
        <Card className="p-4 bg-card shadow-card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search learning chains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "active", "completed", "paused"].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(status as typeof filter)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Chains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChains.length ? (
          filteredChains.map((chain) => (
            <motion.div
              key={chain.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 bg-card shadow-card hover:shadow-primary/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 cursor-pointer" onClick={() => navigate(`/chains/${chain.id}`)}>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{chain.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{chain.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/chains/edit/${chain.id}`)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Chain
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/chains/${chain.id}`)}>
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(chain.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Chain
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getStatusColor(chain.status)} variant="secondary">
                    {chain.status}
                  </Badge>
                  <Badge className={getDifficultyColor(chain.difficulty)} variant="secondary">
                    {chain.difficulty}
                  </Badge>
                  <Badge variant="outline">{chain.category}</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">{chain.progress}%</span>
                  </div>
                  <Progress value={chain.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Day</p>
                      <p className="text-sm font-medium text-foreground">{chain.currentDay}/{chain.totalDays}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Streak</p>
                      <p className="text-sm font-medium text-foreground">{chain.streak} days</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{chain.xp} XP</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant={chain.status === "completed" ? "outline" : "default"}
                  disabled={chain.status === "completed"}
                  onClick={() => {
                    if (chain.status === "paused") navigate(`/chains/resume/${chain.id}`);
                    else if (chain.status === "active") navigate(`/chains/${chain.id}/learn`);
                  }}
                >
                  {chain.status === "completed" ? (
                    <>
                      <Trophy className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : chain.status === "paused" ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Resume Learning
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Continue Learning
                    </>
                  )}
                </Button>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants}>
            <Card className="p-12 text-center bg-card shadow-card">
              <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No learning chains found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "Try adjusting your search or filters" : "Create your first learning chain to get started"}
              </p>
              <Button className="bg-gradient-primary hover:opacity-90 shadow-primary" onClick={() => navigate("/chains/create")}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Chain
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Chains;