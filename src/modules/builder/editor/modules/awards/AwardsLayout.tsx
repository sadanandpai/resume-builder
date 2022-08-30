import { useEffect, useState } from 'react';
import { useAwards } from 'src/stores/awards';
import AddAward from './components/AddAward';
import AwardComponent from './components/Award';

import MoveEditSection from 'src/helpers/common/components/MoveEditSectionContainer';

const AwardsLayout = () => {
  const allAwards = useAwards((state) => state.awards);
  const removeEducation = useAwards.getState().remove;
  const onMoveUp = useAwards.getState().onmoveup;
  const onMoveDown = useAwards.getState().onmovedown;

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
      {allAwards.map((award, index) => (
        <MoveEditSection
          key={award.id}
          title={award.title || 'Award'}
          expanded={expanded === award.id}
          length={allAwards.length}
          index={index}
          clickHandler={() => handleChange(award.id, expanded !== award.id)}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onDelete={removeEducation}
        >
          <AwardComponent awardInfo={award} currentIndex={index} />
        </MoveEditSection>
      ))}
      <AddAward handleChange={handleChange} isEmpty={allAwards.length === 0} />
    </div>
  );
};

export default AwardsLayout;
