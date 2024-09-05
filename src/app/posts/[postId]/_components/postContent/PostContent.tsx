import { ImageCarousel } from '@/components/organisms';
import UserProfile from './UserProfile';
import StoreInfo from './StoreInfo';
import StoreMap from './StoreMap';
import KeywordChips from './KeywordChips';
import { PostContentType } from '@/types/postType';
import parseImages from '@/utils/parseImages';

interface PostContentProps {
  postContent: PostContentType;
}

const PostContent = ({ postContent }: PostContentProps) => {
  const images = parseImages(
    postContent.thumbnailUrl,
    postContent.imageUrl,
    postContent.places.name,
  );
  return (
    <section className='mb-20 grid grid-cols-2 gap-6'>
      <div className='overflow-hidden rounded-s-3xl'>
        <ImageCarousel images={images} />
      </div>
      <div className='flex flex-col gap-3 py-7'>
        <UserProfile
          nickname={postContent.users.nickname}
          profileImage={postContent.users.profileImage}
        />
        <p className='min-h-[150px] rounded-3xl border border-gray-100 px-[20px] py-[10px] text-gray-700 body-16'>
          {postContent.content}
        </p>
        <StoreInfo
          name={postContent.places.name}
          starRatings={postContent.starRatings}
          menuTag={postContent.menuTag}
        />
        <StoreMap places={postContent.places} />
        <KeywordChips keywordIds={postContent.keywordTag} />
      </div>
    </section>
  );
};

export default PostContent;
