import React from 'react';
import { getIcon } from 'src/styles/icons';
import styled, { css } from 'styled-components';

const SectionContainer = styled.section(({ style }: any) => [
  css`
    padding: 10px;

    .heading {
      display: flex;
      align-items: center;
      &__icon {
        margin-right: 4px;
        display: flex;
        align-items: center;
        svg {
          fill: ${(props) => props.theme.primaryColor};
        }
      }
      &__text {
        margin: 0;
        color: ${(props) => props.theme.primaryColor};
        font-weight: 700;
        font-size: 10px;
        margin-right: 10px;
      }

      hr {
        flex: 1;
        opacity: 0.1;
        margin-top: 8px;
        border: 0.1px solid rgba(0, 0, 0, 0.6);
      }
    }

    .content {
      padding: 8px 0;
    }
  `,
  { ...style },
]);

export default function Section({ style = {}, title = '', icon = '', children }: any) {
  if (!title) return null;

  return (
    <SectionContainer style={style}>
      {(title || icon) && (
        <div className="heading">
          {icon && <div className="heading__icon">{getIcon(icon)}</div>}
          {title && <h3 className="heading__text">{title}</h3>}
          <hr />
        </div>
      )}
      {children && <div className="content">{children}</div>}
    </SectionContainer>
  );
}
