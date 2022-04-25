export interface SkillItemIntf {
  name: string;
  level: number;
}

export interface SkillStateIntf {
  title: string;
  hasLevel: boolean;
  values: SkillItemIntf[];
  add: ({ name, level }: { name: string; level: number }) => void;
  remove: (index: number) => void;
  set: (name: SkillItemIntf[]) => void;
}
