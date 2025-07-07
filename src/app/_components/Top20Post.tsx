'use client';
import { HomeSection, FeedCard } from '@/components/molecules';
import { CardCarousel } from '@/components/organisms';
import { useGetPopularPosts } from '../_hooks/useGetPopularPosts';
import { PostCardType } from '@/types/postType';

const Top20Post = () => {
  const { data: popularPosts } = useGetPopularPosts();
  interface FeedCardProps extends PostCardType {
    id: string | number;
  }
  return (
    <HomeSection title='인기 게시물 TOP 20'>
      {popularPosts ? (
        <CardCarousel<PostCardType, FeedCardProps>
          data={popularPosts}
          RenderCard={FeedCard}
          mapData={(item) => ({
            id: item.postId,
            ...item,
          })}
        />
      ) : (
        <div></div>
      )}
    </HomeSection>
  );
};

export default Top20Post;
