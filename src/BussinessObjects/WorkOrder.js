

export default class WorkOrder {

    // ---------------------------------- WorkOrder Values ---------------------------------- //

    // ---------------------------------- CORE --------------------------------------------- //

    //WorkOrder BusObID
    static busObId = "93e295c50dec612eb13aa5447d8cd839820d7acd1b"

    // ---------------------------------- CORE --------------------------------------------- //


    // ---------------------------------- FIELDS --------------------------------------------- //

    //WorkOrder Fields
    static fields = {
        "RecID":                    "93e295c50d23f8712da5e847549457d29d04074771",
        "PublicID":                 "93e295c61785da067d727d43abbc26d5683dc5f840",
        "CreatedDateTime":          "93e295c50d5ef70054478b4b329c4b5bdac51723c9",
        "Description":              "93e295c9e9017aeee77e604847b5bb3a711f22fbba",
        "Title":                    "941245d4c7be128ef86479468f97375174c42eb913",
        "Status":                   "93e295c6cbcacdc759607e44cab32f500bdf7f01ee",
        "Service":                  "93e295c77f41abe466b77042d0a35f74ebf120a5fc",
        "Category":                 "93e295c7e62d7c378da4a34c7d9166dd8e8ddee608",
        "SubCategory":              "93e295c865f18ade08fed64e7ebf94459d7521512e",
        "OwnedByTeam":              "93e295c50d2b6f86a920864f4aa5cd21a6a31a4bdc",
        "OwnedBy":                  "93e295c50dbbaaf34191e04bc882f4b24378846fdb",
        "CustomerDisplayName":      "93e295dab91fbf8a85a2f5479ba2872d8f1b622884",
        "CustomerID":               "93e295d002c25bbdd61ee3409380e647249a17464d",
        "Priority":                 "93e295ccba65e15c95731848168a7f92cbc76d8caf",
        "TotalTaskTime":            "940724f718bd09756420e241f8afae2c8201a7e05a",
        "PendingReasons":           "93e30bfa75bc07d6b450e44aa5b221dbe002c77d29",
        "ReviewByDeadline":         "93e30bfcbb520943c5d3554592833e204c8d2a9899",
        "CloseDescription":         "93e295d0b294ee353282ea43c8b36e045c2cf0c80f",
        "ReopenDescription":        "94606385faa03bd723812f483d827c2be857df374e",
        "BuildingCode":             "94071c61545e29bdac42004e838b770e3a280bfe6e",
        "CostCenter":               "9411cc90ba8f13b16f86314631937313acfc27ceed",
        "BuildingName":             "94071c61b5cd7e51ded48a44d49f604cc9feeee4c0",
        "Campus":                   "941197598cdba6ad3892584fb98ee193a1e377d383",
        "Location":                 "93e2adbdd720da902cae9a479aac8d5addd2d914f0",
        "ProposedStartDate":        "93e867138ed6c13d91bca8421cb5084edb3c7931d6",
        "TargetCompletion":         "93f2eda768d05c5566a17d47a48655185f41b70049",
        "lastModifiedDate":         "93e295c50d44a3d7dd35a44464a1a2ac41a6738876",
        "proposedStartDate":        "93e867138ed6c13d91bca8421cb5084edb3c7931d6",
        "completionDate":           "93f2eda768d05c5566a17d47a48655185f41b70049",
        "WorkOrderTypeName":        "93e295d3a4a1e2fd7fb6dc47f19488c183b6aa3ae7",
        "Floor":                    "94071c870cec6ead8e83b54eba8bbb736c8e3cedef"

    };

    // ---------------------------------- FIELDS --------------------------------------------- //


    // ---------------------------------- STATUSES --------------------------------------------- //


    //All WorkOrders Statuses (Customer)
    static allWorkOrderStatuses = [
        "Assigned",
        "Closed",
        "In Progress",
        "New",
        "Pending",
        "Reopened",
        "Work Completed"


    ];

    //Open Work Order Statuses (Customer)
    static openWorkOrderStatuses = [
        "Assigned",
        "In Progress",
        "New",
        "Pending",
        "Reopened",
    ];

    //Closed WorkOrder Statuses (Customer)
    static closedWorkOrderStatuses = [
        "Work Completed",
        "Closed",
    ];


    //My WorkOrder Statuses (Technician)
    static myWorkOrderStatuses =
        [
            "Assigned",
            "In Progress",
            "New",
            "Pending",
            "Reopened",
        ]

    //My Team Unassigned WorkOrder Statuses (Technician)
    static myTeamUnassignedWorkOrderStatuses =
        [
            "Assigned",
            "In Progress",
            "New",
            "Pending",
            "Reopened",
        ];

    //My Team Open WorkOrder Statuses (Technician)
    static myTeamOpenWorkOrderStatuses =
        [
            "Assigned",
            "In Progress",
            "New",
            "Pending",
            "Reopened",
        ]

    // ---------------------------------- STATUSES --------------------------------------------- //


    // ---------------------------------- PRIORITY --------------------------------------------- //

    static hasImpactUrgency = false

    //If hasImpactUrgency = false provide this
    static priorities = [
        "High",
        "Medium",
        "Low"
    ];

    // ---------------------------------- PRIORITY --------------------------------------------- //


    // ---------------------------------- WorkOrder Values ---------------------------------- //


    // ---------------------------------- WorkOrder Customer UI ---------------------------------- //

    //WorkOrder Items To Show In Listing (Customer)
    static customersFieldsToShowInListing= {
        "priority":  {
            "fieldId": WorkOrder.fields.Priority,
            "defaultValue": ""
        },
        "title": {
            "fieldId": WorkOrder.fields.Description,
            "defaultValue": "No description available"
        },
        "subtitle": {
            "label": "Status",
            "value": WorkOrder.fields.Status,
            "defaultValue": ""
        },
        "subtitle2": {
            "label": "Assigned To",
            "value": WorkOrder.fields.OwnedBy,
            "defaultValue": "Unassigned"
        },
        "rightTitle": {
            "fieldId": WorkOrder.fields.PublicID,
            "defaultValue": ""
        }
    }

    //WorkOrder Items To Show In Detail (Customer)
    static customersFieldsToShowInDetail =
        [
            {
                "nameToDisplay":    "Work Order ID",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.PublicID,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Title",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No title available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Title,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Classification",
                "editable":         false,
                "editType":         1,
                "toRight":          true,
                "placeHolder":      "No classification available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Service,
                        "joinOperator": "-"
                    },
                    {
                        "fieldId": WorkOrder.fields.Category,
                        "joinOperator": "-"
                    },
                    {
                        "fieldId": WorkOrder.fields.SubCategory,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Work Order Type",
                "editable":         false,
                "editType":         5,
                "toRight":          true,
                "placeHolder":      "No work order type available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.WorkOrderTypeName,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Status",
                "editable":         false,
                "editType":         4,
                "toRight":          true,
                "placeHolder":      "No status available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Status,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Assigned To",
                "editable":         false,
                "editType":         3,
                "toRight":          true,
                "placeHolder":      "Unassigned",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.OwnedBy,
                        "joinOperator": ""
                    },
                ]
            },
            {
                "nameToDisplay":    "Created Date & Time",
                "editable":         false,
                "editType":         5,
                "toRight":          true,
                "placeHolder":      "No date available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.CreatedDateTime,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Description",
                "editable":         false,
                "editType":         0,
                "toRight":          false,
                "placeHolder":      "No description available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Description,
                        "joinOperator": ""
                    }
                ]
            }
        ];

    // ---------------------------------- WorkOrder Customer UI ---------------------------------- //

    // ---------------------------------- WorkOrder Technician UI ---------------------------------- //

    static specificFormIndexInDetail = 4 //Starting from 0

    //WorkOrder Items To Show In Listing (Technician)
    static techniciansFieldsToShowInListing= {
        "priority":  {
            "fieldId": WorkOrder.fields.Priority,
            "defaultValue": ""
        },
        "title": {
            "fieldId": WorkOrder.fields.Description,
            "defaultValue": "No description available"
        },
        "subtitle": {
            "label": "Status",
            "value": WorkOrder.fields.Status,
            "defaultValue": ""
        },
        "subtitle2": {
            "label": "Assigned To",
            "value": WorkOrder.fields.OwnedBy,
            "defaultValue": "Unassigned"
        },
        "rightTitle": {
            "fieldId": WorkOrder.fields.PublicID,
            "defaultValue": ""
        }
    }

    //WorkOrder Items To Show In Detail (Technician)
    static techniciansFieldsToShowInDetail =
        [
            {
                "nameToDisplay":    "Work Order ID",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.PublicID,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Title",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No title available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Title,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Classification",
                "editable":         true,
                "editType":         1,
                "toRight":          true,
                "placeHolder":      "No classification available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Service,
                        "joinOperator": "-"
                    },
                    {
                        "fieldId": WorkOrder.fields.Category,
                        "joinOperator": "-"
                    },
                    {
                        "fieldId": WorkOrder.fields.SubCategory,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Work Order Type",
                "editable":         true,
                "editType":         10,
                "toRight":          true,
                "placeHolder":      "No work order type available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.WorkOrderTypeName,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Building Code",
                "editable":         true,
                "editType":         9,
                "toRight":          true,
                "placeHolder":      "No building code available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.BuildingCode,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Region/Site",
                "editable":         false,
                "editType":         5,
                "toRight":          true,
                "placeHolder":      "No region/site available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Campus,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Building Name",
                "editable":         false,
                "editType":         5,
                "toRight":          true,
                "placeHolder":      "No building name available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.BuildingName,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Location/Floor/Area",
                "editable":         false,
                "editType":         5,
                "toRight":          true,
                "placeHolder":      "No location/floor/area available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Floor,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Cost Center",
                "editable":         false,
                "editType":         5,
                "toRight":          true,
                "placeHolder":      "No cost center available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.CostCenter,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Status",
                "editable":         true,
                "editType":         4,
                "toRight":          true,
                "placeHolder":      "No status available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Status,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Priority",
                "editable":         true,
                "editType":         2,
                "toRight":          true,
                "placeHolder":      "",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Priority,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Assigned To",
                "editable":         true,
                "editType":         3,
                "toRight":          true,
                "placeHolder":      "Unassigned",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.OwnedBy,
                        "joinOperator": ""
                    },
                ]
            },
            {
                "nameToDisplay":    "Requestor",
                "editable":         true,
                "editType":         5,
                "toRight":          true,
                "placeHolder":      "No requestor available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.CustomerDisplayName,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Created Date & Time",
                "editable":         false,
                "editType":         5,
                "toRight":          true,
                "placeHolder":      "No date available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.CreatedDateTime,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Proposed Start Date",
                "editable":         false,
                "editType":         5,
                "toRight":          true,
                "placeHolder":      "No date available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.ProposedStartDate,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Target Completion Date",
                "editable":         false,
                "editType":         5,
                "toRight":          true,
                "placeHolder":      "No date available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.TargetCompletion,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Description",
                "editable":         false,
                "editType":         0,
                "toRight":          false,
                "placeHolder":      "No description available",
                "fieldsToJoin": [
                    {
                        "fieldId": WorkOrder.fields.Description,
                        "joinOperator": ""
                    }
                ]
            }
        ];

    // ---------------------------------- WorkOrder Technician UI ---------------------------------- //


}
