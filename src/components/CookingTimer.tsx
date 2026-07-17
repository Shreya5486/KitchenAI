import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';

interface CookingTimerProps {
  durationMinutes: number;
  stepNumber: number;
}

export default function CookingTimer({ durationMinutes, stepNumber }: CookingTimerProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(durationMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset timer when duration changes (e.g. on new recipes or step changes)
    setSecondsRemaining(durationMinutes * 60);
    setIsActive(false);
  }, [durationMinutes]);

  useEffect(() => {
    if (isActive && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isActive) {
      setIsActive(false);
      triggerAlarmSound();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, secondsRemaining]);

  // Synthesize a digital kitchen timer alarm sound using Web Audio API
  const triggerAlarmSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Make a neat double-beep kitchen sound
      const playBeep = (delay: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime + delay);
        
        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + delay + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.25);
        
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.3);
      };

      playBeep(0);
      playBeep(0.3);
      playBeep(0.6);
    } catch (e) {
      console.warn("Web Audio API blocked or not supported on this browser:", e);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsRemaining(durationMinutes * 60);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((durationMinutes * 60 - secondsRemaining) / (durationMinutes * 60)) * 100;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3 shadow-inner my-2 font-sans">
      <div className="flex items-center gap-2">
        <span className="flex h-2.5 w-2.5 relative">
          {isActive && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
          )}
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
        </span>
        <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
          Step {stepNumber} Timer
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Progress Display */}
        <div className="text-lg font-mono font-bold text-slate-800 bg-white px-2.5 py-0.5 rounded border border-slate-200 min-w-[70px] text-center">
          {formatTime(secondsRemaining)}
        </div>

        {/* Buttons */}
        <div className="flex gap-1">
          <button
            onClick={toggleTimer}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isActive
                ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700 font-medium'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
            }`}
            title={isActive ? 'Pause' : 'Start'}
          >
            {isActive ? <Pause size={14} /> : <Play size={14} className="fill-slate-600 text-slate-600 ml-0.5" />}
          </button>
          
          <button
            onClick={resetTimer}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-400 cursor-pointer transition-all"
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {secondsRemaining === 0 && (
        <span className="flex items-center gap-1 text-xs font-semibold text-indigo-700 animate-pulse bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 mt-2 sm:mt-0 font-mono">
          <Bell size={12} /> Time's up!
        </span>
      )}

      {/* Progress Bar background */}
      <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-2 sm:hidden">
        <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
      </div>
    </div>
  );
}
