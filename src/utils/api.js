import axios from "axios";
import ClearSession from "./ClearSession";

export const BASEURL = 'https://api.cmemove.com';
const apiBaseUrl = `${BASEURL}/api/`;
const APIUser = `${apiBaseUrl}user/`


export const ApiUrl = {
  signup: `${APIUser}signup`,
  accountVerification: `${APIUser}account/verification`,
  login: `${APIUser}login`,
  forgotPassword: `${APIUser}forgot/password`,
  resetPassword: `${APIUser}reset/password`,
};

export const APIRequest = async (config = {}, onSuccess, onError, noAuth = null) => {

  const token = JSON.parse(localStorage?.getItem('data'));

  try {
    let data = {};
    if (token && noAuth == null) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        // timeout: 180000, // Wait for 5 seconds
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
    }
    // console.log(data);
    axios(data)
      .then(res => {
        console.log(res, 'api--------');
        if (!res?.data?.error) {
          onSuccess(res?.data);
        } else {
          if (res?.data?.message === 'Token expired please login again.') {
            ClearSession()
            window.location.reload();
          }
          onError(res?.data ? res.data : res);
        }
      })
      .catch(err => {
        console.log(err, 'catch--');
        if (err?.response?.data?.message === 'Token expired please login again.') {
          ClearSession()
          window.location.reload();
        }
        onError(err?.response?.data ? err?.response.data : err?.response);
      });
  } catch (error) {
    console.log("error", error);
  }
};

export const APIRequestWithFile = async (config = {}, onSuccess, onError) => {
  const token = JSON.parse(localStorage.getItem("data"));

  try {
    let data;
    if (token) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      };
    }

    console.log('config', data);
    axios(data)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          console.log(res.data);
          onSuccess(res.data);
        }
      })
      .catch(err => {
        onError(err?.response);
      });
  } catch (error) {
    console.log(error);
  }
};
