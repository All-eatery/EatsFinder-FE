import { OptionButton } from '@/components/atoms/button/OptionButton';
import { customTwMerge } from '@/utils/customTwMerge';

interface DropdownMenuProps {
  className?: string;
  dropdownItems: {
    label: string;
    onClick: () => void;
  }[];
}

export const DropdownMenu = ({
  className,
  dropdownItems,
}: DropdownMenuProps) => {
  return (
    <div
      className={customTwMerge(
        'absolute right-1/2 z-20 flex w-[270px] translate-x-[50%] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      {dropdownItems.map((it, idx) => {
        return (
          <OptionButton className='w-full' key={idx} onClick={it.onClick}>
            {it.label}
          </OptionButton>
        );
      })}
    </div>
  );
};
