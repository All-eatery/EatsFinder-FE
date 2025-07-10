'use client';
import { useState } from 'react';
import { InquirySection } from './InquirySection';
import { ToggleBtn } from '@/components/molecules/toggleBtn/ToggleBtn';

export const InquiryPage = () => {
  const [toggleState, setToggleState] = useState('newInquiry');

  return (
    <div>
      <ToggleBtn
        text_1='1:1문의하기'
        label_1='newInquiry'
        text_2='문의내역'
        label_2='inquiryList'
        value={toggleState}
        setState={setToggleState}
      />
      <InquirySection />
    </div>
  );
};
