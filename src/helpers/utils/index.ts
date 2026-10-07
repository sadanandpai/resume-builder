import { MutableRefObject } from 'react';

export const scrollToElement = (ref: MutableRefObject<HTMLDivElement | null>) => {
  ref.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest',
  });
};
