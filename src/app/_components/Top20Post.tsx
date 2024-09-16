import { HomeSection } from '@/components/molecules';
import { CardCarousel } from '@/components/organisms';

const Top20Post = () => {
  return (
    <HomeSection title='인기 게시물 TOP 20'>
      <CardCarousel data={[1, 2, 3, 4, 5]} />
    </HomeSection>
  );
};

export default Top20Post;
