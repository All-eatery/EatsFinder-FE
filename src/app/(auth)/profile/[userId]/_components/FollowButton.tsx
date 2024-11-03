'use client';
import { follow } from '@/api/profile';
import { Button } from '@/components/atoms';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FollowButtonProps {
  id: number;
  isFollowed: boolean;
  isLoggedIn: boolean;
}

interface FollowRequest {
  type: 'unfollow' | 'follow';
  id: number;
}

interface FollowResponse {
  success: boolean;
  message?: string;
}

export const FollowButton = ({
  isFollowed,
  id,
  isLoggedIn,
}: FollowButtonProps) => {
  const [followStatus, setFollowStatus] = useState(isFollowed);
  const buttonLabel = followStatus ? '팔로우 취소' : '팔로우';
  const queryClient = useQueryClient();
  const mutation = useMutation<FollowResponse, Error, FollowRequest>({
    mutationFn: ({ type, id }) => follow({ type, id }),
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
    const type = followStatus ? 'unfollow' : 'follow';

    mutation.mutate({ type, id });
  };

  return (
    <Button size='mini' onClick={handleFollowButton}>
      {buttonLabel}
    </Button>
  );
};
