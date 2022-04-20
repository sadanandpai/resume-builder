import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SkillPill = ({ value, onDelete }: { value: string; onDelete: (v: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: value,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="bg-custom-grey flex items-center pl-4 pr-2 py-2 rounded-full text-sm">
        <Image src="/icons/equals.svg" width={16} height={6} alt="close" className="cursor-grab" />
        <span className="ml-2">{value}</span>
        <button className="ml-auto" onClick={() => onDelete(value)}>
          <Image src="/icons/close.svg" width={15} height={15} alt="close" />
        </button>
      </div>
    </div>
  );
};

export default SkillPill;
