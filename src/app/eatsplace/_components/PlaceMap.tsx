import {
  CustomOverlayMap,
  Map,
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
import { PlacesInboundaryType } from '@/types/eatsPlaceType';
import { EatsPlaceMarker } from './EatsPlaceMarker';
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

  const { data } = useQuery<PlacesInboundaryType[]>({
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
        isSelected: place.id === id,
      })) ?? []
    );
  }, [data, id]);
  if (!coordinate) return <Loading />;
  console.log(coordinate);
  const getBounday = (mapInstance: kakao.maps.Map) => {
    setBoundary(mapInstance.getBounds());
  };
  console.log(boundary);

  return (
    <>
      {isSurrounding && <SurroundingMapHead address={address} />}
      <div className='py-[10px]'>
        <Map
          className='relative h-[492px] w-full rounded-3xl'
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
            return (
              <CustomOverlayMap
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
              >
                <div
                  onMouseOver={() => setHoveredMarkerId(marker.id)}
                  onMouseOut={() => setHoveredMarkerId(null)}
                  onClick={() => {
                    router.push(`/eatsplace/${marker.id}`);
                  }}
                >
                  <EatsPlaceMarker
                    name={marker.name}
                    isSelected={marker.isSelected}
                    isHovered={hoveredMarkerId === marker.id}
                  />
                </div>
              </CustomOverlayMap>
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
