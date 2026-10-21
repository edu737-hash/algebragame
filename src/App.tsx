/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, UserProgress } from './types/algebra';
import { STAGES } from './data/stages';
import { sound } from './utils/audio';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { CampaignView } from './components/CampaignView';
import { SymmetryGame } from './components/SymmetryGame';
import { CayleySudokuGame } from './components/CayleySudokuGame';
import { PermutationGame } from './components/PermutationGame';
import { AlgebraLab } from './components/AlgebraLab';

const STORAGE_KEY = 'algebra_odyssey_progress';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('campaign');
  const [muted, setMuted] = useState<boolean>(sound.isMuted());
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      completedStages: {},
      totalStars: 0,
      symmetryBestStreak: 0,
      cayleyPuzzlesSolved: 0,
      permutationBestMoves: {},
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const handleStageComplete = (stageId: number, stars: number) => {
    setProgress((prev) => {
      const existing = prev.completedStages[stageId];
      const bestStars = existing ? Math.max(existing.stars, stars) : stars;

      const nextCompleted = {
        ...prev.completedStages,
        [stageId]: {
          stars: bestStars,
          highscore: 100,
        },
      };

      const totalStars = Object.values(nextCompleted).reduce(
        (sum, item) => sum + item.stars,
        0
      );

      return {
        ...prev,
        completedStages: nextCompleted,
        totalStars,
      };
    });
  };

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setMuted(nextMuted);
  };

  const handleResetProgress = () => {
    const resetData: UserProgress = {
      completedStages: {},
      totalStars: 0,
      symmetryBestStreak: 0,
      cayleyPuzzlesSolved: 0,
      permutationBestMoves: {},
    };
    setProgress(resetData);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('algebra_symmetry_best');
      localStorage.removeItem('algebra_cayley_solved');
    } catch {}
  };

  const maxStars = STAGES.length * 3;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-amber-300 selection:text-slate-900">
      {/* Top Header Bar */}
      <TopBar
        totalStars={progress.totalStars}
        maxStars={maxStars}
        muted={muted}
        onToggleMute={handleToggleMute}
        onResetProgress={handleResetProgress}
        onOpenLab={() => setActiveTab('lab')}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-2xl mx-auto flex flex-col">
        {activeTab === 'campaign' && (
          <CampaignView
            progress={progress}
            onStageComplete={handleStageComplete}
            onJumpToTab={setActiveTab}
          />
        )}

        {activeTab === 'symmetry' && <SymmetryGame />}

        {activeTab === 'cayley' && <CayleySudokuGame />}

        {activeTab === 'permutation' && <PermutationGame />}

        {activeTab === 'lab' && <AlgebraLab />}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
    </div>
  );
}
