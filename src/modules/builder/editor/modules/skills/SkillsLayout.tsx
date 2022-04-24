import { useState } from 'react';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';
import EditSectionContainer from 'src/helpers/common/components/EditSectionContainer';
import Skill from './components/Skill';

const SkillsLayout = () => {
  const skillState = [
    useLanguages(),
    useFrameworks(),
    useTechnologies(),
    useLibraries(),
    useDatabases(),
    usePractices(),
    useTools(),
  ];
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-8 mb-8">
      {skillState.map((state, index) => (
        <EditSectionContainer
          key={state.title}
          expanded={expandedIndex === index}
          title={state.title}
          clickHandler={() => setExpandedIndex(index)}
        >
          <Skill
            items={state.values}
            addItem={state.add}
            removeItem={state.remove}
            setItems={state.set}
            hasLevel={state.hasLevel}
          />
        </EditSectionContainer>
      ))}
    </div>
  );
};

export default SkillsLayout;
