'use client';
import { Button, Checkbox } from '@/components/atoms';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { socialAction } from '@/api/socialActions';
import { SocialActionsType } from '@/types/authType';
import { getClientUserInfo } from '@/utils/getClientUserInfo';

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
      queryClient.invalidateQueries({ queryKey: ['userProfile', id] });
      console.log('리벨리데이트완료');
    },
  });

  const handleSocialActionButton = async () => {
    if (!isLoggedIn) {
      return console.log('로그인하세요');
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
            className='absolute right-5 top-5 z-10'
            checked={socialActionStatus}
            onClick={handleSocialActionButton}
          />
        );
    }
  };

  return renderActionButton();
};
