import { Button } from '@/components/atoms';
import { InquiryFile } from './InquiryFile';
import { InquiryText } from './InquiryText';

export const InquiryForm = () => {
  return (
    <form className='flex w-full flex-col gap-6'>
      <InquiryText label='제목' type='input' />
      <InquiryText label='문의 내용' type='textField' />
      <InquiryFile />
      <div className='my-20 flex justify-center gap-2'>
        <Button type='button' size={'medium'} variant={'stroke'}>
          취소
        </Button>
        <Button type='submit' size={'medium'}>
          작성 완료
        </Button>
      </div>
    </form>
  );
};
