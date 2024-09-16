import { Hashtag } from '@/components/atoms';
import { Search, HomeSection, FollowCard } from '@/components/molecules';
import NearByPlaces from './NearByPlaces';
import Top20Post from './Top20Post';
import FollowsPost from './FollowsPost';
import { getServerUserInfo } from '@/utils/getServerUserInfo';

const HomePage = async () => {
  const userInfo = await getServerUserInfo();

  return (
    <>
      <div className='flex flex-col gap-[80px]'>
        <Search
          variant='large'
          placeholder='오늘 어떤 음식을 드실 에정인가요?'
        />
        <NearByPlaces userInfo={userInfo} />
        <HomeSection title='인기 급상승 키워드'>
          <div className='flex gap-6'>
            <Hashtag hashtag='혼밥하기 좋은' />
            <Hashtag hashtag='혼밥하기 좋은' />
            <Hashtag hashtag='혼밥하기 좋은' />
            <Hashtag hashtag='혼밥하기 좋은' />
            <Hashtag hashtag='혼밥하기 좋은' />
            <Hashtag hashtag='혼밥하기 좋은' />
          </div>
        </HomeSection>
        {!userInfo && <Top20Post />}
        <FollowsPost />
        <HomeSection title='~님과 음식 취향이 비슷해요.'>
          <div className='grid grid-cols-4 grid-rows-1 gap-6'>
            <FollowCard />
            <FollowCard />
            <FollowCard />
            <FollowCard />
          </div>
        </HomeSection>
      </div>
    </>
  );
};

export default HomePage;
