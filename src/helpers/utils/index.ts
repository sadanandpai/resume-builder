import type { Dayjs } from 'dayjs/index';
import dayjs from 'dayjs';
import { MutableRefObject } from 'react';

export const dateParser = (dateValue: string | Dayjs | null, outputFormat = 'MMM YYYY') => {
  if (dateValue === null) return;
  const dayjsDate = dayjs(dateValue);
  return dayjsDate.format(outputFormat);
};

export const scrollToElement = (ref: MutableRefObject<HTMLDivElement | null>) => {
  ref.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest',
  });
};
