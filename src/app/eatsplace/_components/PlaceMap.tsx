'use client';

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
import { useQuery } from '@tanstack/react-query';
import { getPlacesInBoundary } from '@/api/place';
import { PlacesInboundaryType, Coordinate } from '@/types/eatsPlaceType';
import { EatsPlaceMarker } from './EatsPlaceMarker';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const DEFAULT_COORDINATE: Coordinate = {
  lat: 38.19155114124001,
  lng: 128.601247028514,
};

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

  const [mapCenter, setMapCenter] = useState<Coordinate | null>(null);

  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [address, setAddress] = useState('');
  const [boundary, setBoundary] = useState<kakao.maps.LatLngBounds>();
  const [hoveredMarkerId, setHoveredMarkerId] = useState<Number | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const initialMapLevel = isMobile ? 4 : 3;

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setMapCenter({ lat, lng });
    }
  }, [lat, lng, map]);

  useEffect(() => {
    if (lat === undefined || lng === undefined) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setMapCenter(DEFAULT_COORDINATE);
        },
      );
    }
  }, []);

  useEffect(() => {
    if (!map || !mapCenter) return;
    const geocoder = new kakao.maps.services.Geocoder();
    if (isSurrounding) {
      geocoder.coord2RegionCode(
        mapCenter.lng,
        mapCenter.lat,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setAddress(result[0].address_name);
          }
        },
      );
    } else {
      geocoder.coord2Address(mapCenter.lng, mapCenter.lat, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
        }
      });
    }
  }, [mapCenter, map, isSurrounding]);

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
      data?.map((place) => ({ ...place, isSelected: place.id === id })) ?? []
    );
  }, [data, id]);

  const getBoundary = (mapInstance: kakao.maps.Map) => {
    setBoundary(mapInstance.getBounds());
  };

  if (!mapCenter) return <Loading />;
  return (
    <>
      {isSurrounding && <SurroundingMapHead address={address} />}
      <div className='w-full py-3'>
        <Map
          level={initialMapLevel}
          className='relative h-52 w-full rounded-3xl md:h-80 lg:h-96 xl:h-[492px]'
          center={mapCenter}
          ref={mapRef}
          onCreate={(mapInstance) => {
            mapRef.current = mapInstance;
            setMap(mapInstance);
          }}
          draggable={true}
          onZoomChanged={getBoundary}
          onDragEnd={getBoundary}
        >
          {processedMarkers.map((marker) => (
            <CustomOverlayMap
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              zIndex={
                marker.isSelected ? 10 : hoveredMarkerId === marker.id ? 20 : 1
              }
            >
              <div
                onMouseOver={() => setHoveredMarkerId(marker.id)}
                onMouseOut={() => setHoveredMarkerId(null)}
                onClick={() => router.push(`/eatsplace/${marker.id}`)}
              >
                <EatsPlaceMarker
                  name={marker.name}
                  isSelected={marker.isSelected}
                  isHovered={hoveredMarkerId === marker.id}
                />
              </div>
            </CustomOverlayMap>
          ))}
          <MapTypeControl position={'TOPRIGHT'} />
          <ZoomControl position={'RIGHT'} />
        </Map>
        {!isSurrounding && <MapAddressCopy address={address} />}
      </div>
    </>
  );
};
