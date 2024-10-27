import { follow } from '@/api/profile';
import { Button } from '@/components/atoms';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FollowButtonProps {
  id: number;
  isFollowed: boolean;
}

interface FollowRequest {
  type: 'unfollow' | 'follow';
  id: number;
}

interface FollowResponse {
  success: boolean;
  message?: string;
}

export const FollowButton = ({ isFollowed, id }: FollowButtonProps) => {
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
      console.log(followStatus);
      // 리벨리데이트 추가
      //   queryClient.invalidateQueries({ queryKey: ['following', id] });
    },
  });
  console.log(followStatus);

  const handleFollowButton = async () => {
    const type = followStatus ? 'unfollow' : 'follow';

    mutation.mutate({ type, id });
  };
  //   const handleFollowButton = () => {
  //     follow({ type, id });
  //     setFollowStatus((prev) => !prev);
  //   };

  return (
    <Button size='mini' onClick={handleFollowButton}>
      {buttonLabel}
    </Button>
  );
};
