import { searchParams } from '@/types/authType';
import { InquiryDetailPage } from './_components/InquiryDetailPage';

const page = async ({ params }: searchParams) => {
  console.log(params);

  return <InquiryDetailPage />;
};

export default page;
