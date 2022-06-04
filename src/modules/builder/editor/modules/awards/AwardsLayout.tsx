import { useEffect, useState } from 'react';
import { useAwards } from 'src/stores/awards';
import AddAward from './components/AddAward';
import AwardComponent from './components/Award';

import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';

const AwardsLayout = () => {
  const allAwards = useAwards((state) => state.awards);
  const removeEducation = useAwards((state) => state.remove);
  const onMoveUp = useAwards((state) => state.onmoveup);
  const onMoveDown = useAwards((state) => state.onmovedown);

  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    setExpanded(allAwards[0]?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      {allAwards.map((state, index) => (
        <MoveEditSection
          key={state.id}
          title={state.title || 'Award'}
          expanded={expanded === state.id}
          length={allAwards.length}
          index={index}
          clickHandler={() => handleChange(state.id, expanded !== state.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeEducation}
        >
          <AwardComponent awardInfo={state} currentIndex={index} />
        </MoveEditSection>
      ))}
      <AddAward handleChange={handleChange} isEmpty={allAwards.length === 0} />
    </div>
  );
};

export default AwardsLayout;
