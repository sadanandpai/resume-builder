import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '../../../stores/skills';

import { IItem } from '@/stores/index.interface';
import { SectionHeading } from '../atoms/SectionHeading';
import { scrollToElement } from '../../../helpers/utils/index';
import { useEffect, useRef } from 'react';

export const SkillsSection = ({ title, list }: { title: string; list: IItem[] }) => {
  const skillRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const unsubs = [
      useLanguages,
      useFrameworks,
      useLibraries,
      usePractices,
      useDatabases,
      useTechnologies,
      useTools,
    ].map((store) => store.subscribe(() => scrollToElement(skillRef)));
    return () => unsubs.forEach((unsub) => unsub());
  }, []);

  return (
    <div className="my-3" ref={skillRef}>
      <SectionHeading title={title} />
      <div className="flex items-center flex-wrap gap-2.5 py-2">
        {list.map((item: IItem, index) => (
          <div key={index} className="py-1 px-2 text-sm font-medium border-b-2 border-[#e5e7eb]">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
