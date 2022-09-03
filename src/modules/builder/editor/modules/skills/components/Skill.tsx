import { ISkillItem } from 'src/stores/skill.interface';
import AddSkill from './AddSkill';
import SkillPill from '../atoms/SkillPill';
import DragContainer from 'src/helpers/common/components/DragContainer';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

const animation = {
  initial: { height: '1px' },
  animate: { height: '100%' },
};

export default function Skill({
  items,
  addItem,
  removeItem,
  setItems,
  hasLevel,
}: {
  items: ISkillItem[];
  addItem: ({ name, level }: ISkillItem) => void;
  removeItem: (index: number) => void;
  setItems: (name: ISkillItem[]) => void;
  hasLevel: boolean;
}) {
  return (
    <>
      <motion.div
        className="flex flex-col gap-2 mb-8 empty:mb-0"
        initial={animation.initial}
        animate={animation.animate}
      >
        <DragContainer items={items} setItems={setItems}>
          <AnimatePresence>
            {items.map((item, index) => (
              <SkillPill
                key={item.name}
                index={index}
                name={item.name}
                level={item.level}
                onDelete={removeItem}
                showLevel={hasLevel}
              />
            ))}
          </AnimatePresence>
        </DragContainer>
      </motion.div>
      <AddSkill addHandler={addItem} items={items} hasLevel={hasLevel} />
    </>
  );
}
