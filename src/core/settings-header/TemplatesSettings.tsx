import React from "react";
import styled from "styled-components";
import { useTemplates } from "src/stores/settings.store";
import Professional from "src/assets/images/professional.jpg";
import Legacy from "src/assets/images/legacy.jpg";

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

  .selected{
    border: solid 2px #1890ff;
  }
`;

export function TemplateSettings() {
  const templateIndex = useTemplates((state: any) => state.index);
  const setTemplate = useTemplates((state: any) => state.setTemplate);

  return (
    <TemplateWrapper>
      <TemplateThumbnail>
        <TemplateThumbnailImg src={Professional} alt="Professional" className={templateIndex === 0 ? 'selected' : ''} onClick={() => setTemplate(0)} />
      </TemplateThumbnail>
      <TemplateThumbnail>
        <TemplateThumbnailImg src={Legacy} alt="Legacy" className={templateIndex === 1 ? 'selected' : ''} onClick={() => setTemplate(1)} />
      </TemplateThumbnail>
    </TemplateWrapper>
  );
}
