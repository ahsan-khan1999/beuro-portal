import axios from "axios";

import { getToken, logout } from "../utils/auth.util";

const STAGING_API_URL = " https://staging.kaufes.ch/api";
export const GOOGLE_REDIRECT_URL = "http://accounts.google.com/o/oauth2/v2/auth?client_id=718932924527-4em9535lb3p3nijpdvr41g6aubpqlfmr.apps.googleusercontent.com&redirect_uri=http://localhost:3000/login/oauth/google&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&access_type=offline&prompt=consent";
export const FB_REDIRECT_URL = "https://www.facebook.com/v15.0/dialog/oauth?client_id=898431498260472&redirect_uri=http://localhost:3000/login/oauth/facebook&scope=email&response_type=code&auth_type=rerequest&display=popup";

export const GOOGLE_CONNECT_REDIRECT_URL = "http://accounts.google.com/o/oauth2/v2/auth?client_id=718932924527-4em9535lb3p3nijpdvr41g6aubpqlfmr.apps.googleusercontent.com&redirect_uri=http://localhost:3000/user-account-settings/login-and-security-settings?provider=google&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&access_type=offline&prompt=consent";
export const FB_CONNECT_REDIRECT_URL = "https://www.facebook.com/v15.0/dialog/oauth?client_id=898431498260472&redirect_uri=http://localhost:3000/user-account-settings/login-and-security-settings?provider=facebook&scope=email&response_type=code&auth_type=rerequest&display=popup";
export const BASEURL = STAGING_API_URL;

// const BASE_URL = "https://dmfr-dev-machine3.herokuapp.com/api/v1/";
export async function getApiRequestHeader() {
  const authToken = await getToken();
  const key = authToken?.key || "";
  const type = authToken?.type || "";
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    accessToken: authToken,
    lang: JSON.parse(localStorage.getItem("locale")),
  };
}
//
const instance = axios.create({
  baseURL: BASEURL,
  timeout: 60000,
  withCredentials: false,
  dataType: "jsonp",
});

export async function updateHeaders() {
  const header = await getApiRequestHeader();
  instance.defaults.headers = header;
}

export async function request({ method, url, data, headers }) {
  if (headers === undefined) {
    await updateHeaders();
  }
  const promise = instance[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    if (error?.response?.data?.code === 401) {
      logout();
      window.location = "/";
    }
    throw error.response;
  }

  return response;
}

export async function newRequest({ method, url, data, headers }) {
  if (headers === undefined) {
    await updateHeaders();
  }
  const promise = instance[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    if (error?.response?.data?.code === 401) {
      logout();
      window.location = "/";
    }
    throw error.response;
  }

  if (
    response.status
      ? response.status.toString().indexOf("2") !== 0
      : response.data.status.toString().indexOf("2") !== 0
  ) {
    // eslint-disable-next-line
    throw { response };
  } else {
    return response.data;
  }
}

export async function get(url, params, featureAndAction, config) {
  for (var key in params) {
    url = url + "" + params[key];
  }
  return request({ method: "get", url, data: { featureAndAction }, ...config });
}

export async function del(url, params, config) {
  return request({ method: "delete", url, data: { params }, ...config });
}

export async function post(url, data, featureAndAction, config, file) {
  return request({ method: "post", url, data, ...config, file });
}

export async function put(url, data, config) {
  return newRequest({ method: "put", url, data, ...config });
}

export async function patch(url, data, config) {
  return newRequest({ method: "patch", url, data, ...config });
}

export const independentRequest = async (url, method, data) => {
  const promise = axios[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    throw error.response;
  }
  const payload = response;
  return payload;
};
