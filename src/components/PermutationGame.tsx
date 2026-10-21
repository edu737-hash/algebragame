import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, CheckCircle2, ArrowRightLeft, Sparkles, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';
import { PenguinBubble } from './PenguinBubble';

export const PermutationGame: React.FC = () => {
  const [elements, setElements] = useState<number[]>([1, 2, 3, 4, 5]);
  const [targetElements, setTargetElements] = useState<number[]>([3, 1, 5, 2, 4]);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [historyWords, setHistoryWords] = useState<string[]>([]);
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const [showTheory, setShowTheory] = useState<boolean>(false);
  const [penguinStatus, setPenguinStatus] = useState<{ id: string; quote: string }>({
    id: 'my_way',
    quote: '내 맘이다! 두 자리를 탭해서 자리바꿈(호환)해봐!',
  });

  useEffect(() => {
    generateNewTarget();
  }, []);

  const generateNewTarget = () => {
    const arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < 4; i++) {
      const a = Math.floor(Math.random() * 5);
      let b = Math.floor(Math.random() * 5);
      while (b === a) b = Math.floor(Math.random() * 5);
      const tmp = arr[a];
      arr[a] = arr[b];
      arr[b] = tmp;
    }
    setTargetElements([...arr]);
    setElements([1, 2, 3, 4, 5]);
    setSelectedNode(null);
    setMovesCount(0);
    setHistoryWords([]);
    setIsMatched(false);
    setPenguinStatus({
      id: 'my_way',
      quote: '새로운 치환 목표 등장! 순환을 완성해봐!',
    });
  };

  const handleNodeClick = (index: number) => {
    sound.playTap();
    if (selectedNode === null) {
      setSelectedNode(index);
      setPenguinStatus({
        id: 'waiting_coffee',
        quote: `${index + 1}번 자리 선택! 바꿀 다른 자리를 골라줘!`,
      });
    } else if (selectedNode === index) {
      setSelectedNode(null);
      setPenguinStatus({
        id: 'scratch',
        quote: '선택 취소... 다시 골라봐!',
      });
    } else {
      sound.playFlip();
      const next = [...elements];
      const valA = next[selectedNode];
      const valB = next[index];
      next[selectedNode] = valB;
      next[index] = valA;

      const transpositionLabel = `(${selectedNode + 1} ${index + 1})`;
      setHistoryWords([transpositionLabel, ...historyWords]);
      setMovesCount(movesCount + 1);
      setElements(next);
      setSelectedNode(null);

      if (next.every((v, i) => v === targetElements[i])) {
        setIsMatched(true);
        sound.playVictory();
        setPenguinStatus({
          id: 'proud_snowman',
          quote: '나 좀 잘한 듯! 목표 치환 완벽 일치!',
        });
        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        } catch {}
      } else {
        setPenguinStatus({
          id: 'my_way',
          quote: `호환 ${transpositionLabel} 적용 완료!`,
        });
      }
    }
  };

  const getCycleNotation = (arr: number[]): string => {
    const visited = new Set<number>();
    const cycles: number[][] = [];

    for (let i = 0; i < arr.length; i++) {
      const startElem = i + 1;
      if (visited.has(startElem)) continue;

      const currentCycle: number[] = [];
      let curr = startElem;

      while (!visited.has(curr)) {
        visited.add(curr);
        currentCycle.push(curr);
        curr = arr[curr - 1];
      }

      if (currentCycle.length > 1) {
        cycles.push(currentCycle);
      }
    }

    if (cycles.length === 0) return '( ) (항등치환 e)';
    return cycles.map((c) => `(${c.join(' ')})`).join(' ');
  };

  const getInversions = (arr: number[]): number => {
    let inv = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) inv++;
      }
    }
    return inv;
  };

  const currentInversions = getInversions(elements);
  const isEvenPermutation = currentInversions % 2 === 0;

  return (
    <div className="pb-24 pt-3 px-4 max-w-xl mx-auto space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            치환 루프 마스터 (Symmetric Group S₅)
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            두 노드를 탭하여 호환(Transposition)을 적용해 목표 치환을 만드세요!
          </p>
        </div>

        <button
          onClick={() => {
            sound.playTap();
            generateNewTarget();
          }}
          className="p-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-2 border-slate-200 shadow-xs transition-colors"
          title="새 목표 치환"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Reactive Penguin Companion */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-3.5 shadow-sm">
        <PenguinBubble
          penguinId={penguinStatus.id}
          customQuote={penguinStatus.quote}
          size="sm"
        />
      </div>

      {/* Target Permutation Bar */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-sky-700 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>목표 순열 (Target)</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            순환형태: {getCycleNotation(targetElements)}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 pt-1">
          {targetElements.map((val, idx) => (
            <div
              key={idx}
              className="h-12 rounded-2xl bg-sky-50 border-2 border-sky-200 text-sky-900 flex flex-col items-center justify-center font-mono font-bold text-sm shadow-xs"
            >
              <span className="text-[10px] text-sky-600/80 font-normal">자리 {idx + 1}</span>
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Interactive Nodes */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs">
          <span className="text-amber-800 font-bold">현재 원소 배열</span>
          <span className="text-slate-500 font-medium tabular-nums">조작 횟수: {movesCount}회</span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {elements.map((val, idx) => {
            const isSelected = selectedNode === idx;
            const matchesTarget = val === targetElements[idx];

            return (
              <button
                key={idx}
                onClick={() => handleNodeClick(idx)}
                className={`h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-base border-2 transition-all active:scale-95 shadow-xs ${
                  isSelected
                    ? 'bg-amber-400 text-slate-900 border-amber-500 ring-4 ring-amber-300/40 scale-105 z-10'
                    : matchesTarget
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] text-slate-500 font-normal">자리 {idx + 1}</span>
                <span className="text-lg">{val}</span>
              </button>
            );
          })}
        </div>

        <div className="text-center text-xs text-slate-500 min-h-[1.25rem] font-medium">
          {selectedNode !== null ? (
            <span className="text-amber-700 font-bold">
              자리 {selectedNode + 1}번(값 {elements[selectedNode]})과 바꿀 다른 자리를 탭하세요!
            </span>
          ) : (
            <span>자리바꿈(호환)할 첫 번째 숫자를 탭하세요</span>
          )}
        </div>

        {/* Real-time Math Diagnostics */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
            <span className="text-[11px] text-slate-500 font-medium block">
              순환 표기법 (Cycle)
            </span>
            <span className="font-mono text-amber-800 font-bold block truncate">
              {getCycleNotation(elements)}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
            <span className="text-[11px] text-slate-500 font-medium block">
              치환의 부호 (Parity)
            </span>
            <div className="flex items-center gap-1.5 font-bold">
              <span className={isEvenPermutation ? 'text-emerald-700' : 'text-sky-700'}>
                {isEvenPermutation ? '짝치환 (+1)' : '홀치환 (-1)'}
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                (반전수 {currentInversions})
              </span>
            </div>
          </div>
        </div>

        {/* Match celebration banner */}
        {isMatched && (
          <div className="p-3 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-1 animate-fade-in shadow-xs">
            <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>목표 순열 달성 완료!</span>
            </div>
            <p className="text-[11px] text-emerald-700">
              {movesCount}번의 호환(Transposition)으로 목표 상태를 재현했습니다.
            </p>
          </div>
        )}
      </div>

      {/* Applied Transpositions History */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-4 space-y-2 text-xs shadow-sm">
        <div className="flex items-center justify-between text-slate-800">
          <div className="flex items-center gap-1.5 font-bold">
            <ArrowRightLeft className="w-4 h-4 text-amber-600" />
            <span>적용된 호환들의 곱 (Transpositions)</span>
          </div>
          <span className="text-slate-400 text-[11px]">최근 순</span>
        </div>

        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 overflow-x-auto whitespace-nowrap min-h-[36px] flex items-center">
          {historyWords.length > 0 ? (
            <span className="font-semibold text-slate-800">σ = {historyWords.join(' ∘ ')}</span>
          ) : (
            <span className="text-slate-400 font-sans">아직 적용된 호환이 없습니다</span>
          )}
        </div>
      </div>

      {/* Group Theory Lesson Note */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-4 space-y-2 text-xs shadow-sm">
        <button
          onClick={() => {
            sound.playTap();
            setShowTheory(!showTheory);
          }}
          className="w-full flex items-center justify-between text-slate-800 font-bold"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>대수학 원리: 대칭군 S_n과 교대군 A_n</span>
          </div>
          <span className="text-slate-400 text-[11px] font-normal">
            {showTheory ? '접기' : '더보기'}
          </span>
        </button>

        {showTheory && (
          <div className="text-slate-600 leading-relaxed space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
            <p>
              • <strong>치환군 (Symmetric Group S_n)</strong>: n개 원소의 모든 일대일 대응 순열들의 집합으로, 크기는 <strong className="text-amber-700">n!</strong> 입니다.
            </p>
            <p>
              • <strong>호환(Transposition) 생성 정리</strong>: 모든 치환은 오직 2개 원소를 맞바꾸는 호환들의 합성으로 표현됩니다.
            </p>
            <p>
              • <strong>교대군 (Alternating Group A_n)</strong>: 짝수 개의 호환으로 표현되는 "짝치환"들만 모으면 전체 군의 정확히 절반 크기를 갖는 정규부분군이 됩니다!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
