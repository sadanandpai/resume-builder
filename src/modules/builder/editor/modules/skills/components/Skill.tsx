import { Item } from 'src/stores/skills';
import AddSkill from './AddSkill';
import SkillPill from '../atoms/SkillPill';
import DragContainer from 'src/helpers/common/components/DragContainer';

export default function Skill({
  items,
  addItem,
  removeItem,
  hasScore,
  setItems,
}: {
  items: Item[];
  addItem: ({ name, score }: { name: string; score: number }) => void;
  removeItem: (name: string) => void;
  hasScore: boolean;
  setItems: (name: Item[]) => void;
}) {
  const addHandler = (item: Item) => {
    addItem(item);
  };

  const deleteHandler = (name: string) => {
    removeItem(name);
  };

  const itemsArrayEl = items.length ? (
    <div className="flex flex-col gap-2 mb-8">
      <DragContainer items={items} setItems={setItems}>
        {items.map((item) => (
          <SkillPill
            key={item.name}
            name={item.name}
            score={item.score}
            onDelete={deleteHandler}
            showScore={hasScore}
          />
        ))}
      </DragContainer>
    </div>
  ) : null;

  return (
    <>
      {itemsArrayEl}
      <AddSkill addHandler={addHandler} items={items} hasScore={hasScore} />
    </>
  );
}
