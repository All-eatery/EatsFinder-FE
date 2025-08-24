'use client';
import { InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { customTwMerge } from '@/utils/customTwMerge';
import { SearchSVG } from '@/components/svg/SearchSVG';
import { UploadSVG } from '@/components/svg/UploadSVG';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const searchVariant = cva(
  'relative flex items-center rounded-[30px] h-12 xl:h-[60px] gap-2 p-5 border mx-auto border-gray-100 lg:body-16 xl:body-18 focus-within:border-primary-400 focus-within:border-2',
  {
    variants: {
      variant: {
        large: 'w-full md:w-[770px]',
        small: 'w-[400px]',
      },
    },
  },
);
//이거 반응형하며 좀 꼬임 낼 다시 정리 ㄱㄱ
interface SearchProps
  extends VariantProps<typeof searchVariant>,
    InputHTMLAttributes<HTMLInputElement> {
  searchIcon?: boolean;
  isSearch?: boolean;
  onSearch?: () => void;
}

export const Search = ({
  variant,
  className,
  isSearch = true,
  searchIcon = true,
  onSearch,
  ...props
}: SearchProps) => {
  //임시로 해둠 다른 페이지 보고 결정
  const isXl = useMediaQuery('(min-width: 1280px)');
  const showSearchIcon = searchIcon && isXl;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };
  return (
    <div className={customTwMerge(searchVariant({ variant }), className)}>
      {showSearchIcon && (
        <div className='pointer-events-none absolute'>
          <SearchSVG />
        </div>
      )}
      <input
        className={customTwMerge(
          'w-full bg-transparent outline-none',
          showSearchIcon && 'pl-8',
        )}
        {...props}
        onKeyDown={handleKeyDown}
      />
      {isSearch ? (
        <button aria-label='search button' onClick={onSearch}>
          <UploadSVG className='hidden xl:block' />
          <SearchSVG className='block xl:hidden' />
        </button>
      ) : (
        <button aria-label='search button' onClick={onSearch}>
          <UploadSVG />
        </button>
      )}
    </div>
  );
};
