export default class Incident {
  // ---------------------------------- Incident Values ---------------------------------- //

  //Incident BusObID
  static busObId = '6dd53665c0c24cab86870a21cf6434ae';

  //Incident Fields
  static fields = {
    RecID: 'fa03d51b709e4a6eb2d52885b2ef7e04',
    PublicID: '6ae282c55e8e4266ae66ffc070c17fa3',
    IncidentType: '9365a6098398ff2551e1c14dd398c466d5a201a9c7',
    Description: '252b836fc72c4149915053ca1131d138',
    ShortDescription: '9451729d704c93c7a9510b47f3b80c0cf74772fe27',
    Status: '5eb3234ae1344c64a19819eda437f18d',
    Service: '936725cd10c735d1dd8c5b4cd4969cb0bd833655f4',
    Category: '9e0b434034e94781ab29598150f388aa',
    SubCategory: '1163fda7e6a44f40bb94d2b47cc58f46',
    OwnedByTeam: '9339fc404e8d5299b7a7c64de79ab81a1c1ff4306c',
    OwnedBy: '9339fc404e4c93350bf5be446fb13d693b0bb7f219',
    CustomerDisplayName: '93734aaff77b19d1fcfd1d4b4aba1b0af895f25788',
    CustomerID: '933bd530833c64efbf66f84114acabb3e90c6d7b8f',
    Impact: 'ae05c132527e48bd95d063c445622df7',
    Urgency: '29d741aae8bf461f8aafa3c9eb4dc822',
    Priority: '83c36313e97b4e6b9028aff3b401b71c',
    SLARespondByDeadline: '9365b1db4ecb560c538b474ad58f51bf1fb6b101a5',
    SLAResolveByDeadline: '9365b4209be3fff3623a4a4d6ab76991c2f01ea109',
    TotalTaskTime: '93d38dcafc0b8fcfcd2fa64353a02977143597fb45',
    Longitude: '94564dcf2677cba342f65344ff8480843acc5869c0',
    Latitude: '94564dded8553d43f23d064e7982ef87efaf015760',
    SpecificsTypeId: '933a6388b180f3fb13e37f4bbcbc283c183579c5a8',
    CallSource: '93670bdf8abe2cd1f92b1f490a90c7b7d684222e13',
    LinkedProblem: '9345e50743c7ae58b873ab4ef8b98bd09cc736daa6',
    PendingReasons: '9378aba490aadc483cf364416783a48d7d63ae11aa',
    ReviewByDeadline: '9378aba4eb664c75b19162486199a67ac141aa8dad',
    CloseDescription: '93408334d3c89b364bf3b14933a74db085d0b47824',
    ReOpenDescription: '94606380a8aca355fda97142508ae8b93551e3c6a7',
    CreatedDateTime: 'c1e86f31eb2c4c5f8e8615a5189e9b19',
    lastModifiedDate: '93543557882ad94503745843c9a380aa0c380935c8',
    Source: '93670bdf8abe2cd1f92b1f490a90c7b7d684222e13',
    Withdraw: '93eb71eaa716390d447f274f35ad9e41ccbfcef59f',
    // "Requestor": "93734aaff77b19d1fcfd1d4b4aba1b0af895f25788"
  };

  //All Incident Statuses (Customer)
  static allIncidentStatuses = [
    // 'In Cart',
    'New',
    'Assigned',
    'In Progress',
    'Pending',
    'Resolved',
    'Reopened',
    'Closed',
    'Awaiting Approval',
  ];

  //Open Incident Statuses (Customer)
  static openIncidentStatuses = [
    // 'In Cart',
    'New',
    'Assigned',
    'In Progress',
    'Pending',
    'Reopened',
    'Awaiting Approval',
  ];

  //Closed Incident Statuses (Customer)
  static closedIncidentStatuses = ['Resolved', 'Closed'];

  //My Incident Statuses (Technician)
  static myIncidentStatuses = [
    // 'In Cart',
    'New',
    'Assigned',
    'In Progress',
    'Pending',
    'Reopened',
  ];

  //My Team Unassigned Incident Statuses (Technician)
  static myTeamUnassignedIncidentStatuses = [
    // 'In Cart',
    'New',
    'Assigned',
    'In Progress',
    'Pending',
    'Reopened',
  ];

  //My Team Open Incident Statuses (Technician)
  static myTeamOpenIncidentStatuses = [
    // 'In Cart',
    'New',
    'Assigned',
    'In Progress',
    'Pending',
    'Reopened',
  ];

  static hasImpactUrgency = true;

  // ---------------------------------- Incident Values ---------------------------------- //

  // ---------------------------------- Incident Customer UI ---------------------------------- //

  //Incident Items To Show In Listing (Customer)
  static customersFieldsToShowInListing = {
    title: {
      fieldId: Incident.fields.ShortDescription,
      defaultValue: 'No short description available',
    },
    subtitle: {
      label: 'Status',
      value: Incident.fields.Status,
      defaultValue: '',
    },
    subtitle2: {
      label: 'Assigned To',
      value: Incident.fields.OwnedBy,
      defaultValue: 'Unassigned',
    },
    rightTitle: {
      fieldId: Incident.fields.PublicID,
      defaultValue: '',
    },
  };

  //Incident Items To Show In Detail (Customer)
  static customersFieldsToShowInDetail = [
    {
      nameToDisplay: 'Ticket Number',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.PublicID,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Type',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: 'No type available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.IncidentType,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Short Description',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: 'No short description available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.ShortDescription,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Classification',
      editable: false,
      editType: 1,
      toRight: true,
      placeHolder: 'No classification available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.Service,
          joinOperator: '-',
        },
        {
          fieldId: Incident.fields.Category,
          joinOperator: '-',
        },
        {
          fieldId: Incident.fields.SubCategory,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Status',
      editable: false,
      editType: 4,
      toRight: true,
      placeHolder: 'No status available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.Status,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Created Date & Time',
      editable: false,
      editType: 4,
      toRight: true,
      placeHolder: 'No date available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.CreatedDateTime,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Assigned To',
      editable: false,
      editType: 3,
      toRight: true,
      placeHolder: 'Unassigned',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.OwnedBy,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Description',
      editable: false,
      editType: 0,
      toRight: false,
      placeHolder: 'No description available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.Description,
          joinOperator: '',
        },
      ],
    },
  ];

  // ---------------------------------- Incident Customer UI ---------------------------------- //

  // ---------------------------------- Incident Technician UI ---------------------------------- //

  static specificFormIndexInDetail = 4; //Starting from 0

  //Incident Items To Show In Listing (Technician)
  static techniciansFieldsToShowInListing = {
    priority: {
      fieldId: Incident.fields.Priority,
      defaultValue: '',
    },
    title: {
      fieldId: Incident.fields.ShortDescription,
      defaultValue: 'No short description available',
    },
    subtitle: {
      label: 'Status',
      value: Incident.fields.Status,
      defaultValue: '',
    },
    subtitle2: {
      label: 'Assigned To',
      value: Incident.fields.OwnedBy,
      defaultValue: 'Unassigned',
    },
    rightTitle: {
      fieldId: Incident.fields.PublicID,
      defaultValue: '',
    },
  };

  //Incident Items To Show In Detail (Technician)
  static techniciansFieldsToShowInDetail = [
    {
      nameToDisplay: 'Ticket Number',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.PublicID,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Type',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: 'No type available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.IncidentType,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Short Description',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: 'No short description available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.ShortDescription,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Classification',
      editable: true,
      editType: 1,
      toRight: true,
      placeHolder: 'No classification available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.Service,
          joinOperator: '-',
        },
        {
          fieldId: Incident.fields.Category,
          joinOperator: '-',
        },
        {
          fieldId: Incident.fields.SubCategory,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Priority',
      editable: true,
      editType: 2,
      toRight: true,
      placeHolder: 'No priority available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.Impact,
          joinOperator: '+',
        },
        {
          fieldId: Incident.fields.Urgency,
          joinOperator: '=',
        },
        {
          fieldId: Incident.fields.Priority,
          joinOperator: '',
        },
      ],
    },

    {
      nameToDisplay: 'Status',
      editable: true,
      editType: 4,
      toRight: true,
      placeHolder: 'No status available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.Status,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Created Date & Time',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: 'No date available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.CreatedDateTime,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Assigned To',
      editable: true,
      editType: 3,
      toRight: true,
      placeHolder: 'Unassigned',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.OwnedBy,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Requestor',
      editable: true,
      editType: 5,
      toRight: true,
      placeHolder: 'No requestor available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.CustomerDisplayName,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Respond By',
      editable: false,
      editType: 5,
      toRight: true,
      placeHolder: 'No respond by available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.SLARespondByDeadline,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Resolve By',
      editable: false,
      editType: 5,
      toRight: true,
      placeHolder: 'No resolve by available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.SLAResolveByDeadline,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Description',
      editable: false,
      editType: 0,
      toRight: false,
      placeHolder: 'No description available',
      fieldsToJoin: [
        {
          fieldId: Incident.fields.Description,
          joinOperator: '',
        },
      ],
    },
  ];

  // ---------------------------------- Incident Technician UI ---------------------------------- //
}
