import styled from "styled-components";

interface StylesProps {
  jc?: string;
  ai?: string;
  rGap?: string;
  cGap?: string;
}

export const Flex = styled.div`
  display: flex;
  justify-content: ${(props: StylesProps) => props.jc};
  align-items: ${(props: StylesProps) => props.ai};
  row-gap: ${(props: StylesProps) => props.rGap};
  column-gap: ${(props: StylesProps) => props.cGap};
`;

export const FlexCol = styled(Flex)`
  flex-direction: column;
`;

export const FlexHC = styled(Flex)`
  justify-content: center;
`;

export const FlexVC = styled(Flex)`
  align-items: center;
`;

export const FlexHVC = styled(Flex)`
  justify-content: center;
  align-items: center;
`;
