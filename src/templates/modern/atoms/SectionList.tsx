import { ReactNode } from 'react';

export const SectionList = ({ children }: { children: ReactNode | string }) => {
  return <div className="text-xs mt-0.5">{children}</div>;
};
