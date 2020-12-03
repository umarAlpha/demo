

export default class SystemAlert {

    // ---------------------------------- System Alert Values ---------------------------------- //

    // ---------------------------------- CORE --------------------------------------------- //

    //System Alert BusObID
    static busObId = "9344be92d5b7b4c290437c4110bc5b7147c9e3e98a"

    //System Alert Incident Relationship ID
    static incidentRelationshipID = "9345e410aaad86b885c83940079b0637620426c678";

    //TODO
    //System Alert WorkOrder Relationship ID
    static workorderRelationshipID = "9345e410aaad86b885c83940079b0637620426c678";

    static VisibleInPortal =        "936854d9a947d6a37945a5475293faab8e3ef833d7";

    // ---------------------------------- CORE --------------------------------------------- //


    // ---------------------------------- FIELDS --------------------------------------------- //

    //System Alert Fields
    static fields = {
        "RecID":                  "9344be92d538d446e869c34fbd960a636cfed3ce1c",
        "PublicID":               "9344bec6085926b8cf428a4990837fccd613335362",
        "Description":            "9344be975fb5d76c1294824785ad1a01f1e472c75e",
        "ShortDescription":       "9353f48f8a0535ef053bd6422aa6b52b7b2a4bead2",
        "Status":                 "9344be9627817eb45075f64318b6be429bb434a3ee",
        "Service":                "9385bbca55c001402895eb488587d61d412290f053",
        "Category":               "9344be9687e08cf5564f484fc7964b23ea12980b32",
        "SubCategory":            "9344be96b8fd26ab95cfd64547b878443ab24a5752",
        "OwnedBy":                "9344be92d5f0eee729043d4fa091bfe1d876f56370",
        "OwnedByTeam":            "9344be92d55d52424af6064d689dfb4926a874edbc",
        "OwnedByID":              "9344be92d54be320b34c784a059699f2ac385e5c01",
        "Priority":               "9366613f79b84ed193c3054bfca1c632e08fd43d6e",
        "WorkAround":             "9344bea81cba6568493f9f4997928bf9a30f81be8d",
        "Resolution":             "9344beaa751a90c4e0839f49ac83d05ba89d9be70f",
        "impact":                 "9366613fbc32f1bcfe94874ca18616641ca1efa64f",
        "urgency":                "9366613fa14833e382e8c640fcafe9e4b52a87e690",
        "lastModifiedDate":       "93543557882ad94503745843c9a380aa0c380935c8",
    }

    // ---------------------------------- FIELDS --------------------------------------------- //


    // ---------------------------------- STATUSES --------------------------------------------- //

    //System Alert Statuses (Customer)
    static customerStatuses =
        [
            "New",
            "Assigned",
            "Work in Progress",
            "Pending Change",
        ]

    //System Alert Statuses (Technician)
    static technicianStatuses =
        [
            "New",
            "Assigned",
            "Work in Progress",
            "Pending Change",
        ]

    // ---------------------------------- STATUSES --------------------------------------------- //



    // ---------------------------------- System Alert Values ---------------------------------- //


    // ---------------------------------- System Alert Customer UI ---------------------------------- //

    //System Alert Items To Show In Listing (Customer)
    static customersFieldsToShowInListing= {
        "title": {
            "fieldId": SystemAlert.fields.ShortDescription,
            "defaultValue": "No short description available"
        },
        "subtitle": {
            "label": "Status",
            "value": SystemAlert.fields.Status,
            "defaultValue": ""
        },
        // "subtitle2": {
        //     "label": "",
        //     "value": SystemAlert.fields.Description,
        //     "defaultValue": ""
        // }
    }

    //System Alert Items To Show In Detail (Customer)
    static customersFieldsToShowInDetail =
        [
            {
                "nameToDisplay":    "Problem ID",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.PublicID,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Short Description",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No short description available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.ShortDescription,
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
                        "fieldId": SystemAlert.fields.Status,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Service",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No service available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.Service,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Category",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No category available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.Category,
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
                        "fieldId": SystemAlert.fields.OwnedBy,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Description",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No description available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.Description,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Work Around",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No work around available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.WorkAround,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Resolution",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No resolution available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.Resolution,
                        "joinOperator": ""
                    }
                ]
            }
        ];

    // ---------------------------------- System Alert Customer UI ---------------------------------- //

    // ---------------------------------- System Alert Technician UI ---------------------------------- //

    //System Alert Items To Show In Listing (Technician)
    static techniciansFieldsToShowInListing= {
        "title": {
            "fieldId": SystemAlert.fields.ShortDescription,
            "defaultValue": "No short description available"
        },
        "subtitle": {
            "label": "Status",
            "value": SystemAlert.fields.Status,
            "defaultValue": ""
        },
        // "subtitle2": {
        //     "label": "",
        //     "value": SystemAlert.fields.Description,
        //     "defaultValue": ""
        // }
    }

    //System Alert Items To Show In Detail (Technician)
    static techniciansFieldsToShowInDetail =
        [
            {
                "nameToDisplay":    "Problem ID",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.PublicID,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Short Description",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No short description available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.ShortDescription,
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
                        "fieldId": SystemAlert.fields.Status,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Service",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No service available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.Service,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Category",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No category available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.Category,
                        "joinOperator": ""
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
                        "fieldId": SystemAlert.fields.Priority,
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
                        "fieldId": SystemAlert.fields.OwnedBy,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Description",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No description available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.Description,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Work Around",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No work around available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.WorkAround,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Resolution",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No resolution available",
                "fieldsToJoin": [
                    {
                        "fieldId": SystemAlert.fields.Resolution,
                        "joinOperator": ""
                    }
                ]
            }
        ];



    // ---------------------------------- System Alert Technician UI ---------------------------------- //

}
