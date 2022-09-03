import React, { ChangeEvent, Fragment, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useAwards } from 'src/stores/awards';
import { IAwardItem } from 'src/stores/awards.interface';
import { RichtextEditor } from 'src/helpers/common/components/richtext';
import { DATE_PICKER_FORMAT } from 'src/helpers/constants';

interface IAwardComp {
  awardInfo: IAwardItem;
  currentIndex: number;
}

const AwardComp: React.FC<IAwardComp> = ({ awardInfo, currentIndex }) => {
  const onChangeHandler = useCallback(
    (name: string, value: any) => {
      const currentAwardInfo = { ...awardInfo };
      const updateAward = useAwards.getState().updateAward;
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
      updateAward(currentIndex, currentAwardInfo);
    },
    [currentIndex, awardInfo]
  );

  const onSummaryChange = useCallback(
    (htmlOutput: string) => {
      onChangeHandler('summary', htmlOutput);
    },
    [onChangeHandler]
  );

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
        inputFormat={DATE_PICKER_FORMAT}
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
      <RichtextEditor
        label="About the award"
        value={awardInfo.summary}
        onChange={onSummaryChange}
        name="summary"
      />
    </Fragment>
  );
};

export default AwardComp;
