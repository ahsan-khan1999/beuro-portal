/**
 * Misc. functions
 */

import { FormStages } from "@/enums/form";
import { logout } from "./auth.util";

// import Home from "../Components/Pages/Home";

// language translation

export const setLocalizeContent = (obj, store) => {
  try {
    return obj.en;
    // return obj[store.get("language")];
  } catch (error) {
    return { en: "", az: "", ru: "" };
  }
};

// first letter capitalize
export const capitalize = (str) =>
  str?.charAt(0)?.toUpperCase() + str?.slice(1);

// deep clone an object
export const deepClone = (obj) => {
  var copy;

  // eslint-disable-next-line
  if (obj == null || typeof obj != "object") {
    return obj;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepClone(obj[attr]);
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

// check if empty or not
export const isEmpty = (object, dataType = "object") => {
  switch (dataType) {
    case "object": {
      return !Object.keys(object).length;
    }
    default: {
      return false;
    }
  }
};

//check if object has any true value in it or not
export const checkTrueValue = (obj) => {
  const valuesOfObject = Object.values(obj);
  const TrueFalse = valuesOfObject.includes(true);
  return TrueFalse;
};
//Remove a value from array
export const removerValue = (item, index, qty) => {
  const selectedItem = item?.splice(index, qty);
  const finalArray = item?.filter((item) => {
    return item !== selectedItem;
  });
  return finalArray;
};

//Check For Numbers Only
export const isNumber = (mobile) => {
  if (mobile) {
    let regex = new RegExp(/^[0-9]*$/);
    return regex.test(mobile);
  } else return false;
};
// Check WHITE space
export const checkWhiteSpace = (text) => {
  const _text = text.trim();
  return text === _text;
};
// check paid or unpaid
export const checkPaidOrUnpaid = (text) => {
  if (text === "paid") {
    return "green";
  } else if (text == "partial") {
    return "#970165";
  }
  else {
    return "red";
  }
};
// coma seperated and round numbers
export const comaSeperated = (number) => {
  return number?.toLocaleString("en-US", { maximumFractionDigits: 2 });
};
// disable past dates
export const disablePastDate = () => {
  const today = new Date();
  const dd = String(today.getDate() + 0).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

// UnAutherize user logout
export const unautherizeUser = () => {
  logout();
};


export const filterComponentData = (componetcms, slugname, lang) => {

  const Component = componetcms?.filter(
    (item) => item?.slug === slugname
  );
  if (Component?.length < 1) {
    return []
  }
  let data = []
  Object.keys(Component[0]?.content)?.map((item) => {
    if (item?.includes(lang)) {
      data = Component[0]?.content[item]

    }
  })
  return data

}

export const isValidTimeOrDateFormat = (str) => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):\s?[0-5][0-9]:\s?[0-5][0-9]$/;
  const dateRegex = /^\d{1,2}\.\s[a-zA-Z]+\s\d{4}$/;

  if (timeRegex.test(str)) {
      return true;
  } else if (dateRegex.test(str)) {
      return false;
  }
  return false;
}

export function formatDateString(dateString) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  // const hours = String(date.getUTCHours()).padStart(2, '0');
  // const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  // const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDateToCustomString(dateString, ShowUTC = true) {
  const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dateObj = new Date(dateString);
  const day = dateObj.getUTCDate();
  const month = months[dateObj.getUTCMonth()];
  const year = dateObj.getUTCFullYear();
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes} ${ShowUTC && 'UTC' || ''}`;
}


export const generateUniqueId = () => {
  return new Date().getTime().toString();
};

export function isJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}

export const insertBreaks = (str, n) => {
  let result = '';
  while (str?.length > 0) {
    result += str.substring(0, n) + '\n';
    str = str.substring(n);
  }
  return result;
}