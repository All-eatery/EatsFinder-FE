import SearchBar from '../_components/SearchBar';
import TabMenu from './_components/TabMenu';

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const keyword = searchParams.keyword;
  console.log(keyword);

  return (
    <div className='flex flex-col gap-20'>
      <SearchBar />
      <TabMenu />
    </div>
  );
};

export default page;
