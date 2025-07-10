import { searchParams } from '@/types/authType';
import { InquiryDetailPage } from '../_components/InquiryDetailPage';

const page = async ({ params }: searchParams) => {
  console.log(params);
  // if (!params?.slug) return null;

  return <InquiryDetailPage />;
};

export default page;
