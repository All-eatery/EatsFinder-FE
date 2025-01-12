import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
interface ReportOptionProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register?: UseFormRegisterReturn<
    | 'others'
    | 'closed'
    | 'differentPlace'
    | 'differentMenu'
    | 'sameReview'
    | 'differentPrice'
    | 'abusive'
    | 'spam'
    | 'porno'
    | 'offensive'
    | 'harmful'
  >;
}

const ReportOption = ({ label, register, ...props }: ReportOptionProps) => {
  return (
    <label className='mt-6 cursor-pointer body-20'>
      <input
        className='mr-2 h-4 w-4 cursor-pointer'
        type='checkbox'
        {...register}
        {...props}
      />
      {label}
    </label>
  );
};

export default ReportOption;
