import { useEffect, useState } from 'react';
import { useVoluteeringStore } from 'src/stores/volunteering';
import AddVolunteeringExp from './components/AddVolunteering';
import Volunteering from './components/Volunteer';

import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';

const VolunteeringLayout = () => {
  const allVolunteeringExps = useVoluteeringStore((state) => state.volunteeredExps);
  const removeExperience = useVoluteeringStore.getState().remove;
  const onMoveUp = useVoluteeringStore.getState().onmoveup;
  const onMoveDown = useVoluteeringStore.getState().onmovedown;

  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    setExpanded(allVolunteeringExps[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {allVolunteeringExps.map((volunteeringInfo, index) => (
        <MoveEditSection
          key={volunteeringInfo.id}
          title={volunteeringInfo.organization || 'Experience'}
          expanded={expanded === volunteeringInfo.id}
          length={allVolunteeringExps.length}
          index={index}
          clickHandler={() => handleChange(volunteeringInfo.id, expanded !== volunteeringInfo.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeExperience}
        >
          <Volunteering volunteeringInfo={volunteeringInfo} currentIndex={index} />
        </MoveEditSection>
      ))}
      <AddVolunteeringExp handleChange={handleChange} isEmpty={allVolunteeringExps.length === 0} />
    </div>
  );
};

export default VolunteeringLayout;
