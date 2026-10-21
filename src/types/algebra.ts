export type TabType = 'campaign' | 'symmetry' | 'cayley' | 'permutation' | 'lab';

export type StageType = 
  | 'closure'           // Check or select elements that preserve closure
  | 'identity'          // Find identity element e
  | 'inverse'           // Match each element with its inverse
  | 'associative'       // Evaluate associativity grouping
  | 'cyclic_generator'  // Determine generators of Z_n
  | 'modular_clock'     // Modular arithmetic clock challenge
  | 'symmetry_poly'     // Match triangle or square symmetry
  | 'permutation_cycle' // Compose transpositions to target
  | 'cayley_fill'       // Fill missing Cayley table entries
  | 'zero_divisors'     // Spot zero divisors in rings
  | 'isomorphism';      // Match isomorphic structures

export interface Stage {
  id: number;
  chapter: number;
  chapterTitle: string;
  title: string;
  subtitle: string;
  conceptName: string; // e.g. "군의 닫힘성 (Closure)", "라그랑주 정리 (Lagrange's Theorem)"
  type: StageType;
  prompt: string;
  mathExplanation: string; // Explained in friendly, accurate Korean
  targetScore: number;
  data: any; // Stage-specific payload
}

export interface UserProgress {
  completedStages: Record<number, { stars: number; highscore: number }>;
  totalStars: number;
  symmetryBestStreak: number;
  cayleyPuzzlesSolved: number;
  permutationBestMoves: Record<string, number>;
}

export interface PermutationElement {
  from: number;
  to: number;
}
