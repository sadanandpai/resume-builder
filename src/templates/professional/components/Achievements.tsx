import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';

export default function Achievements({ data }: { data: string }) {
  return (
    <div>
      <HTMLRenderer htmlString={data} />
    </div>
  );
}
