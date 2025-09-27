import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Target, 
  Plus, 
  Search,
  Filter,
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

const learningChains = [
  {
    id: 1,
    title: "React Mastery",
    description: "Complete guide to React development from basics to advanced",
    progress: 75,
    totalDays: 45,
    currentDay: 34,
    streak: 21,
    category: "Frontend",
    difficulty: "Advanced",
    xp: 1200,
    status: "active"
  },
  {
    id: 2,
    title: "Python Fundamentals",
    description: "Master Python programming fundamentals and best practices",
    progress: 45,
    totalDays: 30,
    currentDay: 14,
    streak: 8,
    category: "Programming",
    difficulty: "Beginner",
    xp: 650,
    status: "active"
  },
  {
    id: 3,
    title: "Design Principles",
    description: "Learn UI/UX design principles and create stunning interfaces",
    progress: 90,
    totalDays: 20,
    currentDay: 18,
    streak: 15,
    category: "Design",
    difficulty: "Intermediate",
    xp: 950,
    status: "active"
  },
  {
    id: 4,
    title: "Data Structures & Algorithms",
    description: "Master computer science fundamentals for coding interviews",
    progress: 30,
    totalDays: 60,
    currentDay: 18,
    streak: 12,
    category: "Computer Science",
    difficulty: "Advanced",
    xp: 800,
    status: "paused"
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    description: "Introduction to ML concepts and practical implementations",
    progress: 100,
    totalDays: 25,
    currentDay: 25,
    streak: 25,
    category: "AI/ML",
    difficulty: "Intermediate",
    xp: 1500,
    status: "completed"
  }
];

const Chains = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredChains = learningChains.filter(chain => {
    const matchesSearch = chain.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chain.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || chain.status === filter;
    return matchesSearch && matchesFilter;
  });

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Learning Chains</h1>
            <p className="text-muted-foreground">Manage your learning paths and track progress</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create New Chain
          </Button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants}>
        <Card className="p-4 bg-card shadow-card">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search learning chains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                onClick={() => setFilter("active")}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                onClick={() => setFilter("completed")}
                size="sm"
              >
                Completed
              </Button>
              <Button
                variant={filter === "paused" ? "default" : "outline"}
                onClick={() => setFilter("paused")}
                size="sm"
              >
                Paused
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Learning Chains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChains.map((chain, index) => (
          <motion.div
            key={chain.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="p-6 bg-card shadow-card hover:shadow-primary/20 transition-all duration-300">
              {/* Chain Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
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
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Chain
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Chain
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getStatusColor(chain.status)} variant="secondary">
                  {chain.status}
                </Badge>
                <Badge className={getDifficultyColor(chain.difficulty)} variant="secondary">
                  {chain.difficulty}
                </Badge>
                <Badge variant="outline">{chain.category}</Badge>
              </div>

              {/* Progress */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-foreground">{chain.progress}%</span>
                </div>
                <Progress value={chain.progress} className="h-2" />
              </div>

              {/* Stats */}
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

              {/* XP */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{chain.xp} XP</span>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full" 
                variant={chain.status === "completed" ? "outline" : "default"}
                disabled={chain.status === "completed"}
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
        ))}
      </div>

      {/* Empty State */}
      {filteredChains.length === 0 && (
        <motion.div variants={itemVariants}>
          <Card className="p-12 text-center bg-card shadow-card">
            <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No learning chains found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Try adjusting your search terms or filters" : "Create your first learning chain to get started"}
            </p>
            <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Chain
            </Button>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Chains;