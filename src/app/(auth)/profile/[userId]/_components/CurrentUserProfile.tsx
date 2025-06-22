'use client';
import { ProfileEdit } from './ProfileEdit';
import { ProfilePageProps } from '@/types/authType';
import { Profile } from './Profile';
import { useToggleHandler } from '@/hooks/useToggleHandler';

export const CurrentUserProfile = ({
  userData,
  isOwnProfile,
}: ProfilePageProps) => {
  const { value: isEdit, handleValue: editHandler } = useToggleHandler();
  return (
    <>
      {isEdit ? (
        <ProfileEdit handler={editHandler} userData={userData} />
      ) : (
        <Profile
          handler={editHandler}
          userData={userData}
          isOwnProfile={isOwnProfile}
          loggedInUserId={userData.id}
        />
      )}
    </>
  );
};
