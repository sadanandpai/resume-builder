export interface IVolunteeringItem {
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

export interface IVolunteeringStore {
  volunteeredExps: IVolunteeringItem[];
  add: (newVolunteering: IVolunteeringItem) => void;
  get: (index: number) => void;
  remove: (index: number) => void;
  reset: (values: IVolunteeringItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
  updatedVolunteeringExp: (index: number, updatedInfo: IVolunteeringItem) => void;
}
