import { TextField } from '@/components/atoms/textField';
type AccountInfoProps = {
  email: string;
  name: string;
};
export const AccountInfo = ({ email, name }: AccountInfoProps) => {
  return (
    <div className='flex flex-col gap-9'>
      <TextField label='이름' value={name} disabled />
      <TextField label='계정' value={email} disabled />
    </div>
  );
};
