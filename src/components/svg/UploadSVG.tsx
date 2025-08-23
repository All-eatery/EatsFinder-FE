import { SVGClassProps } from '@/types/props';

export const UploadSVG = ({ className }: SVGClassProps) => {
  return (
    <svg
      className={className}
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='40' height='40' rx='20' fill='#F2F2F2' />
      <path
        d='M18.8911 28.8881V15.3604L12.6688 21.5826L11.1133 19.9992L20.0022 11.1104L28.8911 19.9992L27.3355 21.5826L21.1133 15.3604V28.8881H18.8911Z'
        fill='#A6A6A6'
      />
    </svg>
  );
};
