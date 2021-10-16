import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Input as AntInput, Slider } from 'antd';
import { useSkills } from 'src/stores/data.store';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { getIcon } from 'src/assets/icons';
import shallow from 'zustand/shallow';
import { Flex } from 'src/assets/styles/styles';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`;

const Handle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  font-size: 1.5rem;
  background-color: white;
`;

const Input = styled(AntInput)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
`;

const DragHandle = SortableHandle(() => <Handle>{getIcon('drag')}</Handle>);

const SortableItem = SortableElement(
  ({ ind, name, rating, onNameChange, onRatingChange, onDelete }) => (
    <Wrapper>
      <Flex>
        <DragHandle />
        <Input value={name} onChange={(event) => onNameChange(event, ind)} />
        <Handle onClick={(event) => onDelete(event, ind)}>{getIcon('delete')}</Handle>
      </Flex>
      <Slider
        defaultValue={rating}
        min={1}
        max={5}
        onChange={(event) => onRatingChange(event, ind)}
      />
    </Wrapper>
  )
);

const SortableList = SortableContainer(({ items, onNameChange, onRatingChange, onDelete }) => (
  <div>
    {items.map(({ name, rating }, index) => (
      <SortableItem
        key={index}
        index={index}
        ind={index}
        name={name}
        rating={rating}
        onNameChange={onNameChange}
        onRatingChange={onRatingChange}
        onDelete={onDelete}
      />
    ))}
  </div>
));

export function RatedEdit() {
  const [technical, setTechnical] = useSkills(
    (state: any) => [state.technical, state.setTechnical],
    shallow
  );

  const onNameChange = (event, index) => {
    const items = [...technical.items];
    items[index].name = event.target.value;
    setTechnical(items);
  };

  const onRatingChange = (event, index) => {
    const items = [...technical.items];
    items[index].rating = event;
    setTechnical(items);
  };

  const onDelete = (event, index) => {
    const items = technical.items.filter((_, ind) => index !== ind);
    setTechnical(items);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const items = arrayMoveImmutable(technical.items, oldIndex, newIndex);
    setTechnical(items);
  };

  const addNewItem = useCallback(() => {
    // if still there are empty names
    if (technical.items.some((item) => item.name === '')) return;

    const items = [...technical.items];
    items.push({ name: '', rating: 1 });
    setTechnical(items);
  }, [technical, setTechnical]);

  return (
    <>
      <SortableList
        items={technical.items}
        onSortEnd={onSortEnd}
        onNameChange={onNameChange}
        onRatingChange={onRatingChange}
        onDelete={onDelete}
        useDragHandle
      />
      <button type="button" style={{ fontSize: '2rem' }} onClick={addNewItem}>
        {getIcon('add')}
      </button>
    </>
  );
}
