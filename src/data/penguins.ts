export interface PenguinSticker {
  id: string;
  name: string;
  quote: string;
  image: string;
  mood: 'happy' | 'proud' | 'confused' | 'tired' | 'shocked' | 'scheming' | 'cute';
}

export const PENGUINS: Record<string, PenguinSticker> = {
  proud_snowman: {
    id: 'proud_snowman',
    name: '자신만만 펭귄',
    quote: '나 좀 잘한 듯',
    image: '/assets/penguins/proud_snowman.png',
    mood: 'proud',
  },
  awesome_statue: {
    id: 'awesome_statue',
    name: '감탄하는 펭귄',
    quote: '쩐다',
    image: '/assets/penguins/awesome_statue.png',
    mood: 'proud',
  },
  not_my_type_book: {
    id: 'not_my_type_book',
    name: '공부하는 펭귄',
    quote: '이런건 체질이 아니다',
    image: '/assets/penguins/not_my_type_book.png',
    mood: 'confused',
  },
  ruined: {
    id: 'ruined',
    name: '멘붕 펭귄',
    quote: '망했다',
    image: '/assets/penguins/ruined.png',
    mood: 'shocked',
  },
  fool: {
    id: 'fool',
    name: '울컥 펭귄',
    quote: '이 바보들아!!!',
    image: '/assets/penguins/fool.png',
    mood: 'shocked',
  },
  perfect_plan: {
    id: 'perfect_plan',
    name: '계획형 펭귄',
    quote: '완벽한 계획이다',
    image: '/assets/penguins/perfect_plan.png',
    mood: 'scheming',
  },
  be_ready: {
    id: 'be_ready',
    name: '비누거품 펭귄',
    quote: '각오해라',
    image: '/assets/penguins/be_ready.png',
    mood: 'scheming',
  },
  my_way: {
    id: 'my_way',
    name: '마이웨이 펭귄',
    quote: '내 맘이다',
    image: '/assets/penguins/my_way.png',
    mood: 'cute',
  },
  waiting_coffee: {
    id: 'waiting_coffee',
    name: '커피 펭귄',
    quote: '기다리는 중',
    image: '/assets/penguins/waiting_coffee.png',
    mood: 'cute',
  },
  lazy_flat: {
    id: 'lazy_flat',
    name: '납작 펭귄',
    quote: '노곤하다',
    image: '/assets/penguins/lazy_flat.png',
    mood: 'tired',
  },
  tired_bottle: {
    id: 'tired_bottle',
    name: '퇴근길 펭귄',
    quote: '너덜...',
    image: '/assets/penguins/tired_bottle.png',
    mood: 'tired',
  },
  runaway: {
    id: 'runaway',
    name: '빨간두건 펭귄',
    quote: '도망가자',
    image: '/assets/penguins/runaway.png',
    mood: 'shocked',
  },
  heart: {
    id: 'heart',
    name: '밀당 펭귄',
    quote: '주까 마까',
    image: '/assets/penguins/heart.png',
    mood: 'cute',
  },
  scratch: {
    id: 'scratch',
    name: '수면모자 펭귄',
    quote: '긁적',
    image: '/assets/penguins/scratch.png',
    mood: 'confused',
  },
  doubt: {
    id: 'doubt',
    name: '눈초리 펭귄',
    quote: '의심',
    image: '/assets/penguins/doubt.png',
    mood: 'confused',
  },
  ribbon_bow: {
    id: 'ribbon_bow',
    name: '리본 펭귄',
    quote: '날 가져라',
    image: '/assets/penguins/ribbon_bow.png',
    mood: 'cute',
  },
  our_territory: {
    id: 'our_territory',
    name: '골목대장 펭귄들',
    quote: '우리 구역이다',
    image: '/assets/penguins/our_territory.png',
    mood: 'scheming',
  },
};

export const ALL_PENGUIN_LIST = Object.values(PENGUINS);
