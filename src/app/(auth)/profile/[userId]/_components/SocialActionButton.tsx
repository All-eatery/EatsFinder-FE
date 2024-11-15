'use client';
import { Button } from '@/components/atoms';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { socialAction } from '@/api/socialActions';
import { SocialActionsType } from '@/types/authType';

interface SocailActionProps {
  id: number;
  isConnected: boolean;
  isLoggedIn: boolean;
  type: 'reply' | 'post' | 'comment' | 'follow';
}

interface FollowResponse {
  success: boolean;
  message?: string;
}

export const SocialActionButton = ({
  isConnected,
  id,
  isLoggedIn,
  type,
}: SocailActionProps) => {
  const [followStatus, setFollowStatus] = useState(isConnected);
  const buttonLabel = followStatus ? '팔로우 취소' : '팔로우';
  const queryClient = useQueryClient();
  const mutation = useMutation<FollowResponse, Error, SocialActionsType>({
    mutationFn: ({ method, id, type }) => socialAction({ id, method, type }),
    onMutate: () => {
      setFollowStatus((prev) => !prev);
    },
    onError: () => {
      setFollowStatus((prev) => !prev);
      console.log('실패');
    },
    onSettled: () => {
      console.log('성공');
      queryClient.invalidateQueries({ queryKey: ['userProfile', id] });
      console.log('리벨리데이트완료');
    },
  });
  console.log('loggedIn', isLoggedIn);

  const handleFollowButton = async () => {
    if (!isLoggedIn) {
      return console.log('로그인하세요');
    }
    const method = followStatus ? 'disconnect' : 'connect';

    mutation.mutate({ method, id, type });
  };

  return (
    <Button size='mini' onClick={handleFollowButton}>
      {buttonLabel}
    </Button>
  );
};
