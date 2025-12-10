type LayoutPops = {
  children: React.ReactNode;
};
export default function ProfileLayout({ children }: LayoutPops) {
  return <div className='flex w-full flex-col lg:gap-20'>{children}</div>;
}
