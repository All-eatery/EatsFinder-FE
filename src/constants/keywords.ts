const CATEGORIES = {
  FOOD_PRICE: '음식/가격',
  ATMOSPHERE_SPACE: '분위기/공간',
  BEVERAGE_DESSERT: '음료/디저트',
  SERVICE_MISC: '서비스/기타',
} as const;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

interface Keyword {
  id: string;
  category: Category;
  emoji: string;
  text: string;
}

export const KEYWORDS: Keyword[] = [
  {
    id: 'FR01',
    category: CATEGORIES.FOOD_PRICE,
    emoji: '😋',
    text: '맛있어요',
  },
  {
    id: 'FR02',
    category: CATEGORIES.FOOD_PRICE,
    emoji: '🍚',
    text: '양이 많아요',
  },
  {
    id: 'FR03',
    category: CATEGORIES.FOOD_PRICE,
    emoji: '⏰',
    text: '빨리 나와요',
  },
  {
    id: 'FR04',
    category: CATEGORIES.FOOD_PRICE,
    emoji: '💸',
    text: '가성비 굿',
  },
  {
    id: 'FR05',
    category: CATEGORIES.FOOD_PRICE,
    emoji: '🧂',
    text: '간이 세요',
  },
  {
    id: 'FR06',
    category: CATEGORIES.FOOD_PRICE,
    emoji: '🫥',
    text: '싱거워요',
  },
  {
    id: 'AS01',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '🌉',
    text: '근사해요',
  },
  {
    id: 'AS02',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '📸',
    text: '사진이 잘나와요',
  },
  {
    id: 'AS03',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '🏞',
    text: '공간이 넓어요',
  },
  {
    id: 'AS04',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '🧘‍♀️',
    text: '아늑해요',
  },
  {
    id: 'AS05',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '💬',
    text: '대화하기 좋아요',
  },
  {
    id: 'AS06',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '🛋',
    text: '좌석이 편해요',
  },
  {
    id: 'AS07',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '🍛',
    text: '혼밥하기 좋아요',
  },
  {
    id: 'AS08',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '🏝',
    text: '이국적이에요',
  },
  {
    id: 'AS09',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '😎',
    text: '트렌디해요',
  },
  {
    id: 'AS10',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '🤫',
    text: '조용해요',
  },
  {
    id: 'AS11',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '⭐️',
    text: '프라이빗해요',
  },
  {
    id: 'AS12',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '🙋‍♀️',
    text: '아이들이 많아요',
  },
  {
    id: 'AS13',
    category: CATEGORIES.ATMOSPHERE_SPACE,
    emoji: '👩‍❤️‍👨',
    text: '소개팅할 땐 여기',
  },
  {
    id: 'BD01',
    category: CATEGORIES.BEVERAGE_DESSERT,
    emoji: '🍰',
    text: '달달해요',
  },
  {
    id: 'BD02',
    category: CATEGORIES.BEVERAGE_DESSERT,
    emoji: '🫖',
    text: '향이 좋아요',
  },
  {
    id: 'BD03',
    category: CATEGORIES.BEVERAGE_DESSERT,
    emoji: '🫓',
    text: '달지 않아서 좋아요',
  },
  {
    id: 'BD04',
    category: CATEGORIES.BEVERAGE_DESSERT,
    emoji: '☕️',
    text: '고소한 커피에요',
  },
  {
    id: 'BD05',
    category: CATEGORIES.BEVERAGE_DESSERT,
    emoji: '🥴',
    text: '산미가 있어요',
  },
  {
    id: 'BD06',
    category: CATEGORIES.BEVERAGE_DESSERT,
    emoji: '🧀',
    text: '꾸덕해요',
  },
  {
    id: 'BD07',
    category: CATEGORIES.BEVERAGE_DESSERT,
    emoji: '🍵',
    text: '차와 잘어울려요',
  },
  {
    id: 'SM01',
    category: CATEGORIES.SERVICE_MISC,
    emoji: '😊',
    text: '친절해요',
  },
  {
    id: 'SM02',
    category: CATEGORIES.SERVICE_MISC,
    emoji: '🚙',
    text: '주차가 편해요',
  },
  {
    id: 'SM03',
    category: CATEGORIES.SERVICE_MISC,
    emoji: '🚻',
    text: '화장실이 깨끗해요',
  },
  {
    id: 'SM04',
    category: CATEGORIES.SERVICE_MISC,
    emoji: '📶',
    text: '와이파이가 있어요',
  },
  {
    id: 'SM05',
    category: CATEGORIES.SERVICE_MISC,
    emoji: '🐶',
    text: '애견동반 가능',
  },
  {
    id: 'SM06',
    category: CATEGORIES.SERVICE_MISC,
    emoji: '🥩',
    text: '고기를 구워줘요',
  },
  {
    id: 'SM07',
    category: CATEGORIES.SERVICE_MISC,
    emoji: '🥗',
    text: '셀프바가 있어요',
  },
] as const;

export const filteredKeywords = (category: Category) => {
  return KEYWORDS.filter((keyword) => keyword.category === category);
};
