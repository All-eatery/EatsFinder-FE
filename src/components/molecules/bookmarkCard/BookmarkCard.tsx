import { Checkbox } from '@/components/atoms';

type BookmarkModalCardProps = {
  id: number;
  title: string;
  count: number;
  onClick?: (id: number) => void;
  selectedLists: number[];
};

export const BookmarkModalCard = ({
  id,
  title,
  count,
  onClick,
  selectedLists,
}: BookmarkModalCardProps) => {
  const handleCard = () => {
    onClick!(id);
  };
  return (
    <button
      onClick={handleCard}
      key={id}
      className={`flex items-center justify-start gap-3 rounded-3xl border-2 px-5 py-6 ${selectedLists.includes(id) ? 'border-primary-400' : 'border-transparent'}`}
      style={{
        boxShadow:
          '0 4px 10px rgba(0, 0, 0, 0.05), 0 -4px 10px rgba(45, 31, 31, 0.05), -4px 0 10px rgba(0, 0, 0, 0.05), 4px 0 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Checkbox variant='Checkbox_Ver2' checked={selectedLists.includes(id)} />
      <div className='flex flex-col'>
        <p className='flex text-gray-800 title-24'>{title}</p>
        <p className='flex text-gray-400 body-18'>{`${count}개의 게시물`}</p>
      </div>
    </button>
  );
};
