import Image from 'next/image';
type CreatedBy = {
  profileUrl: string;
  nickname: string;
};
export const CreatedBy = ({ nickname, profileUrl }: CreatedBy) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='relative flex h-[70px] w-[70px] items-center'>
        <Image
          className='rounded-full'
          src={profileUrl}
          fill={true}
          alt='user profile'
        />
      </div>
      <p className='text-gray-600 subTitle-18'>{nickname}</p>
    </div>
  );
};
