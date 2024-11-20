import { useState, Dispatch, SetStateAction } from 'react';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import { Modal } from '@/components/organisms';
import ReportOption from './ReportOption';
import { ReportStateType } from '@/types/postType';

interface ReportModalProps {
  reportState: ReportStateType;
  setReportState: Dispatch<SetStateAction<ReportStateType>>;
}

const reportOption = {
  post: [
    { label: '맛집 위치가 달라요', value: 'differentPlace' },
    { label: '추천해준 메뉴가 없어요', value: 'differentMenu' },
    { label: '똑같은 리뷰를 여러개 게시했어요', value: 'sameReview' },
    { label: '가격 정보가 달라요', value: 'differentPrice' },
    { label: '폐업한 가게에요', value: 'closed' },
    { label: '기타', value: 'others' },
  ],
  comment: [
    { label: '욕설/생명경시/혐오/차별적 표현', value: 'abusive' },
    { label: '스팸 홍보/도배글', value: 'spam' },
    { label: '음란물', value: 'porno' },
    { label: '불쾌한 표현', value: 'offensive' },
    { label: '청소년에게 유해한 내용', value: 'harmful' },
    { label: '기타', value: 'others' },
  ],
};

const ReportModal = ({ reportState, setReportState }: ReportModalProps) => {
  const [reportReason, setReportReason] = useState('');

  return (
    <Modal
      isOpen={reportState.isOpen}
      title={`${reportState.targetType === 'post' ? '게시물' : '댓글'} 신고하기`}
      mainButton='신고하기'
      onClose={() => {
        setReportState({ isOpen: false, targetType: null, targetId: null });
      }}
      onMainClick={() => {}}
      size='medium'
    >
      <div className='w-full'>
        <div className='m-auto flex w-[370px] flex-col gap-6'>
          {reportState.targetType && reportState.targetType === 'post'
            ? reportOption.post.map((it) => (
                <ReportOption
                  key={it.value}
                  name='reportReason'
                  label={it.label}
                  value={it.value}
                  checked={reportReason === it.value}
                  onChange={(e) => setReportReason(e.target.value)}
                />
              ))
            : reportOption.comment.map((it) => (
                <ReportOption
                  key={it.value}
                  name='reportReason'
                  label={it.label}
                  value={it.value}
                  checked={reportReason === it.value}
                  onChange={(e) => setReportReason(e.target.value)}
                />
              ))}
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
