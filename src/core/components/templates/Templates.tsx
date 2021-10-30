import React from 'react';
import styled from 'styled-components';
import { templates, useTemplates, templatesSrc, templatesName } from 'src/stores/settings.store';

const TemplateWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 1rem;
`;

const TemplateThumbnailImg = styled.img`
  max-width: 100%;
  object-fit: cover;
  height: auto;
  border: solid 2px transparent;
`;

const TemplateThumbnail = styled.label`
  width: 169px;
  height: 240px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 0.3s;

  .selected {
    border: solid 2px #1890ff;
  }
`;

export function Templates() {
  const templateIndex = useTemplates((state: any) => state.index);
  const setTemplate = useTemplates((state: any) => state.setTemplate);

  return (
    <TemplateWrapper>
      {templates.map((_: any, ind: number) => (
        <TemplateThumbnail key={templatesName[ind]}>
          <TemplateThumbnailImg
            src={templatesSrc[ind].src}
            alt="Professional"
            className={templateIndex === ind ? 'selected' : ''}
            onClick={() => setTemplate(ind)}
          />
        </TemplateThumbnail>
      ))}
    </TemplateWrapper>
  );
}
