export interface IAwardItem {
  title: string;
  awarder: string;
  date: string | null;
  summary: string;
  id: string;
}

export interface IAwardsStore {
  awards: IAwardItem[];
  add: (newEducation: IAwardItem) => void;
  get: (index: number) => void;
  remove: (index: number) => void;
  reset: (values: IAwardItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
  updateAward: (index: number, updatedInfo: IAwardItem) => void;
}
