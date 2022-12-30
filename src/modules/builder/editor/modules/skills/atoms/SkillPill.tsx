import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

const animation = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { height: 0, padding: 0, opacity: 0, transition: { duration: 0.15 } },
};

const SkillPill = ({
  index,
  name,
  level,
  onDelete,
  showLevel,
}: {
  index: number;
  name: string;
  level?: number;
  onDelete: (index: number) => void;
  showLevel: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: name,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      key={name}
    >
      <div
        className="bg-custom-grey flex items-center pl-4 pr-2 py-2 rounded-full text-sm cursor-default"
        data-testid="skill-pill"
        style={style}
        ref={setNodeRef}
        {...attributes}
      >
        <div className="flex items-center min-w-max" {...listeners}>
          <Image
            src="/icons/equals.svg"
            width={16}
            height={6}
            alt="close"
            className="cursor-grab"
          />
        </div>
        <span className="flex-1 ml-2 cursor-grab" data-testid="skill-title" {...listeners}>
          {name}
        </span>
        {showLevel && <span className="ml-2">{level}</span>}
        <button className="ml-2 min-w-max flex items-center" onClick={() => onDelete(index)}>
          <Image src="/icons/close.svg" width={16} height={16} alt="close" />
        </button>
      </div>
    </motion.div>
  );
};

export default SkillPill;
