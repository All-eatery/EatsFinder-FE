type CreatedAt = {
  createdAt: string;
};
export const CreatedAt = ({ createdAt }: CreatedAt) => {
  return <p className='text-gray-500 body-16'>{createdAt}</p>;
};
