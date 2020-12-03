export default class Printer {
  // ---------------------------------- Printer Values ---------------------------------- //

  //Printer BusObID
  static busObId = '935883280b5c9ceba231ae4fda9645206bee0e851e';

  //Printer Fields
  static fields = {
    RecID: '9343f8800b00034d0b9b7446b791212b05bf2febf6',
    PrimaryUserName: '93c12adb82dcb2326e7f244420a73504f0b66a9800',
    PrimaryUserPhone: '93e237aacbb41c34a4cbca45cebb2caf677cdac267',
    PrimaryUserEmail: '93e237ab516828fbb28b454c0da493b454cedab858',
    OwnedBy: '9343f8800b3917f26533954918a6388ae8c863507f',
    OwnedByTeam: '9343f8800b9723457d7de946c8bf85a77532ab9e0d',
    AssetTag: '93442459576dd09caeb8d3450cbcaeaaeea4c46a26',
    AssetType: '9343fa3148d08a486879c04daab8a67ad94cc0b2aa',
    AssetStatus: '9379053db492ece14816704ef5a9e3e567e217511b',
    PrimaryUse: '93586dc03ee889ac18e79b49dc8e6ec1003c89a56b',
    Manufacturer: '9343f93b9a15ddf46f6a91472684f7f2098733c7d9',
    Model: '9343f93bb67101661f6d8d49099a2df07c3200ef59',
    SerialNumber: '9343f88b85daf1bc3c475541a48526fdec9dc25960',
    SiteNo: '943f543fe88543540546cc44dd955e641d81b15147',
    OperatingSystem: '93790597a2bebf214063ac4f8096aa5e3ead9b3da5',
    OperatingSystemFamily: '9379059858291f50e1863045e7a1cb4a2d95fc9fe8',
    OperatingSystemGroup: '937905988f0e6309e37e1b42b5a8a1f7e310fab042',
    OperatingSystemServicePack: '9379059b571396878e494345b399d1a54ff0b35a4b',
    BIOSVersion: '93586da53a2feb54ceab49454b98a7dcd67907c732',
    Location: '9461174e330fac0ffd93b04443a9f0135ce9d8cc4d',
    CPUType: '9343fa5c7f2fd2df3f8c3a47bab1888b627d5bcec5',
    NumberCPUs: '9379c72fab79522037c9f14eeeb64d166b8c15dbb8',
    CPUSpeed: '9343fa5d5e68c79d8e08e142238c68832360c16b81',
    SLAName: '938b825e416007fa5cd514477a8c7033c697b51dfb',
    PhysicalMemory: '937905920e4f95299d60a84301b58f7eefa6e0922e',
    VirtualMemory: '937905929065062280e318478eb205c6f823ab0793',
    Video: '9379059be8a89e82cda70c4a7f87e8670367a9ad88',
    Description: '9343f93fc4c8422bcf24e74a9a86035bb7d0248b00',
    Barcode: '93d733148ac57e348128b64c7cb8680e7185d2efeb',
    MACAddress: '9343f9438810f03daeb78f4be5bf58116ffe5b9dda',
    FriendlyName: '93db94f556e932fd3239504767babd1bfb6c013bb6',
    HostName: '937905400191ae67dd03ab4b79968fcbaa264b1a75',
    UserName: '937905962c9109a813f9d5473cb3346e669fb3bbec',
    IPAddress: '9343f943f4c4a38fbe5403469ab01ac8765bb0ae76',
    IPAddresV6: '93c12bc5e2dacf61599b68436981a9476a9dcf7e9d',
    Vendor: '9343f93b7a88c5d9aee8b0408ea5240a689260c6b5',
    ContractID: '9343fa2f3cea2f377bb42b4cf0b69644d6658cc52a',
    PurchaseDate: '9343fa2fb98928bb754d6f4c76af4bafd816356eaa',
    PurchaseType: '93bacb35e2f5dc77bc0ec943a49a71d172b01aa9b2',
    PurchasePrice: '93b9a29d4af0ab33fe6bf449d6a5d212ad71659a09',
  };

  static catalogMapping = {
    Barcode: Printer.fields.Barcode,
    Status: Printer.fields.AssetStatus,
    Requestor: Printer.fields.PrimaryUserName,
    Vendor: Printer.fields.Vendor,
    Cost: Printer.fields.PurchasePrice,
    'Installation Date': Printer.fields.PurchaseDate,
    'Total Cost': Printer.fields.PurchasePrice,
    Campus: Printer.fields.Location,
    'Serial No': Printer.fields.SerialNumber,
  };

  // ---------------------------------- Printer Values ---------------------------------- //

  // ---------------------------------- Printer Technician UI ---------------------------------- //

  static manualFields = [
    {
      displayName: 'Asset Tag',
      businessObjectID: Printer.fields.AssetTag,
    },
    {
      displayName: 'Asset Status',
      businessObjectID: Printer.fields.AssetStatus,
    },
    {
      displayName: 'Assigned To',
      businessObjectID: Printer.fields.OwnedBy,
    },
    {
      displayName: 'Primary User Name',
      businessObjectID: Printer.fields.PrimaryUserName,
    },
    {
      displayName: 'Printer Type',
      businessObjectID: Printer.fields.AssetType,
    },
    {
      displayName: 'Manufacturer',
      businessObjectID: Printer.fields.Manufacturer,
    },
    {
      displayName: 'Model',
      businessObjectID: Printer.fields.Model,
    },
    {
      displayName: 'SerialNumber',
      businessObjectID: Printer.fields.SerialNumber,
    },
  ];

  static manualFields2 = [
    {
      displayName: 'Location',
      businessObjectID: Printer.fields.Location,
    },
    {
      displayName: 'Barcode',
      businessObjectID: Printer.fields.Barcode,
    },
    {
      displayName: 'MAC',
      businessObjectID: Printer.fields.MACAddress,
    },
    {
      displayName: 'Friendly Name',
      businessObjectID: Printer.fields.FriendlyName,
    },
    {
      displayName: 'HostName',
      businessObjectID: Printer.fields.HostName,
    },
    {
      displayName: 'IPAddressV4',
      businessObjectID: Printer.fields.IPAddress,
    },
  ];

  static manualCheckInFields = [
    {
      businessObjectID: Printer.fields.AssetType,
      editType: 3,
      displayName: 'Printer Type',
    },
    {
      businessObjectID: Printer.fields.AssetStatus,
      editType: 3,
      displayName: 'Asset Status',
    },
    {
      businessObjectID: Printer.fields.Location,
      editType: 3,
      displayName: 'Location',
    },
    {
      businessObjectID: Printer.fields.Manufacturer,
      editType: 3,
      displayName: 'Manufacturer',
    },
    {
      dependantBusinessObjectID: Printer.fields.Manufacturer,
      // dependantProductCatalogID: ProductCatalog.fields.ManufacturerName,
      errorMessage: 'Please select Manufacturer first',
      businessObjectID: Printer.fields.Model,
      editType: 3,
      displayName: 'Model',
    },
    {
      businessObjectID: Printer.fields.SerialNumber,
      editType: 1,
      displayName: 'Serial No',
      keyboardType: 'default',
    },
    {
      businessObjectID: Printer.fields.MACAddress,
      editType: 1,
      displayName: 'MAC',
      keyboardType: 'default',
    },
    {
      businessObjectID: Printer.fields.IPAddress,
      editType: 1,
      displayName: 'IPv4 Address',
      keyboardType: 'default',
    },
    {
      businessObjectID: Printer.fields.IPAddresV6,
      editType: 1,
      displayName: 'IPv6 Address',
      keyboardType: 'default',
    },
  ];

  //Printer Items To Show In Detail (Technician)
  static techniciansFieldsToShowInDetail = [
    {
      nameToDisplay: 'Assigned To',
      editable: true,
      editType: 1,
      toRight: true,
      placeHolder: 'Unassigned',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.OwnedBy,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Asset Status',
      editable: true,
      editType: 2,
      toRight: true,
      placeHolder: '- no status on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.AssetStatus,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Location',
      editable: true,
      editType: 3,
      toRight: true,
      placeHolder: '- no location on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.Location,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Primary User',
      editable: true,
      editType: 4,
      toRight: true,
      placeHolder: '- no name on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.PrimaryUserName,
          joinOperator: '',
        },
      ],
    },

    {
      nameToDisplay: 'Asset Tag',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no tag on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.AssetTag,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Device Type',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no type on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.AssetType,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Manufacturer',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no manufacturer on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.Manufacturer,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Model',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no model on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.Model,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Serial Number',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no serial number on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.SerialNumber,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'SLA',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no SLA on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.SLAName,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Site Name',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no site name on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.SerialNumber,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Description',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no description on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.Description,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'MAC',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no MAC on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.MACAddress,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Friendly Name',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no name on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.FriendlyName,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'Host Name',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no name on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.HostName,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'IPv4 Address',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no address on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.IPAddress,
          joinOperator: '',
        },
      ],
    },
    {
      nameToDisplay: 'IPv6 Address',
      editable: false,
      editType: 0,
      toRight: true,
      placeHolder: '- no address on record -',
      fieldsToJoin: [
        {
          fieldId: Printer.fields.IPAddresV6,
          joinOperator: '',
        },
      ],
    },
  ];

  // ---------------------------------- Printer Technician UI ---------------------------------- //
}
