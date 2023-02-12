import { AnimatePresence, motion } from 'framer-motion';

import Image from 'next/image';

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
  clickHandler,
  isEnabled,
  setIsEnabled,
  children,
}: {
  title: string;
  expanded: boolean;
  clickHandler: () => void;
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
  children: JSX.Element;
}) => {
  const toggleVisibility = (e: React.MouseEvent) => {
    setIsEnabled(!isEnabled);
    e.stopPropagation();
  };

  return (
    <div className="shadow-sm rounded-lg">
      <div
        className={`bg-resume-100 shadow-sm h-12 w-full ${
          expanded ? `rounded-t-lg` : `rounded-lg`
        } relative flex items-center justify-between px-4 text-resume-800 font-bold text-lg select-none cursor-pointer z-10`}
        onClick={clickHandler}
      >
        <span>{title}</span>
        <Image
          src={isEnabled ? '/icons/eye.svg' : '/icons/eye-slash.svg'}
          alt="eye"
          height="16"
          width="21"
          onClick={toggleVisibility}
        />
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={`bg-resume-10 shadow-sm relative rounded-b-lg px-4 py-6 overflow-hidden ${
              !isEnabled && nonEditableStyle
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
