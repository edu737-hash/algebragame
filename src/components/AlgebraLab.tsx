import React, { useState } from 'react';
import { BookOpen, Atom, Sparkles, Smile } from 'lucide-react';
import { sound } from '../utils/audio';
import { ALL_PENGUIN_LIST } from '../data/penguins';
import { PenguinBubble } from './PenguinBubble';

type LabGroupKey = 'z2' | 'z3' | 'z4' | 'z5' | 'z6' | 'v4' | 's3' | 'u8';

interface GroupData {
  name: string;
  symbol: string;
  order: number;
  isAbelian: boolean;
  isCyclic: boolean;
  generators: string[];
  elements: { symbol: string; order: number; inverse: string }[];
  subgroups: { name: string; elements: string[]; order: number }[];
  cayleyTable: { headers: string[]; matrix: string[][] };
  realWorldApplication: string;
}

const LAB_GROUPS: Record<LabGroupKey, GroupData> = {
  z2: {
    name: '2차 순환군',
    symbol: 'ℤ₂',
    order: 2,
    isAbelian: true,
    isCyclic: true,
    generators: ['1'],
    elements: [
      { symbol: '0', order: 1, inverse: '0' },
      { symbol: '1', order: 2, inverse: '1' },
    ],
    subgroups: [
      { name: '{0}', elements: ['0'], order: 1 },
      { name: 'ℤ₂', elements: ['0', '1'], order: 2 },
    ],
    cayleyTable: {
      headers: ['0', '1'],
      matrix: [
        ['0', '1'],
        ['1', '0'],
      ],
    },
    realWorldApplication: '디지털 컴퓨터 2진 비트 연산, 불리언 XOR 논리 게이트, 홀짝 패리티 검사',
  },
  z3: {
    name: '3차 순환군',
    symbol: 'ℤ₃',
    order: 3,
    isAbelian: true,
    isCyclic: true,
    generators: ['1', '2'],
    elements: [
      { symbol: '0', order: 1, inverse: '0' },
      { symbol: '1', order: 3, inverse: '2' },
      { symbol: '2', order: 3, inverse: '1' },
    ],
    subgroups: [
      { name: '{0}', elements: ['0'], order: 1 },
      { name: 'ℤ₃', elements: ['0', '1', '2'], order: 3 },
    ],
    cayleyTable: {
      headers: ['0', '1', '2'],
      matrix: [
        ['0', '1', '2'],
        ['1', '2', '0'],
        ['2', '0', '1'],
      ],
    },
    realWorldApplication: '삼상 교류 전기 신호 위상(120도), 정삼각형 순수 회전군',
  },
  z4: {
    name: '4차 순환군',
    symbol: 'ℤ₄',
    order: 4,
    isAbelian: true,
    isCyclic: true,
    generators: ['1', '3'],
    elements: [
      { symbol: '0', order: 1, inverse: '0' },
      { symbol: '1', order: 4, inverse: '3' },
      { symbol: '2', order: 2, inverse: '2' },
      { symbol: '3', order: 4, inverse: '1' },
    ],
    subgroups: [
      { name: '{0}', elements: ['0'], order: 1 },
      { name: '⟨2⟩', elements: ['0', '2'], order: 2 },
      { name: 'ℤ₄', elements: ['0', '1', '2', '3'], order: 4 },
    ],
    cayleyTable: {
      headers: ['0', '1', '2', '3'],
      matrix: [
        ['0', '1', '2', '3'],
        ['1', '2', '3', '0'],
        ['2', '3', '0', '1'],
        ['3', '0', '1', '2'],
      ],
    },
    realWorldApplication: '정사각형 90도 회전 대칭군, 4분위 주기성 데이터 모델링',
  },
  v4: {
    name: '클라인 4원군',
    symbol: 'V₄ (≅ ℤ₂ × ℤ₂)',
    order: 4,
    isAbelian: true,
    isCyclic: false,
    generators: [],
    elements: [
      { symbol: 'e', order: 1, inverse: 'e' },
      { symbol: 'a', order: 2, inverse: 'a' },
      { symbol: 'b', order: 2, inverse: 'b' },
      { symbol: 'c', order: 2, inverse: 'c' },
    ],
    subgroups: [
      { name: '{e}', elements: ['e'], order: 1 },
      { name: '⟨a⟩', elements: ['e', 'a'], order: 2 },
      { name: '⟨b⟩', elements: ['e', 'b'], order: 2 },
      { name: '⟨c⟩', elements: ['e', 'c'], order: 2 },
      { name: 'V₄', elements: ['e', 'a', 'b', 'c'], order: 4 },
    ],
    cayleyTable: {
      headers: ['e', 'a', 'b', 'c'],
      matrix: [
        ['e', 'a', 'b', 'c'],
        ['a', 'e', 'c', 'b'],
        ['b', 'c', 'e', 'a'],
        ['c', 'b', 'a', 'e'],
      ],
    },
    realWorldApplication: '직사각형 대칭군(가로반사, 세로반사, 180도 회전), 양자 스핀 Pauli 행렬 연산자',
  },
  z5: {
    name: '5차 순환군 / 유한체 𝔽₅',
    symbol: 'ℤ₅',
    order: 5,
    isAbelian: true,
    isCyclic: true,
    generators: ['1', '2', '3', '4'],
    elements: [
      { symbol: '0', order: 1, inverse: '0' },
      { symbol: '1', order: 5, inverse: '4' },
      { symbol: '2', order: 5, inverse: '3' },
      { symbol: '3', order: 5, inverse: '2' },
      { symbol: '4', order: 5, inverse: '1' },
    ],
    subgroups: [
      { name: '{0}', elements: ['0'], order: 1 },
      { name: 'ℤ₅', elements: ['0', '1', '2', '3', '4'], order: 5 },
    ],
    cayleyTable: {
      headers: ['0', '1', '2', '3', '4'],
      matrix: [
        ['0', '1', '2', '3', '4'],
        ['1', '2', '3', '4', '0'],
        ['2', '3', '4', '0', '1'],
        ['3', '4', '0', '1', '2'],
        ['4', '0', '1', '2', '3'],
      ],
    },
    realWorldApplication: '소수 위수군(단순군), 암호학 Diffie-Hellman 키 교환의 기본 순환군',
  },
  z6: {
    name: '6차 순환군',
    symbol: 'ℤ₆ (≅ ℤ₂ × ℤ₃)',
    order: 6,
    isAbelian: true,
    isCyclic: true,
    generators: ['1', '5'],
    elements: [
      { symbol: '0', order: 1, inverse: '0' },
      { symbol: '1', order: 6, inverse: '5' },
      { symbol: '2', order: 3, inverse: '4' },
      { symbol: '3', order: 2, inverse: '3' },
      { symbol: '4', order: 3, inverse: '2' },
      { symbol: '5', order: 6, inverse: '1' },
    ],
    subgroups: [
      { name: '{0}', elements: ['0'], order: 1 },
      { name: '⟨3⟩', elements: ['0', '3'], order: 2 },
      { name: '⟨2⟩', elements: ['0', '2', '4'], order: 3 },
      { name: 'ℤ₆', elements: ['0', '1', '2', '3', '4', '5'], order: 6 },
    ],
    cayleyTable: {
      headers: ['0', '1', '2', '3', '4', '5'],
      matrix: [
        ['0', '1', '2', '3', '4', '5'],
        ['1', '2', '3', '4', '5', '0'],
        ['2', '3', '4', '5', '0', '1'],
        ['3', '4', '5', '0', '1', '2'],
        ['4', '5', '0', '1', '2', '3'],
        ['5', '0', '1', '2', '3', '4'],
      ],
    },
    realWorldApplication: '중국인의 나머지 정리(CRT), 위수 2와 위수 3인 부분군들의 직적 분해',
  },
  s3: {
    name: '3차 치환대칭군',
    symbol: 'S₃ (≅ D₃)',
    order: 6,
    isAbelian: false,
    isCyclic: false,
    generators: ['(1 2)', '(1 2 3)'],
    elements: [
      { symbol: 'e', order: 1, inverse: 'e' },
      { symbol: '(1 2)', order: 2, inverse: '(1 2)' },
      { symbol: '(1 3)', order: 2, inverse: '(1 3)' },
      { symbol: '(2 3)', order: 2, inverse: '(2 3)' },
      { symbol: '(1 2 3)', order: 3, inverse: '(1 3 2)' },
      { symbol: '(1 3 2)', order: 3, inverse: '(1 2 3)' },
    ],
    subgroups: [
      { name: '{e}', elements: ['e'], order: 1 },
      { name: '⟨(1 2)⟩', elements: ['e', '(1 2)'], order: 2 },
      { name: '⟨(1 3)⟩', elements: ['e', '(1 3)'], order: 2 },
      { name: '⟨(2 3)⟩', elements: ['e', '(2 3)'], order: 2 },
      { name: 'A₃ (교대군)', elements: ['e', '(1 2 3)', '(1 3 2)'], order: 3 },
      { name: 'S₃', elements: ['e', '...'], order: 6 },
    ],
    cayleyTable: {
      headers: ['e', 'r', 'r²', 's', 'sr', 'sr²'],
      matrix: [
        ['e', 'r', 'r²', 's', 'sr', 'sr²'],
        ['r', 'r²', 'e', 'sr²', 's', 'sr'],
        ['r²', 'e', 'r', 'sr', 'sr²', 's'],
        ['s', 'sr', 'sr²', 'e', 'r', 'r²'],
        ['sr', 'sr²', 's', 'r²', 'e', 'r'],
        ['sr²', 's', 'sr', 'r', 'r²', 'e'],
      ],
    },
    realWorldApplication: '최소 크기의 비가환군, 정삼각형 대칭군, 3원소 치환, 양자 분자 진동 대칭성 분석',
  },
  u8: {
    name: '모듈러 8의 기약잉여류군',
    symbol: 'U(8) (≅ V₄)',
    order: 4,
    isAbelian: true,
    isCyclic: false,
    generators: [],
    elements: [
      { symbol: '1', order: 1, inverse: '1' },
      { symbol: '3', order: 2, inverse: '3' },
      { symbol: '5', order: 2, inverse: '5' },
      { symbol: '7', order: 2, inverse: '7' },
    ],
    subgroups: [
      { name: '{1}', elements: ['1'], order: 1 },
      { name: '⟨3⟩', elements: ['1', '3'], order: 2 },
      { name: '⟨5⟩', elements: ['1', '5'], order: 2 },
      { name: '⟨7⟩', elements: ['1', '7'], order: 2 },
      { name: 'U(8)', elements: ['1', '3', '5', '7'], order: 4 },
    ],
    cayleyTable: {
      headers: ['1', '3', '5', '7'],
      matrix: [
        ['1', '3', '5', '7'],
        ['3', '1', '7', '5'],
        ['5', '7', '1', '3'],
        ['7', '5', '3', '1'],
      ],
    },
    realWorldApplication: '오일러 피 함수 φ(8)=4, 곱셈 모듈러 가역원, RSA 공개키 암호학의 원리',
  },
};

export const AlgebraLab: React.FC = () => {
  const [subTab, setSubTab] = useState<'inspector' | 'codex' | 'penguins'>('inspector');
  const [selectedGroupKey, setSelectedGroupKey] = useState<LabGroupKey>('v4');
  const [activePenguinQuote, setActivePenguinQuote] = useState<{
    id: string;
    quote: string;
    name: string;
  }>({
    id: 'awesome_statue',
    name: '쩐다 펭귄',
    quote: '대수학의 구조미는 감동적이야!',
  });

  const group = LAB_GROUPS[selectedGroupKey];

  return (
    <div className="pb-24 pt-3 px-4 max-w-xl mx-auto space-y-4">
      {/* 3-Way Sub-tab Switcher */}
      <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-100 border border-slate-200 rounded-2xl">
        <button
          onClick={() => {
            sound.playTap();
            setSubTab('inspector');
          }}
          className={`py-2 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${
            subTab === 'inspector'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Atom className="w-3.5 h-3.5 text-sky-600" />
          <span>실험실</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setSubTab('codex');
          }}
          className={`py-2 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${
            subTab === 'codex'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>정리 도감</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            setSubTab('penguins');
          }}
          className={`py-2 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${
            subTab === 'penguins'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Smile className="w-3.5 h-3.5 text-rose-500" />
          <span>펭귄 스티커</span>
        </button>
      </div>

      {/* VIEW 1: INSPECTOR */}
      {subTab === 'inspector' && (
        <div className="space-y-4 animate-fade-in">
          {/* Group Chips Selector */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-slate-500 font-bold px-1">
              관찰할 군(Group) 선택:
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {(Object.keys(LAB_GROUPS) as LabGroupKey[]).map((key) => {
                const g = LAB_GROUPS[key];
                const isSelected = selectedGroupKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      sound.playTap();
                      setSelectedGroupKey(key);
                    }}
                    className={`px-3 py-2 rounded-2xl text-xs font-mono font-bold whitespace-nowrap shrink-0 border-2 transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {g.symbol}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group Properties Card */}
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-mono flex items-center gap-2">
                  <span>{group.symbol}</span>
                  <span className="text-xs font-sans text-slate-500 font-medium">
                    {group.name}
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono tabular-nums">
                <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                  위수 |G| = {group.order}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-medium">가환성 (Abelian)</span>
                <div className="font-bold flex items-center gap-1.5">
                  {group.isAbelian ? (
                    <span className="text-emerald-700">가환군 (Abelian)</span>
                  ) : (
                    <span className="text-rose-600">비가환군 (Non-Abelian)</span>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-medium">순환군 여부 (Cyclic)</span>
                <div className="font-bold">
                  {group.isCyclic ? (
                    <span className="text-emerald-700">
                      순환군 (생성원: {group.generators.join(', ')})
                    </span>
                  ) : (
                    <span className="text-slate-600 font-medium">단일 생성원 없음</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed">
              <span className="font-bold text-amber-900 block mb-0.5">현실 응용 분야:</span>
              {group.realWorldApplication}
            </div>
          </div>

          {/* Elements & Order Table */}
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 tracking-tight flex items-center justify-between">
              <span>원소별 위수(Order) 및 역원(Inverse)</span>
              <span className="text-[11px] text-slate-400 font-normal">
                |x|는 xⁿ = e가 되는 최소 양의 정수
              </span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {group.elements.map((el) => (
                <div
                  key={el.symbol}
                  className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-800 text-sm">{el.symbol}</span>
                    <span className="text-[11px] text-slate-500 font-sans">위수: {el.order}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-sans">
                    역원: <span className="text-slate-800 font-bold font-mono">{el.inverse}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subgroups List */}
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                모든 부분군 (Subgroups)
              </h4>
              <span className="text-[10px] text-amber-700 font-mono font-bold">
                라그랑주 정리: |H|는 {group.order}의 약수
              </span>
            </div>

            <div className="space-y-1.5">
              {group.subgroups.map((sub) => (
                <div
                  key={sub.name}
                  className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sky-700">{sub.name}</span>
                    <span className="text-slate-600 text-[11px]">
                      = {'{ '}{sub.elements.join(', ')}{' }'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-sans font-medium">
                    |H| = {sub.order}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cayley Table View */}
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">
              케일리 연산표 (Cayley Table)
            </h4>

            <div className="overflow-x-auto flex justify-center py-1">
              <table className="border-collapse font-mono text-center text-xs tabular-nums">
                <thead>
                  <tr>
                    <th className="p-2 border border-slate-300 bg-amber-100 text-amber-900 font-bold">
                      *
                    </th>
                    {group.cayleyTable.headers.map((h) => (
                      <th
                        key={h}
                        className="p-2 border border-slate-300 bg-slate-100 text-slate-700 font-bold min-w-[32px]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {group.cayleyTable.matrix.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 border border-slate-300 bg-slate-100 text-slate-700 font-bold">
                        {group.cayleyTable.headers[rIdx]}
                      </td>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="p-2 border border-slate-300 bg-white text-slate-800 font-semibold"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: THEOREM CODEX */}
      {subTab === 'codex' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 space-y-1 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              현대대수학 핵심 정리 도감
            </h3>
            <p className="text-xs text-slate-600">
              갈루아 이론부터 현대 암호학까지 이어지는 추상대수학의 위대한 정리들을 한눈에 정리했습니다.
            </p>
          </div>

          <div className="space-y-3">
            {/* 1. Group Axioms */}
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>군(Group)의 4대 공리</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                집합 G와 이항연산 *가 다음 4가지를 만족할 때 (G, *)를 <strong>군(Group)</strong>이라 부릅니다:
              </p>
              <ul className="text-xs text-slate-600 space-y-1 font-mono list-disc list-inside">
                <li><strong className="text-slate-800 font-sans">닫힘성 (Closure)</strong>: ∀ a, b ∈ G, a * b ∈ G</li>
                <li><strong className="text-slate-800 font-sans">결합법칙 (Associativity)</strong>: (a * b) * c = a * (b * c)</li>
                <li><strong className="text-slate-800 font-sans">항등원 존재 (Identity)</strong>: ∃ e ∈ G, a * e = e * a = a</li>
                <li><strong className="text-slate-800 font-sans">역원 존재 (Inverses)</strong>: ∀ a ∈ G, ∃ a⁻¹ ∈ G, a * a⁻¹ = e</li>
              </ul>
            </div>

            {/* 2. Lagrange Theorem */}
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>라그랑주의 정리 (Lagrange's Theorem)</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 font-mono text-xs text-amber-900 font-bold">
                |G| = [G : H] · |H|
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                유한군 G와 그 부분군 H에 대하여, <strong>부분군의 크기 |H|는 항상 전체 군의 크기 |G|의 약수</strong>입니다!
              </p>
            </div>

            {/* 3. Cosets & Normal Subgroups */}
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>잉여류(Coset)와 정규부분군(Normal Subgroup)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                모든 g ∈ G에 대해 좌잉여류와 우잉여류가 일치(gH = Hg)하는 부분군을 <strong>정규부분군 (H ⊲ G)</strong>이라 합니다.
                정규부분군으로 전체 군을 묶어 나누면 새로운 <strong>몫군(Quotient Group G/H)</strong>을 만들 수 있습니다.
              </p>
            </div>

            {/* 4. Isomorphism */}
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">
                  4
                </span>
                <span>동형사상 (Isomorphism: G ≅ H)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                두 군 사이에 연산 구조를 보존하는 전단사 함수가 존재할 때 두 군은 <strong>동형(Isomorphic)</strong>하다고 합니다.
              </p>
              <div className="p-2.5 rounded-2xl bg-sky-50 border border-sky-200 font-mono text-xs text-sky-900 font-bold">
                제1 동형 정리: G / Ker(φ) ≅ Im(φ)
              </div>
            </div>

            {/* 5. Rings, Zero Divisors & Fields */}
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">
                  5
                </span>
                <span>환(Ring), 영인자, 그리고 체(Field)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                <strong>환(Ring)</strong>: 덧셈에 대해 아벨군, 곱셈에 대해 결합/분배법칙 성립.<br />
                <strong>영인자(Zero Divisor)</strong>: a ≠ 0, b ≠ 0인데 a · b = 0이 되는 원소 (예: ℤ₆에서 2 × 3 ≡ 0).<br />
                <strong>체(Field)</strong>: 0을 제외한 모든 원소가 곱셈 역원을 가져 사칙연산이 완벽한 체계입니다.
              </p>
            </div>

            {/* 6. Cryptography Connection */}
            <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">
                  6
                </span>
                <span>현대 암호학과의 연결</span>
              </div>
              <div className="text-xs text-slate-700 space-y-1.5 font-sans leading-relaxed">
                <div>• <strong>RSA 공개키 암호</strong>: 오일러 정리 a^φ(n) ≡ 1 (mod n)과 기약잉여류군 U(n)</div>
                <div>• <strong>AES 블록 암호</strong>: 갈루아 유한체 GF(2⁸) 상에서의 역원 연산과 기약 다항식</div>
                <div>• <strong>타원곡선 암호 (ECC)</strong>: 유한체 위의 타원곡선 점들이 이루는 아벨군(Abelian Group) 덧셈 법칙</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: PENGUIN STICKER COLLECTION */}
      {subTab === 'penguins' && (
        <div className="space-y-4 animate-fade-in">
          {/* Active selected preview */}
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-slate-400">선택된 펭귄 스티커</span>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 shrink-0 bg-slate-50 rounded-2xl p-1 border border-slate-200 flex items-center justify-center">
                <img
                  src={`/assets/penguins/${activePenguinQuote.id}.png`}
                  alt={activePenguinQuote.name}
                  className="w-full h-full object-contain filter drop-shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block border border-amber-200">
                  {activePenguinQuote.name}
                </div>
                <div className="text-base font-extrabold text-slate-900">
                  "{activePenguinQuote.quote}"
                </div>
                <p className="text-[11px] text-slate-500">
                  대수학 퀘스트를 진행하며 펭귄의 다양한 반응을 모아보세요!
                </p>
              </div>
            </div>
          </div>

          {/* Sticker Grid */}
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                전체 펭귄 이모티콘 도감 ({ALL_PENGUIN_LIST.length}종)
              </h4>
              <span className="text-[10px] text-slate-400">탭하여 소리와 대사 듣기</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
              {ALL_PENGUIN_LIST.map((sticker) => {
                const isSelected = activePenguinQuote.id === sticker.id;
                return (
                  <button
                    key={sticker.id}
                    onClick={() => {
                      sound.playTap();
                      setActivePenguinQuote({
                        id: sticker.id,
                        name: sticker.name,
                        quote: sticker.quote,
                      });
                    }}
                    className={`p-2 rounded-2xl border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 shadow-xs scale-105'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img
                        src={sticker.image}
                        alt={sticker.name}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 mt-1 truncate max-w-[65px]">
                      {sticker.quote}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
