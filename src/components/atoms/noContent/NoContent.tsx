import React from 'react';
type NoContentProps = {
  msg: string;
};
export const NoContent = ({ msg }: NoContentProps) => {
  return (
    <div className='flex items-center justify-center'>
      <p>{msg}</p>
    </div>
  );
};
