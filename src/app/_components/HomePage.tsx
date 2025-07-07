import { Hashtag, Button } from '@/components/atoms';
import {
  Card,
  Search,
  FollowCard,
  HomeSection,
  Category,
  FeedCard,
} from '@/components/molecules';
import { CardCarousel } from '@/components/organisms';

const data = new Array(23).fill(0);

const HomePage = () => {
  return (
    <>
      <div className='flex flex-col gap-[80px]'>
        <Search
          variant='large'
          placeholder='오늘 어떤 음식을 드실 에정인가요??????????'
        />
        <HomeSection title='주변의 맛집'>
          <div className='flex justify-between'>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </HomeSection>
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
        <HomeSection title='이웃들의 새로운 게시물'>
          <CardCarousel data={data}>
            <FeedCard />
          </CardCarousel>
        </HomeSection>
        <HomeSection title='~님과 음식 취향이 비슷해요.'>
          <div className='grid grid-cols-4 grid-rows-1 gap-6'>
            <FollowCard />
            <FollowCard />
            <FollowCard />
            <FollowCard />
          </div>
          <div className='flex h-[250px] flex-col items-center justify-center gap-6'>
            <div className='subTitle-20'>
              이웃들을 팔로우하고 새로운 소식을 받아보세요
            </div>
            <Button size='medium'>피드 둘러보기</Button>
          </div>
        </HomeSection>
        <HomeSection title='오늘 뭐먹지?'>
          <div>
            <Category />
          </div>
        </HomeSection>
      </div>
    </>
  );
};

export default HomePage;
