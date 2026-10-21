import React, { useState } from 'react';
import { Star, HelpCircle, ArrowLeft, Play, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Stage, UserProgress } from '../types/algebra';
import { STAGES } from '../data/stages';
import { sound } from '../utils/audio';
import { StageClearModal } from './StageClearModal';
import { PenguinBubble } from './PenguinBubble';

interface CampaignViewProps {
  progress: UserProgress;
  onStageComplete: (stageId: number, stars: number) => void;
  onJumpToTab: (tab: any) => void;
}

export const CampaignView: React.FC<CampaignViewProps> = ({
  progress,
  onStageComplete,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userSelectedOption, setUserSelectedOption] = useState<any>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [currentPenguinMood, setCurrentPenguinMood] = useState<{
    id: string;
    quote: string;
  }>({ id: 'not_my_type_book', quote: '이런건 체질이 아니다... 하지만 해본다!' });

  // Modular clock state
  const [clockStepCount, setClockStepCount] = useState<number>(0);

  // Generator explorer selected item in stage 6
  const [activeGeneratorView, setActiveGeneratorView] = useState<number | null>(null);
  const [selectedGenerators, setSelectedGenerators] = useState<number[]>([]);

  const currentStage = STAGES.find((s) => s.id === selectedStageId);

  const handleSelectStage = (stage: Stage) => {
    sound.playTap();
    setSelectedStageId(stage.id);
    setUserSelectedOption(null);
    setFeedbackMsg(null);
    setShowHint(false);
    setClockStepCount(0);
    setActiveGeneratorView(null);
    setSelectedGenerators([]);
    setCurrentPenguinMood({
      id: 'not_my_type_book',
      quote: '이런건 체질이 아니다... 그래도 대수는 못 참지!',
    });
  };

  const handleBackToList = () => {
    sound.playTap();
    setSelectedStageId(null);
    setShowClearModal(false);
  };

  const handleSolveStage = (isCorrect: boolean, feedback: string) => {
    if (isCorrect) {
      sound.playSuccess();
      setCurrentPenguinMood({ id: 'awesome_statue', quote: '쩐다! 정답이다!' });
      setFeedbackMsg({ text: feedback, isError: false });
      const stars = showHint ? 2 : 3;
      onStageComplete(selectedStageId!, stars);
      setTimeout(() => {
        setShowClearModal(true);
      }, 700);
    } else {
      sound.playError();
      setCurrentPenguinMood({ id: 'ruined', quote: '망했다... 다시 생각해보자!' });
      setFeedbackMsg({ text: feedback, isError: true });
    }
  };

  const handleNextStage = () => {
    setShowClearModal(false);
    if (selectedStageId && selectedStageId < STAGES.length) {
      const nextStage = STAGES.find((s) => s.id === selectedStageId + 1);
      if (nextStage) {
        handleSelectStage(nextStage);
      }
    } else {
      setSelectedStageId(null);
    }
  };

  // Chapter metadata with cute penguin moods
  const chapters = [
    {
      id: 1,
      title: '1장. 군(Group)의 4대 공리',
      penguin: 'waiting_coffee',
      quote: '기다리는 중... 공리부터 시작하자!',
    },
    {
      id: 2,
      title: '2장. 순환군과 모듈러 산술',
      penguin: 'perfect_plan',
      quote: '완벽한 계획이다! 합동식 시계 산술',
    },
    {
      id: 3,
      title: '3장. 대칭군과 이면군 (Dihedral)',
      penguin: 'be_ready',
      quote: '각오해라! 회전(r)과 반사(s)의 세계',
    },
    {
      id: 4,
      title: '4장. 치환군과 대칭성 (Permutation)',
      penguin: 'my_way',
      quote: '내 맘이다! 호환으로 싹 바꾸기',
    },
    {
      id: 5,
      title: '5장. 케일리 테이블 스도쿠',
      penguin: 'ruined',
      quote: '중복되면 망했다! 라틴 방진 완성',
    },
    {
      id: 6,
      title: '6장. 환, 체, 동형사상',
      penguin: 'awesome_statue',
      quote: '쩐다! 갈루아 유한체와 대수의 정점',
    },
  ];

  // If no stage is selected, show the stage roadmap
  if (!currentStage) {
    return (
      <div className="pb-24 pt-4 px-4 max-w-xl mx-auto space-y-5">
        {/* Cute Mascot Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-amber-200/90 bg-gradient-to-br from-amber-50 via-sky-50 to-rose-50 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1 z-10 max-w-[65%]">
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100/90 px-2.5 py-0.5 rounded-full inline-block">
                대수의 탑 원정대
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">
                펭귄과 함께하는 현대대수학
              </h2>
              <p className="text-xs text-slate-600 leading-snug">
                18개 스테이지로 군, 환, 체, 대칭성을 마스터하세요!
              </p>
            </div>

            {/* Cute Penguin Illustration */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 relative animate-pulse">
              <img
                src="/assets/penguins/not_my_type_book.png"
                alt="Studying Penguin"
                className="w-full h-full object-contain filter drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>총 18개 스테이지</span>
            <span>·</span>
            <span className="text-amber-800">{progress.totalStars}★ 달성 중</span>
          </div>
        </div>

        {/* Chapters list */}
        <div className="space-y-5">
          {chapters.map((ch) => {
            const chStages = STAGES.filter((s) => s.chapter === ch.id);
            const completedCount = chStages.filter(
              (s) => progress.completedStages[s.id]
            ).length;

            return (
              <div
                key={ch.id}
                className="bg-white border-2 border-slate-200/80 rounded-3xl p-4 shadow-xs space-y-3"
              >
                {/* Chapter header with penguin sticker */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 p-0.5 border border-slate-200 shrink-0">
                      <img
                        src={`/assets/penguins/${ch.penguin}.png`}
                        alt="Chapter Penguin"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                        {ch.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-medium">
                        "{ch.quote}"
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full tabular-nums border border-sky-100">
                    {completedCount} / {chStages.length}
                  </span>
                </div>

                {/* Stage buttons */}
                <div className="grid grid-cols-1 gap-2">
                  {chStages.map((stage) => {
                    const stageProgress = progress.completedStages[stage.id];
                    const isUnlocked =
                      stage.id === 1 || !!progress.completedStages[stage.id - 1];

                    return (
                      <button
                        key={stage.id}
                        disabled={!isUnlocked}
                        onClick={() => handleSelectStage(stage)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between min-h-[56px] ${
                          !isUnlocked
                            ? 'bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed'
                            : stageProgress
                            ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300 active:scale-[0.99]'
                            : 'bg-white border-slate-200 hover:border-amber-400 active:scale-[0.99] shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                              stageProgress
                                ? 'bg-emerald-500 text-white shadow-xs'
                                : isUnlocked
                                ? 'bg-amber-400 text-slate-900 shadow-xs'
                                : 'bg-slate-200 text-slate-400'
                            }`}
                          >
                            {stage.id}
                          </div>

                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-800 line-clamp-1">
                              {stage.title}
                            </span>
                            <span className="text-[11px] text-slate-500 line-clamp-1">
                              {stage.conceptName}
                            </span>
                          </div>
                        </div>

                        {/* Right side: Stars or Play Icon */}
                        <div className="shrink-0 flex items-center gap-1">
                          {stageProgress ? (
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3.5 h-3.5 ${
                                    star <= stageProgress.stars
                                      ? 'text-amber-400 fill-amber-400'
                                      : 'text-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                          ) : isUnlocked ? (
                            <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                              <Play className="w-3.5 h-3.5 fill-amber-600" />
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">잠김</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Stage Player
  return (
    <div className="pb-24 pt-3 px-4 max-w-xl mx-auto space-y-4">
      {/* Top navigation controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBackToList}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 pr-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>스테이지 목록</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setShowHint(!showHint);
            if (!showHint) {
              setCurrentPenguinMood({
                id: 'perfect_plan',
                quote: '완벽한 계획이다! 힌트를 확인해봐!',
              });
            }
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors shadow-xs ${
            showHint
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>펭귄 힌트</span>
        </button>
      </div>

      {/* Reactive Penguin Companion Header */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-3.5 shadow-sm flex items-center justify-between">
        <PenguinBubble
          penguinId={currentPenguinMood.id}
          customQuote={currentPenguinMood.quote}
          size="sm"
        />
        <div className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
          {currentStage.id} / 18
        </div>
      </div>

      {/* Stage Question Card */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 space-y-2 shadow-sm">
        <div className="flex items-center justify-between text-xs">
          <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            {currentStage.chapterTitle}
          </span>
          <span className="text-slate-500 font-medium">{currentStage.conceptName}</span>
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          {currentStage.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans pt-1">
          {currentStage.prompt}
        </p>
      </div>

      {/* Hint Alert if shown */}
      {showHint && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-4 text-xs text-amber-950 leading-relaxed shadow-sm animate-fade-in flex items-start gap-2.5">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1 text-amber-900">
              대수학 개념 힌트:
            </span>
            {currentStage.mathExplanation}
          </div>
        </div>
      )}

      {/* Interactive Stage Content */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-4">
        {/* 1. Identity Element Table */}
        {currentStage.type === 'identity' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500 text-center font-medium">
              아래 연산표에서 항등원(Identity)에 해당하는 원소를 탭하세요.
            </div>

            <div className="overflow-x-auto flex justify-center py-2">
              <table className="border-collapse text-center text-sm font-mono tabular-nums">
                <thead>
                  <tr>
                    <th className="p-2 border border-slate-300 bg-amber-100 text-amber-900 font-bold">
                      *
                    </th>
                    {currentStage.data.elements.map((el: string) => (
                      <th
                        key={el}
                        className="p-2 border border-slate-300 bg-slate-100 text-slate-700 font-bold w-10"
                      >
                        {el}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentStage.data.elements.map((rowEl: string, rIdx: number) => (
                    <tr key={rowEl}>
                      <td className="p-2 border border-slate-300 bg-slate-100 text-slate-700 font-bold">
                        {rowEl}
                      </td>
                      {currentStage.data.table[rIdx].map((cell: string, cIdx: number) => (
                        <td
                          key={cIdx}
                          className={`p-2 border border-slate-300 transition-colors ${
                            cell === currentStage.data.correctElement &&
                            userSelectedOption === cell
                              ? 'bg-emerald-100 text-emerald-800 font-bold'
                              : 'bg-white text-slate-800'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {currentStage.data.elements.map((el: string) => (
                <button
                  key={el}
                  onClick={() => {
                    sound.playTap();
                    setUserSelectedOption(el);
                    const isCorrect = el === currentStage.data.correctElement;
                    handleSolveStage(
                      isCorrect,
                      isCorrect
                        ? `정답입니다! '${el}'는 모든 원소 x에 대해 x * ${el} = x를 만족하는 유일한 항등원입니다.`
                        : `'${el}'는 항등원이 아닙니다. 연산표의 행과 열이 원래 원소와 완전히 동일하게 복제되는지 확인해보세요.`
                    );
                  }}
                  className={`h-12 rounded-2xl font-bold font-mono text-base border-2 transition-all shadow-xs ${
                    userSelectedOption === el
                      ? el === currentStage.data.correctElement
                        ? 'bg-emerald-500 text-white border-emerald-600'
                        : 'bg-rose-500 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. Modular Clock Interactive */}
        {currentStage.type === 'modular_clock' && (
          <div className="space-y-4">
            <div className="relative flex flex-col items-center justify-center py-1">
              <svg className="w-52 h-52" viewBox="0 0 200 200">
                {/* Clock circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="3"
                />
                {/* 7 Clock ticks for Z_7 */}
                {Array.from({ length: 7 }).map((_, i) => {
                  const angle = (i * 360) / 7 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = 100 + 68 * Math.cos(rad);
                  const y = 100 + 68 * Math.sin(rad);

                  const isCurrentPos = (4 + clockStepCount * 5) % 7 === i;

                  return (
                    <g key={i}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isCurrentPos ? 15 : 12}
                        fill={isCurrentPos ? '#f59e0b' : '#f1f5f9'}
                        stroke={isCurrentPos ? '#d97706' : '#94a3b8'}
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />
                      <text
                        x={x}
                        y={y + 4}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="bold"
                        fill={isCurrentPos ? '#ffffff' : '#334155'}
                        fontFamily="monospace"
                      >
                        {i}
                      </text>
                    </g>
                  );
                })}

                {/* Needle */}
                {(() => {
                  const currentMod = (4 + clockStepCount * 5) % 7;
                  const angle = (currentMod * 360) / 7 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const tipX = 100 + 50 * Math.cos(rad);
                  const tipY = 100 + 50 * Math.sin(rad);

                  return (
                    <g>
                      <line
                        x1="100"
                        y1="100"
                        x2={tipX}
                        y2={tipY}
                        stroke="#0284c7"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />
                      <circle cx="100" cy="100" r="5.5" fill="#0369a1" />
                    </g>
                  );
                })()}
              </svg>

              <div className="text-center mt-2 space-y-1.5">
                <div className="text-xs text-slate-700 font-mono">
                  현재 시계 위치: <span className="font-bold text-amber-600">{(4 + clockStepCount * 5) % 7}시</span>
                  {' '}(+5칸 회전 횟수: {clockStepCount} / 3)
                </div>
                <button
                  onClick={() => {
                    sound.playFlip();
                    setClockStepCount((prev) => (prev < 3 ? prev + 1 : 0));
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200 transition-colors shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>+5칸 바늘 돌리기</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-800">
                최종 도착 시각 (4 + 5 × 3 mod 7)을 고르세요:
              </div>
              <div className="grid grid-cols-4 gap-2">
                {currentStage.data.choices.map((choice: number) => (
                  <button
                    key={choice}
                    onClick={() => {
                      sound.playTap();
                      setUserSelectedOption(choice);
                      const isCorrect = choice === currentStage.data.correct;
                      handleSolveStage(
                        isCorrect,
                        isCorrect
                          ? `정답입니다! 4 + 15 = 19 ≡ 5 (mod 7). 7시간제 시계의 순환군 ℤ₇ 원리 증명 성공!`
                          : `오답입니다. 19를 7로 나누었을 때의 나머지를 다시 계산해보세요.`
                      );
                    }}
                    className={`h-12 rounded-2xl font-bold font-mono text-base border-2 transition-all shadow-xs ${
                      userSelectedOption === choice
                        ? choice === currentStage.data.correct
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-rose-500 text-white border-rose-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. Cyclic Generator Explorer */}
        {currentStage.type === 'cyclic_generator' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500 font-medium">
              각 원소를 눌러 어떤 부분군을 생성하는지 관찰한 후, ℤ₆ 전체를 생성할 수 있는 모든 생성원을 선택하세요.
            </div>

            <div className="grid grid-cols-5 gap-2">
              {currentStage.data.elements.map((el: number) => {
                const isSelected = selectedGenerators.includes(el);
                return (
                  <button
                    key={el}
                    onClick={() => {
                      sound.playTap();
                      setActiveGeneratorView(el);
                      if (selectedGenerators.includes(el)) {
                        setSelectedGenerators(selectedGenerators.filter((g) => g !== el));
                      } else {
                        setSelectedGenerators([...selectedGenerators, el]);
                      }
                    }}
                    className={`h-13 rounded-2xl font-bold text-sm border-2 flex flex-col items-center justify-center transition-all shadow-xs ${
                      isSelected
                        ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-md'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{el}</span>
                    <span className="text-[10px] font-normal opacity-75">
                      gcd: {el === 1 || el === 5 ? '1' : el === 2 || el === 4 ? '2' : '3'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Subgroup details box */}
            {activeGeneratorView !== null && (
              <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1">
                <span className="text-slate-600 font-medium">
                  원소 {activeGeneratorView}에 의해 생성된 부분군:
                </span>
                <div className="font-mono text-amber-900 font-bold">
                  &lt;{activeGeneratorView}&gt; = {'{ '}
                  {currentStage.data.subgroupDetails[String(activeGeneratorView)].join(', ')}
                  {' }'} (위수: {currentStage.data.subgroupDetails[String(activeGeneratorView)].length})
                </div>
                {currentStage.data.subgroupDetails[String(activeGeneratorView)].length === 6 ? (
                  <span className="text-emerald-700 font-bold text-[11px] block">
                    ✓ 전체 ℤ₆을 모두 생성하므로 생성원(Generator)입니다!
                  </span>
                ) : (
                  <span className="text-rose-600 font-medium text-[11px] block">
                    ✗ 부분군에 갇혀 전체 군을 생성하지 못합니다.
                  </span>
                )}
              </div>
            )}

            <button
              onClick={() => {
                sound.playTap();
                const correct = currentStage.data.correctGenerators;
                const isMatch =
                  selectedGenerators.length === correct.length &&
                  selectedGenerators.every((g) => correct.includes(g));

                handleSolveStage(
                  isMatch,
                  isMatch
                    ? '정답입니다! 6과 서로소(gcd=1)인 원소 1과 5만이 ℤ₆의 생성원입니다!'
                    : `틀렸습니다. 선택한 목록: [${selectedGenerators.join(', ')}]. 위수가 6이 되는 원소(1과 5)만 골라야 합니다.`
                );
              }}
              className="w-full h-12 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-bold text-sm shadow-md shadow-amber-400/20 transition-all"
            >
              생성원 판정 제출
            </button>
          </div>
        )}

        {/* 4. Cayley Fill Grid */}
        {currentStage.type === 'cayley_fill' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500 text-center font-medium">
              라틴 방진 규칙(각 행과 열에 원소가 중복되지 않음)을 이용해 물음표(?)를 채우세요.
            </div>

            <div className="overflow-x-auto flex justify-center py-2">
              <table className="border-collapse text-center text-sm font-mono tabular-nums">
                <thead>
                  <tr>
                    <th className="p-2.5 border border-slate-300 bg-amber-100 text-amber-900 font-bold">
                      *
                    </th>
                    {currentStage.data.headers.map((h: string) => (
                      <th
                        key={h}
                        className="p-2.5 border border-slate-300 bg-slate-100 text-slate-700 font-bold w-11"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentStage.data.initialGrid.map((row: string[], rIdx: number) => (
                    <tr key={rIdx}>
                      <td className="p-2.5 border border-slate-300 bg-slate-100 text-slate-700 font-bold">
                        {currentStage.data.headers[rIdx]}
                      </td>
                      {row.map((cell: string, cIdx: number) => {
                        const isMissing = cell === '?';
                        return (
                          <td
                            key={cIdx}
                            className={`p-2.5 border border-slate-300 transition-colors font-bold ${
                              isMissing
                                ? 'bg-amber-100 text-amber-900 border-amber-400 animate-pulse'
                                : 'bg-white text-slate-800'
                            }`}
                          >
                            {isMissing && userSelectedOption ? userSelectedOption : cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-800 text-center">
                ? 에 들어갈 원소를 선택하세요:
              </div>
              <div className="flex justify-center gap-3">
                {currentStage.data.choices.map((choice: string) => (
                  <button
                    key={choice}
                    onClick={() => {
                      sound.playTap();
                      setUserSelectedOption(choice);
                      const isCorrect = choice === currentStage.data.correctValue;
                      handleSolveStage(
                        isCorrect,
                        isCorrect
                          ? `정답입니다! 라틴 방진 성질에 의해 각 행과 열에는 모든 원소가 단 1회씩만 나타나야 하므로 '${choice}'가 되어야 합니다.`
                          : `'${choice}'를 넣으면 해당 행 또는 열에 원소 중복이 발생합니다. 다른 원소를 선택해보세요.`
                      );
                    }}
                    className={`w-14 h-12 rounded-2xl font-bold font-mono text-base border-2 transition-all shadow-xs ${
                      userSelectedOption === choice
                        ? choice === currentStage.data.correctValue
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-rose-500 text-white border-rose-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. Zero Divisors */}
        {currentStage.type === 'zero_divisors' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-500 font-medium">
              환 (ℤ₆, +, ×)에서 0이 아닌 두 수를 곱했을 때 6의 배수가 되어 결과가 0 (mod 6)이 되는 영인자(Zero Divisor) 쌍을 선택하세요:
            </div>

            <div className="space-y-2">
              {currentStage.data.options.map((opt: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playTap();
                    setUserSelectedOption(idx);
                    const isCorrect = opt.isZeroDivisor;
                    handleSolveStage(
                      isCorrect,
                      isCorrect
                        ? `정답입니다! 2와 3은 0이 아니지만 곱하면 2 × 3 = 6 ≡ 0 (mod 6)이 됩니다. 따라서 2와 3은 ℤ₆의 영인자입니다!`
                        : `오답입니다. ${opt.pair}의 결과는 ${opt.productMod} (mod 6)이므로 0이 되지 않습니다.`
                    );
                  }}
                  className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                    userSelectedOption === idx
                      ? opt.isZeroDivisor
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                        : 'bg-rose-50 border-rose-500 text-rose-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono font-bold text-sm">{opt.pair}</span>
                  <span className="text-xs text-slate-500 font-mono">
                    ≡ {opt.productMod} (mod 6)
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 6. General Choice / Associative / Closure / Isomorphism Stages */}
        {(currentStage.type === 'associative' ||
          currentStage.type === 'closure' ||
          currentStage.type === 'isomorphism' ||
          currentStage.type === 'inverse' ||
          currentStage.type === 'symmetry_poly' ||
          currentStage.type === 'permutation_cycle') && (
          <div className="space-y-3">
            {/* If inverse stage */}
            {currentStage.type === 'inverse' && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
                <div className="text-xs text-slate-500">모듈러 합동식:</div>
                <div className="text-base font-mono text-amber-900 font-extrabold">
                  3 + x ≡ 0 (mod 5)
                </div>
              </div>
            )}

            {/* List options */}
            <div className="space-y-2">
              {(currentStage.data.options || currentStage.data.choices)?.map(
                (opt: any, idx: number) => {
                  const optText =
                    typeof opt === 'string'
                      ? opt
                      : opt.title || opt.name || String(opt);
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playTap();
                        setUserSelectedOption(idx);

                        let isCorrect = false;
                        let explanation = '';

                        if (currentStage.data.correctIndex !== undefined) {
                          isCorrect = idx === currentStage.data.correctIndex;
                          explanation = isCorrect
                            ? '정답입니다! 완벽하게 이해하셨습니다.'
                            : '다시 검토해보세요. 다른 보기를 확인해보세요.';
                        } else if (currentStage.data.correctAnswer !== undefined) {
                          isCorrect =
                            (idx === 0 && currentStage.data.correctAnswer === true) ||
                            (idx === 1 && currentStage.data.correctAnswer === false);
                          explanation = isCorrect
                            ? '정답입니다! 군의 공리가 올바르게 충족되었습니다.'
                            : '오답입니다. 공리의 조건을 다시 상기해보세요.';
                        } else if (currentStage.data.correctAnswer !== undefined) {
                          isCorrect = opt === currentStage.data.correctAnswer;
                          explanation = isCorrect ? '정답입니다!' : '오답입니다.';
                        }

                        handleSolveStage(isCorrect, explanation);
                      }}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all min-h-[50px] shadow-xs ${
                        userSelectedOption === idx
                          ? 'bg-amber-100 border-amber-500 text-slate-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xs leading-relaxed">{optText}</span>
                      {userSelectedOption === idx && (
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Feedback message banner */}
        {feedbackMsg && (
          <div
            className={`p-3.5 rounded-2xl text-xs leading-relaxed border-2 animate-fade-in flex items-start gap-2 ${
              feedbackMsg.isError
                ? 'bg-rose-50 border-rose-300 text-rose-900'
                : 'bg-emerald-50 border-emerald-300 text-emerald-900'
            }`}
          >
            {feedbackMsg.isError ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
        )}
      </div>

      {/* Stage Clear Victory Modal */}
      {showClearModal && (
        <StageClearModal
          stage={currentStage}
          stars={showHint ? 2 : 3}
          score={currentStage.targetScore}
          onNextStage={handleNextStage}
          onRetry={() => {
            setShowClearModal(false);
            setUserSelectedOption(null);
            setFeedbackMsg(null);
          }}
          onClose={() => setShowClearModal(false)}
        />
      )}
    </div>
  );
};
