import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import Loading from '@/components/atoms/loading/Loading';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SurroundingMapHead } from '@/components/atoms/map/SurroundingMapHead';
import { MapAddressCopy } from '@/components/atoms/map/MapAddressCopy';
import { useRouter } from 'next/navigation';
import { useGetCoordinate } from '@/app/(auth)/_hooks/useGetCoordinate';
import { useQuery } from '@tanstack/react-query';
import { getPlacesInBoundary } from '@/api/place';
import { PlacesInboundary } from '@/types/eatsPlaceType';
// type Markers = {
//   id: number;
//   lat: number;
//   lng: number;
//   name: string;
//   selected: boolean;
// };
// const marekers: Markers[] = [
//   {
//     id: 1,
//     lat: 38.19155,
//     lng: 128.60124,
//     selected: false,
//     name: '1번',
//   },
//   {
//     id: 2,
//     lat: 38.19165,
//     lng: 128.60134,
//     selected: false,
//     name: '2번',
//   },
//   {
//     id: 3,
//     lat: 38.19258,
//     lng: 128.60227,
//     selected: false,
//     name: '3번',
//   },
//   {
//     id: 4,
//     lat: 38.19035,
//     lng: 128.60014,
//     selected: false,
//     name: '4번',
//   },
//   {
//     id: 5,
//     lat: 37.152934,
//     lng: 127.088255,
//     selected: false,
//     name: '5번',
//   },
//   {
//     id: 6,
//     lat: 37.152754,
//     lng: 127.088105,
//     selected: false,
//     name: '6번',
//   },
//   {
//     id: 7,
//     lat: 37.152724,
//     lng: 127.088225,
//     selected: false,
//     name: '7번',
//   },
// ];
interface PlaceMapProps {
  isSurrounding?: boolean;
  lat?: number;
  lng?: number;
  id?: number;
}
export const PlaceMap = ({
  isSurrounding = true,
  lat,
  lng,
  id,
}: PlaceMapProps) => {
  const router = useRouter();

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const { coordinate } = useGetCoordinate({ lat: lat, lng: lng });
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [address, setAddress] = useState('');
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

  const { data } = useQuery<PlacesInboundary[]>({
    queryKey: ['placesInboundary', boundary],
    queryFn: () => {
      if (!boundary) return Promise.resolve([]);
      const sw = boundary.getSouthWest();
      const ne = boundary.getNorthEast();
      return getPlacesInBoundary({
        oa: sw.getLng(),
        ha: ne.getLng(),
        qa: sw.getLat(),
        pa: ne.getLat(),
      });
    },
    enabled: !!boundary,
  });

  const processedMarkers = useMemo(() => {
    return (
      data?.map((place) => ({
        ...place,
        selected: place.id === id,
      })) ?? []
    );
  }, [data, id]);
  if (!coordinate) return <Loading />;
  console.log(coordinate);
  const getBounday = (mapInstance: kakao.maps.Map) => {
    setBoundary(mapInstance.getBounds());
  };

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
          {processedMarkers.map((marker) => {
            let markerImage = marker.selected
              ? '/marker.png'
              : '/marker_unSelected.png';
            let markerSize = hoveredMarkerId === marker.id ? 64 : 48;
            if (id === marker.id) {
              markerImage = '/marker.png';
              markerSize = 64;
            } else if (hoveredMarkerId === marker.id) {
              markerImage = '/marker.png';
            }
            return (
              <MapMarker
                key={marker.id}
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
                    {marker.name}
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
