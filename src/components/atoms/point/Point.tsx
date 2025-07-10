import { customTwMerge } from '@/utils/customTwMerge';

interface PointProps {
  text: string;
  isOn?: boolean;
  size?: 'medium' | 'small';
}

export const Point = ({ text, isOn = true, size = 'medium' }: PointProps) => {
  return (
    <div
      className={customTwMerge(
        'inline-flex justify-center bg-primary-400 py-[2px] text-white',
        size === 'medium'
          ? 'rounded-xl px-3 subTitle-[15px]'
          : 'rounded-lg px-2 subTitle-[10px]',
        !isOn && 'bg-gray-100 text-gray-300',
      )}
    >
      {text}
    </div>
  );
};
