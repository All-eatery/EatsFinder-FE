import { SVGRadioProps } from '@/types/props';

export const RadioSVG = ({ isChecked = false }: SVGRadioProps) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {isChecked ? (
        <>
          <circle cx='12' cy='12' r='8' stroke='#FB5607' strokeWidth='2' />
          <circle cx='12' cy='12' r='5' fill='#FB5607' />
        </>
      ) : (
        <circle cx='12' cy='12' r='8' stroke='#A6A6A6' strokeWidth='2' />
      )}
    </svg>
  );
};
