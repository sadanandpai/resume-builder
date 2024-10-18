import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';

export default function Involvement({ data }: { data: string }) {
  return (
    <div>
      <HTMLRenderer htmlString={data} />
    </div>
  );
}
