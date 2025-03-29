import { Chip } from '@/components/atoms';
import { KEYWORDS } from '@/constants/keywords';
import clsx from 'clsx';

interface KeywordIdsProps {
  keywordIds: string;
  keywordsGap?: number;
}

const KeywordChips = ({
  keywordIds,
  keywordsGap: keywordGap = 2,
}: KeywordIdsProps) => {
  const splitedKeywordIds = keywordIds.split(',');
  const filteredKeywords = KEYWORDS.filter((keyword) =>
    splitedKeywordIds.includes(keyword.id),
  );
  return (
    <div className={clsx('flex flex-wrap', `gap-${keywordGap}`)}>
      {filteredKeywords.map((it) => (
        <Chip key={it.text} text={it.text} emoji={it.emoji} />
      ))}
    </div>
  );
};

export default KeywordChips;
