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
          {resumeData.basics.summary && <SummarySection summary={resumeData.basics.summary} />}
          {resumeData.work.length > 0 && <WorkSection experience={resumeData.work} />}
          {resumeData.awards.length > 0 && <AwardSection awardsReceived={resumeData.awards} />}

          {resumeData.skills.languages.length > 0 && (
            <SkillsSection title="Languages" list={resumeData.skills.languages} />
          )}
        </div>

        <div className="basis-[40%] p-3">
          {resumeData.basics.objective && <Objective objective={resumeData.basics.objective} />}
          {resumeData.skills.technologies.length > 0 && (
            <SkillsSection title="Technologies" list={resumeData.skills.technologies} />
          )}
          {resumeData.skills.frameworks.length > 0 && (
            <SkillsSection title="Frameworks" list={resumeData.skills.frameworks} />
          )}
          {resumeData.skills.tools.length > 0 && (
            <SkillsSection title="Tools" list={resumeData.skills.tools} />
          )}
          {resumeData.education.length > 0 && <EducationSection education={resumeData.education} />}
        </div>
      </div>
    </div>
  );
}
