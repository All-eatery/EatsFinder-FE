const CHOSUNG = {
  ㄱ: '가'.charCodeAt(0),
  ㄲ: '까'.charCodeAt(0),
  ㄴ: '나'.charCodeAt(0),
  ㄷ: '다'.charCodeAt(0),
  ㄸ: '따'.charCodeAt(0),
  ㄹ: '라'.charCodeAt(0),
  ㅁ: '마'.charCodeAt(0),
  ㅂ: '바'.charCodeAt(0),
  ㅃ: '빠'.charCodeAt(0),
  ㅅ: '사'.charCodeAt(0),
  ㅆ: '싸'.charCodeAt(0),
  ㅇ: '아'.charCodeAt(0),
  ㅈ: '자'.charCodeAt(0),
  ㅉ: '짜'.charCodeAt(0),
  ㅊ: '차'.charCodeAt(0),
  ㅋ: '카'.charCodeAt(0),
  ㅌ: '타'.charCodeAt(0),
  ㅍ: '파'.charCodeAt(0),
  ㅎ: '하'.charCodeAt(0),
} as const;

const MIX_JONGSUNG = {
  ㄳ: 'rt',
  ㄵ: 'sw',
  ㄶ: 'sg',
  ㄺ: 'fr',
  ㄻ: 'fa',
  ㄼ: 'fq',
  ㄽ: 'ft',
  ㄾ: 'fx',
  ㄿ: 'fb',
  ㅀ: 'fg',
} as const;

const JONGSUNG_TO_CHOSUNG = [
  ['ㄱ', 0],
  ['ㄲ', 0],
  ['ㅅ', 1],
  ['ㄴ', 0],
  ['ㅈ', 4],
  ['ㅎ', 4],
  ['ㄷ', 0],
  ['ㄹ', 0],
  ['ㄱ', 8],
  ['ㅁ', 8],
  ['ㅂ', 8],
  ['ㅅ', 8],
  ['ㅌ', 8],
  ['ㅍ', 8],
  ['ㅎ', 8],
  ['ㅁ', 0],
  ['ㅂ', 0],
  ['ㅅ', 17],
  ['ㅅ', 0],
  ['ㅆ', 0],
  ['ㅇ', 0],
  ['ㅈ', 0],
  ['ㅊ', 0],
  ['ㅋ', 0],
  ['ㅌ', 0],
  ['ㅍ', 0],
  ['ㅎ', 0],
] as const;

type ChosungType = keyof typeof CHOSUNG;
type MixJongsungType = keyof typeof MIX_JONGSUNG;

const KR_START = '가'.charCodeAt(0);
const KR_SYLLABLE_COUNT = 588;
const KR_JONGSUNG_COUNT = 28;

export const isKorean = (char: string) => {
  return /[ㄱ-ㅎ]/.test(char) || /[가-힣]/.test(char);
};

const isChosung = (char: string): char is ChosungType => {
  return char in CHOSUNG;
};

const isMixJongsung = (char: string): char is MixJongsungType => {
  return char in MIX_JONGSUNG;
};

const hasJongsung = (char: string) => {
  return !((char.charCodeAt(0) - KR_START) % KR_JONGSUNG_COUNT === 0);
};

const createHangulRegexOnlyChosung = (chosung: ChosungType) => {
  return new RegExp(
    `[${String.fromCharCode(CHOSUNG[chosung])}-${String.fromCharCode(CHOSUNG[chosung] + KR_SYLLABLE_COUNT - 1)}]`,
  );
};

const createHangulRegexWithoutJongsung = (char: string) => {
  return new RegExp(
    `[${char}-${String.fromCharCode(char.charCodeAt(0) + KR_JONGSUNG_COUNT - 1)}]`,
  );
};

export const createHangulRegex = (char: string) => {
  if (isMixJongsung(char)) {
    return new RegExp(MIX_JONGSUNG[char]);
  }

  if (isChosung(char)) {
    return createHangulRegexOnlyChosung(char);
  }

  if (!hasJongsung(char)) {
    return createHangulRegexWithoutJongsung(char);
  }

  const jongsungIndex = (char.charCodeAt(0) - KR_START) % KR_JONGSUNG_COUNT;
  const [chosung, offset] = JONGSUNG_TO_CHOSUNG[jongsungIndex - 1];
  const withoutJongsung = String.fromCharCode(
    char.charCodeAt(0) - jongsungIndex + offset,
  );

  const regOnlyChosung = createHangulRegexOnlyChosung(chosung);

  return new RegExp(`(${char}|${withoutJongsung}${regOnlyChosung.source})`);
};
