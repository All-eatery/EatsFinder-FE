interface InquiryTextProps {
  type: 'input' | 'textField';
  label: string;
}
export const InquiryText = ({ type, label }: InquiryTextProps) => {
  return (
    <div className='flex w-full flex-col gap-3'>
      <label className='flex subTitle-18'>
        {label}
        <p className='text-primary-400'>*</p>
      </label>
      {type === 'input' ? (
        <input
          type='text'
          placeholder={`${label}을 입력하세요.`}
          className='h-14 w-full rounded-xl border border-gray-100 p-2'
        />
      ) : (
        <textarea
          placeholder={`${label}을 입력하세요.`}
          className='h-80 w-full rounded-xl border border-gray-100 p-2'
        />
      )}
    </div>
  );
};
