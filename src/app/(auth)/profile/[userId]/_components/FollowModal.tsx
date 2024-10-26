import { getFollow, getFollowing } from '@/api/profile';
import { FollowUser } from './FollowList';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
type FollowModalProps = {
  id: number;
  onClose: () => void;
};
export const FollowModal = ({ id, onClose }: FollowModalProps) => {
  const { data: data } = useQuery({
    queryKey: ['following', id],
    queryFn: () => getFollow({ profileId: id, myId: 6, follow: 'following' }),
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
        <h2 className='my-[40px] text-gray-800 title-34'>내 팔로잉</h2>
        <div className='mb-[40px] flex max-h-[380px] w-full flex-col gap-3 overflow-y-auto px-[20px] scrollbar-hide'>
          {data && data.length > 0 ? (
            data.map((data, i) => (
              <FollowUser
                key={i}
                followListBtn='팔로우'
                image={data.imageUrl}
                nickname={data.followingUserNickname}
              />
            ))
          ) : (
            <div className='flex justify-center'>팔로잉 유저가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};
