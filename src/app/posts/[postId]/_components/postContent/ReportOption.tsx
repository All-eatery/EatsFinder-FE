import { InputHTMLAttributes } from 'react';
interface ReportOptionProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label: string;
}

const ReportOption = ({ name, value, label, ...props }: ReportOptionProps) => {
  return (
    <label className='mt-6 cursor-pointer body-20'>
      <input
        className='mr-2 h-4 w-4 cursor-pointer'
        type='radio'
        name={name}
        value={value}
        {...props}
      />
      {label}
    </label>
  );
};

export default ReportOption;
