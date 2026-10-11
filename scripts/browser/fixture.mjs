// Synthetic fixture only; never capture a user's saved resume in test artifacts.
export const resume = {
  basics: {
    name: 'Morgan Example',
    label: 'Full Stack Developer',
    image: '',
    email: 'morgan@example.com',
    phone: '1234567890',
    url: 'https://example.com',
    summary: 'Builds accessible products with Java and React.',
    location: { address: '', postalCode: '', city: 'Example City', countryCode: '', region: '' },
    relExp: '4 years',
    totalExp: '4 years',
    objective: '',
    profiles: [],
  },
  work: [],
  education: [],
  awards: [],
  volunteer: [],
  skills: Object.fromEntries(
    ['languages', 'frameworks', 'technologies', 'libraries', 'databases', 'practices', 'tools'].map(
      (key) => [key, []]
    )
  ),
  activities: { involvements: '', achievements: '' },
};
export const seed = {
  basic: { state: { values: resume.basics }, version: 0 },
  experience: { state: { experiences: [] }, version: 0 },
  education: { state: { academics: [] }, version: 0 },
  awards: { state: { awards: [] }, version: 0 },
  volunteering: { state: { volunteeredExps: [] }, version: 0 },
  activities: { state: { activities: resume.activities }, version: 0 },
  ...Object.fromEntries(
    Object.keys(resume.skills).map((key) => [
      key,
      { state: { values: [], isEnabled: true }, version: 0 },
    ])
  ),
};
