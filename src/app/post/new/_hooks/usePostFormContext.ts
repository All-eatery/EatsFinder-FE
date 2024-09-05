import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { type PostFormValue } from '@/utils/zodSchema';
import { createNewPost } from '@/api/post';

const usePostFormContext = () => {
  const { register, handleSubmit, watch, setValue, getValues } =
    useFormContext<PostFormValue>();

  const placeName = watch('placeName');
  const placeId = watch('placeId');
  const preview = watch('preview');
  const mainImgIndex = watch('mainImgIndex');
  const starRating = watch('starRating');
  const menus = watch('menus');
  const keywords = watch('keywords');

  const handleSetPlace = (placeName: string, placeId: number) => {
    setValue('placeName', placeName);
    setValue('placeId', placeId);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imgs = getValues('imgs');
    const preview = getValues('preview');
    const MAX_CNT = 5;
    const curCnt = imgs.length;
    const addImgs = e.target.files;

    if (addImgs === null) return;

    if (MAX_CNT - curCnt < addImgs.length) {
      alert('이미지는 최대 5장 까지 첨부 가능합니다.');
    }

    for (let i = 0; i < Math.min(addImgs.length, MAX_CNT - curCnt); i++) {
      const img = addImgs[i];
      imgs.push(img);
      preview.push(URL.createObjectURL(img));
    }

    setValue('imgs', imgs);
    setValue('preview', preview);
  };

  const handleMainImgChange = (index: number) => {
    setValue('mainImgIndex', index);
  };

  const handleImageRemove = (index: number) => {
    const imgs = getValues('imgs');
    const preview = getValues('preview');
    const mainImgIndex = getValues('mainImgIndex');
    const newImgs = imgs.slice(0, index).concat(imgs.slice(index + 1));
    const newPreview = preview.slice(0, index).concat(preview.slice(index + 1));
    setValue('imgs', newImgs);
    setValue('preview', newPreview);

    if (index === mainImgIndex) setValue('mainImgIndex', 0);
    if (index < mainImgIndex) setValue('mainImgIndex', mainImgIndex - 1);
  };

  const handleStarRatingChange = (rating: number) => {
    setValue('starRating', rating);
  };

  const handleMenuAdd = (menu: string) => {
    const menus = getValues('menus');
    if (!menus) setValue('menus', [menu]);
    else {
      menus.push(menu);
      setValue('menus', menus);
    }
  };

  const handleMenuRemove = (index: number) => {
    const menus = getValues('menus');
    if (!menus) return;

    const newMenus = menus.slice(0, index).concat(menus.slice(index + 1));
    setValue('menus', newMenus);
  };

  const handlekeywordToggle = (keywordId: string) => {
    const keywords = watch('keywords') || [];
    let newKeywords: Array<string>;

    if (keywords.includes(keywordId)) {
      newKeywords = keywords.filter((it) => it !== keywordId);
    } else {
      if (keywords.length < 5) newKeywords = [...keywords, keywordId];
      else {
        alert('키워드는 최대 5개 선택이 가능합니다.');
        return;
      }
    }

    setValue('keywords', newKeywords);
  };

  const handlePostFormSubmit = handleSubmit(async (formData) => {
    const mainImg = formData.imgs[formData.mainImgIndex];
    const imgs = formData.imgs
      .slice(0, formData.mainImgIndex)
      .concat(formData.imgs.slice(formData.mainImgIndex + 1));
    const menuTag = formData.menus.join(', ');
    const keywordTag = formData.keywords.join(', ');

    const postForm = new FormData();

    postForm.append('mainImg', mainImg);
    imgs.forEach((img) => postForm.append('imgs', img));
    postForm.append('menuTag', menuTag);
    postForm.append('keywordTag', keywordTag);
    postForm.append('starRating', formData.starRating.toString());
    postForm.append('placeId', formData.placeId.toString());

    const data = await createNewPost(postForm);
  });

  return {
    placeName,
    placeId,
    starRating,
    preview,
    mainImgIndex,
    menus,
    keywords,
    register,
    handleSetPlace,
    handlePostFormSubmit,
    handleStarRatingChange,
    handleImageChange,
    handleImageRemove,
    handleMainImgChange,
    handleMenuAdd,
    handleMenuRemove,
    handlekeywordToggle,
  };
};

export default usePostFormContext;
