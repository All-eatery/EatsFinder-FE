import { ProfileImage } from '@/components/atoms';
import { MoreSVG } from '@/components/svg/MoreSVG';
import timeDifference from '@/utils/timeDifference';

interface UserProfileProps {
  nickname: string;
  profileImage: string | null;
  createdAt: string;
}

const UserProfile = ({
  nickname,
  profileImage,
  createdAt,
}: UserProfileProps) => {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-3'>
        <ProfileImage size={50} src={profileImage} />
        <span className='text-gray-600 subTitle-18'>{nickname}</span>
        <span className='text-gray-300 body-16'>
          {timeDifference(createdAt)}
        </span>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <button className='[&>svg]:h-9 [&>svg]:w-9' aria-label='more'>
          <MoreSVG />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
