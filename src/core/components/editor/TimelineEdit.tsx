import React, { useState } from 'react';
import styled from '@emotion/styled';
import { MarkDownField } from 'src/core/widgets/MarkdownField';
import { getIcon } from 'src/styles/icons';
import { AiFillDelete } from 'react-icons/ai';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { FlexVC } from 'src/styles/styles';
import { useTheme } from '@emotion/react';

const UL = styled.div`
  margin: 0;
  background: white;
`;

const Wrapper = styled(FlexVC)`
  padding: 5px;
  border-bottom: 1px solid black;
  height: 47.2px;

  p {
    font-size: 14px;
    padding-top: 2px;
  }
`;

const Input = styled(TextField)`
  max-width: 100%;
  background: white;
  color: #fff;
  margin-bottom: 5px;
  width: 100%;
`;

const Handle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  font-size: 1.2rem;
  background-color: white;
`;

const DragHandle = SortableHandle(() => <Handle>{getIcon('drag')}</Handle>);

const SortableItem = SortableElement(({ item, identifier }) => (
  <Wrapper>
    <DragHandle />
    <p>{item?.[identifier]}</p>
  </Wrapper>
));

const SortableList = SortableContainer(({ items, identifier }) => (
  <UL>
    {items.map((item, index) => (
      <SortableItem key={index} index={index} item={item} identifier={identifier} />
    ))}
  </UL>
));

export function TimelineEdit({ METADATA, identifier, itemList, operations }: any) {
  const [isReorder, setIsReorder] = useState(false);
  const theme = useTheme();

  const onChange = () => {
    setIsReorder((state) => !state);
  };

  const panelList = (
    <Collapse in={true}>
      {itemList.map((item, index) => (
        <div key={index}>
          {METADATA.map((metadata) =>
            metadata.type === 'Input' ? (
              <Input
                label={metadata.label}
                variant="filled"
                key={metadata.label}
                value={item[metadata.value]}
                onChange={(event) => operations.update(index, metadata.value, event.target.value)}
              />
            ) : (
              <MarkDownField
                key={metadata.label}
                value={item[metadata.value]}
                setValue={(text) => operations.update(index, metadata.value, text)}
              />
            )
          )}
        </div>
      ))}
    </Collapse>
  );

  const sortableList = (
    <SortableList
      items={itemList}
      identifier={identifier}
      onSortEnd={operations.changeOrder}
      useDragHandle
    />
  );

  return (
    <>
      <Switch checked={isReorder} onChange={onChange} />
      {isReorder ? sortableList : panelList}
      <button type="button" style={{ fontSize: '2rem' }} onClick={operations.add}>
        {getIcon('add')}
      </button>
    </>
  );
}
