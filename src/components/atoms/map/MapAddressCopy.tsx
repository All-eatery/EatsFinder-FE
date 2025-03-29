import React from 'react';

export const MapAddressCopy = ({ address }: { address: string }) => {
  return (
    <div className='mb-2 flex justify-between body-16'>
      <span className='text-gray-600'>{address}</span>
      <span
        className='cursor-pointer text-gray-300'
        onClick={() => {
          navigator.clipboard.writeText(address);
          alert('복사되었습니다.');
        }}
      >
        주소복사
      </span>
    </div>
  );
};
