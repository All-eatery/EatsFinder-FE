import { DeleteAccountType } from '@/types/authType';
import React, { ChangeEvent, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export const useDeleteReason = (
  setValue: UseFormSetValue<DeleteAccountType>,
) => {
  const [selectedReason, setSelectedReason] = useState('');
  const reasonIcon = (reason: string) => {
    return selectedReason === reason ? 'check' : 'blank';
  };
  const handleReasonClick = (value: string) => {
    setSelectedReason(value);
    if (value === 'etc') {
      setValue('deleteReason', etcReason);
    } else setValue('deleteReason', value);
  };
  const [etcReason, setEtcReason] = useState('');
  const handleEtcReason = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const reason = e.target.value;
    setEtcReason(reason);
    setValue('deleteReason', reason);
  };
  return {
    reasonIcon,
    handleReasonClick,
    etcReason,
    handleEtcReason,
  };
};
