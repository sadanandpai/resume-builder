import { ChangeEvent, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import SliderValue from '../atoms/SliderValue';

const AddSkill = ({
  addHandler,
  cancelHandler,
  items,
  hasScore = false,
}: {
  addHandler: ({ value, score }: { value: string; score: number }) => void;
  cancelHandler: () => void;
  items: { value: string; score: number }[];
  hasScore: boolean;
}) => {
  const [value, setValue] = useState('');
  const [score, setScore] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setErrorText('');
  };

  const doneHandler = ({ value, score }: { value: string; score: number }) => {
    if (items.find((item) => item.value === value)) {
      setErrorText('Duplicate value');
    } else {
      addHandler({ value, score });
      setValue('');
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
        autoComplete="off"
      />
      {hasScore && <SliderValue score={score} setScore={setScore} />}
      <div className="flex gap-2 mt-3">
        <Button
          variant="outlined"
          onClick={() => doneHandler({ value, score })}
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
