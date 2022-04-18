import { useState } from 'react';
import EditSectionContainer from 'src/common/components/EditSectionContainer';
import Unrated from './components/Unrated';

const SkillsLayout = () => {
  const [expanded, setExpanded] = useState(true);

  const clickHandler = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <EditSectionContainer title="Languages" expanded={expanded} clickHandler={clickHandler}>
        <>
          <Unrated />
        </>
      </EditSectionContainer>
    </>
  );
};

export default SkillsLayout;
