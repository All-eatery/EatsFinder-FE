type LayoutPops = {
  children: React.ReactNode;
};
export default function AuthLayout({ children }: LayoutPops) {
  return (
    <div className='flex w-full select-none flex-col items-center'>
      {children}
    </div>
  );
}
