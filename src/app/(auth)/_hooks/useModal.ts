import {
  createNewBookmarkList,
  deleteBookmarPlaces,
  deleteBookmarkList,
  moveBookmarkPlaces,
  renameBookmarkList,
} from '@/api/bookmark';
import { deletePost } from '@/api/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';

export const useLogoutModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openLogoutModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const logoutButton = async (setIsLoggedIn: any) => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    setIsLoggedIn(false);
    localStorage.clear();
    console.log('res', res);
    // 비로그인 제한 페이지에서 로그아웃시 미들웨어실행
    // window.location.reload();
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return { isModalOpen, closeModal, openLogoutModal, logoutButton };
};
export const useDeletePostModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const confirmButton = async (id: number) => {
    const { data, response } = await deletePost(id);
    if (!response.ok) {
      console.log('에럴에러러럴');
      setIsModalOpen(false);
      return console.log(data.message);
    }
    console.log('res', data);
    console.log('삭제되었습니다.');
    queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return { isModalOpen, closeModal, openModal, confirmButton };
};
export const createNewListModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const handleNewListName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (title: string) => createNewBookmarkList(title),
    onError: (error) => {
      console.error('북마크 리스트 등록 에러', error);
    },
    onSettled: (response) => {
      console.log('북마크 리스트 등록 성공', response);
      queryClient.refetchQueries({ queryKey: ['myBookmarks'] });
      setIsModalOpen(false);
    },
  });
  const confirmButton = async () => {
    mutation.mutate(newListName);
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return {
    isModalOpen,
    closeModal,
    openModal,
    handleNewListName,
    confirmButton,
  };
};
export const useListNameEditModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const handleNewListName = (e: ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      renameBookmarkList(id, title),
    onError: (error) => {
      console.error('북마크 리스트 수정 에러', error);
    },
    onSettled: (response) => {
      console.log('북마크 리스트 수정 성공', response);
      queryClient.refetchQueries({ queryKey: ['myBookmarks'] });
      setIsModalOpen(false);
    },
  });
  const confirmButton = async (id: number) => {
    mutation.mutate({ id, title: editName });
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return {
    isModalOpen,
    closeModal,
    openModal,
    handleNewListName,
    confirmButton,
  };
};
export const useDeleteListModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteBookmarkList(id),
    onError: (error) => {
      console.error('북마크 리스트 삭제 에러', error);
    },
    onSettled: (response) => {
      console.log('북마크 리스트 삭제 성공');
      queryClient.refetchQueries({ queryKey: ['myBookmarks'] });
      setIsModalOpen(false);
    },
  });
  const confirmButton = async (id: number[] | number) => {
    console.log('컨펌!', id);
    // mutation.mutate(id);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return { isModalOpen, closeModal, openModal, confirmButton };
};
export const useMovePlacesInListModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      places,
      lists,
      id,
    }: {
      places: number[];
      lists: number[];
      id: number;
    }) => moveBookmarkPlaces(places, lists),
    onError: (error) => {
      console.error('북마크 리스트 이동 에러', error);
    },
    onSettled: (response, error, variables) => {
      console.log('북마크 리스트 이동 성공');
      console.log(response);
      queryClient.refetchQueries({
        queryKey: ['bookmarkedInPlaces'],
        // queryKey: ['bookmarkedInPlaces', String(variables.id)],
      });
      setIsModalOpen(false);
    },
  });
  const confirmButton = async ({
    places,
    lists,
    id,
  }: {
    places: number[];
    lists: number[];
    id: number;
  }) => {
    mutation.mutate({ places, lists, id });
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return { isModalOpen, closeModal, openModal, confirmButton };
};
export const useDeletePlacesInListModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ placeId, listId }: { placeId: string; listId: number }) =>
      deleteBookmarPlaces(placeId, listId),
    onError: (error) => {
      console.error('북마크 리스트 삭제 에러', error);
    },
    onSettled: (response, error, variables) => {
      console.log('북마크 리스트 삭제 성공');
      console.log(response);
      queryClient.refetchQueries({
        queryKey: ['bookmarkedInPlaces'],
        // queryKey: ['bookmarkedInPlaces', String(variables.id)],
      });
      setIsModalOpen(false);
    },
  });
  const confirmButton = async ({
    places,
    listId,
  }: {
    places: number[];
    listId: number;
  }) => {
    const placeId = places.join(',');
    mutation.mutate({ placeId, listId });
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return { isModalOpen, closeModal, openModal, confirmButton };
};
export const useBookmarkModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    console.log('모달오픈');
    setIsModalOpen(true);
  };
  const confirmButton = async () => {
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return { isModalOpen, closeModal, openModal, confirmButton };
};
export const useDeleteBookmarkModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    console.log('모달오픈');
    setIsModalOpen(true);
  };
  const confirmButton = async () => {
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return { isModalOpen, closeModal, openModal, confirmButton };
};
