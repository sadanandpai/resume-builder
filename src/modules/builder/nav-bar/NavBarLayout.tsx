import Image from 'next/image';
import Link from 'next/link';
import exportFromJSON from 'export-from-json';

import { NavBarMenu, NavBarActions, StyledButton } from './atoms';
import { NavMenuItem } from './components/MenuItem';
import { ThemeSelect } from './components/ThemeSelect';
import { TemplateSelect } from './components/TemplateSelect';
import { PrintResume } from './components/PrintResume';
import DEFAULT_RESUME_JSON from 'src/helpers/constants/resume-data.json';
import { useAwards } from 'src/stores/awards';
import { useExperiences } from 'src/stores/experience';
import { useEducations } from 'src/stores/education';
import { useBasicDetails } from 'src/stores/basic';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';
import { useVoluteeringStore } from 'src/stores/volunteering';

const NavBarLayout = () => {
  const exportResumeData = () => {
    const updatedResumeJson = {
      ...DEFAULT_RESUME_JSON,
      basics: {
        ...DEFAULT_RESUME_JSON.basics,
        ...useBasicDetails.getState().values,
      },
      work: useExperiences.getState().experiences,
      education: useEducations.getState().academics,
      awards: useAwards.getState().awards,
      volunteer: useVoluteeringStore.getState().volunteeredExps,
      skills: {
        languages: useLanguages.getState().get(),
        frameworks: useFrameworks.getState().get(),
        technologies: useTechnologies.getState().get(),
        libraries: useLibraries.getState().get(),
        databases: useDatabases.getState().get(),
        practices: usePractices.getState().get(),
        tools: useTools.getState().get(),
      },
    };
    const fileName = updatedResumeJson.basics.name + '_' + new Date().toLocaleString();
    const exportType = exportFromJSON.types.json;
    exportFromJSON({
      data: updatedResumeJson,
      fileName,
      exportType,
    });
  };

  return (
    <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 pl-5 pr-4 items-center shadow-level-8dp z-20 print:hidden">
      <Link href="/">
        <a className="flex items-center">
          <Image src={'/icons/resume-icon.png'} alt="logo" height={'36px'} width={'36px'} />
        </a>
      </Link>
      <div className="flex-auto flex justify-between items-center ml-5">
        <NavBarMenu>
          <NavMenuItem caption="Templates" popoverChildren={<TemplateSelect />} />
          <NavMenuItem caption="Themes" popoverChildren={<ThemeSelect />} />
        </NavBarMenu>
        <NavBarActions>
          <StyledButton variant="text" onClick={exportResumeData}>
            Export
          </StyledButton>
          <StyledButton variant="text">Import</StyledButton>
          <PrintResume />
        </NavBarActions>
      </div>
    </nav>
  );
};

export default NavBarLayout;
