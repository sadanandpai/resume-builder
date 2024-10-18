import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import SliderValue from '../atoms/SliderValue';
import { OutlinedButton, TextButton } from 'src/helpers/common/atoms/Buttons';
import { ISkillItem } from 'src/stores/skill.interface';

const EditSkill = ({
  editHandler,
  items,
  hasLevel = false,
  skillData,
  onCancel,
}: {
  editHandler: ({ name, level, index }: { name: string; level: number; index: number }) => void;
  items: ISkillItem[];
  hasLevel: boolean;
  skillData: { name: string; level: number; index: number };
  onCancel: () => void;
}) => {
  const [name, setName] = useState(skillData.name);
  const [level, setLevel] = useState(skillData.level);
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState('');
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setName(skillData.name);
    setLevel(skillData.level);
  }, [skillData]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrorText('');
  };

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    doneHandler();
  };

  const doneHandler = () => {
    const trimmedText = name.trim();
    const trimmedLowerText = trimmedText.toLowerCase();

    if (
      items.find((item) => item.name.toLowerCase() === trimmedLowerText) &&
      items[skillData.index].name !== name
    ) {
      setErrorText('Duplicate entry');
    } else {
      setName('');
      setErrorText('');
      editHandler({ name: trimmedText, level, index: skillData.index });
      onCancel();
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (name.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name]);

  return (
    <form className="mb-4" onSubmit={submitHandler}>
      <TextField
        label="Skill"
        variant="filled"
        value={name}
        error={!!errorText}
        helperText={errorText}
        onChange={changeHandler}
        autoComplete="off"
        inputRef={inputRef}
        fullWidth
        required
        autoFocus
      />
      {hasLevel && <SliderValue level={level} setLevel={setLevel} />}
      <div className="flex gap-2 mt-3">
        <OutlinedButton onClick={doneHandler} disabled={disabled}>
          Done
        </OutlinedButton>
        <TextButton onClick={onCancel}>Cancel</TextButton>
      </div>
    </form>
  );
};

export default EditSkill;
