import { Button } from '@mui/material';
import { useState } from 'react';
import AddSkill from '../atoms/AddSkill';
import SkillPill from '../atoms/SkillPill';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const Unrated = ({
  items,
  addItem,
  removeItem,
  setItems,
}: {
  items: string[];
  addItem: (v: string) => void;
  removeItem: (v: string) => void;
  setItems: (v: string[]) => void;
}) => {
  const [isNewEntry, setIsNewEntry] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SkillPill key={item} value={item} onDelete={deleteHandler} />
          ))}
        </SortableContext>
      </DndContext>
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <div>
      {languagesElement}
      {newLanguageElement}
    </div>
  );
};

export default Unrated;
