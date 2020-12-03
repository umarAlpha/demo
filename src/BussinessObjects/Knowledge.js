


export default class Knowledge {

    // ---------------------------------- Knowledge Values ---------------------------------- //

    // ---------------------------------- CORE --------------------------------------------- //

    //Knowledge BusObID
    static busObId = "934c68436065e717e2d7ca4e9992f112d80031cedc"

    // ---------------------------------- CORE --------------------------------------------- //


    // ---------------------------------- FIELDS --------------------------------------------- //

    //Knowledge Fields
    static fields = {
        "Title":                        "9366b34dca8b66d61860374ba1b5eac1a297ca8539",
        "Description":                  "934c68441f4b74cc97e1f14ca79757b54f556f8fda",
        "CreatedBy":                    "934c684360fc04b9cbb28141c7aef01a49fff58215",
        "BodyText":                     "934c68449210424fd3609b4d0cbfc8bcf03ae06698",
        "ArticleID":                    "938d8d93ea7ad2c44e674748ad80f790f60fa6dc10",
        "Status":                       "9366b34e57ce9dc2514b7b47c4a4f5c457a02749c6",
        "VisibletoCustomerPortal":      "936854eb9d55a6dbe922444a499e452ba55e7c4e27",
        "KnowledgeArticleID":           "934c686d6f4c785755c57a49f08c1f544db0224942"
    }

    // ---------------------------------- FIELDS --------------------------------------------- //


    // ---------------------------------- STATUSES --------------------------------------------- //

    //Knowledge Statuses (Customer)
    static customerStatuses =
        [
            "Published"
        ]

    //Knowledge Statuses (Technician)
    static technicianStatuses =
        [
            "Published"
        ]

    // ---------------------------------- STATUSES --------------------------------------------- //



    // ---------------------------------- Knowledge Values ---------------------------------- //


    // ---------------------------------- Knowledge Customer UI ---------------------------------- //

    //Knowledge Items To Show In Listing (Customer)
    static customersFieldsToShowInListing= {
        "title": {
            "fieldId": Knowledge.fields.Title,
            "defaultValue": "No title available"
        },
        "subtitle": {
            "label": "Article ID",
            "value": Knowledge.fields.KnowledgeArticleID,
            "defaultValue": ""
        },
    }

    //Knowledge Items To Show In Detail (Customer)
    static customersFieldsToShowInDetail =
        [
            {
                "nameToDisplay":    "Article ID",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "",
                "fieldsToJoin": [
                    {
                        "fieldId": Knowledge.fields.KnowledgeArticleID,
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
                        "fieldId": Knowledge.fields.Title,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Created By",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No created by available",
                "fieldsToJoin": [
                    {
                        "fieldId": Knowledge.fields.CreatedBy,
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
                        "fieldId": Knowledge.fields.Description,
                        "joinOperator": ""
                    }
                ]
            }
        ];
    // ---------------------------------- Knowledge Customer UI ---------------------------------- //

    // ---------------------------------- Knowledge Technician UI ---------------------------------- //

    //Knowledge Items To Show In Listing (Technician)
    static techniciansFieldsToShowInListing= {
        "title": {
            "fieldId": Knowledge.fields.Title,
            "defaultValue": "No title available"
        },
        "subtitle": {
            "label": "Article ID",
            "value": Knowledge.fields.KnowledgeArticleID,
            "defaultValue": ""
        },
    }

    //Knowledge Items To Show In Detail (Technician)
    static techniciansFieldsToShowInDetail =
        [
            {
                "nameToDisplay":    "Article ID",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "",
                "fieldsToJoin": [
                    {
                        "fieldId": Knowledge.fields.KnowledgeArticleID,
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
                        "fieldId": Knowledge.fields.Title,
                        "joinOperator": ""
                    }
                ]
            },
            {
                "nameToDisplay":    "Created By",
                "editable":         false,
                "editType":         0,
                "toRight":          true,
                "placeHolder":      "No created by available",
                "fieldsToJoin": [
                    {
                        "fieldId": Knowledge.fields.CreatedBy,
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
                        "fieldId": Knowledge.fields.Description,
                        "joinOperator": ""
                    }
                ]
            }
        ];

    // ---------------------------------- Knowledge Technician UI ---------------------------------- //

}
