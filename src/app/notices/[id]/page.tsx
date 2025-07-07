import { searchParams } from '@/types/authType';
import { NoticeDetailPage } from '../_components/NoticeDetailPage';

const noticeDetailData = {
  title: '개인정보처리방침 변경 안내 (2025년 7월)',
  date: '2025.07.07',
  content: `
    안녕하세요, [서비스 이름]입니다.<br/><br/>
    보다 나은 서비스 제공을 위해 **개인정보처리방침이 변경될 예정**입니다. 변경되는 내용은 다음과 같습니다:<br/><br/>
    <p>1. <strong>수집 항목 변경</strong>: 특정 서비스 개선을 위해 추가 정보(예: 선호하는 카테고리)가 수집될 수 있습니다.</p>
    <p>2. <strong>이용 목적 추가</strong>: 사용자 맞춤형 콘텐츠 추천 및 광고 효율성 증대를 위한 목적으로 정보가 활용될 수 있습니다.</p>
    <p>3. <strong>제3자 제공 변경</strong>: [제휴사 이름]과의 협력 강화를 위해 일부 개인정보가 [제휴사 이름]에 제공될 수 있습니다. (단, 개인을 식별할 수 없는 형태로 제공됩니다.)</p><br/>
    변경된 개인정보처리방침은 <strong>2025년 7월 15일</strong>부터 효력이 발생합니다.<br/><br/>
    기존 개인정보처리방침과 변경 내용을 자세히 확인하시려면 다음 링크를 참고해 주시기 바랍니다:<br/>
    <a href="https://www.your-service.com/privacy-policy-changes" target="_blank">개인정보처리방침 변경 내용 확인하기</a><br/><br/>
    궁금하신 점이 있으시면 언제든지 고객센터로 문의해 주시기 바랍니다.<br/><br/>
    감사합니다.<br/>
    [서비스 이름] 드림
  `,
};

const page = async ({ params }: searchParams) => {
  console.log(params);
  // if (!params?.slug) return null;

  return (
    <NoticeDetailPage
      content={noticeDetailData.content}
      title={noticeDetailData.title}
      date={noticeDetailData.date}
    />
  );
};

export default page;
