import Image from 'next/image';
import { motion } from 'framer-motion';

const animation = {
  initial: { x: 25, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

interface IEditSection {
  section: {
    title: string;
    component: () => JSX.Element;
  };
  onLinkClick: (link: string) => void;
}

const EditSection = ({ section, onLinkClick }: IEditSection) => {
  return (
    <motion.div initial={animation.initial} animate={animation.animate}>
      <div>
        <a className="flex items-center mb-6 mt-4 cursor-pointer" onClick={() => onLinkClick('')}>
          <Image src="/icons/left-arrow.svg" alt="back" width={12} height={16} />
          <span className="pl-2 ml-2 text-2xl font-bold">{section.title}</span>
        </a>
      </div>
      <section.component />
    </motion.div>
  );
};

export default EditSection;
