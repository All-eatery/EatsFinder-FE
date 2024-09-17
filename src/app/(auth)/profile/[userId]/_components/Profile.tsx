import { Button, ProfileImage } from '@/components/atoms';
import { ProfileInfo } from './ProfileInfo';
import { UserProfileStats } from './UserProfileStats';
import { addDashes } from '@/utils/formatPhoneNumber';
import { UserData } from '@/types/authType';
type ProfileProps = {
  handler: () => void;
  userData: UserData;
  isOwnProfile: boolean;
};
export const Profile = ({ handler, userData, isOwnProfile }: ProfileProps) => {
  const {
    email,
    followerCount,
    followingCount,
    nickname,
    phoneNumber,
    postCount,
    profileImage,
  } = userData;

  const formattedNumber = phoneNumber && addDashes(phoneNumber);
  return (
    <div className='flex flex-col items-center gap-4'>
      <ProfileImage size={100} src={profileImage} />
      <ProfileInfo
        nickname={nickname}
        email={email}
        phoneNumber={formattedNumber}
        isOwnProfile={isOwnProfile}
      />
      <UserProfileStats
        postCount={postCount}
        followerCount={followerCount}
        followingCount={followingCount}
      />
      {isOwnProfile ? (
        <Button size={'mini'} className='w-[124px]' onClick={handler}>
          내 프로필 수정하기
        </Button>
      ) : (
        <Button size={'mini'} className='w-[124px]' onClick={handler}>
          팔로우
        </Button>
      )}
    </div>
  );
};
