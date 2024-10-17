import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';

export const Objective = ({ objective }: { objective: string }) => {
  return <HTMLRenderer htmlString={objective} />;
};
