import { DeleteAccountType } from '@/types/authType';
import { ChangeEvent, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export const useDeleteReason = (
  setValue: UseFormSetValue<DeleteAccountType>,
) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const reasonIcon = (reason: string) => {
    return selectedReasons.includes(reason) ? 'check' : 'blank';
  };
  const handleReasonClick = (value: string) => {
    setSelectedReasons((prev) => {
      const newSelection = prev.includes(value)
        ? prev.filter((reason) => reason !== value)
        : [...prev, value];
      setValue('deleteReason', newSelection);
      return newSelection;
    });
  };
  const handleEtcReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const reason = e.target.value;
    setValue('etcReason', reason);
  };
  return {
    reasonIcon,
    handleReasonClick,
    handleEtcReasonChange,
  };
};
