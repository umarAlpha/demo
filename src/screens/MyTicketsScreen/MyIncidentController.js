import IncModel from '../../Models/Incidents/Model';
import IncBody from '../../Models/Incidents/Body';

import RESPONSE from '../../Services/HttpResponse';
import Incident from '../../BussinessObjects/Incident';

class MyIncidents {
  allIncidents = (pageNumber, pageSize, callback) => {
    IncModel.getIncidents(
      IncBody.allIncidentBody(pageNumber, pageSize),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  incidentsWithStatus = (status, pageNumber, pageSize, callback) => {
    IncModel.getIncidents(
      IncBody.IncidentBodyWithStatus(status, pageNumber, pageSize),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  openIncidentsPaging = (pageNumber, pageSize, callback) => {
    IncModel.getIncidents(
      IncBody.openIncidentBodyWithPage(pageNumber, pageSize),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  closeIncidentsPaging = (pageNumber, pageSize, callback) => {
    IncModel.getIncidents(
      IncBody.closeIncidentBodyWithPage(pageNumber, pageSize),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  allIncidentsBySearchText = (page, perPage, text, callback) => {
    IncModel.getIncidentsBySearch(
      IncBody.allIncidentBodyBySearch(page, perPage, text),
      (res) => {
        if (!res.success) {
          callback(RESPONSE(false, res.message, ''));
        } else {
          callback(RESPONSE(true, '', res.data.response));
        }
      }
    );
  };

  allPostComments = (recID, comment, callback) => {
    IncModel.postComments(IncBody.postCommentsBody(recID, comment), (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  getPostComments = (recId, callback) => {
    let body = IncBody.getCommentsBody(recId);

    IncModel.getComments(body, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  getIncidentRelatedAttachments = (busobid, busObRecId, callback) => {
    IncModel.getAttachments(busobid, busObRecId, (res) => {
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };

  postIncidentRelatedAttachments = (file, recid, callback) => {
    let busObId = Incident.busObId;
    let fileSize = file.size;
    let fileName = file.name;

    this.getBase64(file, (res) => {
      IncModel.postAttachments(
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

  allWithDrawTickets = (busObRecId, status, closeTicketText, callback) => {
    let body = IncBody.getResolveTicketBody(
      busObRecId,
      status,
      closeTicketText
    );
    IncModel.searchWithDrawForOpenIncidents(body, (res) => {
      console.log('Response Withdrawl Controller', res);
      if (!res.success) {
        callback(RESPONSE(false, res.message, ''));
      } else {
        callback(RESPONSE(true, '', res.data.response));
      }
    });
  };
}

let MyIncidentController = new MyIncidents();
export default MyIncidentController;
