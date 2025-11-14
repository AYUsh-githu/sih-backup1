import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const emotionTags = [
  { label: 'Happy', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
  { label: 'Sad', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
  { label: 'Stressed', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
  { label: 'Excited', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
  { label: 'Anxious', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
  { label: 'Calm', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
  { label: 'Overwhelmed', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200' },
  { label: 'Confident', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' },
];

const moodLabels = [
  'Very Low', 'Low', 'Below Average', 'Fair', 'Average', 
  'Good', 'Very Good', 'Great', 'Excellent', 'Outstanding'
];

export const MoodCheckin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [moodLevel, setMoodLevel] = useState([5]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleSubmit = () => {
    // Here you would typically save the mood check-in data
    setIsSubmitted(true);
    toast({
      title: "Mood check-in submitted!",
      description: "Thank you for sharing your feelings. Your wellness journey matters.",
    });
    
    // Auto-redirect after 3 seconds
    setTimeout(() => {
      navigate('/student-dashboard/ai');
    }, 3000);
  };

  const getMoodLabel = (value: number) => {
    return moodLabels[value - 1] || 'Average';
  };

  if (isSubmitted) {
    return (
      <DashboardLayout userType="student">
        <div className="max-w-2xl mx-auto mt-12">
          <Card className="glass-card border-0 text-center">
            <CardContent className="pt-12 pb-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-wellness-calm mb-4">
                Thank You!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your mood check-in has been submitted successfully. 
                Your emotional wellness is important to us.
              </p>
              <Button onClick={() => navigate('/student-dashboard/ai')}>
                Back to AI Assistant
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="student">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/student-dashboard/ai')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-wellness-calm to-wellness-serene bg-clip-text text-transparent">
              Mood Check-in
            </h1>
            <p className="text-muted-foreground mt-1">
              How are you feeling today?
            </p>
          </div>
        </div>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-wellness-warm" />
              Share Your Current Mood
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Mood Scale Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Mood Level</h3>
                <Badge variant="secondary" className="bg-wellness-calm/10 text-wellness-calm">
                  {moodLevel[0]}/10 - {getMoodLabel(moodLevel[0])}
                </Badge>
              </div>
              <div className="px-4">
                <Slider
                  value={moodLevel}
                  onValueChange={setMoodLevel}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Very Low</span>
                  <span>Very High</span>
                </div>
              </div>
            </div>

            {/* Emotion Tags */}
            <div className="space-y-4">
              <h3 className="font-semibold">What emotions are you experiencing?</h3>
              <p className="text-sm text-muted-foreground">
                Select all that apply (you can choose multiple)
              </p>
              <div className="flex flex-wrap gap-2">
                {emotionTags.map((emotion) => (
                  <button
                    key={emotion.label}
                    onClick={() => handleEmotionToggle(emotion.label)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedEmotions.includes(emotion.label)
                        ? `${emotion.color} ring-2 ring-offset-2 ring-primary`
                        : `${emotion.color} opacity-60 hover:opacity-100`
                    }`}
                  >
                    {emotion.label}
                  </button>
                ))}
              </div>
              {selectedEmotions.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedEmotions.join(', ')}
                </p>
              )}
            </div>

            {/* Notes Section */}
            <div className="space-y-4">
              <h3 className="font-semibold">Additional Notes (Optional)</h3>
              <p className="text-sm text-muted-foreground">
                Feel free to share more about how you're feeling or what's on your mind
              </p>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="I'm feeling this way because..."
                className="min-h-[120px] resize-none"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {notes.length}/500 characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button 
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-primary hover:opacity-90 transition-opacity"
                size="lg"
              >
                Submit Mood Check-in
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Supportive Message */}
        <Card className="glass-card border-0 bg-wellness-calm/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Remember, it's completely normal to experience a range of emotions. 
                Your feelings are valid, and seeking support is a sign of strength.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};