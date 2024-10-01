import { Chip } from '@/components/atoms';
import { KEYWORDS } from '@/constants/keywords';

interface KeywordIdsProps {
  keywordIds: string;
}

const KeywordChips = ({ keywordIds }: KeywordIdsProps) => {
  const splitedKeywordIds = keywordIds.split(', ');
  const keywords = KEYWORDS.filter((keyword) =>
    splitedKeywordIds.includes(keyword.id),
  );

  return (
    <div className='flex h-24 flex-wrap gap-2'>
      {keywords.map((it) => (
        <Chip key={it.text} text={it.text} emoji={it.emoji} size='small' />
      ))}
    </div>
  );
};

export default KeywordChips;
