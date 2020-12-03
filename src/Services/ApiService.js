import { processResponse } from './ResponseProcess';

class apiService {
  sendPostWithoutAuth = async (absoluteUrl, data, callback) => {
    await fetch(absoluteUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    }).then((response) => {
      processResponse(response).then((res) => {
        callback(res);
      });
    });
  };

  // return information for user login & incidents
  sendPostWithAuth = async (absoluteUrl, data, callback) => {
    await fetch(absoluteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('login_token'),
      },
      body: JSON.stringify(data),
    }).then((response) => {
      processResponse(response).then((res) => {
        console.dir('RESPONSEEEEE : '+res.message)
        callback(res);
      });
    });
  };

  sendPostWithAuthForLastTouch = (absoluteUrl, data, callback) => {
    fetch(absoluteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: '',
      },
      body: data,
    }).then((response) => {
      processResponse(response).then((res) => {
        callback(res);
      });
    });
  };

  sendGetWithAuth = (absoluteUrl, callback) => {
    fetch(absoluteUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('login_token'),
      },
    }).then((response) => {
      processResponse(response).then((res) => {
        callback(res);
      });
    });
  };

  sendPostWithAttachment = (absoluteUrl, buffer, callback) => {
    fetch(absoluteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('login_token'),
      },
      body: buffer,
    }).then((response) => {
      processResponse(response).then((res) => {
        callback(res);
      });
    });
  };

  // comaround

  sendPostLoginWithAuth = (absoluteUrl, callback) => {
    fetch(absoluteUrl, {
      method: 'POST',
      headers: {
        // 'Sec-Fetch-Mode':'cors',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '9fd993e54c2448d8a26accc67b08a6ff',
      },
      body: JSON.stringify({
        username: 'sreedhar@sigmago.app',
        password: 'Sreedhar2020',
      }),
    }).then((response) => {
      processResponse(response).then((res) => {
        callback(res);
      });
    });
  };

  sendGetWithComAround = (absoluteUrl, callback) => {
    fetch(absoluteUrl, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': '9fd993e54c2448d8a26accc67b08a6ff',
        Authorization: 'Bearer ' + localStorage.getItem('authToken_comaround'),
      },
    }).then((response) => {
      processResponse(response).then((res) => {
        callback(res);
      });
    });
  };

  sendPostWithComaround = (data, absoluteUrl, callback) => {
    fetch(absoluteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '9fd993e54c2448d8a26accc67b08a6ff',
        Authorization: 'Bearer ' + localStorage.getItem('authToken_comaround'),
      },
      body: data,
    }).then((response) => {
      processResponse(response).then((res) => {
        callback(res);
      });
    });
  };

  sendPostWithComAround = (absoluteUrl, data, callback) => {
    fetch(absoluteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '9fd993e54c2448d8a26accc67b08a6ff',
        Authorization: 'Bearer ' + localStorage.getItem('authToken_comaround'),
      },
      body: JSON.stringify(data),
    }).then((response) => {
      callback(response);
    });
  };

  sendLogout = (absoluteUrl, callback) => {
    fetch(absoluteUrl, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('login_token'),
      },
    }).then((response) => {
      callback(response);
    });
  };
}

const Api = new apiService();
export default Api;
