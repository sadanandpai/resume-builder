import { Dayjs } from 'dayjs/index';

export const sum = (a: number, b: number): number => {
  return a + b;
};

export const dateParser = (dateValue: string | Dayjs | null, outputFormat = 'MMM YYYY') => {
  if (dateValue === null) return;
  return typeof dateValue === 'object' ? dateValue.format(outputFormat) : dateValue;
};
