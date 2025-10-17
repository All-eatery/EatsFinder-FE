import Link from 'next/link';

interface BoardItemProps {
  id: number;
  type: 'notices' | 'inquiry';
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
      className='block border-b border-gray-100 py-4 hover:bg-gray-50'
    >
      <div className='flex justify-between'>
        <h3 className='text-lg text-gray-800'>{title}</h3>
        <div
          className={`${type === 'notices' && 'hidden'} ${status ? 'bg-gray-100 text-gray-300' : 'bg-primary-400 text-white'} flex items-center rounded-xl px-2 lg:px-3`}
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
    </Link>
  );
};
