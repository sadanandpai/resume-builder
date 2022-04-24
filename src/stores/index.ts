import create from 'zustand';
import produce from 'immer';
import { Item, Resume } from './index.interface';
import { addSkillItem, removeSkillItem } from './skills';

const INITIAL_DATA = {
  basics: {
    name: 'Jane Doe',
    label: 'Frontend Developer',
    image: 'https://www.linkpicture.com/q/generated_photos_5e68893b6d3b380006f22f8b.jpg',
    email: 'janedoe@email.com',
    phone: '+91 9876543210',
    url: 'www.github.com/sadanandpai/',
    summary:
      'I am a web developer having expertise in frontend development and exposure to back- end development. I design and develop web applications using the latest technologies to deliver the product with quality code.',
    location: {
      address: '',
      postalCode: '',
      city: 'Benglauru',
      countryCode: '',
      region: '',
    },
    relExp: '4 years',
    totalExp: '6 Years',
    objective:
      'Eager to expand my skill set through external trainings to help boost all major front desk KPIs. Hoping to leverage organizational skills to help ABC Corp introduce time-saving schemes for all executives.',
    profiles: [
      {
        network: 'linkedin',
        username: 'sadanandpai',
        url: 'https://www.linkedin.com/in/sadanandpai/',
      },
      {
        network: 'github',
        username: 'sadanandpai',
        url: 'https://github.com/sadanandpai/',
      },
      {
        network: 'hackerrank',
        username: 'paicube',
        url: 'https://www.hackerrank.com/paicube/',
      },
      {
        network: 'leetcode',
        username: 'paicube',
        url: 'https://leetcode.com/paicube/',
      },
    ],
  },

  skills: {
    languages: [
      { name: 'JavaScript', score: 5 },
      { name: 'HTML5', score: 5 },
      { name: 'CSS', score: 5 },
    ],
    frameworks: [
      { name: 'React', score: 4 },
      { name: 'Angular', score: 4 },
    ],
    technologies: [
      { name: 'Algorithms', score: 3 },
      { name: 'Progressive Web Apps', score: 3 },
      { name: 'SQL', score: 3 },
      { name: 'Data Structures', score: 3 },
    ],
    libraries: [
      { name: 'jQuery', score: 3 },
      { name: 'Redux', score: 3 },
    ],
    databases: [{ name: 'Firebase', score: 3 }],
    practices: [
      { name: 'Component based architecture', score: 3 },
      { name: 'Agile methodology', score: 3 },
      { name: 'Design Patterns', score: 3 },
      { name: 'Test Driven Development', score: 3 },
      { name: 'MVC', score: 3 },
    ],
    tools: [
      { name: 'Git', score: 3 },
      { name: 'VS Code', score: 3 },
      { name: 'Jira', score: 3 },
      { name: 'Webpack', score: 3 },
      { name: 'Eclipse', score: 3 },
      { name: 'Bitbucket', score: 3 },
    ],
  },

  work: [
    {
      company: 'Company 1',
      position: 'Senior Software Developer',
      website: '',
      startDate: 'Apr 2021',
      endDate: 'present',
      years: '2.5 years',
      highlights: [],
      summary:
        '* Use my extensive experience with front end development to define the structure and components for the project, making sure they are reusable\n* Keep the code quality high reviewing code from other developers and suggesting improvements\n* Interact with the designer to suggest changes and to make sure the view he has about the design is translated into actual functionality\n* E-commerce maintenance **with Fastcommerce**, a Brazilian e-commerce platform',
    },
    {
      company: 'Company 2',
      position: 'Software Developer',
      website: '',
      startDate: 'Jun 2015',
      endDate: 'Dec 2017',
      years: '2.5 years',
      highlights: [],
      summary:
        "* Develop web applications based on Sharepoint, Drupal 8 and Episerver\n* Lead a team of 10 front end developers, giving support to the client's multi-cultural team, providing feedback, clarifying requirements and helping with technical questions\n* Keep the Project Manager and the IT Leads updated on the overall progress of the projects and manage the tasks distributed to the team\n* Keep the code and the features implemented by the other developers in accordance to the requirements",
    },
    {
      company: 'Company 3',
      position: 'Trainee Developer',
      website: '',
      startDate: 'Aug 2011',
      endDate: 'May 2015',
      years: '1 year',
      highlights: [],
      summary:
        '* Design easy user interfaces and great user experiences for the digital platforms of small companies\n* Wordpress development, including themes creation or customization, custom plugins development and training\n* E-commerce maintenance with Fastcommerce, a Brazilian e-commerce platform\n* E-commerce development with Magento, customizing preexisting themes \n* Integrate external services such as payment services, delivery, etc into Magento solutions\n* VPS configuration and optimization (Apache & Nginx)',
    },
  ],

  education: [
    {
      institution: 'MIT, University',
      website: 'https://www.mit.edu/',
      studyType: 'MS',
      area: 'Cloud technology',
      startDate: '2014',
      endDate: '2016',
      score: '68%',
      courses: [],
    },
    {
      institution: 'NMAMIT, Nitte',
      website: 'https://www.mit.edu/',
      studyType: 'B.Tech (VTU)',
      area: 'Computer Science',
      startDate: '2010',
      endDate: '2014',
      score: '8.3 CGPA',
      courses: [],
    },
  ],
};

export const useResumeStore = create<Resume>((set) => ({
  ...INITIAL_DATA,

  addFramework: ({ name, score }: Item) => {
    set(
      produce((state) => {
        state.skills.frameworks = addSkillItem(state.skills.frameworks, { name, score });
      })
    );
  },

  removeFramework: (index: number) => {
    set(
      produce((state) => {
        state.skills.frameworks = removeSkillItem(state.skills.frameworks, index);
      })
    );
  },

  addTechnology: ({ name, score }: Item) => {
    set(
      produce((state) => {
        state.skills.technologies = addSkillItem(state.skills.technologies, { name, score });
      })
    );
  },

  removeTechnology: (index: number) => {
    set(
      produce((state) => {
        state.skills.technologies = removeSkillItem(state.skills.technologies, index);
      })
    );
  },

  addLibrary: ({ name, score }: Item) => {
    set(
      produce((state) => {
        state.skills.libraries = addSkillItem(state.skills.libraries, { name, score });
      })
    );
  },

  removeLibrary: (index: number) => {
    set(
      produce((state) => {
        state.skills.libraries = removeSkillItem(state.skills.libraries, index);
      })
    );
  },

  addDatabase: ({ name, score }: Item) => {
    set(
      produce((state) => {
        state.skills.databases = addSkillItem(state.skills.databases, { name, score });
      })
    );
  },

  removeDatabase: (index: number) => {
    set(
      produce((state) => {
        state.skills.databases = removeSkillItem(state.skills.databases, index);
      })
    );
  },

  addPractice: ({ name, score }: Item) => {
    set(
      produce((state) => {
        state.skills.practices = addSkillItem(state.skills.practices, { name, score });
      })
    );
  },

  removePractice: (index: number) => {
    set(
      produce((state) => {
        state.skills.practices = removeSkillItem(state.skills.practices, index);
      })
    );
  },

  addTool: ({ name, score }: Item) => {
    set(
      produce((state) => {
        state.skills.tools = addSkillItem(state.skills.tools, { name, score });
      })
    );
  },
}));
