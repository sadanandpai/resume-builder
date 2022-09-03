import React from 'react';
import { RichtextEditor } from 'src/helpers/common/components/richtext';

const Achievements = ({
  value,
  onChangeHandler,
}: {
  value: string;
  onChangeHandler: (value: string, key: string) => void;
}) => {
  return (
    <RichtextEditor
      label="Achievements"
      value={value}
      onChange={(htmlOutput) => {
        onChangeHandler(htmlOutput, 'achievements');
      }}
      name="achievements"
    />
  );
};

export default Achievements;
