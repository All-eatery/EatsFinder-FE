import { customTwMerge } from '@/utils/customTwMerge';

interface ChipsProps {
  emoji?: string;
  text: string;
  selected?: boolean;
  onClick?: () => void;
}

export const Chip = ({
  emoji,
  text,
  selected = false,
  onClick,
}: ChipsProps) => {
  return (
    <div
      className={customTwMerge(
        'inline-flex h-11 w-max cursor-pointer items-center justify-center rounded-[22px] border border-gray-100 px-[20px] py-[10px] text-gray-600 body-16',
        selected && 'border-gray-900 text-gray-900 subTitle-16',
      )}
      onClick={onClick}
    >
      <div>
        <span className='mr-1 font-tossface'>{emoji}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};
