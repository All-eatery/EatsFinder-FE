import { getPlaceById } from '@/api/place';
import { EatsPlaceDetailPage } from '../_components/EatsPlaceDetailPage';
type Params = { id: string };

const page = async ({ params }: { params: Params }) => {
  const data = await getPlaceById(params.id);
  return <EatsPlaceDetailPage data={data} />;
};

export default page;
