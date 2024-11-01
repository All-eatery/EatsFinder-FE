import { useState, useEffect, useRef, useMemo } from 'react';
import { MenuTag } from './MenuTag';
import { PostFormLabel } from '../postFormLabel';
import { getMenus } from '@/api/post';
import usePostFormContext from '@/app/post/new/_hooks/usePostFormContext';
import { isKorean, createHangulRegex } from '@/utils/hangul';
import { escapeRegExp } from 'lodash';

export const PostMenuField = () => {
  const [isShow, setIsShow] = useState(false);
  const { placeId, menus, handleMenuAdd, handleMenuRemove } =
    usePostFormContext();
  const [menu, setMenu] = useState('');
  const [recommendMenus, setRecommendMenus] = useState<
    { id: number; menu: string }[]
  >([]);
  const [allMenus, setAllMenus] = useState<{ id: number; menu: string }[]>([]);
  const recommendedMenusRef = useRef(null);

  useEffect(() => {
    const updateRecommendedMenus = async () => {
      const data = await getMenus(placeId);

      if (data) {
        setAllMenus(data.allMenus);
        setRecommendMenus(data.recommendMenus);
      }
    };

    if (placeId) {
      updateRecommendedMenus();
    }
  }, [placeId]);

  useEffect(() => {
    if (menus.length === 5) setIsShow(false);
  }, [menus]);

  const filteredPlaceMenu = useMemo(() => {
    const reg = new RegExp(
      menu.split('').reduce((acc, cur) => {
        if (isKorean(cur)) {
          const reg = createHangulRegex(cur);
          return acc + reg.source;
        }
        return acc + escapeRegExp(cur);
      }, '^'),
    );

    return allMenus.filter(({ id, menu }) => {
      return reg.test(menu);
    });
  }, [menu, allMenus]);

  return (
    <div>
      <PostFormLabel>추천 메뉴 등록 (최대 5개)</PostFormLabel>
      <div className='relative flex min-h-[50px] flex-wrap gap-3 rounded border border-gray-100 p-3 body-16'>
        {menus &&
          menus.map((menu, idx) => {
            return (
              <MenuTag key={idx} onClick={() => handleMenuRemove(idx)}>
                {menu}
              </MenuTag>
            );
          })}
        {menus && menus.length < 5 && (
          <input
            className='outline-none placeholder:text-gray-200'
            type='text'
            placeholder='메뉴를 등록해보세요'
            value={menu}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) {
                return;
              }
              if (e.key === 'Enter') {
                e.preventDefault();
                const newMenu = menu.trim();
                if (!newMenu) return;
                handleMenuAdd(newMenu);
                setMenu('');
              }
            }}
            onChange={(e) => setMenu(e.target.value)}
            onFocus={() => setIsShow(true)}
            onBlur={(e) => {
              if (!(e.relatedTarget === recommendedMenusRef.current)) {
                setIsShow(false);
              } else {
                e.target.focus();
              }
            }}
          />
        )}
        {isShow && (
          <div
            ref={recommendedMenusRef}
            className='absolute left-0 top-full z-50 mt-3 max-h-[25rem] w-full rounded-3xl bg-white px-5 py-6 shadow-[0_0_20px_rgba(0,0,0,0.1)]'
            tabIndex={-1}
          >
            <p className='mb-6 text-gray-800 body-18'>이런 메뉴는 어떠세요?</p>
            <div className='flex flex-wrap gap-3'>
              {menu.length === 0
                ? recommendMenus.map((menu) => (
                    <MenuTag
                      key={menu.id}
                      onClick={() => handleMenuAdd(menu.menu)}
                    >
                      {menu.menu}
                    </MenuTag>
                  ))
                : filteredPlaceMenu.map(({ id, menu }) => (
                    <MenuTag key={id} onClick={() => handleMenuAdd(menu)}>
                      {menu}
                    </MenuTag>
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
