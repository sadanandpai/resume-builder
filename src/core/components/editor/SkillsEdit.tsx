import React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { Input as AntInput, Collapse } from 'antd';
import { useExp } from 'src/stores/data.store';
import { MarkDownField } from 'src/core/widgets/MarkdownField';
import { getIcon } from 'src/assets/icons';
import { AiFillDelete } from 'react-icons/ai';

const { Panel } = Collapse;

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

export function ExpEdit() {
  const companies = useExp((state: any) => state.companies);
  const [updateCompany, addCompany, deleteCompany] = useExp(
    (state: any) => [state.updateCompany, state.addCompany, state.deleteCompany],
    shallow
  );

  return (
    <>
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
      <button type="button" style={{ fontSize: '2rem' }} onClick={addCompany}>
        {getIcon('add')}
      </button>
    </>
  );
}
