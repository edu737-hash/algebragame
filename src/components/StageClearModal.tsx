import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, ArrowRight, RotateCcw } from 'lucide-react';
import { Stage } from '../types/algebra';
import { sound } from '../utils/audio';

interface StageClearModalProps {
  stage: Stage;
  stars: number;
  score: number;
  onNextStage: () => void;
  onRetry: () => void;
  onClose: () => void;
}

export const StageClearModal: React.FC<StageClearModalProps> = ({
  stage,
  stars,
  onNextStage,
  onRetry,
}) => {
  useEffect(() => {
    sound.playVictory();
    try {
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#0284C7', '#10B981', '#EC4899', '#FBBF24'],
      });
    } catch {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center space-y-4">
        {/* Soft yellow/sky radial glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-100 rounded-full blur-2xl pointer-events-none" />

        {/* Penguin Mascot Celebration */}
        <div className="flex flex-col items-center justify-center pt-1">
          <div className="w-24 h-24 relative mb-1 animate-bounce">
            <img
              src="/assets/penguins/proud_snowman.png"
              alt="Proud Penguin"
              className="w-full h-full object-contain filter drop-shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-bold text-amber-900 shadow-xs">
            "나 좀 잘한 듯!"
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            스테이지 클리어!
          </h3>
          <p className="text-xs text-sky-700 font-semibold mt-0.5">
            {stage.conceptName}
          </p>
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 py-0.5">
          {[1, 2, 3].map((starNum) => (
            <Star
              key={starNum}
              className={`w-8 h-8 transition-all ${
                starNum <= stars
                  ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-sm'
                  : 'text-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Math Commentary Box */}
        <div className="text-left bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5 shadow-inner">
          <div className="text-xs font-bold text-sky-800 tracking-wide flex items-center gap-1.5">
            <span>대수학 원리 해설</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            {stage.mathExplanation}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => {
              sound.playTap();
              onRetry();
            }}
            className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200/80 active:scale-95 text-slate-700 border border-slate-200 font-bold text-xs transition-all"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            다시 풀기
          </button>
          <button
            onClick={() => {
              sound.playTap();
              onNextStage();
            }}
            className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs shadow-md shadow-amber-400/20 transition-all"
          >
            다음 단계
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
