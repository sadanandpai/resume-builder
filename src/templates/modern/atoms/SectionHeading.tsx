export const SectionHeading = ({ title }: { title: string }) => {
  return (
    <div className="relative mb-2 text-base font-medium before:content-[''] before:w-full before:border-b-4 before:border-[#e5e7eb] before:absolute before:-bottom-0.5">
      {title}
    </div>
  );
};
