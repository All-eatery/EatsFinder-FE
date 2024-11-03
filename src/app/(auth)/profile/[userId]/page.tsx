import { getServerUserInfo } from '@/utils/getServerUserInfo';
import { ProfilePage } from './_components/ProfilePage';
export default async function page({ params }: { params: { userId: number } }) {
  const userId = Number(params.userId);
  const currentUser = await getServerUserInfo();
  return (
    <>
      <ProfilePage userId={userId} loggedInUserId={currentUser?.id} />
    </>
  );
}
