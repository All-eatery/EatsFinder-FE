import { useState, useEffect } from 'react';
import { getRegionCode } from '@/api/place';

export const useLocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isGeolocationAvailable, setIsGeolocationAvailable] = useState(false);
  const [region, setRegion] = useState<string>('서울 강남구');

  const getGeolocation = (errorCallback?: () => void) => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getRegionCode(position);
          const regionName = `${data.documents[0].region_1depth_name} ${data.documents[0].region_2depth_name}  ${data.documents[0].region_3depth_name}`;
          setRegion(regionName);
          setIsGeolocationAvailable(true);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        switch (err.code) {
          case 1:
            console.error(err.message);
            if (errorCallback) {
              errorCallback();
            }
            break;
          case 2:
            console.error(err.message);
            break;
          case 3:
            console.error(err.message);
            break;
          default:
            console.error('unknown error!');
            break;
        }
        setIsGeolocationAvailable(false);
        setIsLoading(false);
      },
    );
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      getGeolocation();
    }
  }, []);

  return {
    region,
    isLoading,
    isGeolocationAvailable,
    updateLocation: getGeolocation,
  };
};
