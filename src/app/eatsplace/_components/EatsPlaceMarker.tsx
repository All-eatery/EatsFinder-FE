import { MarklocationMyListSVG } from '@/components/svg/MarklocationSVG';
import { OfficialLogoSVG } from '@/components/svg/OfficialLogoSVG';
interface EatsPlaceMarkerProps {
  isSelected: boolean;
  name: string;
  isHovered: boolean;
}
export const EatsPlaceMarker = ({
  isSelected = false,
  name,
  isHovered = false,
}: EatsPlaceMarkerProps) => {
  return (
    <div className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-100%]'>
      {isSelected || isHovered ? (
        <div className='flex h-12 w-44 items-center rounded-3xl border border-primary-400 bg-white px-3'>
          <MarklocationMyListSVG />
          <p className='flex gap-1 overflow-hidden'>
            <span className='max-w-[120px] truncate text-gray-800 subTitle-14'>
              {name}
            </span>
            <OfficialLogoSVG />
          </p>
        </div>
      ) : (
        <MarklocationMyListSVG />
      )}
    </div>
  );
};
