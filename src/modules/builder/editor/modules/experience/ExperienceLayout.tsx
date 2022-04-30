import { useEffect, useState } from 'react';
import { useExperiences } from 'src/stores/experience';
import EditSectionContainer from 'src/helpers/common/components/EditSectionContainer';
import AddExperience from './components/AddExperience';
import Experience from './components/Experience';

const ExperienceLayout = () => {
  const allWorks = useExperiences((state) => state.experiences);
  const setIsEnabled = useExperiences((state) => state.setIsEnabled);

  const [expanded, setExpanded] = useState<string | false>('Languages');

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
        <EditSectionContainer
          key={state.companyName}
          isEnabled={state.isEnabled}
          setIsEnabled={(enabled: boolean) => {
            setIsEnabled(enabled, index);
          }}
          title={state.companyName || 'Experience'}
          expanded={expanded === state.id}
          clickHandler={() => handleChange(state.id, expanded !== state.id)}
        >
          <Experience experienceInfo={state} currentIndex={index} />
        </EditSectionContainer>
      ))}
      <AddExperience handleChange={handleChange} />
    </div>
  );
};

export default ExperienceLayout;
