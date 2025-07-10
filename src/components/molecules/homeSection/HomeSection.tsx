import { ReactNode } from 'react';

interface HomeSectionProps {
  title: ReactNode;
  children: ReactNode;
}

export const HomeSection = ({ title, children }: HomeSectionProps) => {
  return (
    <section>
      <h2 className='mb-6 text-gray-700 subTitle-28'>{title}</h2>
      <div>{children}</div>
    </section>
  );
};
