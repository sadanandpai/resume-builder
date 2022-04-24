import shallow from 'zustand/shallow';

import { useResumeStore } from 'src/stores';
import { BasicIntro } from './components/BasicIntro';
import { EducationSection } from './components/Education';
import { Objective } from './components/Objective';
import { SkillsSection } from './components/Skills';
import { SummarySection } from './components/Summary';
import { WorkSection } from './components/Work';

export const MordernTemplate = () => {
  const {
    name,
    summary,
    objective,
    label,
    url,
    email,
    phone,
    city,
    experience,
    education,
    languages,
    frameworks,
    technologies,
    tools,
  } = useResumeStore(
    (state) => ({
      name: state.basics.name,
      summary: state.basics.summary,
      objective: state.basics.objective,
      label: state.basics.label,
      url: state.basics.url,
      email: state.basics.email,
      phone: state.basics.phone,
      city: state.basics.location.city,
      experience: state.work,
      education: state.education,
      languages: state.skills.languages,
      frameworks: state.skills.frameworks,
      technologies: state.skills.technologies,
      tools: state.skills.tools,
    }),
    shallow
  );

  return (
    <div className="p-2">
      <BasicIntro name={name} label={label} url={url} email={email} city={city} phone={phone} />
      <div className="flex ">
        <div className="basis-[60%] p-3">
          <SummarySection summary={summary} />
          <WorkSection experience={experience} />

          <SkillsSection title="Languages" list={languages} />
        </div>

        <div className="basis-[40%] p-3">
          <Objective objective={objective} />
          <SkillsSection title="Technologies" list={technologies} />
          <SkillsSection title="Frameworks" list={frameworks} />
          <SkillsSection title="Tools" list={tools} />
          <EducationSection education={education} />
        </div>
      </div>
    </div>
  );
};
