import { Item } from 'src/stores/skill.interface';
import AddSkill from './AddSkill';
import SkillPill from '../atoms/SkillPill';
import DragContainer from 'src/helpers/common/components/DragContainer';

export default function Skill({
  items,
  addItem,
  removeItem,
  setItems,
  hasLevel,
}: {
  items: Item[];
  addItem: ({ name, level }: Item) => void;
  removeItem: (index: number) => void;
  setItems: (name: Item[]) => void;
  hasLevel: boolean;
}) {
  const addHandler = (item: Item) => {
    addItem(item);
  };

  const deleteHandler = (index: number) => {
    removeItem(index);
  };

  const itemsArrayEl = items.length ? (
    <div className="flex flex-col gap-2 mb-8">
      <DragContainer items={items} setItems={setItems}>
        {items.map((item, index) => (
          <SkillPill
            key={item.name}
            index={index}
            name={item.name}
            level={item.level}
            onDelete={deleteHandler}
            showLevel={hasLevel}
          />
        ))}
      </DragContainer>
    </div>
  ) : null;

  return (
    <>
      {itemsArrayEl}
      <AddSkill addHandler={addHandler} items={items} hasLevel={hasLevel} />
    </>
  );
}
