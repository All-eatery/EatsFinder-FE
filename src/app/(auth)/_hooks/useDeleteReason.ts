import { DeleteAccountType } from '@/types/authType';
import { includes } from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export const useDeleteReason = (
  setValue: UseFormSetValue<DeleteAccountType>,
) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const reasonIcon = (reason: string) => {
    return selectedReasons.includes(reason) ? 'check' : 'blank';
  };
  const handleReasonClick = (value: string) => {
    console.log('여기');

    setSelectedReasons((prev) => {
      console.log(prev);
      const newSelection = prev.includes(value)
        ? prev.filter((reason) => reason !== value)
        : [...prev, value];
      console.log(newSelection);
      setValue('deleteReason', newSelection);
      return newSelection;
    });
  };
  const [etcReason, setEtcReason] = useState('');
  const handleEtcReason = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const reason = e.target.value;
    setEtcReason(reason);
    // setValue('deleteReason', reason);
  };
  return {
    reasonIcon,
    handleReasonClick,
    etcReason,
    handleEtcReason,
  };
};
