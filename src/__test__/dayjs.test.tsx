import dayjs from 'dayjs';
import { dateParser } from 'src/helpers/utils';

it('should test the dateParser util function', async () => {
  const dayjsDate = dayjs('12-03-1900');
  expect(dateParser('2016')).toBe('Jan 2016');
  expect(dateParser('01/01/2010')).toBe('Jan 2010');
  expect(dateParser(dayjsDate)).toBe('Dec 1900');
});
