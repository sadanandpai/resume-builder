import Image from 'next/image';

const SkillPill = ({ value, onDelete }: { value: string; onDelete: (v: string) => void }) => {
  return (
    <div className="bg-custom-grey flex items-center pl-4 pr-2 py-2 rounded-full text-sm">
      <Image src="/icons/equals.svg" width={16} height={6} alt="close" className="cursor-grab" />
      <span className="ml-2">{value}</span>
      <button className="ml-auto" onClick={() => onDelete(value)}>
        <Image src="/icons/close.svg" width={15} height={15} alt="close" />
      </button>
    </div>
  );
};

export default SkillPill;
