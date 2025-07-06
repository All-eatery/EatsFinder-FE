export const StickyBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='sticky bottom-20 left-0 right-0 z-10 flex justify-center gap-3'>
      {children}
    </div>
  );
};
