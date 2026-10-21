import React from 'react';
import { Target, Triangle, Grid3X3, Shuffle, BookOpen } from 'lucide-react';
import { TabType } from '../types/algebra';
import { sound } from '../utils/audio';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'campaign' as TabType, label: '퀘스트', icon: Target },
    { id: 'symmetry' as TabType, label: '대칭 배틀', icon: Triangle },
    { id: 'cayley' as TabType, label: '케일리 표', icon: Grid3X3 },
    { id: 'permutation' as TabType, label: '치환 루프', icon: Shuffle },
    { id: 'lab' as TabType, label: '도감·실험실', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-md pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playTap();
                onSelectTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center h-full w-full min-h-[44px] min-w-[44px] transition-all ${
                isActive
                  ? 'text-sky-600 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  isActive ? 'bg-sky-50 text-sky-600 shadow-xs' : ''
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-sky-600 stroke-[2.4]' : 'text-slate-400'
                  }`}
                />
              </div>
              <span className="text-[11px] tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
