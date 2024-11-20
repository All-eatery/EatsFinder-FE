import { InputHTMLAttributes } from 'react';
interface ReportOptionProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label: string;
}

const ReportOption = ({ name, value, label }: ReportOptionProps) => {
  return (
    <label className='body-20'>
      <input className='mr-1 h-4 w-4' type='radio' name={name} value={value} />
      {label}
    </label>
  );
};

export default ReportOption;
