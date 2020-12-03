import OrderModel from '../../Models/WorkOrders/Model';
import OrdersBody from '../../Models/WorkOrders/Body';

import RESPONSE from '../../Services/HttpResponse';

import WordOrder from '../../BussinessObjects/WorkOrder';

class WorkOrders {
  allOrders = (page, perPage,callback) => {
    // const body = 
    // console.log('Body => ', body);
    OrderModel.getworkOrders(OrdersBody.allWorkOrdersBody(page, perPage), (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  allOrdersByText = (searchText, callback) => {
    // const body = OrdersBody.allWorkOrdersBody();
    // console.log('Body => ', body);
    OrderModel.getworkOrders(OrdersBody.allWorkOrdersBodyBySearch(searchText), (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  allPostComments = (recID, comment, callback) => {
    OrderModel.postComments(
      OrdersBody.postCommentsBody(recID, comment),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  getPostComments = (recId, callback) => {
    let body = OrdersBody.getCommentsBody(recId);
    // console.log('Body =>', body);
    OrderModel.getComments(body, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  getIncidentRelatedAttachments = (busobid, busObRecId, callback) => {
    OrderModel.getAttachments(busobid, busObRecId, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  postIncidentRelatedAttachments = (file, recid, callback) => {
    let busObId = WordOrder.busObId;
    let fileSize = file.size;
    let fileName = file.name;

    this.getBase64(file, (res) => {
      OrderModel.postAttachments(
        res,
        recid,
        busObId,
        fileSize,
        fileName,
        (res) => {
          if (!res.success) {
            callback(RESPONSE(false, res.message, ''));
          } else {
            callback(RESPONSE(true, '', res.data.response));
          }
        }
      );
    });
  };

  getBase64(file, callback) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}

let WorkOrdersController = new WorkOrders();
export default WorkOrdersController;
