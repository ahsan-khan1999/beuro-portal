import localStore from "./localstore.util";
import { updateHeaders } from "../services/HttpProvider";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import Image from "next/image";
export const getToken = () => getCookie("buroToken");
export const getRefreshToken = () => getCookie("buroRefreshToken");

export const setToken = (token) =>
  setCookie("buroToken", token, {
    httpOnly: false,
    sameSite: true,
    secure: false,
  });
export const setRefreshToken = (token) =>
  setCookie("buroRefreshToken", token, {
    httpOnly: false,
    sameSite: true,
    secure: false,
  });

export const setUserRole = (token) =>
  localStore.store_data("buroUserRole", token);
export const getUser = () => getCookie("buroUser");

export const saveUser = (user) => setCookie("buroUser", user);

export const logout = async () => {
  Promise.all[
    (deleteCookie("buroToken"),
    deleteCookie("buroRefreshToken"),
    deleteCookie("buroUser"),
    localStore.remove_data("buroUserRole"),
    localStore.remove_data("fcm"),
    localStore.remove_data("roomToken"),
    localStore.remove_data("ChatUser"),
    localStore.remove_data("chatToken"),
    localStore.remove_data("offer"),
    localStore.remove_data("lead"),
    updateHeaders())
  ];

  return true;
};

class Auth {
  constructor() {
    this.user = {};
  }

  async setUserFromLocal() {
    const user = await getToken();
    this.user = user ? user : {};
  }

  set setUser(user) {
    this.user = user;
  }

  get getUser() {
    return this.user;
  }

  async logout() {
    await logout();
    this.user = {};
  }
}

export const authClass = new Auth();

export const envCheck = () => {
  if (
    window.location.origin === "https://ewvillabd.com" ||
    window.location.origin === "https://www.ewvillabd.com" ||
    window.location.origin === "www.ewvillabd.com"
  )
    return "PROD";
  else if (
    window.location.origin === "https://ewvm.herokuapp.com" ||
    window.location.origin === "https://www.ewvm.herokuapp.com/" ||
    window.location.origin === "www.ewvm.herokuapp.com/"
  )
    return "TEST";
  else return "DEV";
};

export const userRole = {
  Admin: 0,
  personal: 1,
  business: 2,
};
export const userRoleObject = {
  Admin: 0,
  Individual: 1,
  Business: 2,
};

export function getKeyByValue(object, value) {
  return Object?.keys(object).find((key) => object[key] === value);
}
export function getValueByKey(object, value) {
  return Object?.values(object).find((key) => object[key] === value);
}
export function getCategoryName(category, id) {
  let result = category.find((item) => item?.id === id);
  return result?.name;
}

export function setErrorFunc(object, set) {
  if (object)
    for (const [key, value] of Object.entries(object)) {
      set(key, { type: "manual", message: value });
    }
}

export const generateValues = (data) => {
  let option = null;
  if (Array.isArray(data)) {
    option = data?.map((item, idx) => {
      return item?.value;
    });
  } else {
    option = data?.value;
  }
  return option;
};

export const getLabelByValue = (value, list) => {
  let filteredItem = list?.filter((item) => item.value === value);
  if (filteredItem) return filteredItem[0]?.label;
};

export const getAgentLabelByValue = (value, options) => {
  const option = options?.find((opt) => opt.value.name === value);
  if (option) {
    return (
      <div className="flex items-center gap-x-2">
        <Image
          src={option.label.picture}
          alt="profile"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span>{option.label.name}</span>
      </div>
    );
  }
  return null;
};
