import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';

export default function AboutMe({ summary }: { summary: string }) {
  return (
    <div className="flex justify-between text-[1em]">
      <HTMLRenderer htmlString={summary} />
    </div>
  );
}
