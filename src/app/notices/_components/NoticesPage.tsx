import { NoticesSection } from './NoticesSection';

export const NoticesPage = () => {
  return (
    <div className='flex w-[1440px] max-w-4xl flex-col'>
      <h1 className='text-center text-gray-700 title-34'>공지사항</h1>
      <NoticesSection />
    </div>
  );
};
