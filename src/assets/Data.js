export const languageLists = [
  { id: 4, value: 'Danish' },
  { id: 1, value: 'English' },
  { id: 6, value: 'Estonian' },
  { id: 3, value: 'French' },
  { id: 2, value: 'German' },
  { id: 5, value: 'Italian' },
  { id: 7, value: 'Portugues' },
  { id: 8, value: 'Swedish' },
  // { id: 9, value: 'Finnish' },
  { id: 10, value: 'Spanish' },
];

export const filters = [
  { id: 0, value: 'All' },
  { id: 66, value: 'Open Tickets' },
  { id: 5, value: 'Assigned' },
  { id: 6, value: 'Closed' },
  { id: 4, value: 'In Progress' },
  { id: 1, value: 'New' },
  { id: 2, value: 'Pending' },
  { id: 37, value: 'Reopened' },
  { id: 3, value: 'Resolved' },
];

// Quick Links
export const QuickLinks = [
  {
    id: Math.random(),
    name: 'New Network Account',
    src: require('./quick-links/administrator.png'),
    service: 'Account Management',
    category: 'Network Access',
    subcategory: 'New Account',
    url:
      'http://sigmagodev.centralus.cloudapp.azure.com/CherwellPortal/IT/Command/OneStep.LaunchOneStep?ID=946123bf063f5701e93ce64445b7472335039dd847',
  },
  {
    id: Math.random(),
    name: 'New Employee Setup',
    src: require('./quick-links/employee.png'),
    service: 'Employee Support',
    category: 'Add/Change',
    subcategory: 'New Employee Setup',
    url:
      'http://sigmagodev.centralus.cloudapp.azure.com/CherwellPortal/IT/Command/OneStep.LaunchOneStep?ID=9465f05bdd57f9b80b32bb452eb56998fe3733630f',
  },
  {
    id: Math.random(),
    name: 'Request Desktop Printer',
    src: require('./quick-links/printer.png'),
    service: 'Printing',
    category: 'Desktop',
    subcategory: 'Request Desktop Printer',
    url:
      'http://sigmagodev.centralus.cloudapp.azure.com/CherwellPortal/IT/Command/OneStep.LaunchOneStep?ID=9461281ab90d5efc9353df45c9a3f1fae427085793',
  },
  {
    id: Math.random(),
    name: 'Request New Mailbox',
    src: require('./quick-links/mailbox.png'),
    service: 'E-Mail / Calendaring',
    category: 'Mailbox',
    subcategory: 'Request Mailbox or Alias',
    url:
      'http://sigmagodev.centralus.cloudapp.azure.com/CherwellPortal/IT/Command/OneStep.LaunchOneStep?ID=9461266164812dee68232044c2a5652553aef8ec17',
  },
];
