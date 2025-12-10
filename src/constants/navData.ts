import {
  NavEatsplaceSVG,
  NavExploreSVG,
  NavHomeSVG,
  NavMyEatsSVG,
} from '@/components/svg/NavSVGs';

export type NavItem = {
  label: string;
  href: string;
  page: string;
  Icon: React.FC<{ isActive: boolean }>;
};

export const NAV_DATA: NavItem[] = [
  {
    label: '홈',
    href: '/',
    page: '/',
    Icon: NavHomeSVG,
  },
  {
    label: '탐색피드',
    href: '/explore',
    page: '/explore',
    Icon: NavExploreSVG,
  },
  {
    label: 'MyEats',
    href: '/myeats?tab=like',
    page: '/myeats',
    Icon: NavMyEatsSVG,
  },
  {
    label: '맛집정보',
    href: '/eatsplace',
    page: '/eatsplace',
    Icon: NavEatsplaceSVG,
  },
];
