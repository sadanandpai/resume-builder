import { useEffect, useState } from 'react';
import { useEducations } from 'src/stores/education';
import AddEducation from './components/AddEducation';
import Education from './components/Education';

import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';

const EducationLayout = () => {
  const allAcademics = useEducations((state) => state.academics);
  const removeEducation = useEducations((state) => state.remove);
  const onMoveUp = useEducations((state) => state.onmoveup);
  const onMoveDown = useEducations((state) => state.onmovedown);

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
      {allAcademics.map((state, index) => (
        <MoveEditSection
          key={state.id}
          title={state.institution || 'Education'}
          expanded={expanded === state.id}
          length={allAcademics.length}
          index={index}
          clickHandler={() => handleChange(state.id, expanded !== state.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeEducation}
        >
          <Education educationInfo={state} currentIndex={index} />
        </MoveEditSection>
      ))}
      <AddEducation handleChange={handleChange} isEmpty={allAcademics.length === 0} />
    </div>
  );
};

export default EducationLayout;
