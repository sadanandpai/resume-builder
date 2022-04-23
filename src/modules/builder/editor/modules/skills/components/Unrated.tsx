import { Button } from '@mui/material';
import { useState } from 'react';
import { Item } from 'src/helpers/stores/skills';
import AddSkill from './AddSkill';
import SkillPill from '../atoms/SkillPill';
import DragContainer from 'src/common/components/DragContainer';

export default function Unrated({
  items,
  addItem,
  removeItem,
  setItems,
}: {
  items: Item[];
  addItem: ({ value, score }: { value: string; score: number }) => void;
  removeItem: (value: string) => void;
  setItems: (value: Item[]) => void;
}) {
  const [isNewEntry, setIsNewEntry] = useState(false);

  const toggleEntry = () => {
    setIsNewEntry(!isNewEntry);
  };

  const addHandler = (item: Item) => {
    addItem(item);
  };

  const deleteHandler = (value: string) => {
    removeItem(value);
  };

  const itemsElementArray = items.length ? (
    <div className="flex flex-col gap-2 mb-8">
      <DragContainer items={items} setItems={setItems}>
        {items.map((item) => (
          <SkillPill
            key={item.value}
            value={item.value}
            score={item.score}
            onDelete={deleteHandler}
          />
        ))}
      </DragContainer>
    </div>
  ) : null;

  const newItemElement = isNewEntry ? (
    <AddSkill addHandler={addHandler} cancelHandler={toggleEntry} items={items} hasScore={true} />
  ) : (
    <div>
      <Button variant="outlined" onClick={toggleEntry}>
        + Add more
      </Button>
    </div>
  );

  return (
    <>
      {itemsElementArray}
      {newItemElement}
    </>
  );
}
