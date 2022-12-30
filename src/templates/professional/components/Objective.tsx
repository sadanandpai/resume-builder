import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';

export const Objective = ({ objective }: { objective: string }) => {
  return <HTMLRenderer htmlString={objective} />;
};
