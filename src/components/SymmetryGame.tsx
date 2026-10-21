import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCw, FlipHorizontal, RotateCcw, Trophy, Sparkles, Check, Info } from 'lucide-react';
import { sound } from '../utils/audio';
import { PenguinBubble } from './PenguinBubble';

type PolygonType = 'triangle' | 'square';

export const SymmetryGame: React.FC = () => {
  const [polyType, setPolyType] = useState<PolygonType>('triangle');
  const [vertices, setVertices] = useState<number[]>([1, 2, 3]);
  const [targetVertices, setTargetVertices] = useState<number[]>([2, 3, 1]);
  const [appliedWord, setAppliedWord] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('algebra_symmetry_best') || 0);
    } catch {
      return 0;
    }
  });
  const [solved, setSolved] = useState<boolean>(false);
  const [showFormulaNote, setShowFormulaNote] = useState<boolean>(false);
  const [penguinStatus, setPenguinStatus] = useState<{ id: string; quote: string }>({
    id: 'be_ready',
    quote: '각오해라! 회전과 반사로 각도를 맞춰봐!',
  });

  const triangleSymmetries = [
    [1, 2, 3], // e
    [2, 3, 1], // r
    [3, 1, 2], // r^2
    [1, 3, 2], // s
    [3, 2, 1], // sr
    [2, 1, 3], // sr^2
  ];

  const squareSymmetries = [
    [1, 2, 3, 4], // e
    [2, 3, 4, 1], // r
    [3, 4, 1, 2], // r^2
    [4, 1, 2, 3], // r^3
    [2, 1, 4, 3], // s (vertical flip)
    [4, 3, 2, 1], // horizontal flip
    [1, 4, 3, 2], // diagonal 1
    [3, 2, 1, 4], // diagonal 2
  ];

  const generateNewTarget = (type: PolygonType, currentV: number[]) => {
    const pool = type === 'triangle' ? triangleSymmetries : squareSymmetries;
    let nextTarget: number[];
    do {
      nextTarget = pool[Math.floor(Math.random() * pool.length)];
    } while (arraysEqual(nextTarget, currentV) && pool.length > 1);
    setTargetVertices(nextTarget);
    setSolved(false);
  };

  useEffect(() => {
    resetToIdentity(polyType);
  }, [polyType]);

  const resetToIdentity = (type: PolygonType) => {
    const init = type === 'triangle' ? [1, 2, 3] : [1, 2, 3, 4];
    setVertices(init);
    setAppliedWord([]);
    generateNewTarget(type, init);
    setPenguinStatus({
      id: 'be_ready',
      quote: `${type === 'triangle' ? 'D₃' : 'D₄'} 대칭 변환! 목표를 노려봐!`,
    });
  };

  function arraysEqual(a: number[], b: number[]): boolean {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }

  const handleRotate = () => {
    sound.playFlip();
    let next: number[];
    if (polyType === 'triangle') {
      next = [vertices[1], vertices[2], vertices[0]];
    } else {
      next = [vertices[1], vertices[2], vertices[3], vertices[0]];
    }
    setVertices(next);
    const newWord = [...appliedWord, 'r'];
    setAppliedWord(newWord);
    setPenguinStatus({ id: 'my_way', quote: '빙글! 회전 연산 r 적용!' });
    checkMatch(next);
  };

  const handleFlip = () => {
    sound.playFlip();
    let next: number[];
    if (polyType === 'triangle') {
      next = [vertices[0], vertices[2], vertices[1]];
    } else {
      next = [vertices[1], vertices[0], vertices[3], vertices[2]];
    }
    setVertices(next);
    const newWord = [...appliedWord, 's'];
    setAppliedWord(newWord);
    setPenguinStatus({ id: 'hide', quote: '뒤집기! 반사 연산 s 적용!' });
    checkMatch(next);
  };

  const handleResetCurrent = () => {
    sound.playTap();
    const init = polyType === 'triangle' ? [1, 2, 3] : [1, 2, 3, 4];
    setVertices(init);
    setAppliedWord([]);
    setPenguinStatus({ id: 'scratch', quote: '긁적... 항등원 e 로 리셋 완료' });
  };

  const checkMatch = (v: number[]) => {
    if (arraysEqual(v, targetVertices)) {
      setSolved(true);
      sound.playSuccess();
      setPenguinStatus({ id: 'proud_snowman', quote: '나 좀 잘한 듯! 완벽한 대칭이야!' });
      try {
        confetti({ particleCount: 45, spread: 65, origin: { y: 0.7 } });
      } catch {}
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
        try {
          localStorage.setItem('algebra_symmetry_best', String(nextStreak));
        } catch {}
      }
      setTimeout(() => {
        handleResetCurrent();
        generateNewTarget(
          polyType,
          polyType === 'triangle' ? [1, 2, 3] : [1, 2, 3, 4]
        );
      }, 1300);
    }
  };

  const getCoordinates = (vCount: number, radius: number, cx: number, cy: number) => {
    const coords = [];
    for (let i = 0; i < vCount; i++) {
      const angle = (i * 360) / vCount - 90;
      const rad = (angle * Math.PI) / 180;
      coords.push({
        x: cx + radius * Math.cos(rad),
        y: cy + radius * Math.sin(rad),
      });
    }
    return coords;
  };

  const currentCoords = getCoordinates(polyType === 'triangle' ? 3 : 4, 60, 90, 85);
  const targetCoords = getCoordinates(polyType === 'triangle' ? 3 : 4, 38, 55, 55);

  return (
    <div className="pb-24 pt-3 px-4 max-w-xl mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            대칭 변환 배틀 (Dihedral Group)
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            회전(r)과 반사(s)를 조합해 목표 꼭짓점 배열을 맞추세요!
          </p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5 tabular-nums shadow-xs">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>{streak}연속 성공</span>
          <span className="text-[10px] text-amber-600/70">· 최고 {bestStreak}</span>
        </div>
      </div>

      {/* Reactive Penguin Companion */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-3.5 shadow-sm">
        <PenguinBubble
          penguinId={penguinStatus.id}
          customQuote={penguinStatus.quote}
          size="sm"
        />
      </div>

      {/* Polygon Selector Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl">
        <button
          onClick={() => {
            sound.playTap();
            setPolyType('triangle');
          }}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            polyType === 'triangle'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          정삼각형 (D₃, 위수 6)
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setPolyType('square');
          }}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            polyType === 'square'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          정사각형 (D₄, 위수 8)
        </button>
      </div>

      {/* Battle Arena Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Current Active Polygon */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-4 flex flex-col items-center justify-center relative shadow-sm">
          <span className="text-[11px] text-slate-500 font-bold mb-1">
            현재 다각형 배치
          </span>

          <svg className="w-48 h-44" viewBox="0 0 180 170">
            {/* Draw Polygon Shape */}
            <polygon
              points={currentCoords.map((c) => `${c.x},${c.y}`).join(' ')}
              fill="rgba(245, 158, 11, 0.12)"
              stroke="#f59e0b"
              strokeWidth="3"
              className="transition-all duration-300"
            />
            {/* Mirror line indicator */}
            <line
              x1="90"
              y1="15"
              x2="90"
              y2="155"
              stroke="#94a3b8"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />

            {/* Vertices with numbers */}
            {currentCoords.map((coord, idx) => (
              <g key={idx} className="transition-all duration-300">
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="14"
                  fill="#ffffff"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />
                <text
                  x={coord.x}
                  y={coord.y + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#0f172a"
                  fontFamily="monospace"
                >
                  {vertices[idx]}
                </text>
              </g>
            ))}
          </svg>

          {/* Applied word / elements */}
          <div className="w-full text-center mt-1">
            <span className="text-[10px] text-slate-400 font-medium">적용된 합성어:</span>
            <div className="font-mono text-xs text-amber-700 font-bold min-h-[1.5rem] tracking-widest mt-0.5">
              {appliedWord.length > 0 ? appliedWord.join(' ∘ ') : '항등원 e (원상태)'}
            </div>
          </div>
        </div>

        {/* Target Polygon */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-4 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span className="text-[11px] text-sky-700 font-bold">
              목표 배치 (Target)
            </span>
          </div>

          <svg className="w-32 h-32" viewBox="0 0 110 110">
            <polygon
              points={targetCoords.map((c) => `${c.x},${c.y}`).join(' ')}
              fill="rgba(2, 132, 199, 0.1)"
              stroke="#0284c7"
              strokeWidth="2.5"
            />
            {targetCoords.map((coord, idx) => (
              <g key={idx}>
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="10"
                  fill="#ffffff"
                  stroke="#0284c7"
                  strokeWidth="2"
                />
                <text
                  x={coord.x}
                  y={coord.y + 3.5}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#0369a1"
                  fontFamily="monospace"
                >
                  {targetVertices[idx]}
                </text>
              </g>
            ))}
          </svg>

          <div className="text-[11px] text-slate-600 font-mono font-bold mt-1">
            목표: [{targetVertices.join(', ')}]
          </div>

          {solved && (
            <div className="absolute inset-0 bg-emerald-500/95 backdrop-blur-xs rounded-3xl flex flex-col items-center justify-center text-white animate-fade-in">
              <Check className="w-8 h-8 text-white mb-1" />
              <span className="text-xs font-bold">목표 달성!</span>
              <span className="text-[10px] text-emerald-100">다음 문제 생성 중...</span>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        <button
          onClick={handleRotate}
          className="h-14 rounded-2xl bg-amber-50 hover:bg-amber-100 active:scale-95 border-2 border-amber-200 flex flex-col items-center justify-center transition-all text-amber-900 shadow-xs"
        >
          <div className="flex items-center gap-1.5">
            <RotateCw className="w-4 h-4 text-amber-600" />
            <span className="font-bold text-sm">회전 r</span>
          </div>
          <span className="text-[10px] text-amber-700">
            {polyType === 'triangle' ? '120° 반시계' : '90° 반시계'}
          </span>
        </button>

        <button
          onClick={handleFlip}
          className="h-14 rounded-2xl bg-sky-50 hover:bg-sky-100 active:scale-95 border-2 border-sky-200 flex flex-col items-center justify-center transition-all text-sky-900 shadow-xs"
        >
          <div className="flex items-center gap-1.5">
            <FlipHorizontal className="w-4 h-4 text-sky-600" />
            <span className="font-bold text-sm">반사 s</span>
          </div>
          <span className="text-[10px] text-sky-700">수직축 대칭</span>
        </button>

        <button
          onClick={handleResetCurrent}
          className="h-14 rounded-2xl bg-slate-100 hover:bg-slate-200/80 active:scale-95 border-2 border-slate-200 flex flex-col items-center justify-center transition-all text-slate-700 shadow-xs"
        >
          <div className="flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span className="font-bold text-sm">초기화 e</span>
          </div>
          <span className="text-[10px] text-slate-500">원래 배치로</span>
        </button>
      </div>

      {/* Dihedral Group Theory Accordion */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-4 space-y-2 text-xs shadow-sm">
        <button
          onClick={() => {
            sound.playTap();
            setShowFormulaNote(!showFormulaNote);
          }}
          className="w-full flex items-center justify-between text-slate-800 font-bold"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-500" />
            <span>대수학 원리: 이면군 D_n의 생성과 관계식</span>
          </div>
          <span className="text-slate-400 text-[11px] font-normal">
            {showFormulaNote ? '접기' : '더보기'}
          </span>
        </button>

        {showFormulaNote && (
          <div className="text-slate-600 leading-relaxed space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
            <p>
              이면군 D_n은 정n각형의 대칭성을 나타내는 군으로, 위수는{' '}
              <strong className="text-amber-700">2n</strong>입니다.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-amber-800 space-y-0.5">
              <div>⟨ r, s | rⁿ = e, s² = e, srs = r⁻¹ ⟩</div>
            </div>
            <p>
              • <strong>비가환성 (Non-Abelian)</strong>: 회전 후 반사(s ∘ r)와 반사 후 회전(r ∘ s)은 서로 다릅니다.
            </p>
            <p>
              • 모든 대칭 변환은 오직 <strong>회전(r)</strong>과 <strong>반사(s)</strong> 두 가지 생성원의 곱으로 완성됩니다!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
