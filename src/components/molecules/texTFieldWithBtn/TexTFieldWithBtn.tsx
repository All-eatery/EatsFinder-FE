import { Button } from '@/components/atoms';
import { TextField, TextFieldProps } from '@/components/atoms/textField';
import { forwardRef } from 'react';

interface TextFieldWithBtnProps extends TextFieldProps {
  buttonMessage: string;
  buttonDisabled?: boolean;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const TextFieldWithBtn = forwardRef<
  HTMLInputElement,
  TextFieldWithBtnProps
>(function TextTieldWithBtn(
  { buttonMessage, buttonDisabled, onButtonClick, ...props },
  ref,
) {
  return (
    <>
      <TextField
        {...props}
        ref={ref}
        button={
          <Button
            onClick={onButtonClick}
            type='button'
            variant={'primary'}
            size={'mini'}
            disabled={buttonDisabled}
          >
            {buttonMessage}
          </Button>
        }
      />
    </>
  );
});
