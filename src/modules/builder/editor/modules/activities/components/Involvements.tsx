import React from 'react';
import { RichtextEditor } from 'src/helpers/common/components/richtext';

const Involvements = ({
  value,
  onChangeHandler,
}: {
  value: string;
  onChangeHandler: (value: string, key: string) => void;
}) => {
  return (
    <RichtextEditor
      label="Involvements"
      value={value}
      onChange={(htmlOutput) => {
        onChangeHandler(htmlOutput, 'involvements');
      }}
      name="involvements"
    />
  );
};

export default Involvements;
