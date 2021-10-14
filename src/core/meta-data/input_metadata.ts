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
      label: 'Experience',
      title: 'Experience',
      type: 'Block',
      size: 'lg',
      value: 'experience',
      fields: [
        {
          label: 'Relavant_Experience_Label',
          title: 'Relavant Experience Label',
          type: 'Input',
          size: 'lg',
          value: 'relExpLabel',
        },
        {
          label: 'Relavant_Experience',
          title: 'Relavant Experience',
          type: 'Input',
          size: 'lg',
          value: 'relExp',
        },
        {
          label: 'Total_Experience_Label',
          title: 'Total Experience Label',
          type: 'Input',
          size: 'lg',
          value: 'expLabel',
        },
        {
          label: 'Total_Experience',
          title: 'Total Experience',
          type: 'Input',
          size: 'lg',
          value: 'exp',
        },
      ],
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
