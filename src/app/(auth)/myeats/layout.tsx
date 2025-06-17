import { BookmarkCountProvider } from '@/provider/contextProvider/BookmarkCountProvider';

type LayoutPops = {
  children: React.ReactNode;
};
export default function MyEatsLayout({ children }: LayoutPops) {
  return (
    <div className='flex select-none flex-col items-center'>
      <BookmarkCountProvider>{children}</BookmarkCountProvider>
    </div>
  );
}
