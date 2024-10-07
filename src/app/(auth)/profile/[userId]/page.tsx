import { ProfilePage } from './_components/ProfilePage';
export default async function page({ params }: { params: { userId: number } }) {
  const userId = params.userId;

  return (
    <>
      <ProfilePage userId={userId} />
    </>
  );
}
