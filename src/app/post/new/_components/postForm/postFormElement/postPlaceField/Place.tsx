import Image from 'next/image';
import { LogoImgSVG } from '@/components/svg/LogoSVG';
import { OfficialLogoSVG } from '@/components/svg/OfficialLogoSVG';

const Place = ({
  imgSrc,
  name,
  address,
  isRegistered,
  onClick,
}: {
  imgSrc?: string;
  name: string;
  address: string;
  isRegistered?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className='flex w-full cursor-pointer gap-3 px-5 py-4 hover:bg-gray-25'
      onClick={onClick}
    >
      <div className='relative h-16 w-16 overflow-hidden rounded-md'>
        {imgSrc ? (
          <Image src={imgSrc} fill alt={`${name} thumbnail`} />
        ) : (
          <div className='[&>svg]w-1/2 flex h-full w-full items-center justify-center bg-gray-50 [&>svg]:h-1/2'>
            <LogoImgSVG />
          </div>
        )}
      </div>
      <div className='flex flex-col justify-center text-gray-800'>
        <span className='flex items-center gap-1 subTitle-18'>
          {name}
          {isRegistered && (
            <span>
              <OfficialLogoSVG />
            </span>
          )}
        </span>
        <span className='body-14'>{address}</span>
      </div>
    </div>
  );
};

export default Place;
