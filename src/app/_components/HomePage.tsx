import { Hashtag } from '@/components/atoms';
import { HomeSection, FollowCard } from '@/components/molecules';
import NearByPlaces from './NearByPlaces';
import Top20Post from './Top20Post';
import SearchBar from './SearchBar';
import FollowsPost from './FollowsPost';
import { getServerUserInfo } from '@/utils/getServerUserInfo';

const HomePage = async () => {
  const userInfo = await getServerUserInfo();

  return (
    <>
      <div className='flex flex-col gap-20'>
        <SearchBar />
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
        <Top20Post />
        {userInfo && (
          <HomeSection title='~님과 음식 취향이 비슷해요.'>
            <div className='grid grid-cols-4 grid-rows-1 gap-6'>
              <FollowCard />
              <FollowCard />
              <FollowCard />
              <FollowCard />
            </div>
          </HomeSection>
        )}
        <FollowsPost />
      </div>
    </>
  );
};

export default HomePage;
