import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import Loading from '@/components/atoms/loading/Loading';
import { useGetCoordinate } from '../../_hooks/useGetCoordinate';
import { useEffect, useRef, useState } from 'react';

export const PlaceMap = () => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const { coordinate } = useGetCoordinate();
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [address, setAddress] = useState('');
  console.log('render?', coordinate);
  const [boundary, setBoundary] = useState<kakao.maps.LatLngBounds>();
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
  useEffect(() => {
    if (map) {
      setBoundary(map.getBounds());
    }
  }, [map]);
  if (!coordinate) return <Loading />;
  const getBounday = (mapInstance: kakao.maps.Map) => {
    setBoundary(mapInstance.getBounds());
  };
  //바운더리 값구함
  console.log('바운더리', boundary);

  //  좌표에 맞는 마커 띄우기
  // 드래그,휠시 map 재조정
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
          onZoomChanged={getBounday}
          onDrag={getBounday}
        >
          {/**마커 */}
          <MapMarker
            position={{ lat: 37.1527, lng: 127.088 }}
            image={{
              src: '/marker.png',
              size: { width: 48, height: 48 },
            }}
          />
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
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
