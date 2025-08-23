import { CardCarousel } from './CardCarousel';
import { getNewNeighborPosts } from '@/api/explore';
const data = new Array(20).fill(0);
//현재 이웃 게시물이 없어서 마땅히 할 ㅜㅅ 없음 있을경우 페이지네이션을 하면서 캐러셀 형식으로!
//isLastPage => 마지막 버튼 비활성화
//이웃이 없을 경우와 이웃게시물이 없울 경우 처리
export const NeighborCarousel = async () => {
  const res = await getNewNeighborPosts();
  return <CardCarousel data={data} title='이웃님의 새로운 게시물' />;
};
