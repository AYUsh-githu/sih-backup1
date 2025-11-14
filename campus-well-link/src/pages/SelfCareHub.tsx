import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Wind, 
  Brain, 
  Zap, 
  BookOpen, 
  Moon, 
  Star,
  Target,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BreathingExercise } from '@/components/BreathingExercise';

export const SelfCareHub: React.FC = () => {
  const [isQuickRelaxOpen, setIsQuickRelaxOpen] = useState(false);
  
  // Mock data for user progress
  const currentStreak = 15;
  const dailyGoal = 5;
  const completedToday = 3;
  const progressPercentage = (completedToday / dailyGoal) * 100;

  const featuredCategories = [
    {
      id: 'breathing',
      title: 'Breathing',
      description: 'Calm your mind with guided breathing exercises',
      icon: Wind,
      color: 'from-blue-500 to-cyan-500',
      count: 8
    },
    {
      id: 'meditation',
      title: 'Meditation',
      description: 'Find inner peace through mindful meditation',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      count: 12
    },
    {
      id: 'movement',
      title: 'Movement',
      description: 'Energize your body with gentle exercises',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      count: 6
    },
    {
      id: 'journaling',
      title: 'Journaling',
      description: 'Reflect and express through guided writing',
      icon: BookOpen,
      color: 'from-green-500 to-teal-500',
      count: 10
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness',
      description: 'Stay present with awareness practices',
      icon: Moon,
      color: 'from-indigo-500 to-purple-500',
      count: 7
    }
  ];

  const recommendedActivities = [
    {
      id: '1',
      title: '4-7-8 Breathing',
      category: 'Breathing',
      duration: 5,
      popularity: 'trending',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Morning Gratitude',
      category: 'Journaling',
      duration: 8,
      popularity: 'popular',
      difficulty: 'beginner'
    },
    {
      id: '3',
      title: 'Body Scan Meditation',
      category: 'Meditation',
      duration: 15,
      popularity: 'recommended',
      difficulty: 'intermediate'
    },
    {
      id: '4',
      title: 'Gentle Stretching',
      category: 'Movement',
      duration: 10,
      popularity: 'trending',
      difficulty: 'beginner'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to SelfCare page with category filter
    window.location.href = `/self-care?category=${categoryId}`;
  };

  const handleQuickRelax = () => {
    setIsQuickRelaxOpen(true);
  };

  return (
    <DashboardLayout userType="student">
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Banner */}
        <div className="relative glass-card p-8 text-center tilt-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-wellness-calm/20 to-wellness-peaceful/20" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-wellness-warm" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-wellness-calm to-wellness-peaceful bg-clip-text text-transparent">
                Your Self-Care Journey
              </h1>
              <Sparkles className="w-6 h-6 text-wellness-warm" />
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Take a moment for yourself with personalized wellness activities
            </p>
            
            {/* Streak and Progress */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-wellness-warm" />
                <div>
                  <div className="text-2xl font-bold text-wellness-warm">{currentStreak} days</div>
                  <div className="text-sm text-muted-foreground">Current streak</div>
                </div>
              </div>
              
              <div className="w-px h-16 bg-white/20 hidden md:block" />
              
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-wellness-calm" />
                <div>
                  <div className="text-2xl font-bold text-wellness-calm">{completedToday}/{dailyGoal}</div>
                  <div className="text-sm text-muted-foreground">Today's progress</div>
                </div>
              </div>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {progressPercentage >= 100 
                  ? "🎉 Daily goal achieved! Amazing work!" 
                  : `${dailyGoal - completedToday} more activities to reach your goal`
                }
              </p>
            </div>

            {/* Quick Relax Button */}
            <Button 
              onClick={handleQuickRelax}
              className="mt-6 bg-gradient-to-r from-wellness-calm to-wellness-peaceful hover:from-wellness-calm/90 hover:to-wellness-peaceful/90 text-white border-0 px-8 py-3"
              size="lg"
            >
              <Wind className="w-5 h-5 mr-2" />
              Quick Relax (2 min)
            </Button>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Featured Categories</h2>
            <p className="text-muted-foreground">Choose an activity type that suits your current mood</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  className="glass-card border-0 hover:shadow-xl transition-all duration-500 cursor-pointer tilt-card group"
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">{category.count} activities</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                    <Button className="w-full btn-glass group-hover:bg-white/30">
                      Explore {category.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recommended for You */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Recommended for You</h2>
            <p className="text-muted-foreground">Based on your recent activities and wellness goals</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedActivities.map((activity, index) => (
              <Card
                key={activity.id}
                className="glass-card border-0 hover:shadow-xl transition-all duration-500 cursor-pointer tilt-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {activity.popularity === 'trending' && (
                        <div className="flex items-center gap-1 text-xs bg-wellness-warm/20 text-wellness-warm px-2 py-1 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                      {activity.popularity === 'popular' && (
                        <div className="flex items-center gap-1 text-xs bg-wellness-calm/20 text-wellness-calm px-2 py-1 rounded-full">
                          <Star className="w-3 h-3" />
                          Popular
                        </div>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {activity.category} • {activity.duration} min • {activity.difficulty}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full btn-glass group-hover:bg-white/30" size="sm">
                    Start Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card border-0 tilt-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Minutes</CardTitle>
              <Heart className="h-4 w-4 text-wellness-calm" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wellness-calm">127</div>
              <p className="text-xs text-muted-foreground">+23 from last week</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 tilt-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Activity</CardTitle>
              <Wind className="h-4 w-4 text-wellness-peaceful" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-wellness-peaceful">Breathing</div>
              <p className="text-xs text-muted-foreground">12 sessions this week</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 tilt-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-wellness-warm" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-wellness-warm">8</div>
              <p className="text-xs text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BreathingExercise 
        isOpen={isQuickRelaxOpen} 
        onClose={() => setIsQuickRelaxOpen(false)}
        duration={120} // 2 minutes for quick relax
      />
    </DashboardLayout>
  );
};