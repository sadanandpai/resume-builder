import React, { ChangeEvent, Fragment, memo } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useAwards } from 'src/stores/awards';
import { AwardItem } from 'src/stores/awards.interface';

interface Props {
  awardInfo: AwardItem;
  currentIndex: number;
}

const AwardComp: React.FC<Props> = memo(({ awardInfo, currentIndex }) => {
  const { set: setAwards, awards } = useAwards();

  const onChangeHandler = (name: string, value: any) => {
    const currentAwardInfo = { ...awardInfo };
    switch (name) {
      case 'title':
        currentAwardInfo.title = value;
        break;
      case 'awarder':
        currentAwardInfo.awarder = value;
        break;
      case 'date':
        currentAwardInfo.date = value;
        break;
      case 'summary':
        currentAwardInfo.summary = value;
        break;
      default:
        break;
    }
    const updatedAwards = [...awards];
    updatedAwards[currentIndex] = currentAwardInfo;
    setAwards(updatedAwards);
  };

  return (
    <Fragment>
      <TextField
        label="Award name"
        variant="filled"
        value={awardInfo.title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('title', value);
        }}
        autoComplete="off"
        fullWidth
        required
        autoFocus={true}
        sx={{ marginBottom: '26px' }}
      />
      <TextField
        label="Awarded by"
        variant="filled"
        value={awardInfo.awarder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('awarder', value);
        }}
        autoComplete="off"
        fullWidth
        required
        sx={{ marginBottom: '26px' }}
      />
      <DatePicker
        label="Date"
        value={awardInfo.date}
        onChange={(newDate) => {
          onChangeHandler('date', newDate);
        }}
        inputFormat={'DD/MM/YYYY'}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            autoComplete="off"
            fullWidth
            required
            sx={{ marginBottom: '26px' }}
          />
        )}
      />
      <TextField
        label="About the award"
        variant="filled"
        multiline
        rows={4}
        value={awardInfo.summary}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          onChangeHandler('summary', value);
        }}
        autoComplete="off"
        fullWidth
        required
      />
    </Fragment>
  );
});

AwardComp.displayName = 'AwardComp';

export default AwardComp;
