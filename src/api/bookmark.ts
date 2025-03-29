import { NEST_SERVER } from '@/constants/baseUrl';
import { getUserToken } from '@/utils/getServerUserInfo';

export const createNewBookmarkList = async (listname: string) => {
  const token = await getUserToken();
  const response = await fetch(`${NEST_SERVER}/bookmarks/lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      listname,
    }),
  });
  return response.json();
};
export const getBookmarkList = async (cursor: number) => {
  const token = await getUserToken();
  const response = await fetch(
    `${NEST_SERVER}/bookmarks/lists?cursor=${cursor}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};
export const renameBookmarkList = async (id: number, title: string) => {
  const token = await getUserToken();
  const response = await fetch(`${NEST_SERVER}/bookmarks/lists/id=${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
    }),
  });
};
export const deleteBookmarkList = async (id: number) => {
  const token = await getUserToken();
  const response = await fetch(`${NEST_SERVER}/bookmarks/lists/id=${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const addBookmarkPlaces = async (place: number, lists: number[]) => {
  const token = await getUserToken();
  console.log(place, lists);
  const response = await fetch(`${NEST_SERVER}/bookmarks/places`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      place,
      lists,
    }),
  });
  return response.json();
};
export const getBookmarkPlaces = async (id: number, cursor: number) => {
  const token = await getUserToken();
  const response = await fetch(
    `${NEST_SERVER}/bookmarks/places/${id}?cursor=${cursor}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const moveBookmarkPlaces = async (places: number[], lists: number[]) => {
  const token = await getUserToken();
  const response = await fetch(`${NEST_SERVER}/bookmarks/places`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      places,
      lists,
    }),
  });
};
export const deleteBookmarPlaces = async (placeId: string, listId: number) => {
  const token = await getUserToken();
  //placeId => '1,2,3,4' 쉼표로 구분되는 숫자 or all
  const response = await fetch(
    `${NEST_SERVER}/bookmarks/places?placeId=${placeId}&listId=${listId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
