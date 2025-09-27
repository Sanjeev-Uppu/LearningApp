import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen,
  Search,
  Filter,
  Star,
  Download,
  Heart,
  Eye,
  Clock,
  Target,
  Users,
  TrendingUp,
  Copy
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const learningPlans = [
  {
    id: 1,
    title: "Complete React Developer Path",
    author: {
      name: "Sarah Chen",
      avatar: "/api/placeholder/40/40",
      verified: true
    },
    description: "A comprehensive 60-day journey from React basics to advanced patterns, including hooks, context, and performance optimization.",
    category: "Frontend",
    difficulty: "Intermediate",
    duration: "60 days",
    rating: 4.8,
    likes: 1247,
    views: 8934,
    downloads: 432,
    tags: ["React", "JavaScript", "Frontend", "Hooks"],
    lastUpdated: "2 days ago",
    featured: true
  },
  {
    id: 2,
    title: "Python for Data Science Mastery",
    author: {
      name: "Dr. Alex Kumar",
      avatar: "/api/placeholder/40/40",
      verified: true
    },
    description: "Master Python for data science with NumPy, Pandas, Matplotlib, and machine learning fundamentals in 45 days.",
    category: "Data Science",
    difficulty: "Advanced",
    duration: "45 days",
    rating: 4.9,
    likes: 2156,
    views: 12045,
    downloads: 687,
    tags: ["Python", "Data Science", "NumPy", "Pandas", "ML"],
    lastUpdated: "1 week ago",
    featured: true
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    author: {
      name: "Emily Rodriguez",
      avatar: "/api/placeholder/40/40",
      verified: false
    },
    description: "Learn design principles, user research, wireframing, prototyping, and create a complete design system.",
    category: "Design",
    difficulty: "Beginner",
    duration: "30 days",
    rating: 4.6,
    likes: 856,
    views: 5632,
    downloads: 234,
    tags: ["UI Design", "UX Design", "Figma", "Prototyping"],
    lastUpdated: "3 days ago",
    featured: false
  },
  {
    id: 4,
    title: "Full-Stack JavaScript Bootcamp",
    author: {
      name: "Marcus Thompson",
      avatar: "/api/placeholder/40/40",
      verified: true
    },
    description: "From zero to full-stack developer with Node.js, Express, MongoDB, and React in 90 days.",
    category: "Full Stack",
    difficulty: "Intermediate",
    duration: "90 days",
    rating: 4.7,
    likes: 1893,
    views: 15678,
    downloads: 892,
    tags: ["JavaScript", "Node.js", "React", "MongoDB", "Express"],
    lastUpdated: "5 days ago",
    featured: true
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    author: {
      name: "Lisa Wang",
      avatar: "/api/placeholder/40/40",
      verified: true
    },
    description: "Build cross-platform mobile apps with React Native, from basics to publishing on app stores.",
    category: "Mobile",
    difficulty: "Intermediate",
    duration: "50 days",
    rating: 4.5,
    likes: 743,
    views: 4521,
    downloads: 189,
    tags: ["React Native", "Mobile", "iOS", "Android"],
    lastUpdated: "1 day ago",
    featured: false
  },
  {
    id: 6,
    title: "Machine Learning Engineer Path",
    author: {
      name: "Dr. Raj Patel",
      avatar: "/api/placeholder/40/40",
      verified: true
    },
    description: "Advanced ML concepts, deep learning, model deployment, and MLOps for production systems.",
    category: "AI/ML",
    difficulty: "Advanced",
    duration: "120 days",
    rating: 4.9,
    likes: 2847,
    views: 18392,
    downloads: 1245,
    tags: ["Machine Learning", "Deep Learning", "TensorFlow", "MLOps"],
    lastUpdated: "4 days ago",
    featured: true
  }
];

const categories = ["All", "Frontend", "Backend", "Full Stack", "Mobile", "Data Science", "AI/ML", "Design", "DevOps"];

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("popular");

  const filteredPlans = learningPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || plan.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Learning Library</h1>
            <p className="text-muted-foreground">Discover and clone learning plans from the community</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
            <BookOpen className="w-4 h-4 mr-2" />
            Create Plan
          </Button>
        </div>
      </motion.div>

      {/* Library Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-primary text-white shadow-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Plans</p>
                <p className="text-2xl font-bold">1,847</p>
              </div>
              <BookOpen className="w-8 h-8 text-white/80" />
            </div>
          </Card>
          
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Featured</p>
                <p className="text-2xl font-bold text-foreground">28</p>
              </div>
              <Star className="w-8 h-8 text-warning" />
            </div>
          </Card>
          
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Contributors</p>
                <p className="text-2xl font-bold text-foreground">456</p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </Card>
          
          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Downloads</p>
                <p className="text-2xl font-bold text-foreground">12.5K</p>
              </div>
              <Download className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-card shadow-card">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search learning plans, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Content Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6 mt-6">
            {/* Learning Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className="p-6 bg-card shadow-card hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Plan Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {plan.featured && (
                          <Badge className="bg-warning/10 text-warning text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {plan.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {plan.title}
                      </h3>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={plan.author.avatar} />
                      <AvatarFallback>{plan.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{plan.author.name}</p>
                      {plan.author.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {plan.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {plan.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {plan.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{plan.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(plan.difficulty)} variant="secondary">
                          {plan.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{plan.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-warning fill-current" />
                        <span className="text-xs text-foreground">{plan.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{plan.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{plan.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{plan.downloads}</span>
                      </div>
                    </div>
                    <span>{plan.lastUpdated}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                      <Copy className="w-4 h-4 mr-2" />
                      Clone Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredPlans.length === 0 && (
              <Card className="p-12 text-center bg-card shadow-card">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No plans found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or browse different categories
                </p>
                <Button onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}>
                  Clear Filters
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Featured Section */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-secondary text-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Contribute to the Library</h3>
            <BookOpen className="w-6 h-6" />
          </div>
          <p className="text-white/90 mb-6">
            Share your learning journey with the community. Create and publish your own learning plans to help others succeed.
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="secondary">
              Create Learning Plan
            </Button>
            <Button variant="ghost" className="text-white hover:text-white/80">
              Learn More
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Library;