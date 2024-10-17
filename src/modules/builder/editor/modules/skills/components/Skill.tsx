import { ISkillItem } from '@/stores/skill.interface';
import AddSkill from './AddSkill';
import SkillPill from '../atoms/SkillPill';
import DragContainer from '@/helpers/common/components/DragContainer';
import { motion, AnimatePresence } from 'framer-motion';
import EditSkill from './EditSkill';
import { useState } from 'react';

const animation = {
  initial: { height: '1px' },
  animate: { height: '100%' },
};

export default function Skill({
  items,
  addItem,
  removeItem,
  editItem,
  setItems,
  hasLevel,
}: {
  items: ISkillItem[];
  addItem: ({ name, level }: ISkillItem) => void;
  editItem: ({ name, level, index }: { name: string; level: number; index: number }) => void;
  removeItem: (index: number) => void;
  setItems: (name: ISkillItem[]) => void;
  hasLevel: boolean;
}) {
  const [editMode, setEditMode] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level: number;
    index: number;
  }>();
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
                onEdit={(data: { name: string; level: number; index: number }) => {
                  setEditMode(true);
                  setSelectedSkill(data);
                }}
              />
            ))}
          </AnimatePresence>
        </DragContainer>
      </motion.div>

      {editMode && selectedSkill && (
        <EditSkill
          editHandler={editItem}
          items={items}
          hasLevel={hasLevel}
          skillData={selectedSkill}
          onCancel={() => {
            setEditMode(false);
          }}
        />
      )}
      <AddSkill addHandler={addItem} items={items} hasLevel={hasLevel} />
    </>
  );
}
