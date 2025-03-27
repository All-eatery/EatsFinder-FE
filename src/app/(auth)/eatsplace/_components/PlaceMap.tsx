import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import Loading from '@/components/atoms/loading/Loading';
import { useGetCoordinate } from '../../_hooks/useGetCoordinate';
import { useEffect, useRef, useState } from 'react';
import { SurroundingMapHead } from '@/components/atoms/map/SurroundingMapHead';
import { MapAddressCopy } from '@/components/atoms/map/MapAddressCopy';
import { useRouter } from 'next/navigation';
type Markers = {
  id: number;
  lat: number;
  lng: number;
  selected: boolean;
};
const marekers: Markers[] = [
  {
    id: 1,
    lat: 38.19155,
    lng: 128.60124,
    selected: true,
  },
  {
    id: 2,
    lat: 38.19165,
    lng: 128.60134,
    selected: true,
  },
  {
    id: 3,
    lat: 38.19258,
    lng: 128.60227,
    selected: false,
  },
  {
    id: 4,
    lat: 38.19035,
    lng: 128.60014,
    selected: false,
  },
];
interface PlaceMapProps {
  isSurrounding?: boolean;
}
export const PlaceMap = ({ isSurrounding = true }: PlaceMapProps) => {
  const router = useRouter();

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const { coordinate } = useGetCoordinate();
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [address, setAddress] = useState('');
  console.log('render?', coordinate);
  const [boundary, setBoundary] = useState<kakao.maps.LatLngBounds>();
  const [hoveredMarkerId, setHoveredMarkerId] = useState<Number | null>(null);
  useEffect(() => {
    if (!map || !coordinate) return;
    const geocoder = new kakao.maps.services.Geocoder();
    if (isSurrounding) {
      geocoder.coord2RegionCode(
        coordinate.lng,
        coordinate.lat,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setAddress(result[0].address_name);
          }
        },
      );
    } else {
      geocoder.coord2Address(
        coordinate.lng,
        coordinate.lat,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setAddress(result[0].address.address_name);
          }
        },
      );
    }
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

  return (
    <>
      {isSurrounding && <SurroundingMapHead address={address} />}
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
          {marekers.map((marker) => {
            let markerImage = marker.selected
              ? '/marker.png'
              : '/marker_unSelected.png';
            if (hoveredMarkerId === marker.id) {
              markerImage = '/marker.png';
            }
            const markerSize = hoveredMarkerId === marker.id ? 64 : 48;
            return (
              <MapMarker
                position={{ lat: marker.lat, lng: marker.lng }}
                image={{
                  src: markerImage,
                  size: { width: markerSize, height: markerSize },
                }}
                onMouseOver={() => setHoveredMarkerId(marker.id)}
                onMouseOut={() => setHoveredMarkerId(null)}
                onClick={() => {
                  router.push(`/eatsplace/${marker.id}`);
                }}
              >
                {hoveredMarkerId === marker.id && (
                  <div style={{ padding: '5px', color: '#000' }}>
                    Hello World!
                  </div>
                )}
              </MapMarker>
            );
          })}
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
        </Map>
        {!isSurrounding && <MapAddressCopy address={address} />}
      </div>
    </>
  );
};
