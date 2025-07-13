import { ReactNode } from 'react';

export const SectionText = ({ children }: { children: ReactNode | string }) => {
  return <div className="text-sm py-1.5">{children}</div>;
};
