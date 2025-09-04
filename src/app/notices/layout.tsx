type LayoutPops = {
  children: React.ReactNode;
};
export default function NoticesLayout({ children }: LayoutPops) {
  return (
    <div className='flex w-[1440px] flex-col px-20'>
      <h1 className='text-center text-gray-700 subTitle-18 lg:title-34'>
        공지사항
      </h1>
      {children}
    </div>
  );
}
