import { useEffect, useState } from 'react';
import { useExperiences } from 'src/stores/experience';
import AddExperience from './components/AddExperience';
import Experience from './components/Experience';

import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';

const ExperienceLayout = () => {
  const allWorks = useExperiences((state) => state.experiences);
  const removeExperience = useExperiences.getState().remove;
  const onMoveUp = useExperiences.getState().onmoveup;
  const onMoveDown = useExperiences.getState().onmovedown;

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
      {allWorks.map((work, index) => (
        <MoveEditSection
          key={work.id}
          title={work.name || 'Experience'}
          expanded={expanded === work.id}
          length={allWorks.length}
          index={index}
          clickHandler={() => handleChange(work.id, expanded !== work.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeExperience}
        >
          <Experience experienceInfo={work} currentIndex={index} />
        </MoveEditSection>
      ))}
      <AddExperience handleChange={handleChange} isEmpty={allWorks.length === 0} />
    </div>
  );
};

export default ExperienceLayout;
