import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Search, Star, Download, Heart, Eye, Copy, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "";

const fetchPlans = async () => {
  const res = await axios.get(`${API_BASE}/library/plans`);
  return res.data;
};

const clonePlan = async (id: number) => {
  const res = await axios.post(`${API_BASE}/library/plans/${id}/clone`);
  return res.data;
};

const likePlan = async (id: number) => {
  const res = await axios.post(`${API_BASE}/library/plans/${id}/like`);
  return res.data;
};

const categories = ["All", "Frontend", "Backend", "Full Stack", "Mobile", "Data Science", "AI/ML", "Design", "DevOps"];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-success/10 text-success";
    case "Intermediate":
      return "bg-warning/10 text-warning";
    case "Advanced":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-muted/10 text-muted-foreground";
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("popular");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["libraryPlans"],
    queryFn: fetchPlans
  });

  const cloneMutation = useMutation({
    mutationFn: clonePlan,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["libraryPlans"] })
  });

  const likeMutation = useMutation({
    mutationFn: likePlan,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["libraryPlans"] })
  });

  const filteredPlans = plans.filter((plan: any) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || plan.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div className="p-6 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Learning Library</h1>
            <p className="text-muted-foreground">Discover and clone learning plans from the community</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-primary" onClick={() => navigate("/library/create")}>
            <BookOpen className="w-4 h-4 mr-2" />
            Create Plan
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-primary text-white shadow-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Plans</p>
                <p className="text-2xl font-bold">{isLoading ? "..." : plans.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-white/80" />
            </div>
          </Card>
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Featured</p>
                <p className="text-2xl font-bold">{isLoading ? "..." : plans.filter((p: any) => p.featured).length}</p>
              </div>
              <Star className="w-8 h-8 text-warning" />
            </div>
          </Card>
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Contributors</p>
                <p className="text-2xl font-bold">{isLoading ? "..." : "456"}</p>
              </div>
              <Download className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search plans, topics, authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={cat === selectedCategory ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>

            <TabsContent className="space-y-6" value={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <div className="p-10 text-center">Loading plans...</div>
                ) : filteredPlans.length === 0 ? (
                  <Card className="p-12 text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No plans found</p>
                    <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
                      Clear Filters
                    </Button>
                  </Card>
                ) : (
                  filteredPlans.map((plan) => (
                    <Card key={plan.id} className="p-6 shadow hover:shadow-lg group cursor-pointer" onClick={() => navigate(`/library/${plan.id}`)}>
                      <div className="mb-2 flex items-center gap-2">
                        {plan.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1 px-2 py-0.5 rounded">
                            <Star className="w-4 h-4" />
                            Featured
                          </Badge>
                        )}
                        <Badge className="px-2 py-0.5">{plan.category}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold group-hover:text-primary">{plan.title}</h3>

                      <div className="mt-4 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={plan.author.avatar} />
                          <AvatarFallback>{plan.author.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{plan.author.name}</div>
                          {plan.author.verified && <Badge variant="outline" className="text-xs">Verified</Badge>}
                        </div>
                      </div>

                      <p className="mt-4 text-sm line-clamp-3">{plan.description}</p>

                      <div className="mt-4 flex flex-wrap gap-1">
                        {plan.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                        {plan.tags.length > 3 && <Badge className="text-xs">+{plan.tags.length - 3}</Badge>}
                      </div>

                      <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <Badge className={getDifficultyColor(plan.difficulty)}>{plan.difficulty}</Badge>
                          <span>Duration: {plan.duration}</span>
                          <span>Rating: {plan.rating}</span>
                        </div>
                        <span>{plan.lastUpdated}</span>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button
                          className="flex-grow"
                          onClick={(e) => {
                            e.stopPropagation();
                            cloneMutation.mutate(plan.id);
                          }}
                          disabled={cloneMutation.isPending}
                        >
                          <Copy className="mr-2" /> Clone
                        </Button>
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/library/${plan.id}`);
                          }}
                        >
                          <Eye />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            likeMutation.mutate(plan.id);
                          }}
                          disabled={likeMutation.isPending}
                        >
                          <Heart />
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-secondary text-white shadow-card">
          <h3 className="mb-4 text-white text-lg font-semibold">Contribute to the Library</h3>
          <p className="mb-4 text-white">
            Share your learning journey by creating and publishing your own plans to help the community.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/library/create")}>Create Plan</Button>
            <Button variant="outline" onClick={() => navigate("/library/about")}>Learn More</Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Library;