export default function AboutMe({ summary }: { summary: string }) {
  return <div className="flex justify-between text-[1em]">{summary}</div>;
}
