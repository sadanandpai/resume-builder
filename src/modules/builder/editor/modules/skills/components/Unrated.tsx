import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useLanguages } from 'src/helpers/stores/skills';
import SkillPill from '../atoms/SkillPill';

const Unrated = () => {
  const languages = useLanguages((state) => [...state.languages.values()]);
  const addLanguage = useLanguages((state) => state.addLanguage);
  const removeLanguage = useLanguages((state) => state.removeLanguage);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [value, setValue] = useState('');

  const addMoreHandler = () => {
    setIsNewEntry(!isNewEntry);
  };

  const addHandler = () => {
    addLanguage(value);
  };

  const deleteHandler = (lang: string) => {
    removeLanguage(lang);
  };

  return (
    <div className="flex flex-col gap-2">
      {languages.map((language) => (
        <SkillPill key={language} value={language} onDelete={deleteHandler} />
      ))}

      {isNewEntry ? (
        <>
          <TextField
            label="Skill"
            variant="filled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-4"
          />
          <div className="flex gap-2">
            <Button variant="outlined" onClick={addHandler} className="text-resume-900">
              Done
            </Button>
            <Button variant="outlined" onClick={addMoreHandler} className="text-resume-900">
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <Button variant="outlined" onClick={addMoreHandler} className="mt-4">
          + Add more
        </Button>
      )}
    </div>
  );
};

export default Unrated;
