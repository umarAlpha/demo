import NetworkClient from '../../Services/ApiClient';
import RESPONSE from '../../Services/HttpResponse';

class CMDBLinkedItemsModal {
  getAllLinkedItems = (linked_body, callback) => {
    NetworkClient.getSearchResults(linked_body, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  };

  getLinkedItemDetails = (linkedItemBosIds, callback) => {
    NetworkClient.getLinkedItemDetails(linkedItemBosIds, (res) => {
      let hasError = res.response.hasError;

      if (hasError) {
        let error = res.response.errorMessage;
        callback(RESPONSE(false, error, ''));
      } else {
        callback(RESPONSE(true, '', res));
      }
    });
  }
}

const cmdbLinkedItemsModal = new CMDBLinkedItemsModal();
export default cmdbLinkedItemsModal;
