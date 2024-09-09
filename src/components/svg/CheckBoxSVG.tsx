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
export const CheckBoXSVG_Ver2 = ({
  isChecked = 'default',
}: SVGCheckBoxProps) => {
  const { svgContent } = (() => {
    switch (isChecked) {
      case 'check':
        return {
          svgContent: (
            <>
              <rect x='3' y='3' width='18' height='18' rx='4' fill='#FB5607' />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17.5121 8.44419C17.9356 8.87497 17.9356 9.57342 17.5121 10.0042L11.2765 16.3471C10.853 16.7779 10.1663 16.7779 9.74285 16.3471L6.4895 13.0377C6.066 12.607 6.066 11.9085 6.4895 11.4777C6.91301 11.0469 7.59964 11.0469 8.02314 11.4777L10.5097 14.007L15.9784 8.44419C16.4019 8.0134 17.0886 8.0134 17.5121 8.44419Z'
                fill='white'
              />
            </>
          ),
        };
      case 'blank':
        return {
          svgContent: (
            <>
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
            </>
          ),
        };
      case 'default':
      default:
        return {
          svgContent: (
            <>
              <rect x='3' y='3' width='18' height='18' rx='4' fill='#A6A6A6' />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17.5121 8.44419C17.9356 8.87497 17.9356 9.57342 17.5121 10.0042L11.2765 16.3471C10.853 16.7779 10.1663 16.7779 9.74285 16.3471L6.4895 13.0377C6.066 12.607 6.066 11.9085 6.4895 11.4777C6.91301 11.0469 7.59964 11.0469 8.02314 11.4777L10.5097 14.007L15.9784 8.44419C16.4019 8.0134 17.0886 8.0134 17.5121 8.44419Z'
                fill='white'
              />{' '}
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
