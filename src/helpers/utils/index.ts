import type { Dayjs } from 'dayjs/index';
import dayjs from 'dayjs';

export const dateParser = (dateValue: string | Dayjs | null, outputFormat = 'MMM YYYY') => {
  if (dateValue === null) return;
  const dayjsDate = dayjs(dateValue);
  return dayjsDate.format(outputFormat);
};
