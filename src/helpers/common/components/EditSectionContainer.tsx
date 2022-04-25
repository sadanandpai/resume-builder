import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const animation = {
  exit: {
    height: '0',
    paddingTop: 0,
    paddingBottom: 0,
    opacity: 0,
  },
};

const nonEditableStyle =
  "opacity-60 after:content-[''] after:absolute after:h-full after:w-full after:top-0 after:left-0 after:cursor-not-allowed";

const EditSectionContainer = ({
  title,
  expanded,
  children,
  clickHandler,
}: {
  title: string;
  expanded: boolean;
  children: JSX.Element;
  clickHandler: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = (e: React.MouseEvent) => {
    setIsVisible(!isVisible);
    e.stopPropagation();
  };

  return (
    <div>
      <div
        className="bg-resume-100 h-12 w-full rounded-t-md shadow-level-4px-0.25 relative flex items-center justify-between px-4 text-resume-800 font-bold text-lg select-none cursor-pointer z-10"
        onClick={clickHandler}
      >
        <span>{title}</span>
        <Image
          src={isVisible ? '/icons/eye.svg' : '/icons/eye-slash.svg'}
          alt="eye"
          height="16px"
          width="21px"
          onClick={toggleVisibility}
        />
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={`bg-resume-10 relative rounded-b-md px-4 py-6 shadow-level-4px-0.25 overflow-hidden ${
              !isVisible && nonEditableStyle
            }`}
            exit={animation.exit}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditSectionContainer;
