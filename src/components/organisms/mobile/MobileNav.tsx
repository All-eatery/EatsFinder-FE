import { NavLink } from '@/components/atoms';
import { NAV_DATA } from '@/constants/navData';

export const MobileNav = ({ path }: { path: string }) => {
  return (
    <nav className='fixed bottom-0 z-20 w-full bg-white xl:hidden'>
      <ul className='flex justify-between'>
        {NAV_DATA.map(({ href, Icon, label, page }) => {
          return (
            <li key={label}>
              <NavLink className='flex flex-col' href={href}>
                <Icon isActive={path === page} />
                <span
                  className={`${path === page ? 'text-primary-400' : 'text-gray-300'}`}
                >
                  {label}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
