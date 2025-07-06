'use client';
import { Button, Checkbox } from '@/components/atoms';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { socialAction } from '@/api/socialActions';
import { SocialActionsType } from '@/types/authType';
import { getClientUserInfo } from '@/utils/getClientUserInfo';
import { useToast } from '@/provider/contextProvider/ToastProvider';

interface SocailActionProps {
  id: number;
  isConnected: boolean;
  type: 'reply' | 'post' | 'comment' | 'follow';
}

interface SocialActionResponse {
  success: boolean;
  message?: string;
}

export const SocialActionButton = ({
  isConnected,
  id,
  type,
}: SocailActionProps) => {
  const isLoggedIn = getClientUserInfo();
  const { showToast } = useToast();
  const [socialActionStatus, setSocialActionStatus] = useState(isConnected);
  const buttonLabel = socialActionStatus ? '팔로우 취소' : '팔로우';
  const queryClient = useQueryClient();
  const mutation = useMutation<SocialActionResponse, Error, SocialActionsType>({
    mutationFn: ({ method, id, type }) => socialAction({ id, method, type }),
    onMutate: () => {
      console.log('1');
      setSocialActionStatus((prev) => !prev);
    },
    onError: () => {
      console.log('2');
      setSocialActionStatus((prev) => !prev);
      console.log('실패');
    },
    onSettled: () => {
      console.log('3');
      console.log('성공');
      queryClient.invalidateQueries({
        queryKey: ['userProfile', id, 'postsAboutPlace'],
      });
      console.log('리벨리데이트완료');
    },
  });

  const handleSocialActionButton = async () => {
    if (!isLoggedIn) {
      return showToast('로그인하세요', 'error');
    }
    const method = socialActionStatus ? 'disconnect' : 'connect';

    mutation.mutate({ method, id, type });
  };
  const renderActionButton = () => {
    switch (type) {
      case 'follow':
        return (
          <Button size='mini' onClick={handleSocialActionButton}>
            {buttonLabel}
          </Button>
        );
      case 'post':
        return (
          <Checkbox
            variant='fav'
            checked={socialActionStatus}
            onClick={handleSocialActionButton}
          />
        );
    }
  };

  return renderActionButton();
};
