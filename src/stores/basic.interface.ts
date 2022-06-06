type Profiles = {
  network: string;
  username: string;
  url: string;
};

type Location = {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
};

export interface BasicDetailsItem {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  relExp: string;
  totalExp: string;
  objective: string;
  profiles: Profiles[];
}

export interface BasicDetailsStore {
  values: BasicDetailsItem;
  set: (values: BasicDetailsItem) => void;
}
