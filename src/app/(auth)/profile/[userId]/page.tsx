import { ProfilePage } from './_components/ProfilePage';
export default async function page({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  //id와 로그인 유저 비교
  //같으면 myprofile => userInfo로 데이터 가져오기(전화번호가 있음)
  //다르면 api로 데이터 가져오기
  return (
    <>
      <ProfilePage userId={userId} />
    </>
  );
}
