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
    <div className='my-20 flex flex-col gap-20'>
      <div className='flex flex-col gap-2 border-b border-gray-100 py-4 subTitle-16'>
        <h2 className='text-gray-800'>{title}</h2>
        <h3 className='text-gray-300'>{date}</h3>
      </div>
      <div className='body-16' dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
