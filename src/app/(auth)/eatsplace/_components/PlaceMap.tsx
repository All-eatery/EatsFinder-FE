import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Loading from '@/components/atoms/loading/Loading';
import { useGetCoordinate } from '../../_hooks/useGetCoordinate';

export const PlaceMap = () => {
  const coordinate = useGetCoordinate();
  console.log('render?', coordinate);
  if (!coordinate) return <Loading />;
  console.log('맛집지도');
  return (
    <div className='py-[10px]'>
      <Map
        className='h-[492px] w-full rounded-3xl'
        center={{ lat: coordinate.lat, lng: coordinate.lng }}
      >
        {/**마커 */}
        {/* <MapMarker
          position={{ lat: coordinate.lat, lng: coordinate.lng }}
          image={{
            src: '/marker.png',
            size: { width: 48, height: 48 },
          }}
        /> */}
      </Map>
      <div className='mb-2 flex justify-between body-16'>
        <span className='text-gray-600'>{'부산 동구 중앙대로 225'}</span>
        <span
          className='cursor-pointer text-gray-300'
          onClick={() => {
            navigator.clipboard.writeText('부산 동구 중앙대로 225');
            alert('복사되었습니다.');
          }}
        >
          주소복사
        </span>
      </div>
    </div>
  );
};
