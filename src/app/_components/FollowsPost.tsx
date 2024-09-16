import { Button } from '@/components/atoms';
import { HomeSection } from '@/components/molecules';
import { PagenationCarousel } from '@/components/organisms';

const FollowsPost = () => {
  return (
    <HomeSection title='이웃들의 새로운 게시물'>
      <PagenationCarousel />
      <div className='flex h-[250px] flex-col items-center justify-center gap-6'>
        <div className='subTitle-20'>
          이웃들을 팔로우하고 새로운 소식을 받아보세요
        </div>
        <Button size='medium'>피드 둘러보기</Button>
      </div>
    </HomeSection>
  );
};

export default FollowsPost;
