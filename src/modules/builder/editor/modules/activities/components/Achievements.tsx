import React from 'react';
import { RichtextEditor } from '@/helpers/common/components/richtext';
import { useActivity } from '@/stores/activity';

const Achievements = () => {
  const activities = useActivity((state) => state.activities);
  return (
    <RichtextEditor
      label="Achievements"
      value={activities.achievements}
      onChange={(htmlOutput) => {
        useActivity.getState().updateAchievements(htmlOutput);
      }}
      name="achievements"
    />
  );
};

export default Achievements;
