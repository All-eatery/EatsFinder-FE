import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import Loading from '@/components/atoms/loading/Loading';
import { useGetCoordinate } from '../../_hooks/useGetCoordinate';
import { useEffect, useRef, useState } from 'react';
import { MarklocationNomalSVG } from '@/components/svg/MarklocationSVG';
import { AlarmBellSVG } from '@/components/svg/AlarmBellSVG';

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
  //   const svgString = `
  //   <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  //     <path d="M35.2763 16.9268C35.2763 23.3466 23.4196 42.5 23.4196 42.5C23.4196 42.5 12.0278 23.3466 12.0278 16.9268C11.5623 10.1847 16.9997 6 23.4196 6C29.8394 6 35.7406 9.95223 35.2763 16.9268Z" fill="#FB5607"/>
  //     <circle cx="23.6243" cy="16.6944" r="5.57962" fill="white"/>
  //   </svg>
  // `;

  // const encodedSvg = encodeURIComponent(svgString);
  // const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
  type Markers = {
    a: string;
    lat: number;
    lng: number;
    seleted: boolean;
  };
  const marekers: Markers[] = [
    {
      a: 'aaa',
      lat: 38.19155,
      lng: 128.60124,
      seleted: true,
    },
    {
      a: 'bbb',
      lat: 38.19165,
      lng: 128.60134,
      seleted: true,
    },
    {
      a: 'ccc',
      lat: 38.19258,
      lng: 128.60227,
      seleted: false,
    },
    {
      a: 'ddd',
      lat: 38.19035,
      lng: 128.60014,
      seleted: false,
    },
  ];
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
          {/* *마커
           * 클릭시 칠드런?
           * 마커데이터관리는 좀 더 생각해보기
           * 아니면 차릴 퍼블릭으로
           */}
          {/* <MapMarker
            position={{ lat: 37.563, lng: 126.984 }}
            image={{
              src: '/marker.png',
              size: { width: 48, height: 48 },
            }}
          /> */}
          {marekers.map((marker) => {
            const url = marker.seleted
              ? '/marker.png'
              : '/marker_unSeleted.png';
            return (
              <MapMarker
                position={{ lat: marker.lat, lng: marker.lng }}
                image={{
                  src: url,
                  size: { width: 48, height: 48 },
                }}
              />
            );
          })}

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
