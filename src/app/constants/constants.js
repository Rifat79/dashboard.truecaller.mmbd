

export const statusOptions = [
    {id: 1, label: 'Active', value: 1},
    {id: 0, label: 'Inactive', value: 0}
];
export const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
// for BD Phone numbers only (^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$
export const deviceTypeOptions = [
    {id: 1, label: 'Smart Phone', value: 1},
    {id: 2, label: 'Feature Phone', value: 2}
];

export const months30 = [
    'september',
    'april',
    'june',
    'november'
  ];
 export const months = [
    {
      name: 'january',
      id: '01'
    },
    {
      name: 'february',
      id: '02'
    },
    {
      name: 'march',
      id: '03'
    },
    {
      name: 'april',
      id: '04'
    },
    {
      name: 'may',
      id: '05'
    },
    {
      name: 'june',
      id: '06'
    },
    {
      name: 'july',
      id: '07'
    },
    {
      name: 'august',
      id: '08'
    },
    {
      name: 'september',
      id: '09'
    },
    {
      name: 'october',
      id: '10'
    },
    {
      name: 'november',
      id: '11'
    },
    {
      name: 'december',
      id: '12'
    }
  ]

  export const methodOptions = [
    {id: 1, title: 'Admin', slug: 'admin', label: 'Admin', value: 1},
    {id: 2, title: 'Organization ', slug: 'organization ', label: 'Organization', value: 2},
    {id: 3, title: 'Device Activation', slug: 'device_activation  ', label: 'Device Activation', value: 3}, 
    {id: 4, title: 'Game Revenue', slug: 'game_revenue', label: 'Game Revenue', value: 4}, 
    {id: 5, title: 'Organization Management', slug: 'organizations_management ', label: 'Organization Management', value: 5}, 
    {id: 6, title: 'Configurations ', slug: 'configurations  ', label: 'Configurations', value: 6}, 
  ]