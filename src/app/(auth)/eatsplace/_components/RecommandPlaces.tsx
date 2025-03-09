import { Card, HomeSection } from '@/components/molecules';
import { CardCarousel } from '@/components/organisms';
import React from 'react';
const data = new Array(23).fill(0);

export const RecommandPlaces = () => {
  return (
    <HomeSection title='여름에 맞는 시원한 음식 냉모밀 맛집 TOP 10'>
      <CardCarousel data={data}>
        <Card />
      </CardCarousel>
    </HomeSection>
  );
};
