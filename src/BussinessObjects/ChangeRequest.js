


export default class ChangeRequest {

    // ---------------------------------- Change Request Values ---------------------------------- //

    // ---------------------------------- CORE --------------------------------------------- //

    //Change Request BusObID
    static busObId = "934ec7a1701c451ce57f2c43bfbbe2e46fe4843f81"

    // ---------------------------------- CORE --------------------------------------------- //

    // ---------------------------------- FIELDS --------------------------------------------- //

    //Change Request Fields
    static fields = {
        "RecID":                    "934ec7a1704ca2736b712141c3a5bcdb9ef2119e25",
        "ChangeID":                 "934ec7a538b8dc067b5ad944d5bbf774e57d9c0321",
        "Description":              "934fb3e2b82015e7ec07fa41098a9efcb20b1e49d6",
        "Priority":                 "9354dcca99182336a9c01041fb854517a89acb9075",
        "Status":                   "93543f5c71a782465c27994bba9bd8f1dece6dded8",
        "Service":                  "9386ceb0a1cf07d3d6740946708305e2bf7c1b3a64",
        "Category":                 "934fb3e3db66738d8ac2204605ba5e5ac5ca4e2e85",
        "OwnedBy":                  "934ec7a170e1d8005729724214aa17425f3922c789",
        "CustomerEmail":            "93bb0cee02b22c993044254eb396d16854d71ad05d",
        "ProposedStartDate":        "9366b32e039ad120b52dd04c439ab1e106d6a44971",
        "ScheduledEndDate":         "9366b32e6f6d8a258d318f41a28462983e01f1539d",
        "CustomerDisplayName":              "93543f7fa541b6c5befc264642875724a8be1797d1",
        "Type":                     "93e087d5c4133875726485473a8bd4c2a14fa954da",
        "CreatedDateTime":          "934ec7a1705fa38b2a9d714f8a82e811bf0ac1f506"
    }

    // ---------------------------------- FIELDS --------------------------------------------- //



    // ---------------------------------- Change Request Values ---------------------------------- //

    // ---------------------------------- Change Request Customer UI ---------------------------------- //

    static customersFieldsToShowInDetail =
        [
            {
                "nameToDisplay":    "Change Request ID",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.ChangeID,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Type",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No type available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.Type,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Classification",
                "editable":         true,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No Classification available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.Service,
                        "joinOperator": "-"
                    },
                    {
                        "fieldId": ChangeRequest.fields.Category,
                        "joinOperator": "-"
                    }
                ]
            },

            {
                "nameToDisplay":    "Status",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No Status Available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.Status,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Assigned To",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "Unassigned",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.OwnedBy,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Requestor Name",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No requestor available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.RequestedBy,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Created Date & Time",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No date available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.CreatedDateTime,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Proposed Start Date",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No date available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.ProposedStartDate,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Proposed End Date",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No date available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.ScheduledEndDate,
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
                        "fieldId": ChangeRequest.fields.Description,
                        "joinOperator": ""
                    }
                ]
            }
        ];

    // ---------------------------------- Change Request Customer UI ---------------------------------- //

    // ---------------------------------- Change Request TECHNICIAN UI ---------------------------------- //

    //Change Request Items To Show In Detail (Technician)
    static techniciansFieldsToShowInDetail =
        [
            {
                "nameToDisplay":    "Change Request ID",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.ChangeID,
                        "joinOperator": ""
                    }
                ]
            },

            {
                "nameToDisplay":    "Type",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No type available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.Type,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Classification",
                "editable":         true,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No classification available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.Service,
                        "joinOperator": "-"
                    },
                    {
                        "fieldId": ChangeRequest.fields.Category,
                        "joinOperator": "-"
                    }
                ]
            },
            {
                "nameToDisplay":    "Priority",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No priority available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.Priority,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Status",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No status available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.Status,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Assigned To",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "Unassigned",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.OwnedBy,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Requestor Name",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No requestor available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.RequestedBy,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Created Date & Time",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No date available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.CreatedDateTime,
                        "joinOperator": ""
                    }
                ]
            },

            {
                "nameToDisplay":    "Proposed Start & Date",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No date available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.ProposedStartDate,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Scheduled End & Date",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No date available",
                "fieldsToJoin": [
                    {
                        "fieldId": ChangeRequest.fields.ScheduledEndDate,
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
                        "fieldId": ChangeRequest.fields.Description,
                        "joinOperator": ""
                    }
                ]
            }
        ];

    // ---------------------------------- Change Request TECHNICIAN UI ---------------------------------- //

}
