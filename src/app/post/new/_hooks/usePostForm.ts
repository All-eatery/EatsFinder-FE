import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postFormSchema } from '@/utils/zodSchema';

const usePostForm = () => {
  const method = useForm({
    mode: 'onChange',
    defaultValues: {
      starRating: 0,
      mainImgIndex: 0,
      imgs: [],
      preview: [],
      menus: [],
      keywords: [],
    },
    resolver: zodResolver(postFormSchema),
  });

  return method;
};

export default usePostForm;
