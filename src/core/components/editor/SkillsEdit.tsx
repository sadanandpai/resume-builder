import React, { useState } from 'react';
import styled from 'styled-components';
import { Input as AntInput, Slider } from 'antd';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { getIcon } from 'src/styles/icons';
import { Flex } from 'src/styles/styles';

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
  ({ type, hasRating, focusIndex, setFocusIndex, ind, name, level, updateSkill, deleteSkill }) => (
    <Wrapper>
      <Flex>
        <DragHandle />
        <Input
          value={name}
          autoFocus={focusIndex === ind}
          onChange={(event) => {
            setFocusIndex(ind);
            updateSkill(type, ind, 'name', event.target.value);
          }}
        />
        <Handle onClick={() => deleteSkill(type, ind)}>{getIcon('delete')}</Handle>
      </Flex>
      {hasRating && (
        <Slider
          defaultValue={level}
          min={1}
          max={5}
          step={0.5}
          onChange={(event) => updateSkill(type, ind, 'level', event)}
        />
      )}
    </Wrapper>
  )
);

const SortableList = SortableContainer(
  ({ type, focusIndex, setFocusIndex, hasRating, skills, updateSkill, deleteSkill }) => (
    <div>
      {skills?.map(({ name, level }, index) => (
        <SortableItem
          key={name}
          index={index}
          ind={index}
          type={type}
          hasRating={hasRating}
          focusIndex={focusIndex}
          setFocusIndex={setFocusIndex}
          name={name}
          level={level}
          updateSkill={updateSkill}
          deleteSkill={deleteSkill}
        />
      ))}
    </div>
  )
);

export function SkillsEdit({
  type,
  hasRating,
  skills,
  addSkill,
  updateSkill,
  deleteSkill,
  changeOrder,
}: any) {
  const [focusIndex, setFocusIndex] = useState(-1);

  return (
    <>
      <SortableList
        focusIndex={focusIndex}
        setFocusIndex={setFocusIndex}
        type={type}
        hasRating={hasRating}
        skills={skills}
        onSortEnd={({ oldIndex, newIndex }) => changeOrder(type, oldIndex, newIndex)}
        updateSkill={updateSkill}
        deleteSkill={deleteSkill}
        useDragHandle
      />
      <button type="button" style={{ fontSize: '1.5rem' }} onClick={() => addSkill(type)}>
        {getIcon('add')}
      </button>
    </>
  );
}
