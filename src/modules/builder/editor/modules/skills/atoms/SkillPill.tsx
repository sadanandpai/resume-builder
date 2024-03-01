import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { useState } from 'react';

const animation = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { height: 0, padding: 0, opacity: 0, transition: { duration: 0.15 } },
};

const animationEditIcon = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { delay: 0.1 },
};

const SkillPill = ({
  index,
  name,
  level,
  onDelete,
  showLevel,
  onEdit,
}: {
  index: number;
  name: string;
  level: number;
  onDelete: (index: number) => void;
  showLevel: boolean;
  onEdit: ({ name, level, index }: { name: string; level: number; index: number }) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: name,
  });

  const [showEdit, setShowEdit] = useState(false);

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
        onMouseEnter={() => {
          setShowEdit(true);
        }}
        onMouseLeave={() => {
          setShowEdit(false);
        }}
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
        {showLevel && !showEdit && <span className="ml-2">{level}</span>}
        {showEdit && (
          <motion.button
            initial={animationEditIcon.initial}
            animate={animationEditIcon.animate}
            transition={animationEditIcon.transition}
            onClick={() => onEdit({ name, level, index })}
          >
            <Image src="/icons/edit.svg" width={16} height={16} alt="edit" />
          </motion.button>
        )}
        <button
          className="ml-2 min-w-max flex items-center deleteButton"
          onClick={() => onDelete(index)}
        >
          <Image src="/icons/close.svg" width={16} height={16} alt="close" />
        </button>
      </div>
    </motion.div>
  );
};

export default SkillPill;
