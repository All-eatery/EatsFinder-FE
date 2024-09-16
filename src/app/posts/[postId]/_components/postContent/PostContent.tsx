import { ImageCarousel } from '@/components/organisms';
import UserProfile from './UserProfile';
import StoreInfo from './StoreInfo';
import StoreMap from './StoreMap';
import KeywordChips from './KeywordChips';
import { Checkbox, Chip } from '@/components/atoms';
import { PostContentType } from '@/types/postType';
import parseImages from '@/utils/parseImages';
import { ShareSVG } from '@/components/svg/ShareSVG';
import { EyeSVG } from '@/components/svg/EyeSVG';
import { FavSVG } from '@/components/svg/FavSVG';

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
    <section className='flex flex-col gap-8'>
      <div>
        <UserProfile
          nickname={postContent.users.nickname}
          profileImage={postContent.users.profileImage}
          createdAt={postContent.createdAt}
        />
      </div>
      <div className='mb-20 grid grid-cols-2 gap-6'>
        <div className='overflow-hidden rounded-s-3xl'>
          <ImageCarousel images={images} />
        </div>
        <div className='flex flex-col gap-5'>
          <StoreInfo
            name={postContent.places.name}
            starRatings={postContent.starRatings}
            category={postContent.places.categories.name}
          />
          <KeywordChips keywordIds={'FR01,FR02,SM07,SM04,SM01'} />
          <p className='min-h-[150px] rounded-3xl border border-gray-100 px-[20px] py-[10px] text-gray-700 body-16'>
            {postContent.content}
          </p>
          <div>
            <div className='mb-2'>
              <span className='text-gray-600 body-16'>추천 메뉴</span>
            </div>
            <div className='flex h-24 flex-wrap items-start gap-2'>
              {postContent.menuTag.map((menu) => (
                <Chip key={menu} text={menu} />
              ))}
            </div>
          </div>
          <StoreMap places={postContent.places} />
          <div className='flex gap-4 text-gray-300'>
            <div className='flex min-w-24 gap-1 [&>svg]:h-6 [&>svg]:w-6'>
              <EyeSVG />
              <span>99999</span>
            </div>
            <div className='flex gap-1 [&>svg]:h-6 [&>svg]:w-6'>
              <FavSVG />
              <span>{postContent.likeCount}</span>
            </div>
          </div>
        </div>
        <button className='flex h-24 items-center justify-center rounded-3xl shadow-[0_4px_20px_0_rgba(90,90,90,0.1)]'>
          <div className='flex gap-3'>
            <FavSVG isFill={false} />
            <span>{postContent.likeCount}</span>
          </div>
        </button>
        <button className='flex h-24 items-center justify-center rounded-3xl shadow-[0_4px_20px_0_rgba(90,90,90,0.1)]'>
          <div className='flex gap-3'>
            <ShareSVG />
            <span>공유하기</span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default PostContent;
