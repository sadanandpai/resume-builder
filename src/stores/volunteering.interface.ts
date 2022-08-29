export interface VolunteeringItem {
  id: string;
  organization: string;
  position: string;
  url: string;
  startDate: string | null;
  endDate: string | null;
  summary: string;
  highlights: string[];
  isVolunteeringNow: boolean;
}

export interface VolunteeringStore {
  volunteeredExps: VolunteeringItem[];
  add: (newVolunteering: VolunteeringItem) => void;
  get: (index: number) => void;
  remove: (index: number) => void;
  reset: (values: VolunteeringItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
  updatedVolunteeringExp: (index: number, updatedInfo: VolunteeringItem) => void;
}
