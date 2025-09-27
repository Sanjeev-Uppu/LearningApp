import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Zap, Target, TrendingUp, Users, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Multiple Learning Chains",
      description: "Create unlimited learning paths with custom milestones and track your progress across different subjects."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Recovery",
      description: "Missed a day? Our AI coach creates compressed recovery plans to get you back on track quickly."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Smart Analytics",
      description: "Detailed insights into your learning patterns, progress charts, and personalized recommendations."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Learning Community",
      description: "Share plans, compete on leaderboards, and learn from thousands of successful learning journeys."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Gamification",
      description: "Earn XP, unlock badges, and complete weekly challenges to stay motivated on your learning journey."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Coach",
      description: "Get daily lesson suggestions, motivational tips, and personalized learning resource recommendations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">ConsistAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-glass-bg border border-glass-border text-white hover:bg-white/20">
              🚀 AI-Powered Learning Consistency
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Never Break Your
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Learning Streak </span>
              Again
            </h1>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              ConsistAI helps you maintain learning consistency with AI-powered recovery plans, 
              smart analytics, and a supportive community of learners.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-glow px-8 py-4 text-lg font-semibold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning Journey
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Streak Counter - Only show when user is logged in */}
            <Card className="inline-block bg-glass-bg border border-glass-border backdrop-blur-xl p-6 mb-16">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">0 Days</div>
                  <div className="text-white/60">Start Your Streak</div>
                </div>
                <div className="text-4xl">🔥</div>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Stay Consistent
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Powerful features designed to help you build and maintain learning habits that stick.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-glass-bg border border-glass-border backdrop-blur-xl p-6 hover:shadow-glow transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <Card className="bg-glass-bg border border-glass-border backdrop-blur-xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who've built consistent study habits with ConsistAI.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow px-12 py-4 text-lg font-semibold">
                Get Started Free
              </Button>
            </Link>
            <p className="text-white/60 mt-4">No credit card required • 7-day free trial</p>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;