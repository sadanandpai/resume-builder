import Image from 'next/image';
import { motion } from 'framer-motion';

const animation = {
  initial: { x: 25, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

interface props {
  section: {
    title: string;
    component: () => JSX.Element;
  };
  onLinkClick: (link: string) => void;
}

const EditSection = ({ section, onLinkClick }: props) => {
  return (
    <motion.div initial={animation.initial} animate={animation.animate}>
      <div className="flex items-center mb-6 mt-4">
        <a className="pr-2 mr-2 cursor-pointer" onClick={() => onLinkClick('')}>
          <Image src="/icons/left-arrow.svg" alt="back" width={8} height={12} />
        </a>
        <span className="text-2xl font-bold">{section.title}</span>
      </div>
      <section.component />
    </motion.div>
  );
};

export default EditSection;
