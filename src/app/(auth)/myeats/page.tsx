import { MyEatsPage } from './_components/MyEatsPage';
import { ParamsProps } from '@/types/paramsType';

const page = async ({ searchParams }: ParamsProps) => {
  return <MyEatsPage searchParams={searchParams} />;
};

export default page;
