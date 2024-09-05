'use client';
import usePostFormContext from '../../_hooks/usePostFormContext';
import { Rating } from '@/components/molecules';
import { PostFormLabel } from './postFormElement';
import { PostPlaceField, PostMenuField } from './postFormElement';

export const PostFormLeftSection = () => {
  const { register, starRating, handleStarRatingChange } = usePostFormContext();

  return (
    <div className='flex flex-col gap-12'>
      <PostPlaceField />
      <div>
        <PostFormLabel>사용자 별점</PostFormLabel>
        <Rating
          number={5}
          rating={starRating}
          onStarRatingChange={handleStarRatingChange}
        />
      </div>
      <div className='flex flex-col'>
        <PostFormLabel>나의 후기</PostFormLabel>
        <textarea
          {...register('content')}
          className='h-[250px] resize-none rounded border border-gray-100 p-3 outline-none placeholder:text-gray-200'
          placeholder='내가 먹은 메뉴나 가게 분위기 등을 자유롭게 써주세요'
        ></textarea>
      </div>
      <PostMenuField />
    </div>
  );
};
