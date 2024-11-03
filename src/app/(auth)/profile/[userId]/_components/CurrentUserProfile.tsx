'use client';
import { ProfileEdit } from './ProfileEdit';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import { Profile } from './Profile';
import { ProfilePageProps } from '@/types/authType';

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
        />
      )}
    </>
  );
};
