import { useEffect, useState } from 'react';
import { useExperiences } from 'src/stores/experience';
import EditSectionContainer from 'src/helpers/common/components/EditSectionContainer';
import AddExperience from './components/AddExperience';
import Experience from './components/Experience';

import MoveEditSection from './MoveEditSection';

const ExperienceLayout = () => {
  const allWorks = useExperiences((state) => state.experiences);
  const removeExperience = useExperiences((state) => state.remove);
  const onMoveUp = useExperiences((state) => state.onmoveup);
  const onMoveDown = useExperiences((state) => state.onmovedown);

  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    setExpanded(allWorks[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {allWorks.map((state, index) => (
        <MoveEditSection
          key={state.id}
          title={state.companyName || 'Experience'}
          expanded={expanded === state.id}
          length={allWorks.length}
          index={index}
          clickHandler={() => handleChange(state.id, expanded !== state.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeExperience}
        >
          <Experience experienceInfo={state} currentIndex={index} />
        </MoveEditSection>
      ))}
      <AddExperience handleChange={handleChange} />
    </div>
  );
};

export default ExperienceLayout;
