import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Zap,
  Brain,
  Target,
  BookOpen,
  TrendingUp,
  Clock,
  Lightbulb,
  MessageSquare,
  Send,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const Coach = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      message: "Hi! I'm your AI Coach. I've analyzed your learning patterns and I'm here to help you optimize your study journey. What would you like to focus on today?",
      time: "2 minutes ago"
    }
  ]);

  const suggestions = [
    {
      title: "Optimize Study Schedule",
      description: "Based on your peak performance times, I suggest studying React concepts between 9-11 AM when your focus is highest.",
      type: "schedule",
      priority: "high"
    },
    {
      title: "Skill Gap Analysis",
      description: "You're progressing well in React but falling behind in Python. Consider dedicating 30 minutes daily to Python fundamentals.",
      type: "skills",
      priority: "medium"
    },
    {
      title: "Streak Recovery Plan",
      description: "I notice you missed yesterday. Here's a compressed plan to catch up without overwhelming yourself.",
      type: "recovery",
      priority: "high"
    },
    {
      title: "Resource Recommendations",
      description: "Based on your learning style, I found 3 interactive coding challenges that match your React skill level.",
      type: "resources",
      priority: "low"
    }
  ];

  const weeklyInsights = [
    {
      metric: "Study Efficiency",
      value: 85,
      trend: "up",
      insight: "Your focus time has improved by 15% this week"
    },
    {
      metric: "Consistency Score", 
      value: 78,
      trend: "down",
      insight: "3 missed days this week - let's get back on track"
    },
    {
      metric: "Knowledge Retention",
      value: 92,
      trend: "up", 
      insight: "Excellent retention! Your spaced repetition is working"
    },
    {
      metric: "Challenge Completion",
      value: 67,
      trend: "up",
      insight: "You're tackling harder problems - great progress!"
    }
  ];

  const sendMessage = () => {
    if (!question.trim()) return;
    
    setChatHistory([
      ...chatHistory,
      { type: "user", message: question, time: "Just now" },
      { 
        type: "ai", 
        message: "That's a great question! Based on your current progress in React, I recommend focusing on...", 
        time: "Just now" 
      }
    ]);
    setQuestion("");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-warning/10 text-warning border-warning/20";
      case "low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
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
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Coach</h1>
            <p className="text-muted-foreground">Your personalized learning companion powered by advanced AI</p>
          </div>
          <Badge className="bg-gradient-primary text-white">
            <Sparkles className="w-4 h-4 mr-1" />
            AI Powered
          </Badge>
        </div>
      </motion.div>

      {/* Coach Overview */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-primary text-white shadow-primary">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Your AI Learning Coach</h3>
                <p className="text-white/90 mb-3">
                  I've analyzed your 21-day learning journey and identified key optimization opportunities.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm">4 chains analyzed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">85% improvement potential</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Chat Interface */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="p-6 bg-card shadow-card h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Chat with AI Coach</h3>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Clear Chat
              </Button>
            </div>
            
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      chat.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{chat.message}</p>
                    <p className="text-xs opacity-70 mt-1">{chat.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input Area */}
            <div className="flex space-x-2">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your AI coach anything about your learning journey..."
                className="flex-1 min-h-[40px] resize-none"
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
              />
              <Button onClick={sendMessage} className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Quick Questions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {["How can I improve my React skills?", "What should I study tomorrow?", "Help me plan my week"].map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuestion(q)}
                  className="text-xs"
                >
                  {q}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* AI Suggestions */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-card shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">AI Suggestions</h3>
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getPriorityColor(suggestion.priority)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-xs opacity-90 mb-3">{suggestion.description}</p>
                  <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                    Apply Suggestion <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Insights */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-card shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Weekly AI Insights</h3>
            <Badge variant="secondary">Updated daily</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {weeklyInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">{insight.metric}</h4>
                  <div className={`flex items-center ${
                    insight.trend === "up" ? "text-success" : "text-warning"
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${insight.trend === "down" ? "rotate-180" : ""}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{insight.value}%</div>
                <p className="text-xs text-muted-foreground">{insight.insight}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Action Items */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-secondary text-white shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recommended Actions</h3>
            <Target className="w-5 h-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <Clock className="w-6 h-6 mb-2" />
              <h4 className="font-medium mb-1">Optimize Timing</h4>
              <p className="text-sm text-white/80">Study React concepts at 9 AM for 23% better retention</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <BookOpen className="w-6 h-6 mb-2" />
              <h4 className="font-medium mb-1">Fill Knowledge Gaps</h4>
              <p className="text-sm text-white/80">Focus on Python loops to maintain balanced progress</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <Zap className="w-6 h-6 mb-2" />
              <h4 className="font-medium mb-1">Boost Motivation</h4>
              <p className="text-sm text-white/80">Join React study group to increase engagement by 40%</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Coach;