import React from 'react';
import { RichtextEditor } from 'src/helpers/common/components/richtext';
import { useActivity } from 'src/stores/activity';

const Involvements = () => {
  const activities = useActivity((state) => state.activities);
  return (
    <RichtextEditor
      label="Involvements"
      value={activities.involvements}
      onChange={(htmlOutput) => {
        useActivity.getState().updateInvolvements(htmlOutput);
      }}
      name="involvements"
    />
  );
};

export default Involvements;
