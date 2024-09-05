'use client';
import usePostFormContext from '../../_hooks/usePostFormContext';
import { Button } from '@/components/atoms';
import { PostFormLeftSection } from './PostFormLeftSection';
import { PostFormRightSection } from './PostFormRightSection';
import { PostImageField } from './postFormElement';

export const PostForm = () => {
  const { handlePostFormSubmit } = usePostFormContext();

  return (
    <form onSubmit={handlePostFormSubmit}>
      <div className='mb-20'>
        <h2 className='mb-12 text-center text-gray-700 title-34'>
          사진 선택하기(최대 5장)
        </h2>
        <PostImageField />
      </div>
      <div>
        <h2 className='mb-12 text-center text-gray-700 title-34'>
          리뷰 등록하기
        </h2>
        <div className='grid grid-cols-2 gap-12 px-[120px]'>
          <PostFormLeftSection />
          <PostFormRightSection />
        </div>
        <div className='mt-20 flex justify-center'>
          <Button type='submit'>등록하기</Button>
        </div>
      </div>
    </form>
  );
};
