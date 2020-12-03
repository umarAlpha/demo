import {generateFieldObject} from '../../Utility/CommonMethods';
import Knowledge from "../../BussinessObjects/Knowledge";


class KnowledgeArticleBody{

    getFilters = () => {
        let filters = [];
        filters.push(generateFieldObject(Knowledge.fields.Status, "Published" ));
        filters.push(generateFieldObject(Knowledge.fields.VisibletoCustomerPortal, "true"));
        return filters;
    }
    getknowledgeSearchBody = (value) => {
        return {
            "busObId": Knowledge.busObId,
            "searchText": value,
            "fields": Object.values(Knowledge.fields),
            "filters": this.getFilters()
        }
    }

}

let KnowledgeBody = new KnowledgeArticleBody();
export default KnowledgeBody;