'use client';
import { PostPreview } from './PostPreview';
import { ImageInput } from '@/components/molecules';
import usePostFormContext from '@/app/post/new/_hooks/usePostFormContext';

export const PostImageField = () => {
  const {
    preview,
    mainImgIndex,
    handleImageChange,
    handleImageRemove,
    handleMainImgChange,
  } = usePostFormContext();

  return (
    <div className='flex gap-6'>
      {preview.map((it, idx) => (
        <PostPreview
          key={idx}
          src={it}
          isMainImg={mainImgIndex === idx}
          onImageRemove={() => handleImageRemove(idx)}
          onMainImgChange={() => handleMainImgChange(idx)}
        />
      ))}
      {preview.length !== 5 && (
        <ImageInput
          expand={preview.length === 0}
          onChange={handleImageChange}
        />
      )}
    </div>
  );
};
