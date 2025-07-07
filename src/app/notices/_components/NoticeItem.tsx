import Link from 'next/link';

interface NoticeListProps {
  id: number;
  title: string;
  date: string;
}
export const NoticeItem = ({ date, id, title }: NoticeListProps) => {
  return (
    <Link
      href={`/notices/${id}`}
      className='block border-b border-gray-100 py-4 hover:bg-gray-50'
    >
      <h3 className='text-lg text-gray-800'>{title}</h3>
      <p className='mt-1 text-sm text-gray-400'>
        <span>작성일 </span>
        {date}
      </p>
    </Link>
  );
};
