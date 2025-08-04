type LayoutPops = {
  children: React.ReactNode;
};
export default function Inquiry({ children }: LayoutPops) {
  return (
    <div className='flex w-[1440px] flex-col px-20'>
      <h1 className='mb-16 text-center text-gray-700 title-34'>문의하기</h1>
      {children}
    </div>
  );
}
