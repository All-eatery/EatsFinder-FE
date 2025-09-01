import { ReactNode } from 'react';
import Link from 'next/link';
import { customTwMerge } from '@/utils/customTwMerge';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export const NavLink = ({
  href,
  children,
  className,
  active = false,
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={customTwMerge(
        'flex h-14 items-center justify-center p-[10px] body-12 hover:text-primary-400 hover:subTitle-12 lg:h-12 lg:body-20 lg:hover:subTitle-20',
        active
          ? 'border-b-[3px] border-primary-400 text-primary-400 subTitle-12 lg:subTitle-20'
          : 'text-gray-300 lg:text-gray-800',

        className,
      )}
    >
      {children}
    </Link>
  );
};
