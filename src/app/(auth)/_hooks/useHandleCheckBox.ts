import { useState } from 'react';

type PaginatedData<T> = {
  pages: {
    items: T[];
  }[];
};
type CheckBoxType = {
  list: number[];
  place: number[];
};
type WithPlace = {
  places?: {
    id: number;
  };
};
type CheckType = keyof CheckBoxType;
export const useHandleCheckBox = <
  T extends { id: number } & Partial<WithPlace>,
>() => {
  const [data, setData] = useState<PaginatedData<T> | undefined>(undefined);
  const [isChecked, setIsChecked] = useState<CheckBoxType>({
    list: [],
    place: [],
  });

  const checkHandler = (id: number, type: CheckType) => {
    setIsChecked((prev) => {
      const currenList = prev[type];
      const updateList = currenList.includes(id)
        ? currenList.filter((selectedId) => selectedId !== id)
        : [...currenList, id];

      return {
        ...prev,
        [type]: updateList,
      };
    });
  };

  const checkAllHandler = (type: CheckType) => {
    if (!data) return;
    const ids = data.pages.flatMap((page) =>
      page.items.flatMap((item) =>
        item.places && typeof item.places === 'object' && 'id' in item.places
          ? [item.places.id]
          : [item.id],
      ),
    );
    setIsChecked((prev) => ({ ...prev, [type]: ids }));
  };

  return {
    isChecked,
    checkHandler,
    checkAllHandler,
    setData,
    data,
  };
};
