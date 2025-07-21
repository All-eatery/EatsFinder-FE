import { MoreSVG } from '@/components/svg/MoreSVG';

export const InquiryDetailTitle = () => {
  return (
    <div className='flex justify-between py-4'>
      <div className='flex flex-col gap-3'>
        <h2 className='text-gray-800 subTitle-24'>
          로그인 관련 문의드립니다.₩
        </h2>
        <p className='text-gray-400 body-14'>작성일 2024.09.23 19:49:10</p>
      </div>
      <button>
        <MoreSVG />
      </button>
    </div>
  );
};
