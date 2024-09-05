import usePostFormContext from '../../_hooks/usePostFormContext';
import { PostFormLabel, PostKeywordField } from './postFormElement';

export const PostFormRightSection = () => {
  const { keywords, handlekeywordToggle } = usePostFormContext();
  return (
    <div>
      <PostFormLabel>이 맛집을 표현하는 키워드</PostFormLabel>
      <div className='mt-6 flex gap-3'>
        <div className='flex flex-col gap-6'>
          <PostKeywordField
            category='음식/가격'
            keywords={keywords || []}
            onKeywordClick={handlekeywordToggle}
          />
          <PostKeywordField
            category='음료/디저트'
            keywords={keywords || []}
            onKeywordClick={handlekeywordToggle}
          />
        </div>
        <PostKeywordField
          category='분위기/공간'
          keywords={keywords || []}
          onKeywordClick={handlekeywordToggle}
        />
        <PostKeywordField
          category='서비스/기타'
          keywords={keywords || []}
          onKeywordClick={handlekeywordToggle}
        />
      </div>
    </div>
  );
};
