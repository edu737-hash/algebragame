import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { PenguinBubble } from './PenguinBubble';

type GroupPuzzleType = 'z3' | 'v4' | 'z4' | 's3';

interface PuzzleDef {
  id: GroupPuzzleType;
  title: string;
  order: number;
  headers: string[];
  fullTable: string[][];
  description: string;
}

const PUZZLE_DEFINITIONS: Record<GroupPuzzleType, PuzzleDef> = {
  z3: {
    id: 'z3',
    title: '순환군 ℤ₃ (3×3)',
    order: 3,
    headers: ['0', '1', '2'],
    description: '덧셈 mod 3 순환군. 0은 항등원, 1+2=0.',
    fullTable: [
      ['0', '1', '2'],
      ['1', '2', '0'],
      ['2', '0', '1'],
    ],
  },
  v4: {
    id: 'v4',
    title: '클라인 4원군 V₄ (4×4)',
    order: 4,
    headers: ['e', 'a', 'b', 'c'],
    description: '모든 원소가 스스로의 역원 (a²=b²=c²=e), ab=c.',
    fullTable: [
      ['e', 'a', 'b', 'c'],
      ['a', 'e', 'c', 'b'],
      ['b', 'c', 'e', 'a'],
      ['c', 'b', 'a', 'e'],
    ],
  },
  z4: {
    id: 'z4',
    title: '순환군 ℤ₄ (4×4)',
    order: 4,
    headers: ['0', '1', '2', '3'],
    description: '덧셈 mod 4 순환군. 생성원 1, 3 (위수 4).',
    fullTable: [
      ['0', '1', '2', '3'],
      ['1', '2', '3', '0'],
      ['2', '3', '0', '1'],
      ['3', '0', '1', '2'],
    ],
  },
  s3: {
    id: 's3',
    title: '치환대칭군 S₃ (6×6)',
    order: 6,
    headers: ['e', 'r', 'r²', 's', 'sr', 'sr²'],
    description: '최초의 비가환군(위수 6). rs ≠ sr (rs = sr²).',
    fullTable: [
      ['e', 'r', 'r²', 's', 'sr', 'sr²'],
      ['r', 'r²', 'e', 'sr²', 's', 'sr'],
      ['r²', 'e', 'r', 'sr', 'sr²', 's'],
      ['s', 'sr', 'sr²', 'e', 'r', 'r²'],
      ['sr', 'sr²', 's', 'r²', 'e', 'r'],
      ['sr²', 's', 'sr', 'r', 'r²', 'e'],
    ],
  },
};

export const CayleySudokuGame: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<GroupPuzzleType>('v4');
  const [grid, setGrid] = useState<string[][]>([]);
  const [initialMask, setInitialMask] = useState<boolean[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [conflictCells, setConflictCells] = useState<{ r: number; c: number }[]>([]);
  const [solvedCount, setSolvedCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('algebra_cayley_solved') || 0);
    } catch {
      return 0;
    }
  });
  const [penguinStatus, setPenguinStatus] = useState<{ id: string; quote: string }>({
    id: 'ruined',
    quote: '가로세로에 같은 원소 중복되면 망했다!',
  });

  const puzzle = PUZZLE_DEFINITIONS[selectedGroup];

  useEffect(() => {
    generatePuzzle(selectedGroup);
  }, [selectedGroup]);

  const generatePuzzle = (grpType: GroupPuzzleType) => {
    const p = PUZZLE_DEFINITIONS[grpType];
    const n = p.order;
    const full = p.fullTable;

    const mask: boolean[][] = [];
    const newGrid: string[][] = [];
    const blankProbability = grpType === 'z3' ? 0.45 : grpType === 's3' ? 0.5 : 0.55;

    for (let r = 0; r < n; r++) {
      mask[r] = [];
      newGrid[r] = [];
      for (let c = 0; c < n; c++) {
        const isIdentityBoundary = r === 0 && c === 0;
        const shouldBlank = !isIdentityBoundary && Math.random() < blankProbability;

        if (shouldBlank) {
          mask[r][c] = false;
          newGrid[r][c] = '';
        } else {
          mask[r][c] = true;
          newGrid[r][c] = full[r][c];
        }
      }
    }

    setInitialMask(mask);
    setGrid(newGrid);
    setSelectedCell(null);
    setIsCompleted(false);
    setConflictCells([]);
    setPenguinStatus({
      id: 'ruined',
      quote: `${p.title.split(' ')[0]} 퍼즐 시작! 중복 없게 채워봐!`,
    });
  };

  const handleCellClick = (r: number, c: number) => {
    sound.playTap();
    if (!initialMask[r][c]) {
      setSelectedCell({ r, c });
    }
  };

  const handleKeypadInput = (val: string) => {
    if (!selectedCell) return;
    sound.playTap();

    const { r, c } = selectedCell;
    const nextGrid = grid.map((row, rowIdx) =>
      row.map((cell, colIdx) => (rowIdx === r && colIdx === c ? val : cell))
    );

    setGrid(nextGrid);
    validateConflicts(nextGrid);

    const allFilled = nextGrid.every((row) => row.every((cell) => cell !== ''));
    if (allFilled) {
      checkCompletion(nextGrid);
    }
  };

  const handleClearCell = () => {
    if (!selectedCell) return;
    sound.playTap();
    const { r, c } = selectedCell;
    const nextGrid = grid.map((row, rowIdx) =>
      row.map((cell, colIdx) => (rowIdx === r && colIdx === c ? '' : cell))
    );
    setGrid(nextGrid);
    validateConflicts(nextGrid);
  };

  const validateConflicts = (currentGrid: string[][]) => {
    const conflicts: { r: number; c: number }[] = [];
    const n = puzzle.order;

    for (let r = 0; r < n; r++) {
      const seen = new Map<string, number[]>();
      for (let c = 0; c < n; c++) {
        const val = currentGrid[r][c];
        if (val) {
          if (!seen.has(val)) seen.set(val, []);
          seen.get(val)!.push(c);
        }
      }
      seen.forEach((cols) => {
        if (cols.length > 1) {
          cols.forEach((c) => conflicts.push({ r, c }));
        }
      });
    }

    for (let c = 0; c < n; c++) {
      const seen = new Map<string, number[]>();
      for (let r = 0; r < n; r++) {
        const val = currentGrid[r][c];
        if (val) {
          if (!seen.has(val)) seen.set(val, []);
          seen.get(val)!.push(r);
        }
      }
      seen.forEach((rows) => {
        if (rows.length > 1) {
          rows.forEach((r) => conflicts.push({ r, c }));
        }
      });
    }

    setConflictCells(conflicts);
    if (conflicts.length > 0) {
      setPenguinStatus({
        id: 'fool',
        quote: '이 바보들아! 같은 줄에 같은 원소가 있잖아!',
      });
    }
  };

  const checkCompletion = (currentGrid: string[][]) => {
    const isExact = currentGrid.every((row, r) =>
      row.every((cell, c) => cell === puzzle.fullTable[r][c])
    );

    if (isExact) {
      setIsCompleted(true);
      sound.playSuccess();
      setPenguinStatus({
        id: 'awesome_statue',
        quote: '쩐다! 라틴 방진과 군 연산표 완벽 복원!',
      });
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      } catch {}
      const nextCount = solvedCount + 1;
      setSolvedCount(nextCount);
      try {
        localStorage.setItem('algebra_cayley_solved', String(nextCount));
      } catch {}
    } else {
      sound.playError();
      setPenguinStatus({
        id: 'ruined',
        quote: '망했다... 어딘가 연산 결과가 틀렸어!',
      });
    }
  };

  const handleGiveHint = () => {
    sound.playTap();
    const n = puzzle.order;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (!initialMask[r][c] && grid[r][c] !== puzzle.fullTable[r][c]) {
          const nextGrid = grid.map((row, rowIdx) =>
            row.map((cell, colIdx) =>
              rowIdx === r && colIdx === c ? puzzle.fullTable[r][c] : cell
            )
          );
          setGrid(nextGrid);
          setSelectedCell({ r, c });
          validateConflicts(nextGrid);
          setPenguinStatus({
            id: 'perfect_plan',
            quote: '완벽한 계획이다! 힌트 한 칸 배달 완료!',
          });
          return;
        }
      }
    }
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-xl mx-auto space-y-4">
      {/* Title & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            케일리 테이블 스도쿠
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            라틴 방진: 각 행과 열에 모든 군 원소가 단 1번씩만 등장!
          </p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold tabular-nums shadow-xs">
          해결: {solvedCount}개
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

      {/* Group Selector Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl">
        {(Object.keys(PUZZLE_DEFINITIONS) as GroupPuzzleType[]).map((key) => {
          const p = PUZZLE_DEFINITIONS[key];
          const isSelected = selectedGroup === key;
          return (
            <button
              key={key}
              onClick={() => {
                sound.playTap();
                setSelectedGroup(key);
              }}
              className={`py-2 text-[11px] font-bold rounded-xl transition-all truncate ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {p.title.split(' ')[0]}
            </button>
          );
        })}
      </div>

      {/* Description info */}
      <div className="text-xs text-slate-600 bg-white border border-slate-200 rounded-2xl px-3.5 py-2.5 flex items-center justify-between shadow-xs">
        <span className="font-medium">{puzzle.description}</span>
        <span className="text-[11px] text-amber-700 font-mono font-bold shrink-0 ml-2">
          위수: {puzzle.order}
        </span>
      </div>

      {/* Cayley Sudoku Board */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-4 shadow-sm flex flex-col items-center relative overflow-hidden">
        {conflictCells.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-3 py-1.5 mb-3 animate-fade-in shadow-xs">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>라틴 방진 위배: 행 또는 열에 중복된 원소가 있습니다!</span>
          </div>
        )}

        <div className="overflow-x-auto w-full flex justify-center py-1">
          <table className="border-collapse font-mono text-center tabular-nums">
            <thead>
              <tr>
                <th className="p-2 border border-slate-300 bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm">
                  *
                </th>
                {puzzle.headers.map((h) => (
                  <th
                    key={h}
                    className="p-2 border border-slate-300 bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm min-w-[36px] sm:min-w-[42px]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((row, rIdx) => (
                <tr key={rIdx}>
                  <td className="p-2 border border-slate-300 bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm">
                    {puzzle.headers[rIdx]}
                  </td>
                  {row.map((cell, cIdx) => {
                    const isLocked = initialMask[rIdx]?.[cIdx];
                    const isSelected =
                      selectedCell?.r === rIdx && selectedCell?.c === cIdx;
                    const hasConflict = conflictCells.some(
                      (p) => p.r === rIdx && p.c === cIdx
                    );

                    return (
                      <td
                        key={cIdx}
                        onClick={() => handleCellClick(rIdx, cIdx)}
                        className={`p-2 border border-slate-300 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-amber-500 bg-amber-100 text-amber-950 z-10'
                            : hasConflict
                            ? 'bg-rose-100 text-rose-800'
                            : isLocked
                            ? 'bg-slate-100/80 text-slate-500 cursor-default'
                            : cell
                            ? 'bg-white text-sky-800'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-400'
                        }`}
                      >
                        {cell || (isLocked ? '' : '·')}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Victory Overlay if solved */}
        {isCompleted && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-3 animate-fade-in z-20">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-900">
              케일리 테이블 완성 성공!
            </h3>
            <p className="text-xs text-slate-600 max-w-xs leading-relaxed font-sans">
              모든 행과 열의 라틴 방진 성질과 군의 결합법칙, 역원 법칙이 완벽히 만족되었습니다!
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => generatePuzzle(selectedGroup)}
                className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                새 퍼즐 풀기
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Virtual Keypad for Input */}
      <div className="space-y-2">
        <div className="text-xs text-slate-600 font-medium flex items-center justify-between px-1">
          <span>원소 입력 패드:</span>
          <span className="text-[11px] text-slate-400">
            {selectedCell
              ? `선택된 위치: (${puzzle.headers[selectedCell.r]}, ${puzzle.headers[selectedCell.c]})`
              : '빈 칸을 탭하여 선택하세요'}
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {puzzle.headers.map((elem) => (
            <button
              key={elem}
              disabled={!selectedCell}
              onClick={() => handleKeypadInput(elem)}
              className="h-12 rounded-2xl bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed border-2 border-slate-200 text-slate-800 font-mono font-bold text-sm active:scale-95 transition-all flex items-center justify-center shadow-xs"
            >
              {elem}
            </button>
          ))}
          <button
            disabled={!selectedCell}
            onClick={handleClearCell}
            className="h-12 rounded-2xl bg-rose-50 hover:bg-rose-100 disabled:opacity-40 border-2 border-rose-200 text-rose-700 text-xs font-bold active:scale-95 transition-all flex items-center justify-center shadow-xs"
          >
            지우기
          </button>
        </div>
      </div>

      {/* Auxiliary Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={handleGiveHint}
          className="h-12 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>한 칸 힌트 채우기</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            generatePuzzle(selectedGroup);
          }}
          className="h-12 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>새 퍼즐 생성</span>
        </button>
      </div>
    </div>
  );
};
