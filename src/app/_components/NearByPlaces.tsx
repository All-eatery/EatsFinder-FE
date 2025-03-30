'use client';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/atoms';
import { Card, HomeSection, SkeletonCard } from '@/components/molecules';
import { Modal } from '@/components/organisms';
import { ToolTip } from './ToolTip';
import { useLocation } from '../_hooks/useLocation';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import { CrossHairSVG } from '@/components/svg/CrossHairSVG';
import { getNearByPlaces } from '@/api/place';
import { UserDatatype } from '@/types/authType';
import { PlaceDetail } from '@/types/placeType';

const NearByPlaces = ({ userInfo }: { userInfo?: UserDatatype }) => {
  const [localPlace, setLocalPlace] = useState<PlaceDetail[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const { value: isOpen, handleValue: handleToggleOpen } = useToggleHandler();
  const { region, isLoadingLocation, isGeolocationAvailable, updateLocation } =
    useLocation();
  const { value: isShowTooltip, handleValue: handleToggleTooltip } =
    useToggleHandler(true);

  const handleUpdateLocation = () => {
    updateLocation(handleToggleOpen);
  };

  const updateLocalPlace = async (region: string) => {
    setIsFetching(true);
    const data = await getNearByPlaces(region);
    setLocalPlace(data);
    console.log(data);
    setIsFetching(false);
  };

  useEffect(() => {
    if (!isLoadingLocation) {
      updateLocalPlace(region);
    }
  }, [region, isLoadingLocation]);

  return (
    <HomeSection
      title={
        <span className='flex items-center gap-2'>
          {isLoadingLocation ? (
            <Skeleton className='h-6 w-80 rounded-full' />
          ) : !!userInfo ? (
            `${userInfo.nickname}님 주변의 맛집 (${region})`
          ) : (
            `지금 인기있는 ${region} 맛집 TOP 10`
          )}
          <span className='cursor-pointer' onClick={handleUpdateLocation}>
            <CrossHairSVG isActive={isGeolocationAvailable} />
          </span>
          {!isLoadingLocation && isShowTooltip && !isGeolocationAvailable && (
            <ToolTip onClose={handleToggleTooltip} />
          )}
        </span>
      }
    >
      <div className='flex flex-wrap justify-between gap-6'>
        {isFetching
          ? Array.from({ length: 10 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : localPlace.map((place) => <Card key={place.id} place={place} />)}
      </div>
      <Modal
        title={`위치 정보
이용 권한 설정이 필요합니다.`}
        size='medium'
        mainButton='닫기'
        isOpen={isOpen}
        onClose={handleToggleOpen}
        onMainClick={handleToggleOpen}
      >
        <div className='text-center'>
          <span>
            내 근처 맛집을 추천받고 싶다면
            <br />
            사용 중인 브라우저의 위치 권한을 허용해주세요.
          </span>
        </div>
      </Modal>
    </HomeSection>
  );
};

export default NearByPlaces;
