import { ChangeEvent, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

const AddSkill = ({
  addHandler,
  cancelHandler,
  items,
}: {
  addHandler: (v: string) => void;
  cancelHandler: () => void;
  items: string[];
}) => {
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setErrorText('');
  };

  const doneHandler = (value: string) => {
    if (!items.includes(value)) {
      addHandler(value);
      setValue('');
    } else {
      setErrorText('Duplicate value');
    }
  };

  useEffect(() => {
    if (value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);

  return (
    <form>
      <TextField
        label="Skill"
        variant="filled"
        value={value}
        fullWidth
        required
        error={!!errorText}
        helperText={errorText}
        onChange={changeHandler}
      />
      <div className="flex gap-2 mt-3">
        <Button
          variant="outlined"
          onClick={() => doneHandler(value)}
          className="text-resume-900"
          disabled={disabled}
        >
          Done
        </Button>
        <Button variant="text" onClick={cancelHandler} className="text-resume-900">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddSkill;
