import { BasicIntro } from './components/BasicIntro';
import { EducationSection } from './components/Education';
import { Objective } from './components/Objective';
import { SkillsSection } from './components/Skills';
import { SummarySection } from './components/Summary';
import { WorkSection } from './components/Work';
import { AwardSection } from './components/Awards';
import { useContext } from 'react';
import { StateContext } from 'src/modules/builder/resume/ResumeLayout';

export default function MordernTemplate() {
  const resumeData = useContext(StateContext);

  return (
    <div className="p-2">
      <BasicIntro
        name={resumeData.basics.name}
        label={resumeData.basics.label}
        url={resumeData.basics.url}
        email={resumeData.basics.email}
        city={resumeData.basics.location.city}
        phone={resumeData.basics.phone}
      />
      <div className="flex ">
        <div className="basis-[60%] p-3">
          <SummarySection summary={resumeData.basics.summary} />
          <WorkSection experience={resumeData.work} />
          <AwardSection awardsReceived={resumeData.awards} />

          <SkillsSection title="Languages" list={resumeData.skills.languages} />
        </div>

        <div className="basis-[40%] p-3">
          <Objective objective={resumeData.basics.objective} />
          <SkillsSection title="Technologies" list={resumeData.skills.technologies} />
          <SkillsSection title="Frameworks" list={resumeData.skills.frameworks} />
          <SkillsSection title="Tools" list={resumeData.skills.tools} />
          <EducationSection education={resumeData.education} />
        </div>
      </div>
    </div>
  );
}
