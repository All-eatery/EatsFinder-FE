import { sampleImg } from '@/app/(auth)/profile/[userId]/_components/FollowList';
import { InquiryDetailContent } from './InquiryDetailContent';
import { InquiryDetailImage } from './InquiryDetailImage';
import { InquiryDetailTitle } from './InquiryDetailTitle';
const imgArr = new Array(3).fill(sampleImg);
console.log(typeof imgArr[0]);
export const InquiryDetailPage = () => {
  return (
    <div className='mb-24 flex flex-col gap-16'>
      <InquiryDetailTitle />
      <div className='flex gap-4'>
        {imgArr.map((img, i) => (
          <InquiryDetailImage img={img} key={i} />
        ))}
      </div>

      <InquiryDetailContent />
    </div>
  );
};
