import { Stage } from '../types/algebra';

export const STAGES: Stage[] = [
  // CHAPTER 1
  {
    id: 1,
    chapter: 1,
    chapterTitle: '1장. 군(Group)의 4대 공리',
    title: '닫힘성 (Closure)',
    subtitle: '연산의 결과가 항상 집합 안에 머무르는가?',
    conceptName: '닫힘성 (Closure Property)',
    type: 'closure',
    prompt: '집합 S = {0, 1, 2, 3}에서 "모듈러 4 덧셈 (+ mod 4)"을 수행할 때, 다음 연산 중 닫힘성을 위배하는 항목이 있는지 확인하고 닫혀있는지 판정하세요.',
    mathExplanation: '어떤 집합 G와 이항연산 *에 대해, G의 임의의 두 원소 a, b에 대하여 a * b 역시 G의 원소일 때 연산이 "닫혀있다"고 합니다. 모듈러 덧셈은 나머지가 항상 {0, 1, ..., n-1} 안에 있으므로 닫힘성을 만족합니다.',
    targetScore: 100,
    data: {
      setElements: [0, 1, 2, 3],
      operationName: '+ (mod 4)',
      questions: [
        { exp: '2 + 3 (mod 4)', result: 1, inSet: true },
        { exp: '3 + 3 (mod 4)', result: 2, inSet: true },
        { exp: '1 + 2 (mod 4)', result: 3, inSet: true },
      ],
      questionPrompt: '집합 S = {0, 1, 2, 3}에서 덧셈 연산(+ mod 4)은 닫혀 있습니까?',
      correctAnswer: true,
      options: ['예 (닫혀 있음 - 군의 제1공리 만족)', '아니오 (닫혀 있지 않음)']
    }
  },
  {
    id: 2,
    chapter: 1,
    chapterTitle: '1장. 군(Group)의 4대 공리',
    title: '항등원 (Identity Element)',
    subtitle: '누구와 연산해도 자신을 지켜주는 거울 같은 원소',
    conceptName: '항등원의 유일성 (Unique Identity e)',
    type: 'identity',
    prompt: '집합 S = {e, a, b, c}의 연산표가 아래와 같을 때, 연산 *에 대한 "항등원(Identity Element)"을 찾으세요.',
    mathExplanation: '군의 모든 원소 x에 대하여 x * e = e * x = x를 만족하는 특별한 원소 e를 "항등원"이라 부릅니다. 군에서 항등원은 오직 하나만 존재합니다 (유일성). 연산표에서는 해당 행과 열이 원소 머리글과 똑같이 복제되는 곳이 항등원입니다!',
    targetScore: 100,
    data: {
      elements: ['e', 'a', 'b', 'c'],
      table: [
        ['e', 'a', 'b', 'c'],
        ['a', 'b', 'c', 'e'],
        ['b', 'c', 'e', 'a'],
        ['c', 'e', 'a', 'b'],
      ],
      correctElement: 'e',
    }
  },
  {
    id: 3,
    chapter: 1,
    chapterTitle: '1장. 군(Group)의 4대 공리',
    title: '역원 (Inverse Element)',
    subtitle: '연산하여 항등원으로 되돌리는 짝꿍',
    conceptName: '역원의 존재성 (Inverses: a * a⁻¹ = e)',
    type: 'inverse',
    prompt: '순환군 (ℤ₅, + mod 5)에서 항등원은 0입니다. 원소 3의 역원(3에 더해서 0이 되는 원소)은 무엇일까요?',
    mathExplanation: '임의의 원소 a에 대하여 a * x = e가 되는 x를 a의 역원(a⁻¹)이라 합니다. ℤ₅에서 3 + 2 = 5 ≡ 0 (mod 5)이므로 3의 역원은 2입니다. 반대로 2의 역원도 3입니다!',
    targetScore: 100,
    data: {
      mod: 5,
      targetElement: 3,
      identity: 0,
      options: [0, 1, 2, 4],
      correctAnswer: 2,
      followUp: [
        { elem: 1, inverse: 4 },
        { elem: 2, inverse: 3 },
        { elem: 4, inverse: 1 },
      ]
    }
  },
  {
    id: 4,
    chapter: 1,
    chapterTitle: '1장. 군(Group)의 4대 공리',
    title: '결합법칙 (Associativity)',
    subtitle: '괄호의 위치를 바꾸어도 결과는 불변한다',
    conceptName: '결합법칙 (a * b) * c = a * (b * c)',
    type: 'associative',
    prompt: '다음 연산 중 결합법칙을 만족하지 않아 "군(Group)"이 될 수 없는 연산은 무엇일까요?',
    mathExplanation: '결합법칙 (a * b) * c = a * (b * c)는 연산 순서의 괄호를 자유롭게 바꿀 수 있음을 보장합니다. 일반 뺄셈(-)은 (5 - 3) - 2 = 0이지만 5 - (3 - 2) = 4이므로 결합법칙이 성립하지 않습니다! 따라서 (ℤ, -)는 군이 아닙니다.',
    targetScore: 100,
    data: {
      options: [
        { title: '실수의 곱셈 (ℝ*, ×)', isGroup: true, explanation: '(a × b) × c = a × (b × c) 성립' },
        { title: '정수의 뺄셈 (ℤ, -)', isGroup: false, explanation: '(5 - 3) - 2 = 0 ≠ 5 - (3 - 2) = 4 (불성립!)' },
        { title: '정수의 덧셈 (ℤ, +)', isGroup: true, explanation: '(a + b) + c = a + (b + c) 성립' },
        { title: '2×2 가역행렬의 곱셈 (GL₂(ℝ), ·)', isGroup: true, explanation: '행렬 곱셈은 결합법칙 만족' },
      ],
      correctIndex: 1
    }
  },

  // CHAPTER 2
  {
    id: 5,
    chapter: 2,
    chapterTitle: '2장. 순환군과 모듈러 산술',
    title: '모듈러 시계 연산',
    subtitle: '시계 바늘을 돌려 합동식의 리듬을 체득하라',
    conceptName: '순환군 (Cyclic Group ℤ₇)',
    type: 'modular_clock',
    prompt: '7-시간제 시계(ℤ₇)에서 현재 4시입니다. 5시간을 3번 더 돌렸을 때 도착하는 시각은 몇 시일까요?',
    mathExplanation: '4 + (5 × 3) = 4 + 15 = 19입니다. 19를 7로 나누면 몫은 2이고 나머지는 5입니다. 즉 19 ≡ 5 (mod 7). 원형 시계 구조는 가장 기본적인 가환 순환군 ℤₙ의 모델입니다.',
    targetScore: 100,
    data: {
      n: 7,
      start: 4,
      step: 5,
      times: 3,
      correct: 5,
      choices: [1, 3, 5, 6]
    }
  },
  {
    id: 6,
    chapter: 2,
    chapterTitle: '2장. 순환군과 모듈러 산술',
    title: '생성원(Generator)의 자격',
    subtitle: '단 하나의 원소로 군 전체를 낳을 수 있는가?',
    conceptName: '생성원 조건: gcd(k, n) = 1',
    type: 'cyclic_generator',
    prompt: '군 (ℤ₆, + mod 6)의 모든 원소 {0, 1, 2, 3, 4, 5}를 생성할 수 있는 "생성원(Generator)"을 모두 선택하세요.',
    mathExplanation: 'ℤₙ의 원소 k가 생성원이 되기 위한 필요충분조건은 gcd(k, n) = 1 (서로소)인 것입니다. 6과 서로소인 원소는 1과 5뿐입니다. 2는 {0, 2, 4}만을 낳고, 3은 {0, 3}만을 생성하여 부분군에 갇힙니다!',
    targetScore: 100,
    data: {
      n: 6,
      elements: [1, 2, 3, 4, 5],
      correctGenerators: [1, 5],
      subgroupDetails: {
        '1': [1, 2, 3, 4, 5, 0],
        '2': [2, 4, 0],
        '3': [3, 0],
        '4': [4, 2, 0],
        '5': [5, 4, 3, 2, 1, 0],
      }
    }
  },
  {
    id: 7,
    chapter: 2,
    chapterTitle: '2장. 순환군과 모듈러 산술',
    title: '라그랑주의 정리 (Lagrange\'s Theorem)',
    subtitle: '부분군의 크기는 반드시 전체 군의 약수이다',
    conceptName: '라그랑주 정리: |H|는 |G|의 약수',
    type: 'associative',
    prompt: '위수(크기)가 12인 유한군 G가 있습니다. 라그랑주 정리에 따를 때, G의 부분군 H의 크기(|H|)가 절대로 될 수 없는 숫자는 무엇일까요?',
    mathExplanation: '라그랑주의 정리(Lagrange\'s Theorem)에 따르면, 유한군 G의 임의의 부분군 H에 대해 |H|는 반드시 |G|의 약수여야 합니다. 12의 약수는 1, 2, 3, 4, 6, 12입니다. 따라서 크기가 5나 7인 부분군은 절대로 존재할 수 없습니다!',
    targetScore: 100,
    data: {
      options: [
        { title: '위수 3인 부분군', isGroup: true, explanation: '3은 12의 약수이므로 존재 가능' },
        { title: '위수 4인 부분군', isGroup: true, explanation: '4는 12의 약수이므로 존재 가능' },
        { title: '위수 5인 부분군', isGroup: false, explanation: '5는 12의 약수가 아니므로 라그랑주 정리에 의해 절대 불가!' },
        { title: '위수 6인 부분군', isGroup: true, explanation: '6은 12의 약수이므로 존재 가능' },
      ],
      correctIndex: 2
    }
  },

  // CHAPTER 3
  {
    id: 8,
    chapter: 3,
    chapterTitle: '3장. 대칭군과 이면군 (Dihedral Groups)',
    title: '정삼각형의 대칭 (D₃)',
    subtitle: '회전(r)과 반사(s)로 다각형의 형태를 보존하라',
    conceptName: '이면군 D₃ (|D₃| = 6)',
    type: 'symmetry_poly',
    prompt: '정삼각형에 회전(r: 120° 반시계)을 1회 적용한 뒤 수직축 반사(s)를 적용했습니다. 꼭짓점 배열 [1, 2, 3]의 최종 결과는 어떻게 될까요?',
    mathExplanation: '정삼각형의 대칭군 D₃는 3개의 회전(e, r, r²)과 3개의 반사(s, sr, sr²)로 총 6개의 원소로 구성됩니다. 연산의 합성 순서를 추적해 보면 다각형의 모든 꼭짓점 위치가 정확히 일대일 대응됩니다.',
    targetScore: 100,
    data: {
      shape: 'triangle',
      initial: [1, 2, 3],
      actions: ['rotate', 'flip'],
      target: [2, 1, 3], // 1->2, 2->3, 3->1 then flip swaps left/right
      choices: [
        [2, 1, 3],
        [3, 2, 1],
        [1, 3, 2],
        [2, 3, 1]
      ],
      correctIndex: 0
    }
  },
  {
    id: 9,
    chapter: 3,
    chapterTitle: '3장. 대칭군과 이면군 (Dihedral Groups)',
    title: '비가환의 충격 (r · s ≠ s · r)',
    subtitle: '순서를 바꾸면 우주가 달라진다',
    conceptName: '비가환군 (Non-Abelian Group)',
    type: 'symmetry_poly',
    prompt: 'D₃에서 "회전 후 반사(s · r)"와 "반사 후 회전(r · s)"의 결과가 같을까요, 다를까요?',
    mathExplanation: '대칭군과 이면군은 가환군(Abelian)이 아닙니다! 실제로 r · s = s · r² 관계가 성립하므로, r · s ≠ s · r 입니다. 추상대수학에서 교환법칙이 성립하지 않는 세계는 양자역학과 현대 암호학의 핵심 기반입니다.',
    targetScore: 100,
    data: {
      shape: 'triangle',
      question: 'r · s 와 s · r 은 동일한 변환인가?',
      options: ['다르다 (비가환군 Non-Abelian: r·s ≠ s·r)', '같다 (가환군 Abelian)'],
      correctIndex: 0,
      demonstration: 'r·s는 [3, 2, 1]인 반면 s·r은 [2, 1, 3]으로 결과가 완전히 다릅니다!'
    }
  },
  {
    id: 10,
    chapter: 3,
    chapterTitle: '3장. 대칭군과 이면군 (Dihedral Groups)',
    title: '정사각형의 대칭 (D₄)',
    subtitle: '8가지 대칭 변환의 아름다운 구조',
    conceptName: '정사각 이면군 D₄ (|D₄| = 8)',
    type: 'symmetry_poly',
    prompt: '정사각형(D₄)을 원점으로 180° 회전(r²)하고 대각선 반사를 가했을 때 변환의 위수(원소를 몇 번 거듭제곱해야 항등원 e가 되는가)를 맞추세요.',
    mathExplanation: 'D₄의 모든 반사 원소 s, sr, sr², sr³는 2번 적용하면 자기 자신으로 돌아오므로 위수(Order)가 2입니다! 회전 원소 중 r과 r³은 위수 4, r²은 위수 2입니다.',
    targetScore: 100,
    data: {
      shape: 'square',
      question: 'D₄에서 모든 "반사(Reflection)" 원소의 위수(Order)는 얼마일까요?',
      options: ['위수 2 (두 번 뒤집으면 항상 원래대로 돌아옴)', '위수 4', '위수 8', '위수 1'],
      correctIndex: 0
    }
  },

  // CHAPTER 4
  {
    id: 11,
    chapter: 4,
    chapterTitle: '4장. 치환군과 대칭성 (Symmetric Groups)',
    title: '호환(Transposition)과 순열',
    subtitle: '두 원소의 자리바꿈만으로 모든 치환을 만든다',
    conceptName: '호환 생성 정리 (S_n is generated by transpositions)',
    type: 'permutation_cycle',
    prompt: '배열 [1, 2, 3]을 [3, 1, 2]로 만들고자 합니다. 순환 표기법으로 나타내면 무엇일까요?',
    mathExplanation: '1이 3으로 가고, 3이 2로 가고, 2가 1로 돌아오므로 1 → 3 → 2 → 1 입니다. 이를 순환 표기법으로 (1 3 2) 또는 (1 3)(1 2)로 표현합니다. 모든 치환은 서로소인 순환들의 곱 또는 호환(2-사이클)의 곱으로 표현됩니다.',
    targetScore: 100,
    data: {
      initial: [1, 2, 3],
      target: [3, 1, 2],
      options: ['(1 3 2)', '(1 2 3)', '(2 3)', '(1 3)'],
      correctIndex: 0
    }
  },
  {
    id: 12,
    chapter: 4,
    chapterTitle: '4장. 치환군과 대칭성 (Symmetric Groups)',
    title: '짝치환과 홀치환 (Parity)',
    subtitle: '15 퍼즐의 불가능성을 증명하는 부호(Sign)',
    conceptName: '교대군 A_n (Alternating Group)',
    type: 'permutation_cycle',
    prompt: '치환 σ = (1 2 3 4)는 몇 개의 호환(자리바꿈)의 곱으로 쪼개지며, 짝치환일까요 홀치환일까요?',
    mathExplanation: '길이가 k인 순환은 (k-1)개의 호환의 곱으로 쪼개집니다. (1 2 3 4) = (1 4)(1 3)(1 2)로 3개의 호환(홀수 개)의 곱이므로 "홀치환(Odd Permutation)"입니다! 짝치환들만 모은 군을 교대군(Alternating Group, Aₙ)이라 부릅니다.',
    targetScore: 100,
    data: {
      cycleStr: '(1 2 3 4)',
      options: [
        '3개의 호환 곱 → 홀치환 (Odd Permutation)',
        '4개의 호환 곱 → 짝치환 (Even Permutation)',
        '2개의 호환 곱 → 짝치환 (Even Permutation)'
      ],
      correctIndex: 0
    }
  },

  // CHAPTER 5
  {
    id: 13,
    chapter: 5,
    chapterTitle: '5장. 케일리 테이블(Cayley Table) 스도쿠',
    title: 'ℤ₃ 케일리 테이블 복원',
    subtitle: '라틴 방진: 각 행과 열에 중복이 없다',
    conceptName: '재배열 정리 (Rearrangement Theorem)',
    type: 'cayley_fill',
    prompt: '아래 ℤ₃={0, 1, 2} 연산표의 빈칸 (?)에 들어갈 알맞은 숫자를 채우세요.',
    mathExplanation: '군의 케일리 테이블에서 각 행과 열에는 군의 모든 원소가 정확히 한 번씩만 등장합니다(라틴 방진 성질). 만약 중복이 있다면 소거법칙(Cancellation Law: ax = ay ⇒ x = y)에 모순되기 때문입니다!',
    targetScore: 100,
    data: {
      headers: ['0', '1', '2'],
      initialGrid: [
        ['0', '1', '2'],
        ['1', '2', '0'],
        ['2', '0', '?'],
      ],
      missingRow: 2,
      missingCol: 2,
      correctValue: '1',
      choices: ['0', '1', '2']
    }
  },
  {
    id: 14,
    chapter: 5,
    chapterTitle: '5장. 케일리 테이블(Cayley Table) 스도쿠',
    title: '클라인 4원군 (Klein 4-Group V₄)',
    subtitle: '모든 원소가 스스로의 역원인 신비한 군',
    conceptName: '클라인 4원군 V₄ (x² = e for all x)',
    type: 'cayley_fill',
    prompt: 'V₄ = {e, a, b, c}에서 e는 항등원이고, 모든 원소는 자기 자신이 역원(a² = b² = c² = e)입니다. a * b 의 결과는 무엇일까요?',
    mathExplanation: '라틴 방진 규칙에 의해 a행에는 e와 a가 이미 사용되었고, b열에는 b가 사용될 수 없으므로 a * b는 반드시 남은 원소 c가 되어야 합니다! 마찬가지로 b * c = a, c * a = b가 성립합니다.',
    targetScore: 100,
    data: {
      headers: ['e', 'a', 'b', 'c'],
      initialGrid: [
        ['e', 'a', 'b', 'c'],
        ['a', 'e', '?', 'b'],
        ['b', 'c', 'e', 'a'],
        ['c', 'b', 'a', 'e'],
      ],
      missingRow: 1,
      missingCol: 2,
      correctValue: 'c',
      choices: ['e', 'a', 'b', 'c']
    }
  },

  // CHAPTER 6
  {
    id: 15,
    chapter: 6,
    chapterTitle: '6장. 환(Ring), 체(Field), 동형사상',
    title: '영인자(Zero Divisor) 사냥',
    subtitle: '0이 아닌 두 수를 곱했는데 0이 된다?!',
    conceptName: '영인자 (Zero Divisor)와 정역(Integral Domain)',
    type: 'zero_divisors',
    prompt: '환 (ℤ₆, +, ×)에서 0이 아닌 두 수를 곱해서 0 (mod 6)이 되는 영인자 쌍을 찾으세요.',
    mathExplanation: '보통의 수체계(실수)에서는 a × b = 0이면 a = 0 또는 b = 0이어야 합니다. 그러나 ℤ₆에서는 2 × 3 = 6 ≡ 0 (mod 6) 처럼 0이 아닌 두 수의 곱이 0이 될 수 있습니다! 이런 원소를 "영인자"라 부르며, 영인자가 없는 가환환을 "정역(Integral Domain)"이라 부릅니다.',
    targetScore: 100,
    data: {
      mod: 6,
      options: [
        { pair: '2 × 3', productMod: 0, isZeroDivisor: true },
        { pair: '2 × 5', productMod: 4, isZeroDivisor: false },
        { pair: '3 × 5', productMod: 3, isZeroDivisor: false },
        { pair: '1 × 4', productMod: 4, isZeroDivisor: false },
      ],
      correctIndex: 0
    }
  },
  {
    id: 16,
    chapter: 6,
    chapterTitle: '6장. 환(Ring), 체(Field), 동형사상',
    title: '왜 소수 p의 ℤ_p는 체(Field)인가?',
    subtitle: '모든 0 아닌 원소가 곱셈 역원을 갖는 완벽한 체계',
    conceptName: '유한체 (Galois Field 𝔽_p)',
    type: 'closure',
    prompt: '소수 p에 대해 ℤ_p는 왜 영인자가 없고 모든 0 아닌 원소가 곱셈 역원을 가질까요?',
    mathExplanation: 'p가 소수이면 gcd(a, p) = 1이므로 베주 항등식(Bezout Identity)에 의해 ax + py = 1인 정수 x가 항상 존재하여 ax ≡ 1 (mod p)가 성립합니다! 즉 모든 원소가 곱셈에 대한 역원을 가져 덧셈, 뺄셈, 곱셈, 나눗셈이 모두 가능한 "체(Field)"가 됩니다. 이는 현대 AES 암호와 타원곡선 암호의 토대입니다.',
    targetScore: 100,
    data: {
      questionPrompt: '체(Field)의 조건: 덧셈군이면서 0을 제외한 모든 원소가 곱셈 역원을 가지는가?',
      options: [
        '그렇다 (소수 p의 ℤ_p는 영인자가 없어 완벽한 유한체 𝔽_p를 이룬다)',
        '아니다 (소수여도 곱셈 역원이 없는 원소가 존재한다)'
      ],
      correctAnswer: true
    }
  },
  {
    id: 17,
    chapter: 6,
    chapterTitle: '6장. 환(Ring), 체(Field), 동형사상',
    title: '군 동형사상 (Isomorphism)',
    subtitle: '이름은 다르지만 본질적으로 동일한 구조를 꿰뚫어보기',
    conceptName: '동형사상 (Isomorphism: G ≅ H)',
    type: 'isomorphism',
    prompt: '위수가 4인 군은 구조적으로 단 2종류만 존재합니다. 순환군 ℤ₄와 클라인 4원군 V₄입니다. 다음 중 ℤ₄와 동형(≅)인 군은 무엇일까요?',
    mathExplanation: '동형사상(Isomorphism)은 연산 구조를 완전히 보존하는 전단사 함수입니다. 회전군 ({e, r, r², r³}, ∘)은 위수 4인 원소 r을 가지므로 순환군 ℤ₄와 완벽히 동형입니다. 반면 직사각형의 대칭군은 모든 비항등 원소의 위수가 2이므로 V₄와 동형입니다.',
    targetScore: 100,
    data: {
      options: [
        { name: '정사각형의 90도 회전군 {e, r, r², r³}', isIsoToZ4: true, explanation: '생성원 r에 의해 순환군 ℤ₄와 완벽히 동형 (G ≅ ℤ₄)' },
        { name: '직사각형의 대칭군 (가로 반사, 세로 반사)', isIsoToZ4: false, explanation: '모든 원소의 위수가 2이므로 클라인 4원군 V₄와 동형' },
        { name: 'ℤ₂ × ℤ₂ 직적군', isIsoToZ4: false, explanation: '최대 원소 위수가 2이므로 V₄와 동형' }
      ],
      correctIndex: 0
    }
  },
  {
    id: 18,
    chapter: 6,
    chapterTitle: '6장. 환(Ring), 체(Field), 동형사상',
    title: '대수의 탑 마스터 (Grand Finale)',
    subtitle: '대칭성과 추상화의 정점에서 군론을 완결하다',
    conceptName: '제1 동형 정리 (First Isomorphism Theorem: G/Ker(φ) ≅ Im(φ))',
    type: 'isomorphism',
    prompt: '준동형사상 φ: G → H에 대하여, G를 핵(Kernel)으로 자른 잉여군 G/Ker(φ)는 무엇과 동형일까요?',
    mathExplanation: '현대대수학의 금자탑인 "제1 동형 정리(First Isomorphism Theorem)"에 따르면 G/Ker(φ) ≅ Im(φ) 입니다! 사상의 핵(Ker)은 항등원으로 찌그러지는 정보를 나타내며, 이를 법으로 묶어버리면 상(Image)의 구조와 완벽히 일치하게 됩니다.',
    targetScore: 100,
    data: {
      options: [
        { name: '상(Image) 군: Im(φ)', isIsoToZ4: true, explanation: '정답! G/Ker(φ) ≅ Im(φ) (제1 동형 정리)' },
        { name: '전체 군: G', isIsoToZ4: false, explanation: 'Kernel의 크기가 1이 아닌 이상 G와 같지 않습니다.' },
        { name: '항등원 부분군 {e}', isIsoToZ4: false, explanation: '전사(surjective) 여부와 상관없이 일반적이지 않습니다.' }
      ],
      correctIndex: 0
    }
  }
];
