import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Fragment } from 'react';

const animation = {
  exit: {
    height: '0',
    paddingTop: 0,
    paddingBottom: 0,
    opacity: 0,
  },
};

const MoveEditSection = ({
  title,
  expanded,
  clickHandler,
  children,
  length,
  index,
  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  title: string;
  expanded: boolean;
  clickHandler: () => void;
  children: JSX.Element;
  length: number;
  index: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (index: number) => void;
}) => {
  return (
    <div>
      <div
        className="bg-resume-100 h-12 w-full rounded-t-md shadow-level-4px-0.25 relative flex items-center justify-between pl-4 pr-5 text-resume-800 font-bold text-lg select-none cursor-pointer z-10"
        onClick={clickHandler}
      >
        <span className="w-[15rem] overflow-hidden text-ellipsis whitespace-nowrap" title={title}>
          {title}
        </span>
        <div className="flex gap-3">
          {length > 1 && (
            <Fragment>
              <Image
                src={'/icons/up-arrow.svg'}
                width={16}
                height={16}
                alt="up-arrow"
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  onMoveUp(index);
                }}
              />
              <Image
                src={'/icons/down-arrow.svg'}
                width={16}
                height={16}
                alt="down-arrow"
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  onMoveDown(index);
                }}
              />
            </Fragment>
          )}
          <Image
            src={'/icons/delete.svg'}
            width={14}
            height={18}
            alt="delete"
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              onDelete(index);
            }}
          />
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={`bg-resume-10 relative rounded-b-md px-4 py-6 shadow-level-4px-0.25 overflow-hidden`}
            exit={animation.exit}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoveEditSection;
