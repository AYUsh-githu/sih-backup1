import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Target, 
  Heart, 
  Moon, 
  Apple, 
  Dumbbell, 
  Brain,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Sparkles
} from 'lucide-react';

const wellnessGoals = [
  {
    id: 1,
    category: 'Sleep',
    icon: Moon,
    title: 'Improve Sleep Quality',
    progress: 65,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    tasks: [
      { id: 1, text: 'Sleep 7-8 hours tonight', completed: true },
      { id: 2, text: 'No screens 30min before bed', completed: false },
      { id: 3, text: 'Create a bedtime routine', completed: false }
    ]
  },
  {
    id: 2,
    category: 'Exercise',
    icon: Dumbbell,
    title: 'Stay Active Daily',
    progress: 80,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    tasks: [
      { id: 1, text: '30min walk or exercise', completed: true },
      { id: 2, text: 'Stretch for 10 minutes', completed: true },
      { id: 3, text: 'Try a new activity', completed: false }
    ]
  },
  {
    id: 3,
    category: 'Nutrition',
    icon: Apple,
    title: 'Healthy Eating Habits',
    progress: 55,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    tasks: [
      { id: 1, text: 'Drink 8 glasses of water', completed: false },
      { id: 2, text: 'Eat 3 balanced meals', completed: true },
      { id: 3, text: 'Include fruits & vegetables', completed: true }
    ]
  },
  {
    id: 4,
    category: 'Mental Health',
    icon: Brain,
    title: 'Mindfulness & Relaxation',
    progress: 70,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    tasks: [
      { id: 1, text: '10min meditation session', completed: true },
      { id: 2, text: 'Practice gratitude journaling', completed: true },
      { id: 3, text: 'Breathing exercises', completed: false }
    ]
  }
];

const weeklyStats = [
  { day: 'Mon', completed: 75 },
  { day: 'Tue', completed: 80 },
  { day: 'Wed', completed: 60 },
  { day: 'Thu', completed: 85 },
  { day: 'Fri', completed: 70 },
  { day: 'Sat', completed: 90 },
  { day: 'Sun', completed: 65 }
];

const recommendations = [
  {
    title: 'Morning Routine',
    description: 'Start your day with a 5-minute stretching session',
    icon: Sparkles,
    color: 'text-yellow-500'
  },
  {
    title: 'Hydration Reminder',
    description: 'Drink a glass of water every 2 hours',
    icon: Heart,
    color: 'text-blue-500'
  },
  {
    title: 'Evening Wind-Down',
    description: 'Read for 15 minutes before bed',
    icon: Moon,
    color: 'text-purple-500'
  }
];

export const WellnessPlan: React.FC = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState(wellnessGoals);

  const toggleTask = (goalId: number, taskId: number) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === goalId
          ? {
              ...goal,
              tasks: goal.tasks.map(task =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : goal
      )
    );
  };

  const overallProgress = goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length;

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/student-dashboard/ai')}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">My Wellness Plan</h1>
            <p className="text-muted-foreground">Track your daily wellness goals and habits</p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {Math.round(overallProgress)}% Complete
          </Badge>
        </div>

        {/* Overall Progress */}
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Overall Wellness Score</h3>
                  <p className="text-sm text-muted-foreground">Keep up the great work!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-wellness-calm">{Math.round(overallProgress)}</div>
                <p className="text-sm text-muted-foreground">out of 100</p>
              </div>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="goals" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="goals">Daily Goals</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="tips">Recommendations</TabsTrigger>
          </TabsList>

          {/* Daily Goals Tab */}
          <TabsContent value="goals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <Card key={goal.id} className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${goal.bgColor} rounded-xl flex items-center justify-center`}>
                        <goal.icon className={`w-5 h-5 ${goal.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.category}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className={goal.color}>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      {goal.tasks.map((task) => (
                        <div key={task.id} className="flex items-center space-x-3">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(goal.id, task.id)}
                            id={`task-${goal.id}-${task.id}`}
                          />
                          <label
                            htmlFor={`task-${goal.id}-${task.id}`}
                            className={`flex-1 text-sm cursor-pointer ${
                              task.completed ? 'line-through text-muted-foreground' : ''
                            }`}
                          >
                            {task.text}
                          </label>
                          {task.completed && (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-4">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-wellness-calm" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-48">
                  {weeklyStats.map((stat, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full bg-muted/30 rounded-t-lg overflow-hidden">
                        <div
                          className="bg-gradient-primary rounded-t-lg transition-all duration-500"
                          style={{ height: `${stat.completed * 1.5}px` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{stat.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-card border-0">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-wellness-calm mx-auto mb-2" />
                  <div className="text-2xl font-bold mb-1">7</div>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-0">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-wellness-peaceful mx-auto mb-2" />
                  <div className="text-2xl font-bold mb-1">24</div>
                  <p className="text-sm text-muted-foreground">Goals Completed</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-0">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-wellness-warm mx-auto mb-2" />
                  <div className="text-2xl font-bold mb-1">85%</div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="tips" className="space-y-4">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-wellness-serene" />
                  Personalized Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <rec.icon className={`w-5 h-5 ${rec.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-0 bg-gradient-primary text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Heart className="w-12 h-12" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Need Extra Support?</h3>
                    <p className="text-white/90 text-sm">Book a session with a counselor for personalized guidance</p>
                  </div>
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate('/student-dashboard/booking')}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};
