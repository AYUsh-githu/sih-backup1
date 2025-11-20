import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import {
    Brain,
    Heart,
    Activity,
    Lightbulb,
    CheckCircle,
    Target,
    ArrowRight,
    BookOpen,
    Shield,
    Sun,
    Users,
    Smile
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ResilienceArticle: React.FC = () => {
    const navigate = useNavigate();
    const [assessmentScore, setAssessmentScore] = useState([5]);
    const [completedSections, setCompletedSections] = useState<string[]>([]);

    const toggleSection = (section: string) => {
        if (completedSections.includes(section)) {
            setCompletedSections(completedSections.filter(s => s !== section));
        } else {
            setCompletedSections([...completedSections, section]);
        }
    };

    const pillars = [
        { title: 'Physical', items: ['Regular exercise', 'Adequate sleep', 'Healthy nutrition', 'Relaxation techniques'] },
        { title: 'Mental', items: ['Positive thinking', 'Problem-solving skills', 'Goal setting', 'Continuous learning'] },
        { title: 'Social', items: ['Strong relationships', 'Community connection', 'Seeking support', 'Helping others'] },
    ];

    const strategies = [
        {
            icon: Sun,
            title: 'Cultivate Optimism',
            description: 'Focus on what you can control and maintain a hopeful outlook.',
            color: 'from-yellow-500 to-orange-500',
        },
        {
            icon: Users,
            title: 'Build Connections',
            description: 'Prioritize relationships with empathetic and understanding people.',
            color: 'from-blue-500 to-indigo-500',
        },
        {
            icon: Shield,
            title: 'Embrace Change',
            description: 'Accept that change is a part of life and adapt to new circumstances.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Smile,
            title: 'Practice Self-Care',
            description: 'Pay attention to your own needs and feelings.',
            color: 'from-pink-500 to-rose-500',
        },
    ];

    const exercises = [
        { name: 'Gratitude Journaling', duration: '5 min', completed: false },
        { name: 'Reframing Thoughts', duration: '10 min', completed: false },
        { name: 'Setting Small Goals', duration: '15 min', completed: false },
        { name: 'Mindful Reflection', duration: '8 min', completed: false },
    ];

    const getScoreInterpretation = (score: number) => {
        if (score <= 4) return { text: 'Developing Resilience', color: 'text-orange-500' };
        if (score <= 7) return { text: 'Moderate Resilience', color: 'text-yellow-500' };
        return { text: 'High Resilience', color: 'text-green-500' };
    };

    const interpretation = getScoreInterpretation(assessmentScore[0]);

    return (
        <DashboardLayout userType="student">
            <div className="space-y-8 animate-fade-in pb-12">
                {/* Hero Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-wellness-warm via-wellness-serene to-wellness-calm p-8 md:p-12 text-white">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 max-w-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Building Resilience in Daily Life
                            </h1>
                        </div>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Discover how to bounce back from challenges, adapt to change, and grow stronger through adversity.
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                {/* Progress Tracker */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-wellness-calm" />
                            Your Progress
                        </CardTitle>
                        <CardDescription>
                            {completedSections.length} of 4 sections completed
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress value={(completedSections.length / 4) * 100} className="h-2" />
                    </CardContent>
                </Card>

                {/* What is Resilience Section */}
                <Card className="glass-card border-0 tilt-card">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                                    <Lightbulb className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">What is Resilience?</CardTitle>
                                    <CardDescription>Understanding the core concept</CardDescription>
                                </div>
                            </div>
                            <Button
                                variant={completedSections.includes('about') ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => toggleSection('about')}
                            >
                                {completedSections.includes('about') ? (
                                    <CheckCircle className="w-4 h-4" />
                                ) : (
                                    'Mark Complete'
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                            Resilience is the process of adapting well in the face of adversity, trauma, tragedy, threats, or significant sources of stress.
                            It means "bouncing back" from difficult experiences.
                        </p>
                        <div className="p-4 rounded-lg bg-wellness-calm/10 border border-wellness-calm/20">
                            <p className="text-sm">
                                <strong className="text-wellness-calm">Key Insight:</strong> Resilience is not a trait that people either have or do not have.
                                It involves behaviors, thoughts, and actions that can be learned and developed in anyone.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Pillars of Resilience */}
                <Card className="glass-card border-0 tilt-card">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                                    <Activity className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">Pillars of Resilience</CardTitle>
                                    <CardDescription>Foundations for a strong mind</CardDescription>
                                </div>
                            </div>
                            <Button
                                variant={completedSections.includes('pillars') ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => toggleSection('pillars')}
                            >
                                {completedSections.includes('pillars') ? (
                                    <CheckCircle className="w-4 h-4" />
                                ) : (
                                    'Mark Complete'
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            {pillars.map((category, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-lg bg-gradient-to-br from-background/50 to-background/80 border border-border/50"
                                >
                                    <h4 className="font-semibold mb-3 text-lg">{category.title}</h4>
                                    <ul className="space-y-2">
                                        {category.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <CheckCircle className="w-4 h-4 text-wellness-calm mt-0.5 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Strategies Section */}
                <Card className="glass-card border-0 tilt-card">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">Building Strategies</CardTitle>
                                    <CardDescription>Practical ways to grow</CardDescription>
                                </div>
                            </div>
                            <Button
                                variant={completedSections.includes('strategies') ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => toggleSection('strategies')}
                            >
                                {completedSections.includes('strategies') ? (
                                    <CheckCircle className="w-4 h-4" />
                                ) : (
                                    'Mark Complete'
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            {strategies.map((strategy, index) => (
                                <div
                                    key={index}
                                    className="group p-6 rounded-xl bg-gradient-to-br from-background/50 to-background/80 border border-border/50 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${strategy.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <strategy.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-lg mb-2">{strategy.title}</h4>
                                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Exercises Section */}
                <Card className="glass-card border-0 tilt-card">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">Resilience Exercises</CardTitle>
                                    <CardDescription>Daily practices for strength</CardDescription>
                                </div>
                            </div>
                            <Button
                                variant={completedSections.includes('exercises') ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => toggleSection('exercises')}
                            >
                                {completedSections.includes('exercises') ? (
                                    <CheckCircle className="w-4 h-4" />
                                ) : (
                                    'Mark Complete'
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {exercises.map((exercise, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-background/50 to-background/80 border border-border/50 hover:border-wellness-calm/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                                            <Activity className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h5 className="font-medium">{exercise.name}</h5>
                                            <p className="text-xs text-muted-foreground">{exercise.duration}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">Start</Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Self-Assessment Section */}
                <Card className="glass-card border-0 tilt-card">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Resilience Check-in</CardTitle>
                                <CardDescription>How resilient do you feel today?</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span>Current Resilience Level</span>
                                <span className={`font-semibold ${interpretation.color}`}>
                                    {assessmentScore[0]}/10 - {interpretation.text}
                                </span>
                            </div>
                            <Slider
                                value={assessmentScore}
                                onValueChange={setAssessmentScore}
                                max={10}
                                min={1}
                                step={1}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Developing</span>
                                <span>Moderate</span>
                                <span>High</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-wellness-peaceful/10 border border-wellness-peaceful/20">
                            <p className="text-sm">
                                <strong className="text-wellness-peaceful">Note:</strong> Resilience fluctuates. It's okay to have days where you feel less strong.
                                Consistency in practice is key.
                            </p>
                        </div>

                        <Button className="w-full" variant="outline">
                            Explore More Resources
                        </Button>
                    </CardContent>
                </Card>

                {/* Footer */}
                <Card className="glass-card border-0 bg-gradient-to-br from-wellness-calm/10 via-wellness-serene/10 to-wellness-peaceful/10">
                    <CardContent className="p-8">
                        <div className="text-center space-y-6">
                            <div className="max-w-2xl mx-auto">
                                <p className="text-2xl font-semibold text-wellness-calm mb-2">
                                    "The greatest glory in living lies not in never falling, but in rising every time we fall."
                                </p>
                                <p className="text-sm text-muted-foreground">— Nelson Mandela</p>
                            </div>

                            <div className="pt-6 border-t border-border/50">
                                <h3 className="text-lg font-semibold mb-4">Continue Your Journey</h3>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <Button
                                        variant="outline"
                                        className="group"
                                        onClick={() => navigate('/student-dashboard/resources-hub')}
                                    >
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        Back to Resources
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};
