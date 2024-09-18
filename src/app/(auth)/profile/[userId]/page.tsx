import { ProfilePage } from './_components/ProfilePage';
export default async function page({ params }: { params: { userId: string } }) {
  const userId = params.userId;

  return (
    <>
      <ProfilePage userId={userId} />
    </>
  );
}
