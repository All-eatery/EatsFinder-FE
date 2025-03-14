import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Loading from '@/components/atoms/loading/Loading';
import { useGetCoordinate } from '../../_hooks/useGetCoordinate';
import { useEffect, useRef, useState } from 'react';

export const PlaceMap = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const { coordinate } = useGetCoordinate();
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [address, setAddress] = useState('');
  console.log('render?', coordinate);

  useEffect(() => {
    if (!map || !coordinate) return;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(
      coordinate.lng,
      coordinate.lat,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address_name);
        }
      },
    );
  }, [coordinate, map]);
  if (!coordinate) return <Loading />;

  console.log('맛집지도', address);
  //바운더리 값구함
  // const boundary = map?.getBounds();
  // console.log(boundary);
  //  좌표에 맞는 마커 띄우기, 드래그,휠시 map 재조정, 지역
  return (
    <>
      <h2 className='text-gray-700 subTitle-28'>주변의 맛집 ({address})</h2>
      <div className='py-[10px]'>
        <Map
          className='h-[492px] w-full rounded-3xl'
          center={{ lat: coordinate.lat, lng: coordinate.lng }}
          ref={mapRef}
          onCreate={(mapInstance) => {
            mapRef.current = mapInstance;
            setMap(mapInstance);
          }}
          draggable={true}
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
    </>
  );
};
