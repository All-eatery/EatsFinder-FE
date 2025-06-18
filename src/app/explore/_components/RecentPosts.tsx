import { FeedsContainer } from './FeedsContainer';

export const RecentPosts = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h2 className='my-3 text-gray-700 subTitle-28'>최근 피드</h2>
      <FeedsContainer />
    </div>
  );
};
