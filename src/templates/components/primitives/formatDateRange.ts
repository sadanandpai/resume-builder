import dayjs from 'dayjs';
import type { ResumeDate } from '../types';

export function formatDate(value: ResumeDate): string {
  if (!value) return '';
  const date = dayjs(value);
  return date.isValid() ? date.format('MMM YYYY') : '';
}
export function formatDateRange(start: ResumeDate, end: ResumeDate, isCurrent = false) {
  const s = formatDate(start);
  const e = isCurrent ? 'Present' : formatDate(end);
  return [s, e].filter(Boolean).join(' – ');
}
