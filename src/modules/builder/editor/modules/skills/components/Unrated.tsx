import { Button } from '@mui/material';
import { useState } from 'react';
import { useLanguages } from 'src/helpers/stores/skills';
import AddSkill from '../atoms/AddSkill';
import SkillPill from '../atoms/SkillPill';

const Unrated = () => {
  const languages = useLanguages((state) => [...state.languages.values()]);
  const addLanguage = useLanguages((state) => state.addLanguage);
  const removeLanguage = useLanguages((state) => state.removeLanguage);
  const [isNewEntry, setIsNewEntry] = useState(false);

  const toggleEntry = () => {
    setIsNewEntry(!isNewEntry);
  };

  const addHandler = (value: string) => {
    addLanguage(value);
  };

  const deleteHandler = (lang: string) => {
    removeLanguage(lang);
  };

  const languagesElement = languages.map((language) => (
    <SkillPill key={language} value={language} onDelete={deleteHandler} />
  ));

  const newLanguageElement = isNewEntry ? (
    <AddSkill addHandler={addHandler} cancelHandler={toggleEntry} languages={languages} />
  ) : (
    <div className="mt-8">
      <Button variant="outlined" onClick={toggleEntry}>
        + Add more
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      {languagesElement}
      {newLanguageElement}
    </div>
  );
};

export default Unrated;
