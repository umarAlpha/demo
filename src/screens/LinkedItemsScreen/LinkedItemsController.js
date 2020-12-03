import CmdbModel from '../../Models/CMDBLinkedItems/Model';
import CmdbBody from '../../Models/CMDBLinkedItems/Body';

import RESPONSE from '../../Services/HttpResponse';

class LinkedItemsController {
  getAllLinkedItems = (pageNumber, pageSize, callback) => {
    CmdbModel.getAllLinkedItems(
      CmdbBody.allCmdbBody(pageNumber, pageSize),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  
  getLinkedItemsDetails = (busobid, busobrecid, callback) => {
    CmdbModel.getLinkedItemDetails({ busobid, busobrecid }, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(
          RESPONSE(true, '', res.data.response)
        );
      }
    });
  };
}

const linkedItemController = new LinkedItemsController();
export default linkedItemController;
