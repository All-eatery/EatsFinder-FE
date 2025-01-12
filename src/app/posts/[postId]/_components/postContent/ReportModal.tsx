import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField } from '@/components/atoms/textField';
import { Modal } from '@/components/organisms';
import ReportOption from './ReportOption';
import { ReportStateType } from '@/types/postType';
import { submitReport } from '@/api/report';

interface ReportModalProps {
  reportState: ReportStateType;
  setReportState: Dispatch<SetStateAction<ReportStateType>>;
}

const reportOption = {
  post: [
    { label: '맛집 위치가 달라요', name: 'differentPlace' },
    { label: '추천해준 메뉴가 없어요', name: 'differentMenu' },
    { label: '똑같은 리뷰를 여러개 게시했어요', name: 'sameReview' },
    { label: '가격 정보가 달라요', name: 'differentPrice' },
    { label: '폐업한 가게에요', name: 'closed' },
    { label: '기타', name: 'others' },
  ],
  comment: [
    { label: '욕설/생명경시/혐오/차별적 표현', name: 'abusive' },
    { label: '스팸 홍보/도배글', name: 'spam' },
    { label: '음란물', name: 'porno' },
    { label: '불쾌한 표현', name: 'offensive' },
    { label: '청소년에게 유해한 내용', name: 'harmful' },
    { label: '기타', name: 'others' },
  ],
} as const;

type ReportOptionType<T extends keyof typeof reportOption> =
  (typeof reportOption)[T][number]['name'];

type ReportInput<T extends 'post' | 'comment'> = {
  [key in ReportOptionType<T>]: boolean;
};

const ReportModal = ({ reportState, setReportState }: ReportModalProps) => {
  const reportFormRef = useRef<HTMLFormElement>(null);
  const [otherReason, setOtherReason] = useState<string>('');
  const {
    register: postRegister,
    handleSubmit: handlePostReportSubmit,
    reset: postReportReset,
    watch: postReportWatch,
  } = useForm<ReportInput<'post'>>();
  const {
    register: commentRegister,
    handleSubmit: handleCommentReportSubmit,
    reset: commentReportReset,
    watch: commentReportWatch,
  } = useForm<ReportInput<'comment'>>();

  const onSubmit: SubmitHandler<
    ReportInput<'post'> | ReportInput<'comment'>
  > = async (data) => {
    if (!Object.values(data).some((value) => value)) {
      alert('신고 사유를 선택해주세요');
      return;
    }

    if (data.others && otherReason === '') {
      alert('기타 사유를 입력해주세요');
      return;
    }

    const res = await submitReport(
      data,
      reportState.targetType,
      reportState.targetId,
    );

    console.log(res);
  };

  return (
    <Modal
      isOpen={reportState.isOpen}
      title={`${reportState.targetType === 'post' ? '게시물' : '댓글'} 신고하기`}
      mainButton='신고하기'
      onClose={() => {
        setReportState({ isOpen: false, targetType: null, targetId: null });
        postReportReset();
        commentReportReset();
      }}
      onMainClick={() => {
        if (reportFormRef.current) {
          reportFormRef.current.requestSubmit();
        }
      }}
      size='medium'
    >
      <form
        className='w-full'
        ref={reportFormRef}
        onSubmit={
          reportState.targetType === 'post'
            ? handlePostReportSubmit(onSubmit)
            : handleCommentReportSubmit(onSubmit)
        }
      >
        <div className='m-auto flex w-[370px] flex-col'>
          {reportState.targetType === 'post'
            ? reportOption['post'].map((option) => (
                <ReportOption
                  key={option.name}
                  label={option.label}
                  register={postRegister(option.name)}
                />
              ))
            : reportOption['comment'].map((option) => {
                return (
                  <ReportOption
                    key={option.name}
                    label={option.label}
                    register={commentRegister(option.name)}
                  />
                );
              })}
          <TextField
            className='mt-2'
            onChange={(e) => {
              setOtherReason(e.target.value);
            }}
            disabled={
              !(postReportWatch('others') || commentReportWatch('others'))
            }
          />
        </div>
      </form>
    </Modal>
  );
};

export default ReportModal;
