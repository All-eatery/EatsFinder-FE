import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const pxToRem = (px: number) => `${px / 16}rem`;

const config: Config = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: [`var(--font-pretendard)`],
        tossface: ['var(--font-tossface)'],
      },
      colors: {
        primary: {
          25: '#FFF8F5',
          50: '#FEE0D2',
          100: '#FDBEA0',
          200: '#FD9C6D',
          300: '#FC7A3B',
          400: '#FB5607',
          500: '#CE4503',
          600: '#9C3403',
          700: '#692302',
          800: '#371201',
          900: '#050200',
        },
        gray: {
          25: '#FAFAFA',
          75: '#E8E8E8',
          50: '#F2F2F2',
          100: '#D9D9D9',
          200: '#BFBFBF',
          300: '#A6A6A6',
          400: '#8C8C8C',
          500: '#737373',
          600: '#595959',
          700: '#404040',
          800: '#262626',
          900: '#0D0D0D',
        },
        error: '#E62900',
        green: '#03C75A',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          body: (value) => ({
            fontSize: value,
            lineHeight: '150%',
            fontWeight: theme('fontWeight.normal'),
          }),
          subTitle: (value) => ({
            fontSize: value,
            lineHeight: '135%',
            fontWeight: theme('fontWeight.semibold'),
          }),
          title: (value) => ({
            fontSize: value,
            lineHeight: '135%',
            fontWeight: theme('fontWeight.extrabold'),
          }),
        },
        {
          values: {
            10: pxToRem(10),
            12: pxToRem(12),
            14: pxToRem(14),
            16: pxToRem(16),
            18: pxToRem(18),
            20: pxToRem(20),
            22: pxToRem(22),
            24: pxToRem(24),
            26: pxToRem(26),
            28: pxToRem(28),
            30: pxToRem(30),
            32: pxToRem(32),
            34: pxToRem(34),
            36: pxToRem(36),
            38: pxToRem(38),
            40: pxToRem(40),
          },
        },
      );
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.visually-hidden': {
          position: 'absolute',
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: '1px',
          width: '1px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
      });
    }),
  ],
};
export default config;
