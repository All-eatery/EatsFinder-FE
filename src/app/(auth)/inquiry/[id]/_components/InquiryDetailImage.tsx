import Image from 'next/image';

export const InquiryDetailImage = ({ img }: { img: string }) => {
  return (
    <figure className='relative aspect-video w-1/3'>
      <Image src={img} alt='첨부 이미지' fill />
    </figure>
  );
};
