'use client';
import { BoardItem } from '@/components/atoms/board/BoardItem';
import { BoardPagination } from '@/components/atoms/board/BoardPagination';
import React, { useState } from 'react';

export const InquirySection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastNotice = currentPage * itemsPerPage;
  const indexOfFirstNotice = indexOfLastNotice - itemsPerPage;
  const currentNotices = Inquiries.slice(indexOfFirstNotice, indexOfLastNotice);

  const totalPages = Math.ceil(Inquiries.length / itemsPerPage);

  return (
    <div>
      <div className='my-24'>
        {currentNotices.map((inquiry) => (
          <BoardItem
            type='inquiry'
            key={inquiry.id}
            id={inquiry.id}
            title={inquiry.title}
            date={inquiry.date}
            content={inquiry.content}
            status={inquiry.status}
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

const Inquiries = [
  {
    id: 1,
    type: 'inquiry',
    title: '회원가입이 되지 않습니다',
    date: '2024.06.28',
    status: false,
    content:
      '회원가입 시 인증 메일이 오지 않아 가입이 완료되지 않습니다. 확인 부탁드립니다.',
  },
  {
    id: 2,
    type: 'inquiry',
    title: '리뷰 작성이 안돼요',
    date: '2024.06.27',
    status: true,
    content:
      '사진을 첨부하고 리뷰를 작성했는데 등록이 되지 않았습니다. 조치 부탁드립니다.',
  },
  {
    id: 3,
    type: 'inquiry',
    title: '비밀번호 변경 오류',
    date: '2024.06.25',
    status: false,
    content:
      '비밀번호 변경 시 기존 비밀번호가 맞음에도 불구하고 오류가 발생합니다.',
  },
  {
    id: 4,
    type: 'inquiry',
    title: '탈퇴가 되지 않아요',
    date: '2024.06.22',
    status: true,
    content: '탈퇴 사유를 입력하고 진행했으나 계속 에러 메시지가 뜹니다.',
  },
  {
    id: 5,
    type: 'inquiry',
    title: '게시글 신고 처리 문의',
    date: '2024.06.20',
    status: false,
    content: '신고한 게시글에 대한 처리 결과가 오지 않아 문의드립니다.',
  },
  {
    id: 6,
    type: 'inquiry',
    title: '포인트 적립이 안 돼요',
    date: '2024.06.18',
    status: true,
    content: '리뷰를 작성했지만 포인트가 적립되지 않았습니다.',
  },
  {
    id: 7,
    type: 'inquiry',
    title: '스크랩 기능 관련 문의',
    date: '2024.06.15',
    status: false,
    content: '스크랩한 맛집이 목록에 보이지 않습니다. 원인 확인 부탁드립니다.',
  },
  {
    id: 8,
    type: 'inquiry',
    title: '프로필 수정이 안 됩니다',
    date: '2024.06.14',
    status: true,
    content: '닉네임을 변경하려고 하면 저장이 되지 않고 에러가 발생합니다.',
  },
  {
    id: 9,
    type: 'inquiry',
    title: '지도에 내 위치가 표시되지 않아요',
    date: '2024.06.12',
    status: false,
    content: '위치 권한을 허용했는데도 내 위치가 지도에 표시되지 않습니다.',
  },
  {
    id: 10,
    type: 'inquiry',
    title: '로그인 유지 기능 문의',
    date: '2024.06.10',
    status: true,
    content:
      '앱을 껐다가 켜면 로그인 정보가 사라져 매번 다시 로그인해야 합니다.',
  },
  {
    id: 11,
    type: 'inquiry',
    title: '이메일 인증이 실패해요',
    date: '2024.06.08',
    status: false,
    content: '인증 메일의 링크를 눌러도 인증이 완료되지 않습니다.',
  },
  {
    id: 12,
    type: 'inquiry',
    title: '알림이 오지 않아요',
    date: '2024.06.06',
    status: true,
    content:
      '설정에서 알림을 켰는데도 새로운 소식이 와도 알림이 오지 않습니다.',
  },
  {
    id: 13,
    type: 'inquiry',
    title: '앱이 자주 종료돼요',
    date: '2024.06.05',
    status: false,
    content: '앱 사용 중 갑자기 종료되는 현상이 빈번하게 발생합니다.',
  },
  {
    id: 14,
    type: 'inquiry',
    title: '팔로우 기능이 작동하지 않아요',
    date: '2024.06.03',
    status: true,
    content: '다른 사용자를 팔로우해도 목록에 반영되지 않습니다.',
  },
  {
    id: 15,
    type: 'inquiry',
    title: '사진 첨부 시 앱이 멈춰요',
    date: '2024.06.01',
    status: false,
    content: '리뷰 작성 중 사진을 첨부하면 앱이 멈춥니다.',
  },
  {
    id: 16,
    type: 'inquiry',
    title: '문의 내역이 보이지 않아요',
    date: '2024.05.30',
    status: true,
    content: '지난 문의 내역이 "마이페이지 > 문의하기"에 나타나지 않습니다.',
  },
  {
    id: 17,
    type: 'inquiry',
    title: '비정상적인 로그아웃',
    date: '2024.05.28',
    status: false,
    content: '사용 중 로그아웃되는 현상이 반복됩니다.',
  },
  {
    id: 18,
    type: 'inquiry',
    title: '비밀번호 찾기 오류',
    date: '2024.05.27',
    status: true,
    content: '비밀번호 찾기 시 이메일을 입력해도 전송이 되지 않습니다.',
  },
  {
    id: 19,
    type: 'inquiry',
    title: '다크모드가 반영되지 않아요',
    date: '2024.05.25',
    status: false,
    content: '설정에서 다크모드를 켜도 앱에 적용되지 않습니다.',
  },
  {
    id: 20,
    type: 'inquiry',
    title: '리뷰 삭제가 안 됩니다',
    date: '2024.05.23',
    status: true,
    content: '작성한 리뷰를 삭제하려고 해도 반응이 없습니다.',
  },
  {
    id: 21,
    type: 'inquiry',
    title: '아이디 중복 확인 오류',
    date: '2024.05.22',
    status: false,
    content: '회원가입 시 아이디 중복 확인이 정상 동작하지 않습니다.',
  },
  {
    id: 22,
    type: 'inquiry',
    title: '위치 기반 추천이 이상해요',
    date: '2024.05.21',
    status: true,
    content: '현재 위치와 전혀 다른 지역의 맛집이 추천됩니다.',
  },
  {
    id: 23,
    type: 'inquiry',
    title: '닉네임이 저장되지 않아요',
    date: '2024.05.20',
    status: false,
    content: '프로필 편집에서 닉네임 변경 후 저장이 안 됩니다.',
  },
  {
    id: 24,
    type: 'inquiry',
    title: '후기 작성 후 앱이 멈춤',
    date: '2024.05.18',
    status: false,
    content: '리뷰 작성 버튼을 누르면 앱이 멈추고 꺼집니다.',
  },
  {
    id: 25,
    type: 'inquiry',
    title: '북마크한 장소가 사라졌어요',
    date: '2024.05.15',
    status: true,
    content: '북마크 목록에 저장해 둔 장소가 더 이상 보이지 않습니다.',
  },
  {
    id: 26,
    type: 'inquiry',
    title: '푸시 알림 중복 수신',
    date: '2024.05.12',
    status: true,
    content: '하나의 이벤트에 대해 여러 번 알림이 수신됩니다.',
  },
  {
    id: 27,
    type: 'inquiry',
    title: '댓글이 안 달려요',
    date: '2024.05.10',
    status: false,
    content: '댓글 입력 후 등록 버튼을 눌러도 아무 반응이 없습니다.',
  },
  {
    id: 28,
    type: 'inquiry',
    title: '이벤트 참여 오류',
    date: '2024.05.09',
    status: true,
    content: '이벤트 참여 버튼을 눌렀지만 완료 처리되지 않습니다.',
  },
  {
    id: 29,
    type: 'inquiry',
    title: '이용약관 페이지 열리지 않음',
    date: '2024.05.07',
    status: false,
    content: '앱 내 이용약관 페이지가 비어 있는 화면으로 나옵니다.',
  },
  {
    id: 30,
    type: 'inquiry',
    title: '앱 설치 후 로그인 불가',
    date: '2024.05.05',
    status: true,
    content: '앱을 새로 설치한 후 로그인 시도했지만 실패합니다.',
  },
  {
    id: 31,
    type: 'inquiry',
    title: '맛집 정보 오류',
    date: '2024.05.04',
    status: false,
    content: '등록된 맛집 정보가 실제와 다릅니다.',
  },
  {
    id: 32,
    type: 'inquiry',
    title: '검색 기능 멈춤 현상',
    date: '2024.05.02',
    status: true,
    content: '검색어 입력 후 검색이 멈춘 상태로 유지됩니다.',
  },
  {
    id: 33,
    type: 'inquiry',
    title: '프로필 이미지 변경 안됨',
    date: '2024.05.01',
    status: false,
    content: '프로필 이미지 변경 후 저장이 되지 않습니다.',
  },
  {
    id: 34,
    type: 'inquiry',
    title: '로그아웃 버튼이 반응 없음',
    date: '2024.04.30',
    status: true,
    content: '설정에서 로그아웃 버튼을 눌러도 동작하지 않습니다.',
  },
  {
    id: 35,
    type: 'inquiry',
    title: '다른 사용자의 게시글 보기 오류',
    date: '2024.04.28',
    status: false,
    content: '프로필 페이지에서 다른 유저의 게시글이 열리지 않습니다.',
  },
  {
    id: 36,
    type: 'inquiry',
    title: '비정상적인 포인트 차감',
    date: '2024.04.26',
    status: true,
    content: '활동을 하지 않았는데 포인트가 줄었습니다.',
  },
  {
    id: 37,
    type: 'inquiry',
    title: '리뷰 작성 중 저장 불가',
    date: '2024.04.24',
    status: false,
    content: '리뷰를 쓰다가 저장하려 하면 오류가 발생합니다.',
  },
  {
    id: 38,
    type: 'inquiry',
    title: '식당 위치가 지도와 달라요',
    date: '2024.04.22',
    status: true,
    content: '등록된 위치와 실제 식당 위치가 다릅니다.',
  },
  {
    id: 39,
    type: 'inquiry',
    title: '광고 차단 기능 문의',
    date: '2024.04.20',
    status: false,
    content: '광고가 너무 많이 나와서 차단 기능이 있는지 궁금합니다.',
  },
  {
    id: 40,
    type: 'inquiry',
    title: '앱 실행이 너무 느려요',
    date: '2024.04.18',
    status: true,
    content: '앱 실행 시 로딩 시간이 지나치게 깁니다.',
  },
];
