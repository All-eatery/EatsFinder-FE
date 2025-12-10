'use client';
import { BoardItem } from '@/components/atoms/board/BoardItem';
import { BoardPagination } from '@/components/atoms/board/BoardPagination';
import { useState } from 'react';

export const NoticesSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastNotice = currentPage * itemsPerPage;
  const indexOfFirstNotice = indexOfLastNotice - itemsPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const totalPages = Math.ceil(notices.length / itemsPerPage);

  return (
    <div>
      <div className='mb-24'>
        {currentNotices.map((notice) => (
          <BoardItem
            type='notices'
            key={notice.id}
            id={notice.id}
            title={notice.title}
            date={notice.date}
          />
        ))}
      </div>
      <BoardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const notices = [
  { id: 1, title: '개인정보처리방침 변경 안내', date: '2024.06.29' },
  { id: 2, title: '10.5.5 업데이트 안내', date: '2024.06.29' },
  { id: 3, title: '맛집 리스트 기능 안내', date: '2024.06.29' },
  { id: 4, title: '리뷰 이미지 업로드 기능 추가', date: '2024.06.25' },
  { id: 5, title: '회원탈퇴 절차 변경 안내', date: '2024.06.20' },
  { id: 6, title: '서비스 점검 예정 안내', date: '2024.06.18' },
  { id: 7, title: '지도 기반 검색 기능 개선', date: '2024.06.15' },
  { id: 8, title: '푸시 알림 기능 도입', date: '2024.06.12' },
  { id: 9, title: '이벤트 당첨자 발표', date: '2024.06.10' },
  { id: 10, title: '1.2.0 버전 릴리즈', date: '2024.06.05' },
  { id: 11, title: '식당 정보 제휴 확대 안내', date: '2024.06.03' },
  { id: 12, title: '포인트 적립 정책 변경', date: '2024.06.01' },
  { id: 13, title: '게시글 신고 기능 개선', date: '2024.05.29' },
  { id: 14, title: '댓글 기능 버그 수정', date: '2024.05.26' },
  { id: 15, title: '이용약관 변경 예정 안내', date: '2024.05.24' },
  { id: 16, title: '5월 시스템 정기 점검 안내', date: '2024.05.20' },
  { id: 17, title: '맛집 랭킹 시스템 오픈', date: '2024.05.18' },
  { id: 18, title: '인기 게시글 노출 기준 변경', date: '2024.05.15' },
  { id: 19, title: '로그인 보안 강화', date: '2024.05.13' },
  { id: 20, title: '게시글 검색 기능 개선', date: '2024.05.10' },
  { id: 21, title: '북마크 기능 추가', date: '2024.05.07' },
  { id: 22, title: '스크랩 기능 안정화', date: '2024.05.05' },
  { id: 23, title: '10.5.6 업데이트 안내', date: '2024.05.03' },
  { id: 24, title: '신규 사용자 혜택 이벤트 안내', date: '2024.05.01' },
  { id: 25, title: '개인정보 보호 정책 변경', date: '2024.04.29' },
  { id: 26, title: '프로필 편집 기능 추가', date: '2024.04.27' },
  { id: 27, title: '식당 정보 상세 페이지 개편', date: '2024.04.25' },
  { id: 28, title: '팔로우 기능 개선', date: '2024.04.23' },
  { id: 29, title: '푸드 사진 공모전 개최 안내', date: '2024.04.20' },
  { id: 30, title: '앱 안정성 향상 업데이트', date: '2024.04.17' },
  { id: 31, title: '맛집 추천 알고리즘 개선', date: '2024.04.14' },
  { id: 32, title: '댓글 좋아요 기능 추가', date: '2024.04.10' },
  { id: 33, title: '맛집 제안 기능 오픈', date: '2024.04.08' },
  { id: 34, title: '계정 보안 강화 업데이트', date: '2024.04.05' },
  { id: 35, title: '이메일 인증 시스템 도입', date: '2024.04.01' },
  { id: 36, title: '4월 시스템 정기 점검 안내', date: '2024.03.29' },
  { id: 37, title: '다크모드 지원 안내', date: '2024.03.25' },
  { id: 38, title: '앱 접근성 기능 개선', date: '2024.03.21' },
  { id: 39, title: '리뷰 작성 보상 프로그램 시작', date: '2024.03.17' },
  { id: 40, title: '서비스 오픈 1주년 기념 이벤트', date: '2024.03.10' },
];
