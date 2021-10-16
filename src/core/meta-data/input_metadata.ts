export const INTRO_METADATA = {
  section: 'Profile',
  metadata: [
    {
      label: 'Name',
      title: 'Name',
      type: 'Input',
      size: 'sm',
      value: 'name',
    },
    {
      label: 'Photo',
      title: 'Photo',
      type: 'Input',
      size: 'sm',
      value: 'photo',
    },
    {
      label: 'Role',
      title: 'Role',
      type: 'Input',
      size: 'lg',
      value: 'role',
    },
    {
      label: 'Email',
      title: 'Email',
      type: 'Input',
      size: 'sm',
      value: 'email',
    },
    {
      label: 'Mobile',
      title: 'Mobile',
      type: 'Input',
      size: 'sm',
      value: 'mobile',
    },
    {
      label: 'Location',
      title: 'Location',
      type: 'Input',
      size: 'sm',
      value: 'location',
    },
    {
      label: 'About Title',
      title: 'About Title',
      type: 'Input',
      size: 'lg',
      value: 'aboutTitle',
    },
    {
      label: 'About Description',
      title: 'About Description',
      type: 'MarkDownField',
      size: 'lg',
      value: 'aboutDescription',
    },
    {
      label: 'Objective Title',
      title: 'Objective Title',
      type: 'Input',
      size: 'lg',
      value: 'objectiveTitle',
    },
    {
      label: 'Objective Description',
      title: 'Objective Description',
      type: 'MarkDownField',
      size: 'lg',
      value: 'objectiveDescription',
    },
  ],
};

export const ABOUT_METADATA = {
  section: 'About',
  metadata: [
    {
      label: 'About me',
      title: 'About me',
      type: 'Input',
      size: 'lg',
      value: 'title',
    },
    {
      label: 'Relavant_Experience',
      title: 'Relavant Experience',
      type: 'Input',
      size: 'lg',
      value: 'description',
    },

    {
      label: 'Title',
      title: 'Title',
      type: 'Input',
      size: 'lg',
      value: 'title',
    },
    {
      label: 'Relavant_Experience',
      title: 'Relavant Experience',
      type: 'Input',
      size: 'lg',
      value: 'description',
    },
  ],
};

export const SOCIAL_METADATA = {
  section: 'Social',
  metadata: [
    {
      label: 'Linkedin',
      title: 'Linkedin',
      type: 'Input',
      size: 'sm',
      value: 'linkedin',
    },
    {
      label: 'Github',
      title: 'Github',
      type: 'Input',
      size: 'sm',
      value: 'github',
    },
    {
      label: 'Hackerrank',
      title: 'Hackerrank',
      type: 'Input',
      size: 'sm',
      value: 'hackerrank',
    },
    {
      label: 'HackerEarth',
      title: 'HackerEarth',
      type: 'Input',
      size: 'sm',
      value: 'hackerearth',
    },
    {
      label: 'Codechef',
      title: 'Codechef',
      type: 'Input',
      size: 'sm',
      value: 'codechef',
    },
    {
      label: 'Codeforces',
      title: 'Codeforces',
      type: 'Input',
      size: 'sm',
      value: 'codeforces',
    },
    {
      label: 'Twitter',
      title: 'Twitter',
      type: 'Input',
      size: 'sm',
      value: 'twitter',
    },
    {
      label: 'Leetcode',
      title: 'Leetcode',
      type: 'Input',
      size: 'sm',
      value: 'leetcode',
    },
    {
      label: 'Devto',
      title: 'Devto',
      type: 'Input',
      size: 'sm',
      value: 'devto',
    },
    {
      label: 'Medium',
      title: 'Medium',
      type: 'Input',
      size: 'sm',
      value: 'medium',
    },
    {
      label: 'Wordpress',
      title: 'Wordpress',
      type: 'Input',
      size: 'sm',
      value: 'wordpress',
    },
    {
      label: 'Hashnode',
      title: 'Hashnode',
      type: 'Input',
      size: 'sm',
      value: 'hashnode',
    },
    {
      label: 'Squarespace',
      title: 'Squarespace',
      type: 'Input',
      size: 'sm',
      value: 'squarespace',
    },
    {
      label: 'Behance',
      title: 'Behance',
      type: 'Input',
      size: 'sm',
      value: 'behance',
    },
    {
      label: 'Dribbble',
      title: 'Dribbble',
      type: 'Input',
      size: 'sm',
      value: 'dribbble',
    },
  ],
};

export const INPUT_METADATA = [
  {
    section: 'Experience',
    metadata: [
      {
        label: 'Company',
        title: 'Company',
        type: 'Block',
        size: 'lg',
        fields: [
          {
            label: 'Position',
            title: 'Position',
            type: 'Input',
            size: 'lg',
          },
          {
            label: 'Position',
            title: 'Position',
            type: 'Input',
            size: 'lg',
          },
          {
            label: 'Start Date',
            title: 'Start Date',
            type: 'Datepicker',
            size: 'sm',
          },
          {
            label: 'End Date',
            title: 'End Date',
            type: 'Datepicker',
            size: 'sm',
          },
          {
            label: 'Website',
            title: 'Website',
            type: 'Input',
            size: 'lg',
          },
        ],
      },
    ],
  },
  {
    section: 'Education',
    metadata: [
      {
        label: 'Institution',
        title: 'Institution',
        type: 'Block',
        size: 'lg',
        fields: [
          {
            label: 'Field',
            title: 'Field',
            type: 'Input',
            size: 'lg',
          },
          {
            label: 'Degree',
            title: 'Degree',
            type: 'Input',
            size: 'sm',
          },
          {
            label: 'GPA',
            title: 'GPA',
            type: 'Input',
            size: 'sm',
          },
          {
            label: 'Start Date',
            title: 'Start Date',
            type: 'Datepicker',
            size: 'sm',
          },
          {
            label: 'End Date',
            title: 'End Date',
            type: 'Datepicker',
            size: 'sm',
          },
          {
            label: 'Description',
            title: 'Description',
            type: 'Input',
            size: 'lg',
          },
        ],
      },
    ],
  },
  {
    section: 'Projects',
    metadata: [
      {
        label: 'Title',
        title: 'Title',
        type: 'Block',
        size: 'lg',
        fields: [
          {
            label: 'Github',
            title: 'Github',
            type: 'Input',
            size: 'sm',
          },
          {
            label: 'Website',
            title: 'Website',
            type: 'Input',
            size: 'sm',
          },
          {
            label: 'Start Date',
            title: 'Start Date',
            type: 'Datepicker',
            size: 'sm',
          },
          {
            label: 'End Date',
            title: 'End Date',
            type: 'Datepicker',
            size: 'sm',
          },
          {
            label: 'Description',
            title: 'Description',
            type: 'Input',
            size: 'lg',
          },
        ],
      },
    ],
  },
  {
    section: 'Expertise',
    metadata: [
      {
        label: 'Label',
        title: 'Label',
        type: 'Block',
        size: 'sm',
        fields: [
          {
            label: 'Label',
            title: 'Label',
            type: 'Input',
            size: 'sm',
          },
          {
            label: 'Rating',
            title: 'Rating',
            type: 'Input',
            size: 'sm',
          },
        ],
      },
    ],
  },
  {
    section: 'Skills',
    metadata: [
      {
        label: 'Label',
        title: 'Label',
        type: 'Block',
        size: 'sm',
        fields: [
          {
            label: 'Label',
            title: 'Label',
            type: 'Input',
            size: 'sm',
          },
          {
            label: 'Rating',
            title: 'Rating',
            type: 'Input',
            size: 'sm',
          },
        ],
      },
    ],
  },
  {
    section: 'Methodology',
    metadata: [
      {
        label: 'Label',
        title: 'Label',
        type: 'Block',
        size: 'sm',
        fields: [
          {
            label: 'Label',
            title: 'Label',
            type: 'Input',
            size: 'sm',
          },
          {
            label: 'Rating',
            title: 'Rating',
            type: 'Input',
            size: 'sm',
          },
        ],
      },
    ],
  },
  {
    section: 'Tools',
    metadata: [
      {
        label: 'Label',
        title: 'Label',
        type: 'Block',
        size: 'sm',
        fields: [
          {
            label: 'Label',
            title: 'Label',
            type: 'Input',
            size: 'sm',
          },
          {
            label: 'Rating',
            title: 'Rating',
            type: 'Input',
            size: 'sm',
          },
        ],
      },
    ],
  },
];
