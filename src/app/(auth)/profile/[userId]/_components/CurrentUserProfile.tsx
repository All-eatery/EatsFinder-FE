'use client';
import { ProfileEdit } from './ProfileEdit';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import { ProfilePageProps } from '@/types/authType';
import { Profile } from './Profile';

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
