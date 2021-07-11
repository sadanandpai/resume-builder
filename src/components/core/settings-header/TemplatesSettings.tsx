import React, { useState } from "react";
import { Popover, Button } from "antd";
import styled from "styled-components";
import { useTemplates } from "../../stores/settings.store";
import Professional from "../../assets/professional.jpg";
import Legacy from "../../assets/legacy.jpg";

const TemplateRadio = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
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

  ${TemplateRadio}:checked ~ ${TemplateThumbnailImg} {
    border: solid 2px #1890ff;
  }
`;

const TemplateWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 1rem;
`;

export function TemplateSettings() {
  const setTemplate = useTemplates((state: any) => state.setTemplate);

  const content = (
    <div>
      <Button onClick={() => setTemplate(0)}>0</Button>
      <Button onClick={() => setTemplate(1)}>1</Button>
    </div>
  );

  return (
    <TemplateWrapper>
      <TemplateThumbnail>
        <TemplateRadio type="radio" id="" name="template" checked={true} />

        <TemplateThumbnailImg src={Professional} alt="Professional" />
        {/* <span>Professional</span> */}
      </TemplateThumbnail>
      <TemplateThumbnail>
        <TemplateRadio type="radio" id="" name="template" />

        <TemplateThumbnailImg src={Legacy} alt="Legacy" />
        {/* <span>Legacy</span> */}
      </TemplateThumbnail>
    </TemplateWrapper>
  );
}
