'use client';
import { useSearchParams } from 'next/navigation';
import Tab from './Tab';

const TabMenu = () => {
  const serachParams = useSearchParams();
  const filter = serachParams.get('filter');
  const tabList = [
    {
      id: 'all',
      label: '전체',
    },
    {
      id: 'places',
      label: '맛집',
    },
    { id: 'posts', label: '게시물' },
    { id: 'users', label: '이웃' },
  ];

  return (
    <div className='flex gap-11'>
      {tabList.map((tab) => (
        <Tab key={tab.id} keyword='치킨' active={filter === tab.id} {...tab} />
      ))}
    </div>
  );
};

export default TabMenu;
