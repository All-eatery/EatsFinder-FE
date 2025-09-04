export const route = {
  '/': '홈',
  myeats: '마이이츠',
  profile: '프로필 페이지',
  'delete-account': '계정 삭제',
  'find-account': '계정 찾기',
  inquiry: '1:1 문의하기',
  login: '로그인',
  myaccount: '내 계정',
  settings: '기타 설정',
  signup: '회원가입',
  eatsplace: '맛집정보',
  explore: '탐색피드',
  notices: '공지사항',
  post: '게시글 작성',
  posts: '게시글',
} as const;
export type RouteKey = keyof typeof route;
export function isRouteKey(key: string): key is RouteKey {
  return Object.keys(route).includes(key);
}
