export const SectionTitle = ({ label, textSize }: { label: string; textSize?: string }) => {
  return <p className={` ${textSize == 'md' ? 'text-md' : 'text-lg'} font-normal`}>{label}</p>;
};
