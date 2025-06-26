import { Checkbox } from '@/components/atoms';

export const EditListBox = () => {
  return (
    <div
      className='flex w-[520px] items-center gap-3 rounded-3xl px-5 py-6'
      style={{
        boxShadow:
          '0 4px 10px rgba(0, 0, 0, 0.05), 0 -4px 10px rgba(45, 31, 31, 0.05), -4px 0 10px rgba(0, 0, 0, 0.05), 4px 0 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Checkbox variant='Checkbox_Ver2' />
      <div className='flex flex-col gap-1'>
        <span className='text-gray-800 title-24'>기본리스트</span>
        <span className='text-gray-400 body-18'>4개의 게시물</span>
      </div>
    </div>
  );
};
