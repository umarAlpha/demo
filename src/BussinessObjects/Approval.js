

export default class Approval {

    // ---------------------------------- Approval Values ---------------------------------- //

    // ---------------------------------- CORE --------------------------------------------- //

    //Approval BusObID
    static busObId = "9365cb7b67ed209761d15d4069a4ea68426485d2ca"

    // ---------------------------------- CORE --------------------------------------------- //

    // ---------------------------------- FIELDS --------------------------------------------- //


    //Approval Fields
    static fields = {
        "RecID":              "9365cb7b67777cf812505941e19a7f5c3e10ad09df",
        "ApprovalID":         "9365cb7b6777331102578944ee873ff934f99983d6",
        "ParentTypeName":     "9365cb7fa8ea96a6db87e54207a8515239372ea44a",
        "ParentTypeID":       "9365cb7f5e967a27e609e64313a3fc7f26e8ba1bc1",
        "ApproverTypeID":     "9365cb884d3a30af2153ed486781dc50e40299d07b",
        "Status":             "9365cb80e88e6affbef09742ff9c4e307308db01c7",
        "Details":            "9365cb7ee55caa0df558894af0a04b9295ea904cf7",
        "ApprovalComments":   "9365e72c8d8309d45cc4fa475bae13ad6456bdce14",
        "ApprovalTeam":       "9365cb7e8d690f18d3fde64ee6a9e081d2cb8ab59d",
        "Deadline":           "9365cb814637d12aeb5ca24437abb89e33e3286d74",
        "ParentRecID":        "9365cb80465c18dc72402049d8a1e744b0812af9f3",
        "ParentBusObID":      "9365cb7f5e967a27e609e64313a3fc7f26e8ba1bc1",
        "ApproverID":         "9365cb7cbd8cee3ab7de89432a8ed8641e73e606db",
        "ApproverName":       "9365cb7d9fe5f5a0a6b6c0432085d08bddf6690aff",
        "lastModifiedDate":   "9365cb7b67886e05f90a7c46d4930fcb31cbd4b02d",

    }

    // ---------------------------------- FIELDS --------------------------------------------- //

    // ---------------------------------- STATUSES --------------------------------------------- //



    //Approval Statuses (Customer)
    static customerStatuses =
        [
            "Waiting"
        ]

    //Approval Statuses (Technician)
    static technicianStatuses =
        [
            "Waiting"
        ]

    // ---------------------------------- STATUSES --------------------------------------------- //


    // ---------------------------------- Approval Values ---------------------------------- //

    // ------------------------------------------------------------------------------------ //

    // ---------------------------------- Approval Customer UI ---------------------------------- //

    //Approval Items To Show In Listing (Customer)
    static customersFieldsToShowInListing= {
        "subtitle": {
            "label": "Type",
            "value": Approval.fields.ParentTypeName,
            "defaultValue": "No Parent Type available"
        },
        "subtitle2": {
            "label": "",
            "value": Approval.fields.Details,
            "defaultValue": "No details available"
        },
        "rightTitle": {
            "fieldId": Approval.fields.ApprovalID,
            "defaultValue": ""
        }
    };

    //Approval Items To Show In Detail (Customer)
    static customersFieldsToShowInDetail =
        [
            {
                "nameToDisplay":    "Approval ID",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No Approval ID available",
                "fieldsToJoin": [
                    {
                        "fieldId": Approval.fields.ApprovalID,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Deadline",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No deadline available",
                "fieldsToJoin": [
                    {
                        "fieldId": Approval.fields.Deadline,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Details",
                "editable":         false,
                "editType":         0,
                "toRight":          false,
                "placeHolder":      "No details available",
                "fieldsToJoin": [
                    {
                        "fieldId": Approval.fields.Details,
                        "joinOperator": ""
                    }
                ]
            }
        ];

    // ---------------------------------- Approval Customer UI ---------------------------------- //

    // ------------------------------------------------------------------------------------------- //

    // ---------------------------------- Approval Technician UI ---------------------------------- //


    //Approval Items To Show In Listing (Technician)
    static techniciansFieldsToShowInListing= {
        "subtitle": {
            "label": "Type",
            "value": Approval.fields.ParentTypeName,
            "defaultValue": "No Parent Type available"
        },
        "subtitle2": {
            "label": "",
            "value": Approval.fields.Details,
            "defaultValue": "No details available"
        },
        "rightTitle": {
            "fieldId": Approval.fields.ApprovalID,
            "defaultValue": ""
        }
    }


    //Approval Items To Show In Detail (Technician)
    static techniciansFieldsToShowInDetail =
        [
            {
                "nameToDisplay":    "Approval ID",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "",
                "fieldsToJoin": [
                    {
                        "fieldId": Approval.fields.ApprovalID,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Deadline",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No deadline available",
                "fieldsToJoin": [
                    {
                        "fieldId": Approval.fields.Deadline,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Details",
                "editable":         false,
                "editType":         0,
                "toRight":          false,
                "placeHolder":      "No details available",
                "fieldsToJoin": [
                    {
                        "fieldId": Approval.fields.Details,
                        "joinOperator": ""
                    }
                ]
            }
        ];

    // ---------------------------------- Approval Technician UI ---------------------------------- //

}
