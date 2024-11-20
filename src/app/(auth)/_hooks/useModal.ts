import { deletePost } from '@/api/post';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

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
    console.log('모달오픈');
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
export const useBookmarkModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
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
