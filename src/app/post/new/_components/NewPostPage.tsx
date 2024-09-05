'use client';
import { FormProvider } from 'react-hook-form';
import usePostForm from '../_hooks/usePostForm';
import { PostForm } from './postForm';

const NewPostPage = () => {
  const method = usePostForm();
  return (
    <FormProvider {...method}>
      <PostForm />
    </FormProvider>
  );
};

export default NewPostPage;
