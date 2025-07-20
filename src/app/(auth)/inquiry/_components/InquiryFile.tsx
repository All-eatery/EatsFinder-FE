import { AddSVG } from '@/components/svg/AddSVG';
//처음에 input 1개 추가할 수록 파일이 들어가 input이 또 추가됨 최대 3개
export const InquiryFile = () => {
  return (
    <div className='flex w-full flex-col gap-3'>
      <label className='flex subTitle-18'>첨부파일</label>
      <div className='flex gap-4'>
        <FileInput />
        <FileInput />
        <FileInput />
      </div>
    </div>
  );
};
const FileInput = () => {
  return (
    <>
      <label
        htmlFor='file-upload'
        className='flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-dashed border-primary-400'
      >
        <AddSVG width={48} height={48} color='#fb5607' />
      </label>
      <input id='file-upload' type='file' className='sr-only' />
    </>
  );
};
