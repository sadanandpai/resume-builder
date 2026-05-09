import { dateParser } from '@/helpers/utils';

export const formatDateRange = (
  start: string | null | undefined,
  end: string | null | undefined,
  isCurrent?: boolean
) => {
  const s = start ? dateParser(start) : '';
  const e = isCurrent ? 'Present' : end ? dateParser(end) : '';
  if (s && e) return `${s} – ${e}`;
  return s || e || '';
};
