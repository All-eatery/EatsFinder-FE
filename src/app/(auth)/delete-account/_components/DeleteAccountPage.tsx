import { CheckSVG } from '@/components/svg/CheckSVG';
import { DeleteAccountForm } from './DeleteAccountForm';
import { IconWithText } from '@/components/atoms/iconWithText/IconWithText';
import { getServerUserInfo } from '@/utils/getServerUserInfo';
const deleteAccountGuidelines = [
  '탈퇴할 경우 계정 복구가 불가능해요.',
  '내 피드에 작성된 게시글은 삭제되지 않아요.',
  '내 피드에 작성된 글, 마이 이츠에 저장된 리스트 등 모든 정보가 삭제돼요.',
  '탈퇴 처리된 이메일 아이디는 재가입 방지를 위해 30일간 보존된 후 삭제돼요.',
];
export const DeleteAccountPage = async () => {
  const userInfo = await getServerUserInfo();
  return (
    <div className='flex flex-col items-center gap-[60px] px-60'>
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-gray-700 title-34'>탈퇴 안내</h2>
        <p className='text-gray-300'>
          탈퇴 신청 전에 안내사항을 꼭 확인해주세요
        </p>
      </div>
      <div className='flex flex-col gap-[60px]'>
        <div className='flex flex-col gap-6'>
          <h3 className='text-gray-700 subTitle-28'>탈퇴 안내 사항</h3>
          <div className='flex flex-col gap-3'>
            {deleteAccountGuidelines.map((guideLine, idx) => {
              return (
                <IconWithText
                  key={idx}
                  icon={CheckSVG({ size: 'large', color: 'orange' })}
                >
                  {guideLine}
                </IconWithText>
              );
            })}
          </div>
        </div>
        {userInfo && <DeleteAccountForm email={userInfo.email} />}
      </div>
    </div>
  );
};
