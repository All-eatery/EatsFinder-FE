type LayoutPops = {
  children: React.ReactNode;
};
export default function ProfileLayout({ children }: LayoutPops) {
  return <div className='flex flex-col gap-20'>{children}</div>;
}
