import { getServerUserInfo } from '@/utils/getServerUserInfo';
import { AccountInfo } from './AccountInfo';
import { AccountForm } from './AccountForm';
import Link from 'next/link';

export const MyAccountPage = async () => {
  const userInfo = await getServerUserInfo();
  return (
    <div className='mb-[84px] mt-6 flex flex-col items-center gap-9'>
      <h3 className='text-gray-700 subTitle-28'>내 계정</h3>
      <AccountInfo name={userInfo!.nickname} email={userInfo!.email} />
      <div className='flex flex-col items-center gap-1'>
        {userInfo!.userType === 'LOCAL' && <AccountForm />}
        <Link
          href='/delete-account'
          className='text-gray-100 underline body-16'
        >
          탈퇴하기
        </Link>
      </div>
    </div>
  );
};
