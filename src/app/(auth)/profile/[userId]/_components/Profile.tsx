import { Button, ProfileImage } from '@/components/atoms';
import { ProfileInfo } from './ProfileInfo';
import { UserProfileStats } from './UserProfileStats';
import { addDashes } from '@/utils/formatPhoneNumber';
import { UserData } from '@/types/authType';
type ProfileProps = {
  handler: () => void;
  userData: UserData;
};
export const Profile = ({ handler, userData }: ProfileProps) => {
  const {
    email,
    followerCount,
    followingCount,
    nickname,
    phoneNumber,
    postCount,
    profileImage,
  } = userData;
  const formattedNumber = addDashes(phoneNumber);
  return (
    <div className='flex flex-col items-center gap-4'>
      <ProfileImage size={100} src={profileImage} />
      <ProfileInfo
        nickname={nickname}
        email={email}
        phoneNumber={formattedNumber}
      />
      <UserProfileStats
        postCount={postCount}
        followerCount={followerCount}
        followingCount={followingCount}
      />
      <Button size={'mini'} className='w-[124px]' onClick={handler}>
        내 프로필 수정하기
      </Button>
    </div>
  );
};
