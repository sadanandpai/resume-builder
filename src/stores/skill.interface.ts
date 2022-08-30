export interface SkillItemIntf {
  name: string;
  level: number;
}

export interface SkillStateIntf {
  title: string;
  hasLevel: boolean;
  values: SkillItemIntf[];
  isEnabled: boolean;

  add: ({ name, level }: { name: string; level: number }) => void;
  remove: (index: number) => void;
  get: () => void;
  reset: (name: SkillItemIntf[]) => void;
  setIsEnabled: (enabled: boolean) => void;
}
