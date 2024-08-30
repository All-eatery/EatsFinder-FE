import { SVGCheckBoxProps } from '@/types/props';

export const CheckBoxSVG = ({ isChecked = 'default' }: SVGCheckBoxProps) => {
  const { svgContent } = (() => {
    switch (isChecked) {
      case 'check':
        return {
          svgContent: (
            <>
              <circle cx='12' cy='12' r='12' fill='#FB5607' />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17.673 7.93267C18.109 8.37611 18.109 9.09506 17.673 9.53849L11.2544 16.0675C10.8185 16.511 10.1117 16.511 9.67579 16.0675L6.32695 12.6611C5.89102 12.2176 5.89102 11.4987 6.32695 11.0553C6.76288 10.6118 7.46967 10.6118 7.90561 11.0553L10.4651 13.6588L16.0944 7.93267C16.5303 7.48924 17.2371 7.48924 17.673 7.93267Z'
                fill='white'
              />
            </>
          ),
        };
      case 'blank':
        return {
          svgContent: (
            <circle
              cx='12'
              cy='12'
              r='11.3333'
              stroke='#A6A6A6'
              strokeWidth='1.33333'
            />
          ),
        };
      case 'default':
      default:
        return {
          svgContent: (
            <>
              <circle cx='12' cy='12' r='12' fill='#A6A6A6' />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17.673 7.93267C18.109 8.37611 18.109 9.09506 17.673 9.53849L11.2544 16.0675C10.8185 16.511 10.1117 16.511 9.67579 16.0675L6.32695 12.6611C5.89102 12.2176 5.89102 11.4987 6.32695 11.0553C6.76288 10.6118 7.46967 10.6118 7.90561 11.0553L10.4651 13.6588L16.0944 7.93267C16.5303 7.48924 17.2371 7.48924 17.673 7.93267Z'
                fill='white'
              />
            </>
          ),
        };
    }
  })();

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {svgContent}
    </svg>
  );
};
export const CheckBoXSVG_Ver2 = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='4' y='4' width='16' height='16' rx='3' fill='white' />
      <rect
        x='4'
        y='4'
        width='16'
        height='16'
        rx='3'
        stroke='#A6A6A6'
        strokeWidth='2'
      />
    </svg>
  );
};
