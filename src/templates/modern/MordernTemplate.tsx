import { BasicIntro } from './components/BasicIntro';
import { EducationSection } from './components/Education';
import { Objective } from './components/Objective';
import { SkillsSection } from './components/Skills';
import { SummarySection } from './components/Summary';
import { WorkSection } from './components/Work';
import { AwardSection } from './components/Awards';
import { useContext } from 'react';
import { StateContext } from 'src/modules/builder/resume/ResumeLayout';
import { ValidSectionRenderer } from 'src/helpers/common/components/ValidSectionRenderer';

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
          <ValidSectionRenderer value={resumeData.basics.summary}>
            <SummarySection summary={resumeData.basics.summary} />
          </ValidSectionRenderer>

          <ValidSectionRenderer value={resumeData.work}>
            <WorkSection experience={resumeData.work} />
          </ValidSectionRenderer>

          <ValidSectionRenderer value={resumeData.awards}>
            <AwardSection awardsReceived={resumeData.awards} />
          </ValidSectionRenderer>

          <ValidSectionRenderer value={resumeData.skills.languages}>
            <SkillsSection title="Languages" list={resumeData.skills.languages} />
          </ValidSectionRenderer>
        </div>

        <div className="basis-[40%] p-3">
          <ValidSectionRenderer value={resumeData.basics.objective}>
            <Objective objective={resumeData.basics.objective} />
          </ValidSectionRenderer>

          <ValidSectionRenderer value={resumeData.skills.technologies}>
            <SkillsSection title="Technologies" list={resumeData.skills.technologies} />
          </ValidSectionRenderer>

          <ValidSectionRenderer value={resumeData.skills.frameworks}>
            <SkillsSection title="Frameworks" list={resumeData.skills.frameworks} />
          </ValidSectionRenderer>

          <ValidSectionRenderer value={resumeData.skills.tools}>
            <SkillsSection title="Tools" list={resumeData.skills.tools} />
          </ValidSectionRenderer>

          <ValidSectionRenderer value={resumeData.education}>
            <EducationSection education={resumeData.education} />
          </ValidSectionRenderer>
        </div>
      </div>
    </div>
  );
}
