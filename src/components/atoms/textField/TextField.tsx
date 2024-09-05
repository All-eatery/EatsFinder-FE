import { ComponentProps, ReactNode, forwardRef } from 'react';
import { customTwMerge } from '@/utils/customTwMerge';

export interface TextFieldProps extends ComponentProps<'input'> {
  label?: string;
  message?: string;
  errormessage?: string;
  icon?: ReactNode;
  button?: ReactNode;
  timer?: string;
  underStoke?: boolean;
  fullWidth?: boolean;
}
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      className,
      label,
      message,
      errormessage,
      icon,
      button,
      timer,
      underStoke,
      fullWidth,
      ...props
    },
    ref,
  ) {
    return (
      <div
        className={customTwMerge(
          'flex w-[370px] flex-col',
          fullWidth && 'w-full',
        )}
      >
        <label
          className={`text-gray-400 subTitle-16 ${errormessage && `text-primary-500`}`}
        >
          {label}
        </label>
        <div className='relative flex'>
          <input
            {...props}
            ref={ref}
            className={customTwMerge(
              'w-full p-[10px] text-gray-900 caret-primary-400 body-16 focus:outline-none disabled:bg-gray-50 disabled:text-gray-200',
              underStoke
                ? 'border-b border-b-gray-100 focus:border-b-primary-400'
                : 'rounded border border-gray-100 focus:border-primary-400',
              errormessage && 'border-error',
              icon && 'pr-6',
              button && 'pr-[98px]',
              className,
            )}
          />
          {(icon || button) && (
            <div className='absolute right-1 top-1/2 flex -translate-y-1/2'>
              {icon || button}
            </div>
          )}
        </div>
        {(message || errormessage) && (
          <div className='flex justify-between'>
            <p
              className={`body-12 ${errormessage ? 'text-error' : 'text-gray-400'}`}
            >
              {errormessage ? errormessage : message}
            </p>
            {timer && <p className={`text-error body-12`}>{timer}</p>}
          </div>
        )}
      </div>
    );
  },
);
