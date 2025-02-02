import Link from 'next/link';
import { customTwMerge } from '@/utils/customTwMerge';

const Tab = ({
  id,
  label,
  keyword,
  active = false,
}: {
  id: string;
  label: string;
  keyword: string;
  active?: boolean;
}) => {
  return (
    <Link
      className={customTwMerge(
        'text-gray-300 subTitle-28',
        active && 'border-b-4 border-gray-800 text-gray-800 title-28',
      )}
      href={`/search?keyword=${keyword}&filter=${id}`}
    >
      {label}
    </Link>
  );
};

export default Tab;
