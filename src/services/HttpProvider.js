import axios from "axios";
import { getRefreshToken, getToken, logout } from "../utils/auth.util";

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

export const BASEURL = API_DOMAIN + "/api";

export const TAX_PERCENTAGE = "8.1";
export async function getApiRequestHeader() {
  const [authToken, refreshToken] = await Promise.all([
    getToken(),
    getRefreshToken(),
  ]);
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    accessToken: authToken,
    refreshToken: refreshToken,
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
    showError(
      translate(`validationMessages.${error?.response?.data?.message}`)
    );

    if (error?.response?.data?.code === 401) {
      logout();
      window.location = "/";
    }
    throw error.response;
  }
  return response;
}

export async function deleteRequestWithBody({ method, url, data, headers }) {
  if (headers === undefined) {
    await updateHeaders();
  }

  const promise = instance[method](url, data);
  let response;
  try {
    response = await promise;
  } catch (error) {
    showError(
      translate(`validationMessages.${error?.response?.data?.message}`)
    );

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
    showError(
      translate(`validationMessages.${error?.response?.data?.message}`)
    );

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

// export async function get(url, params, featureAndAction, config) {
//   if (config.detail) {
//     url = url + "/" + params;
//   } else {
//     for (var key in params) {
//       if ("filter" in params && !url.includes("filter")) {
//         if (url.includes("?")) url = url + "&" + "filter" + "=" + JSON.stringify(params["filter"]);
//         else url = url + "?" + "filter" + "=" + JSON.stringify(params["filter"]);
//       }
//       if (!url.includes(key))
//         if (url.includes("?")) url = url + "&" + key + "=" + params[key];
//         else url = url + "?" + key + "=" + params[key];

//     }
//   }
//   return request({ method: "get", url, data: { featureAndAction }, ...config });
// }
export async function get(url, params, featureAndAction, config) {
  const { filter, ...otherParams } = params;
  let queryParams = {};
  if (config.detail) {
    url = `${url}/${filter}`;
    return request({
      method: "get",
      url: url,
      data: { featureAndAction },
      ...config,
    });
  }

  if (filter && !url.includes("filter")) {
    queryParams.filter = JSON.stringify(filter);
  }

  for (const key in otherParams) {
    if (!url.includes(key)) {
      queryParams[key] = otherParams[key];
    }
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  return request({
    method: "get",
    url: fullUrl,
    data: { featureAndAction },
    ...config,
  });
}

export async function del(url, params, config) {
  return request({ method: "delete", url, data: { params }, ...config });
}

export async function delWithReqBody(url, data, config) {
  return deleteRequestWithBody({
    method: "delete",
    url,
    data: { data },
    ...config,
  });
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

// dispatch(readCustomerDetail({ params: { filter: "65436739f4a8c09ef4669708" } }))
// dispatch(readCustomer({ params: { filter: { sortBy: "desc", name: "test", type: "none" }, page: 1, size: 10 } }))
