import React, { useState } from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { Input as AntInput, Collapse, Switch } from 'antd';
import { useExp } from 'src/stores/data.store';
import { MarkDownField } from 'src/core/widgets/MarkdownField';
import { getIcon } from 'src/assets/icons';
import { AiFillDelete } from 'react-icons/ai';

import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { FlexVC } from 'src/assets/styles/styles';

const { Panel } = Collapse;

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

const Input = styled(AntInput)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
  margin-bottom: 5px;
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

const SortableItem = SortableElement(({ company }) => (
  <Wrapper>
    <DragHandle />
    <p>{company.name}</p>
  </Wrapper>
));

const SortableList = SortableContainer(({ companies }) => (
  <UL>
    {companies.map((company, index) => (
      <SortableItem key={index} index={index} company={company} />
    ))}
  </UL>
));

export function ExpEdit() {
  const companies = useExp((state: any) => state.companies);
  const [updateCompany, addCompany, deleteCompany, changeOrder] = useExp(
    (state: any) => [state.updateCompany, state.addCompany, state.deleteCompany, state.changeOrder],
    shallow
  );

  const [isReorder, setIsReorder] = useState(false);

  const onChange = () => {
    setIsReorder((state) => !state);
  };

  return (
    <>
      <Switch checked={isReorder} onChange={onChange} />
      {isReorder ? (
        <SortableList companies={companies} onSortEnd={changeOrder} useDragHandle />
      ) : (
        <Collapse>
          {companies.map((company, index) => (
            <Panel
              header={company.name}
              key={index}
              extra={<AiFillDelete onClick={() => deleteCompany(index)} />}
            >
              <Input
                type="text"
                value={company.name}
                onChange={(event) => updateCompany(index, 'name', event.target.value)}
              />
              <Input
                type="text"
                value={company.role}
                onChange={(event) => updateCompany(index, 'role', event.target.value)}
              />
              <Input
                type="text"
                value={company.from}
                onChange={(event) => updateCompany(index, 'from', event.target.value)}
              />
              <Input
                type="text"
                value={company.to}
                onChange={(event) => updateCompany(index, 'to', event.target.value)}
              />
              <MarkDownField
                value={company.description}
                setValue={(text) => updateCompany(index, 'description', text)}
              />
            </Panel>
          ))}
        </Collapse>
      )}
      <button type="button" style={{ fontSize: '2rem' }} onClick={addCompany}>
        {getIcon('add')}
      </button>
    </>
  );
}
