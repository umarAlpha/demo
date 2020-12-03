import Cmdb from '../../BussinessObjects/CMDB';
import {
  generateCreateFieldObject,
  generateSortingObject,
} from '../../Utility/CommonMethods';

class CmdbBody {
  getFilters = () => {
    let filters = [];

    const userInfoComment = JSON.parse(
      localStorage.getItem('userInfoComment')
    );

    if (!userInfoComment) {
        return;
    } else {

      filters.push(
        generateCreateFieldObject(Cmdb.fields.primaryUser, userInfoComment.userName)
      );

      return filters;
    }
  };

  allCmdbBody = (pageNumber, pageSize) => {
    return {
      busObId: Cmdb.busObId,
      fields: Object.values(Cmdb.fields),
      filters: this.getFilters(),
      pageNumber: pageNumber,
      pageSize: pageSize,
      sorting: [generateSortingObject(Cmdb.fields.lastModifiedDate, 0)],
    };
  };
}
let cmdbBody = new CmdbBody();
export default cmdbBody;

// , moment().subtract(2, 'hour').format("YYYY/MM/DD h:m:a")
