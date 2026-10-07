import { useEffect, useRef, type ReactNode } from 'react';
import { useAwards } from '@/stores/awards';
import { useEducations } from '@/stores/education';
import { useExperiences } from '@/stores/experience';
import { useVoluteeringStore } from '@/stores/volunteering';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';
import { scrollToElement } from '@/helpers/utils';

type Subscription = { subscribe: (listener: () => void) => () => void };
const subscriptions: Record<
  'work' | 'education' | 'awards' | 'volunteer' | 'skills',
  Subscription[]
> = {
  work: [useExperiences],
  education: [useEducations],
  awards: [useAwards],
  volunteer: [useVoluteeringStore],
  skills: [
    useLanguages,
    useFrameworks,
    useLibraries,
    usePractices,
    useDatabases,
    useTechnologies,
    useTools,
  ],
};
/** Preserve Modern's edit-to-scroll subscriptions, including all skill stores and cleanup. */
export function EditScrollSection({
  source,
  children,
}: {
  source: keyof typeof subscriptions;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const unsubscribes = subscriptions[source].map((store) =>
      store.subscribe(() => scrollToElement(ref))
    );
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, [source]);
  return <div ref={ref}>{children}</div>;
}
