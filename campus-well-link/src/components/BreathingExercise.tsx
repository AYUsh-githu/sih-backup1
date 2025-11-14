import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingExerciseProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // Optional duration in seconds
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ isOpen, onClose, duration = 60 }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [cycleProgress, setCycleProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const breathingPattern = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2
  };

  const phaseTexts = {
    inhale: 'Breathe In...',
    hold: 'Hold...',
    exhale: 'Breathe Out...',
    rest: 'Rest...'
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (isActive) {
      startBreathingCycle();
    } else {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    }

    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    };
  }, [isActive]);

  const startBreathingCycle = () => {
    const phases: Array<keyof typeof breathingPattern> = ['inhale', 'hold', 'exhale', 'rest'];
    let phaseIndex = 0;
    let phaseTime = 0;

    breathingIntervalRef.current = setInterval(() => {
      const currentPhaseKey = phases[phaseIndex];
      const phaseDuration = breathingPattern[currentPhaseKey];
      
      setCurrentPhase(currentPhaseKey);
      setCycleProgress((phaseTime / phaseDuration) * 100);
      
      phaseTime += 0.1;
      
      if (phaseTime >= phaseDuration) {
        phaseTime = 0;
        phaseIndex = (phaseIndex + 1) % phases.length;
      }
    }, 100);
  };

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setTimeLeft(duration);
    setCurrentPhase('inhale');
    setCycleProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCircleScale = () => {
    if (currentPhase === 'inhale') {
      return 0.5 + (cycleProgress / 100) * 0.5; // Scale from 0.5 to 1
    } else if (currentPhase === 'exhale') {
      return 1 - (cycleProgress / 100) * 0.5; // Scale from 1 to 0.5
    }
    return currentPhase === 'hold' ? 1 : 0.5;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-wellness-calm/20 to-wellness-serene/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto glass-card border-0 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-wellness-calm to-wellness-serene bg-clip-text text-transparent">
            Breathing Exercise
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-wellness-calm mb-2">
            {formatTime(timeLeft)}
          </div>
          {timeLeft === 0 && (
            <p className="text-wellness-serene font-medium">Exercise Complete! Well done.</p>
          )}
        </div>

        {/* Breathing Circle */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div 
              className="w-32 h-32 rounded-full bg-gradient-to-br from-wellness-calm to-wellness-serene transition-transform duration-300 ease-in-out flex items-center justify-center shadow-lg"
              style={{ 
                transform: `scale(${getCircleScale()})`,
                filter: 'blur(0.5px)'
              }}
            >
              <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/40" />
              </div>
            </div>
            
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-wellness-calm/20" />
          </div>
        </div>

        {/* Phase Text */}
        <div className="text-center mb-8">
          <p className="text-xl font-medium text-wellness-calm">
            {phaseTexts[currentPhase]}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Follow the circle's rhythm
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleExercise}
            disabled={timeLeft === 0}
            className="bg-gradient-to-r from-wellness-calm to-wellness-serene hover:from-wellness-calm/90 hover:to-wellness-serene/90 text-white border-0"
          >
            {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          
          <Button
            onClick={resetExercise}
            variant="outline"
            className="border-wellness-calm/30 hover:bg-wellness-calm/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 rounded-xl bg-wellness-calm/10 border border-wellness-calm/20">
          <p className="text-sm text-center text-muted-foreground">
            Find a comfortable position and breathe naturally with the rhythm.
            <br />
            Inhale for 4 seconds, hold for 4, exhale for 6, rest for 2.
          </p>
        </div>
      </Card>
    </div>
  );
};