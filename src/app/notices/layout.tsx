type LayoutPops = {
  children: React.ReactNode;
};
export default function NoticesLayout({ children }: LayoutPops) {
  return (
    <div className='flex w-full max-w-[1440px] flex-col gap-4 px-4 lg:gap-16 lg:px-20'>
      <h1 className='text-center text-gray-800 subTitle-18 lg:title-34'>
        공지사항
      </h1>
      {children}
    </div>
  );
}
