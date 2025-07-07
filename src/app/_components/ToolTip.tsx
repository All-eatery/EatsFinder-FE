import { CloseSVG } from '@/components/svg/CloseSVG';

export const ToolTip = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className='relative inline-flex items-center gap-1 rounded-3xl bg-gray-800 fill-white px-5 py-1 text-white body-18'>
      내 주변 맛집을 추천받을 수 있어요
      <div className='cursor-pointer' onClick={onClose}>
        <CloseSVG />
      </div>
      <div className='absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 border-8 border-gray-800 border-y-transparent border-l-transparent'></div>
    </div>
  );
};
