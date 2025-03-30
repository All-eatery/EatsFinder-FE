import { BookmarkProvider } from '@/provider/contextProvider/BookmarkProvider';

type LayoutPops = {
  children: React.ReactNode;
};
export default function BookmarkLayout({ children }: LayoutPops) {
  return (
    <div className='flex select-none flex-col items-center'>
      <BookmarkProvider>{children}</BookmarkProvider>
    </div>
  );
}
