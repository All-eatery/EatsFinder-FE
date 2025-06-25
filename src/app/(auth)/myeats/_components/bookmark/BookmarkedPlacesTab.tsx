import { customTwMerge } from '@/utils/customTwMerge';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
const tabVariants = cva('flex justify-center py-3', {
  variants: {
    active: {
      true: 'text-gray-900 title-22 ',
      false: 'subTitle-22 text-gray-400',
    },
    display: {
      true: '',
      false: 'hidden',
    },
  },
  defaultVariants: {
    active: false,
    display: true,
  },
});
interface BookmarkedPlacesTabProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabVariants> {}
export const BookmarkedPlacesTab = ({
  active,
  className,
  display,
  ...props
}: BookmarkedPlacesTabProps) => {
  return (
    <button
      className={customTwMerge(tabVariants({ active, display, className }))}
      {...props}
    />
  );
};
