interface NoticeDetailPageProps {
  title: string;
  date: string;
  content: string;
}
export const NoticeDetailPage = ({
  title,
  date,
  content,
}: NoticeDetailPageProps) => {
  return (
    <div className='mb-20 flex flex-col gap-10 lg:gap-20'>
      <div className='flex flex-col gap-2 border-b border-gray-100 py-4'>
        <h2 className='text-gray-800 subTitle-16 md:subTitle-18 lg:subTitle-20'>
          {title}
        </h2>
        <h3 className='text-gray-300 subTitle-12 md:subTitle-14 lg:subTitle-16'>
          {date}
        </h3>
      </div>
      <div
        className='body-14 lg:body-16'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
