import { getFollow, getFollowing } from '@/api/profile';
import { FollowUser } from './FollowList';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Loading from '@/components/atoms/loading/Loading';
type FollowModalProps = {
  isLoggedIn: boolean;
  id: number;
  onClose: () => void;
  isOwnProfile: boolean;
  nickname: string;
  modalType: 'following' | 'follower';
};
export const FollowModal = ({
  isLoggedIn,
  id,
  nickname,
  isOwnProfile,
  onClose,
  modalType,
}: FollowModalProps) => {
  const who = isOwnProfile ? '나' : `${nickname}님`;
  const title =
    modalType === 'following' ? `${who}의 팔로잉` : `${who}의 팔로워`;

  const {
    data: data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['following', id],
    queryFn: () => getFollow({ profileId: id, myId: 13, follow: modalType }),
    enabled: !!modalType,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  console.log(data);
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='z-10 flex h-[576px] w-[600px] flex-col items-center rounded-3xl bg-white px-[60px] shadow-lg'
        ref={ref}
      >
        <h2 className='my-[40px] text-gray-800 title-34'>{title}</h2>
        {isLoading || isFetching ? (
          <Loading />
        ) : (
          <div className='mb-[40px] flex max-h-[380px] w-full flex-col gap-3 overflow-y-auto px-[20px] scrollbar-hide'>
            {data && data.length > 0 ? (
              data.map((data, i) => (
                <FollowUser
                  key={i}
                  isLoggedIn={isLoggedIn}
                  isFollowed={data.isFollowed}
                  id={data.followUserId}
                  image={data.imageUrl}
                  nickname={data.followUserNickname}
                />
              ))
            ) : (
              <div className='flex justify-center'>
                {modalType === 'following' ? '팔로잉' : '팔로워'} 유저가
                없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
