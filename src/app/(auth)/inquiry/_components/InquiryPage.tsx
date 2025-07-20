'use client';
import { useState } from 'react';
import { InquiryLists } from './InquiryLists';
import { ToggleBtn } from '@/components/molecules/toggleBtn/ToggleBtn';
import { InquiryForm } from './InquiryForm';

export const InquiryPage = () => {
  const [toggleState, setToggleState] = useState('inquiryForm');

  return (
    <div className='flex flex-col items-center gap-16'>
      <div className='w-80'>
        <ToggleBtn
          text_1='1:1문의하기'
          label_1='inquiryForm'
          text_2='문의내역'
          label_2='inquiryLists'
          value={toggleState}
          setState={setToggleState}
        />
      </div>
      {toggleState === 'inquiryForm' ? <InquiryForm /> : <InquiryLists />}
    </div>
  );
};
