import { useState } from 'react';
import EditSectionContainer from 'src/common/components/EditSectionContainer';
import { useLanguages } from 'src/helpers/stores/skills';
import Unrated from './components/Unrated';

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
        <Unrated
          items={languages}
          addItem={addLanguage}
          removeItem={removeLanguage}
          setItems={setLanguages}
        />
      </EditSectionContainer>
    </>
  );
};

export default SkillsLayout;
