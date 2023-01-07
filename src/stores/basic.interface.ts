export type IProfiles = {
  network: string;
  username: string;
  url: string;
};

type ILocation = {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
};

export interface IBasicDetailsItem {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: ILocation;
  relExp: string;
  totalExp: string;
  objective: string;
  profiles: IProfiles[];
}

export interface IBasicDetailsStore {
  values: IBasicDetailsItem;
  reset: (values: IBasicDetailsItem) => void;
}
