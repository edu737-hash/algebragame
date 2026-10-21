import React from 'react';
import { Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface TopBarProps {
  totalStars: number;
  maxStars: number;
  muted: boolean;
  onToggleMute: () => void;
  onResetProgress: () => void;
  onOpenLab: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  totalStars,
  maxStars,
  muted,
  onToggleMute,
  onResetProgress,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Brand Zone with cute penguin avatar */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-amber-300/60 bg-amber-50 flex items-center justify-center p-0.5 shadow-xs">
            <img 
              src="/assets/penguins/not_my_type_book.png" 
              alt="Penguin Mascot" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800 tracking-tight whitespace-nowrap">
              펭귄의 알제브라
            </span>
            <span className="text-[10px] text-slate-500 -mt-0.5 whitespace-nowrap font-medium">
              현대대수학 모바일 퍼즐
            </span>
          </div>
        </div>

        {/* Action & Stats Zone */}
        <div className="flex items-center gap-2">
          {/* Star Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200/90 text-xs font-bold text-amber-800 tabular-nums shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{totalStars}</span>
            <span className="text-amber-600/70 text-[10px] font-normal">/ {maxStars}★</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              sound.playTap();
            }}
            aria-label={muted ? '소리 켜기' : '소리 끄기'}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Reset progress */}
          <button
            onClick={() => {
              sound.playTap();
              if (window.confirm('모든 진행 상황과 별점을 초기화하시겠습니까?')) {
                onResetProgress();
              }
            }}
            title="진행률 초기화"
            aria-label="진행률 초기화"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
