import Link from 'next/link';

export interface BoardItemProps {
  id: number;
  type: 'notices' | 'inquiry' | 'reply';
  title: string;
  date: string;
  status?: boolean;
  content?: string;
}
export const BoardItem = ({
  date,
  id,
  title,
  type,
  status,
  content,
}: BoardItemProps) => {
  const url = type;
  return (
    <Link
      href={`/${url}/${id}`}
      className='flex items-baseline border-b border-gray-100 py-4 hover:bg-gray-50'
    >
      <div
        className={`${type !== 'reply' && 'hidden'} flex h-3 w-3 items-center lg:h-4 lg:w-4`}
      >
        <div className='h-2 w-2 border-b-2 border-l-2 border-b-gray-700 border-l-gray-700 lg:h-2.5 lg:w-2.5' />
      </div>
      <div className='flex-1'>
        <div className='flex justify-between'>
          <h3 className='text-lg text-gray-800'>{title}</h3>
          <div
            className={`${type !== 'inquiry' && 'hidden'} ${status ? 'bg-gray-100 text-gray-300' : 'bg-primary-400 text-white'} flex items-center rounded-xl px-2 lg:px-3`}
          >
            <span className='text-sm lg:text-base'>
              {status ? '답변완료' : '답변대기중'}
            </span>
          </div>
        </div>
        {type === 'inquiry' && (
          <p className='mt-1 text-gray-700 body-16 lg:body-18'>{content}</p>
        )}
        <p className='mt-1 text-xs text-gray-400 lg:text-sm'>
          <span>작성일 </span>
          {date}
        </p>
      </div>
    </Link>
  );
};
