import { useEffect, useState } from 'react';
import { useEducations } from 'src/stores/education';
import AddEducation from './components/AddEducation';
import Education from './components/Education';

import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';

const EducationLayout = () => {
  const allAcademics = useEducations((state) => state.academics);
  const removeEducation = useEducations.getState().remove;
  const onMoveUp = useEducations.getState().onmoveup;
  const onMoveDown = useEducations.getState().onmovedown;

  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    setExpanded(allAcademics[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {allAcademics.map((education, index) => (
        <MoveEditSection
          key={education.id}
          title={education.institution || 'Education'}
          expanded={expanded === education.id}
          length={allAcademics.length}
          index={index}
          clickHandler={() => handleChange(education.id, expanded !== education.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeEducation}
        >
          <Education educationInfo={education} currentIndex={index} />
        </MoveEditSection>
      ))}
      <AddEducation handleChange={handleChange} isEmpty={allAcademics.length === 0} />
    </div>
  );
};

export default EducationLayout;
