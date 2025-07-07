const timeDifference = (date: string) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;
  const msPerMonth = msPerWeek * 4;
  const msPerYear = msPerMonth * 12;

  const createdAt = new Date(date);
  const now = new Date();

  const elapsed = now.valueOf() - createdAt.valueOf();

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return '방금 전';
    return Math.round(elapsed / 1000) + '초 전';
  } else if (elapsed < msPerHour)
    return Math.round(elapsed / msPerMinute) + '분 전';
  else if (elapsed < msPerDay)
    return Math.round(elapsed / msPerHour) + '시간 전';
  else if (elapsed < msPerWeek) return Math.round(elapsed / msPerDay) + '일 전';
  else if (elapsed < msPerMonth)
    return Math.round(elapsed / msPerWeek) + '주 전';
  else if (elapsed < msPerYear)
    return Math.round(elapsed / msPerMonth) + '개월 전';
  else return Math.round(elapsed / msPerYear) + '년 전';
};

export default timeDifference;
