import { useEffect, useState } from 'react';
//홈에서부터 가져오고 이를 전역에 저장해두자
export const useGetCoordinate = () => {
  const [coordinate, setCoordinate] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!coordinate) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinate({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return coordinate;
};
