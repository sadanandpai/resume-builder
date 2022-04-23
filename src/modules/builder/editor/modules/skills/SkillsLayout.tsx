import { useState } from 'react';
import EditSectionContainer from 'src/helpers/common/components/EditSectionContainer';
import { useLanguages } from 'src/stores/skills';
import Skill from './components/Skill';

const SkillsLayout = () => {
  const languages = useLanguages((state) => state.languages);
  const addLanguage = useLanguages((state) => state.addLanguage);
  const removeLanguage = useLanguages((state) => state.removeLanguage);
  const setLanguages = useLanguages((state) => state.setLanguages);

  const [expanded, setExpanded] = useState(true);

  const clickHandler = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <EditSectionContainer title="Languages" expanded={expanded} clickHandler={clickHandler}>
        <Skill
          items={languages}
          addItem={addLanguage}
          removeItem={removeLanguage}
          hasScore={true}
          setItems={setLanguages}
        />
      </EditSectionContainer>
    </>
  );
};

export default SkillsLayout;
