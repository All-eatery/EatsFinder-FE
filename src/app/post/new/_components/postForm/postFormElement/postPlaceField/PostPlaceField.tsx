'use client';
import { useState, useCallback, ChangeEvent } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import usePostFormContext from '@/app/post/new/_hooks/usePostFormContext';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import { TextFieldWithBtn } from '@/components/molecules/texTFieldWithBtn';
import { TextField } from '@/components/atoms/textField';
import { Modal } from '@/components/organisms';
import { PostPlaceSearch } from './PostPlaceSearch';
import { getPlace, getKakaoPlace, createPlace } from '@/api/post';
import { PlaceType, KakaoPlaceType, PlaceRequestType } from '@/types/postType';

export const PostPlaceField = () => {
  const { placeName, handleSetPlace } = usePostFormContext();
  const [searchPlace, setSearchPlace] = useState('');
  const { value: show, handleValue: handleShowToggle } = useToggleHandler();
  const { value: newPlaceModal, handleValue: handleNewPlaceModalToggle } =
    useToggleHandler();
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [kakaoPlaces, setKakaoPlaces] = useState<KakaoPlaceType[]>([]);
  const [newPlace, setNewPlace] = useState<KakaoPlaceType>();

  const handleNewPlaceModalConfirm = async () => {
    if (newPlace) {
      const place: PlaceRequestType = {
        name: newPlace.place_name,
        address: newPlace.address_name,
        roadAddress: newPlace.road_address_name,
        telephone: newPlace.phone,
        x: parseFloat(newPlace.x),
        y: parseFloat(newPlace.y),
        category: newPlace.category_name,
        categoryName: newPlace.category_group_name,
        categoryCode: newPlace.category_group_code,
      };

      const data = await createPlace(place);
      handleSetPlace(place.name, data.id);
      handleNewPlaceModalToggle();
    }
  };

  const handlePlaceSearch = async () => {
    if (searchPlace) {
      const trimPlaceName = searchPlace.trim();
      const data = await getPlace(trimPlaceName);
      const kakaoData = await getKakaoPlace(trimPlaceName);

      setPlaces(data);
      setKakaoPlaces(kakaoData.documents);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPlace(e.target.value);
  };

  const handlePlaceClick = (placeName: string, placeId: number) => {
    handleSetPlace(placeName, placeId);
    handleShowToggle();
  };

  const handleKakaoPlaceClick = (index: number) => {
    setNewPlace(kakaoPlaces[index]);
    handleNewPlaceModalToggle();
  };

  const callbackRef = useCallback((current: HTMLDivElement) => {
    current?.focus();
  }, []);

  return (
    <div className='relative'>
      <div className='cursor-pointer' onClick={handleShowToggle}>
        <TextFieldWithBtn
          className='pointer-events-none disabled:bg-white'
          label='추천 맛집'
          placeholder='추천하는 맛집을 찾아보세요'
          buttonMessage='맛집 찾기'
          value={placeName || ''}
          underStoke={true}
          fullWidth={true}
          disabled={true}
        />
      </div>
      {show && (
        <PostPlaceSearch
          ref={callbackRef}
          placeName={searchPlace}
          places={places}
          kakaoPlaces={kakaoPlaces}
          tabIndex={-1}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              handleShowToggle();
            }
          }}
          onSearch={handlePlaceSearch}
          onSearchChange={handleSearchChange}
          onPlaceClick={handlePlaceClick}
          onKakaoPlaceClick={handleKakaoPlaceClick}
        />
      )}
      <Modal
        isOpen={newPlaceModal}
        title='새로운 맛집 추가'
        description='내가 처음으로 찾은 맛집을 등록해주세요'
        mainButton='완료'
        onMainClick={handleNewPlaceModalConfirm}
        onClose={handleNewPlaceModalToggle}
      >
        {newPlace && (
          <div className='mx-auto flex w-[28.125rem] flex-col gap-6'>
            <TextField
              className='disabled:bg-transparent'
              label='맛집 이름'
              value={newPlace.place_name}
              underStoke={true}
              disabled={true}
              fullWidth={true}
            />
            <TextField
              className='disabled:bg-transparent'
              label='위치'
              value={newPlace.road_address_name || newPlace.address_name}
              underStoke={true}
              disabled={true}
              fullWidth={true}
            />
            <Map
              className='h-[18.75rem] w-full rounded-3xl'
              center={{
                lng: parseFloat(newPlace.x),
                lat: parseFloat(newPlace.y),
              }}
              level={2}
            >
              <MapMarker
                position={{
                  lng: parseFloat(newPlace.x),
                  lat: parseFloat(newPlace.y),
                }}
                image={{
                  src: '/marker.png',
                  size: { width: 48, height: 48 },
                }}
              />
            </Map>
          </div>
        )}
      </Modal>
    </div>
  );
};
