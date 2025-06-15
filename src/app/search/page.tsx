import SearchPage from './_components/SearchPage';

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const keyword = searchParams.keyword as string | undefined;
  const filter = searchParams.filter as string | undefined;

  return <SearchPage keyword={keyword} filter={filter} />;
};

export default page;
