'use client';
import { OptionButton } from '@/components/atoms/button/OptionButton';
interface BookmarkedListOptionMenu {
  editButton: () => void;
  deleteButton: () => void;
}
export const BookmarkedListOptionMenu = ({
  editButton,
  deleteButton,
}: BookmarkedListOptionMenu) => {
  return (
    <div className='absolute right-0 top-0 z-20 flex w-40 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]'>
      <OptionButton
        onClick={(e) => {
          e.stopPropagation();
          editButton();
        }}
      >
        리스트명 수정
      </OptionButton>
      <OptionButton
        onClick={(e) => {
          e.stopPropagation();
          editButton();
        }}
      >
        삭제하기
      </OptionButton>
    </div>
  );
};
