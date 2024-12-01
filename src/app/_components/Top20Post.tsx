'use client';
import { HomeSection } from '@/components/molecules';
import { CardCarousel } from '@/components/organisms';
import { useGetPopularPosts } from '../_hooks/useGetPopularPosts';

const Top20Post = () => {
  const { data: popularPosts } = useGetPopularPosts();

  return (
    <HomeSection title='인기 게시물 TOP 20'>
      {popularPosts ? <CardCarousel datas={popularPosts} /> : <div></div>}
    </HomeSection>
  );
};

export default Top20Post;
