import { useEffect, useState } from 'react';
const DEFAULT_COORDINATE = {
  lat: 38.19155114124001,
  lng: 128.601247028514,
};
//홈에서부터 가져오고 이를 전역에 저장해두자
export const useGetCoordinate = () => {
  const [coordinate, setCoordinate] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!coordinate) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinate({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setCoordinate(DEFAULT_COORDINATE);
        },
      );
    }
  }, [coordinate]);

  return { coordinate };
};
