import { DeleteAccountType } from '@/types/authType';
import { ChangeEvent, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export const useDeleteReason = (
  setValue: UseFormSetValue<DeleteAccountType>,
) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [etcReason, setEtcReason] = useState('');
  const reasonIcon = (reason: string) => {
    return selectedReasons.includes(reason) ? 'check' : 'blank';
  };
  const handleReasonClick = (value: string) => {
    if (value === 'Etc') {
      if (etcReason) {
        setSelectedReasons((prev) => [...prev, 'Etc']);
      } else {
        setSelectedReasons((prev) => prev.filter((reason) => reason !== 'Etc'));
      }
    } else {
      setSelectedReasons((prev) => {
        const newSelection = prev.includes(value)
          ? prev.filter((reason) => reason !== value)
          : [...prev, value];
        setValue('deleteReason', newSelection);
        return newSelection;
      });
    }
  };
  const handleEtcReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const reason = e.target.value;
    setEtcReason(reason);
    setValue('etcReason', reason);
  };
  return {
    reasonIcon,
    handleReasonClick,
    etcReason,
    handleEtcReasonChange,
  };
};
