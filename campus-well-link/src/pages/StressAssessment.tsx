import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Heart, Calendar } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "How often do you feel overwhelmed?",
    options: ["Never", "Sometimes", "Often", "Always"]
  },
  {
    id: 2,
    question: "Do you have trouble sleeping because of stress?",
    options: ["Never", "Sometimes", "Often", "Always"]
  },
  {
    id: 3,
    question: "How often do you feel anxious or worried?",
    options: ["Never", "Sometimes", "Often", "Always"]
  },
  {
    id: 4,
    question: "Do you find it difficult to concentrate?",
    options: ["Never", "Sometimes", "Often", "Always"]
  },
  {
    id: 5,
    question: "How often do you feel irritable or short-tempered?",
    options: ["Never", "Sometimes", "Often", "Always"]
  },
  {
    id: 6,
    question: "Do you experience physical symptoms like headaches or muscle tension?",
    options: ["Never", "Sometimes", "Often", "Always"]
  },
  {
    id: 7,
    question: "How often do you feel like you have too much to handle?",
    options: ["Never", "Sometimes", "Often", "Always"]
  },
  {
    id: 8,
    question: "Do you have difficulty relaxing or unwinding?",
    options: ["Never", "Sometimes", "Often", "Always"]
  }
];

export const StressAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stressLevel, setStressLevel] = useState<'Low' | 'Moderate' | 'High'>('Low');

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateStressLevel = () => {
    const scores = Object.values(answers).map(answer => {
      switch (answer) {
        case 'Never': return 0;
        case 'Sometimes': return 1;
        case 'Often': return 2;
        case 'Always': return 3;
        default: return 0;
      }
    });

    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage < 30) return 'Low';
    if (percentage < 60) return 'Moderate';
    return 'High';
  };

  const handleSubmit = () => {
    const level = calculateStressLevel();
    setStressLevel(level);
    setIsSubmitted(true);
  };

  const getStressMessage = () => {
    switch (stressLevel) {
      case 'Low':
        return {
          message: "Your stress levels appear to be manageable. Keep up the good work with your current coping strategies!",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200"
        };
      case 'Moderate':
        return {
          message: "You're experiencing moderate stress levels. Consider implementing some stress-reduction techniques in your daily routine.",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200"
        };
      case 'High':
        return {
          message: "Your stress levels are quite high. It would be beneficial to speak with a counselor and explore stress management strategies.",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200"
        };
    }
  };

  if (isSubmitted) {
    const stressInfo = getStressMessage();
    
    return (
      <DashboardLayout userType="student">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/student-dashboard/ai')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Assessment Complete</h1>
              <p className="text-muted-foreground">Your stress assessment results</p>
            </div>
          </div>

          <Card className="glass-card border-0">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Stress Level</h2>
                <Badge 
                  variant="secondary" 
                  className={`text-lg px-4 py-2 ${stressInfo.color} ${stressInfo.bgColor} ${stressInfo.borderColor} border`}
                >
                  {stressLevel}
                </Badge>
              </div>

              <p className={`text-lg ${stressInfo.color} max-w-md mx-auto`}>
                {stressInfo.message}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/self-care-hub')}
                  className="flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Explore Self-Care
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/student-dashboard/booking')}
                  className="flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/student-dashboard/ai')}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Stress Assessment</h1>
            <p className="text-muted-foreground">Answer a few quick questions to check your stress levels.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[questions[currentQuestion].id] || ""}
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!answers[questions[currentQuestion].id]}
                    className="bg-gradient-primary"
                  >
                    Submit Assessment
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!answers[questions[currentQuestion].id]}
                    className="bg-gradient-primary"
                  >
                    Next
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};