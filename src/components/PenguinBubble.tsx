import React from 'react';
import { PENGUINS, PenguinSticker } from '../data/penguins';

interface PenguinBubbleProps {
  penguinId?: string;
  sticker?: PenguinSticker;
  customQuote?: string;
  subtitle?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  reverse?: boolean;
}

export const PenguinBubble: React.FC<PenguinBubbleProps> = ({
  penguinId = 'not_my_type_book',
  sticker,
  customQuote,
  subtitle,
  className = '',
  size = 'md',
  reverse = false,
}) => {
  const currentSticker = sticker || PENGUINS[penguinId] || PENGUINS.not_my_type_book;
  const quote = customQuote || currentSticker.quote;

  const sizeStyles = {
    sm: { img: 'w-12 h-12', text: 'text-xs', pad: 'px-2.5 py-1.5' },
    md: { img: 'w-16 h-16', text: 'text-xs sm:text-sm', pad: 'px-3.5 py-2' },
    lg: { img: 'w-24 h-24', text: 'text-sm sm:text-base', pad: 'px-4 py-2.5' },
  }[size];

  return (
    <div
      className={`flex items-center gap-2.5 ${reverse ? 'flex-row-reverse' : 'flex-row'} ${className}`}
    >
      {/* Penguin Sticker Image */}
      <div className={`relative shrink-0 ${sizeStyles.img} transition-transform hover:scale-105`}>
        <img
          src={currentSticker.image}
          alt={currentSticker.name}
          className="w-full h-full object-contain filter drop-shadow-sm"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to original image if needed
            (e.target as HTMLImageElement).src = '/assets/aistudio/image_3b1c583c.png';
          }}
        />
      </div>

      {/* Comic Speech Bubble */}
      <div
        className={`relative bg-white border-2 border-slate-200/90 rounded-2xl ${sizeStyles.pad} shadow-sm max-w-[280px] sm:max-w-xs`}
      >
        {/* Little bubble triangle arrow */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent ${
            reverse
              ? '-right-2 border-l-[8px] border-l-white'
              : '-left-2 border-r-[8px] border-r-white'
          }`}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[7px] border-y-transparent -z-10 ${
            reverse
              ? '-right-2.5 border-l-[9px] border-l-slate-300'
              : '-left-2.5 border-r-[9px] border-r-slate-300'
          }`}
        />

        <div className={`font-bold text-slate-800 ${sizeStyles.text} tracking-tight leading-snug`}>
          "{quote}"
        </div>
        {subtitle && (
          <div className="text-[11px] text-slate-500 font-normal mt-0.5 leading-tight">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
