type Fields = {
  id: string;
  name: string;
  value: string;
};

export interface BasicDetailsItem {
  name: string;
  type: string;
  fields: Fields[];
}

export interface BasicDetailsStore {
  values: BasicDetailsItem[];
  set: (values: BasicDetailsItem[]) => void;
}
