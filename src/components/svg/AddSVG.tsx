import { SVGUsableProps } from '@/types/props';

export const AddSVG = ({
  isUsable = true,
  width = 24,
  height = 24,
  color,
}: SVGUsableProps & { color?: string }) => {
  const fillColor = color || (isUsable ? '#A6A6A6' : '#F2F2F2');

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z' fill={fillColor} />
    </svg>
  );
};
