import { Button } from '@mui/material';
import { useState } from 'react';
import AddSkill from '../atoms/AddSkill';
import SkillPill from '../atoms/SkillPill';
import DragContainer from 'src/common/components/DragContainer';

export default function Unrated({
  items,
  addItem,
  removeItem,
  setItems,
}: {
  items: string[];
  addItem: (v: string) => void;
  removeItem: (v: string) => void;
  setItems: (v: string[]) => void;
}) {
  const [isNewEntry, setIsNewEntry] = useState(false);

  const toggleEntry = () => {
    setIsNewEntry(!isNewEntry);
  };

  const addHandler = (value: string) => {
    addItem(value);
  };

  const deleteHandler = (lang: string) => {
    removeItem(lang);
  };

  const languagesElement = items.length ? (
    <div className="flex flex-col gap-2 mb-8">
      <DragContainer items={items} setItems={setItems}>
        {items.map((item) => (
          <SkillPill key={item} value={item} onDelete={deleteHandler} />
        ))}
      </DragContainer>
    </div>
  ) : null;

  const newLanguageElement = isNewEntry ? (
    <AddSkill addHandler={addHandler} cancelHandler={toggleEntry} items={items} />
  ) : (
    <div>
      <Button variant="outlined" onClick={toggleEntry}>
        + Add more
      </Button>
    </div>
  );

  return (
    <>
      {languagesElement}
      {newLanguageElement}
    </>
  );
}
