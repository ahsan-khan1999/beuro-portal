import { setUser } from "@/api/slices/authSlice/auth";
import { ButtonClickFunction, User } from "@/types";
import { Dispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useRef, useState } from "react";
import { isJSON } from "./functions";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";
import { TranslatorFunction } from "@/types/global";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { EmptyStateType, ModalType } from "@/enums/ui";
import { getUser } from "./auth.util";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { CustomPuffLoader } from "@/base-components/ui/loader/puff-loader";

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  callback: ButtonClickFunction
): React.RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export const useGlobalUser = (user: User | undefined, dispatch: Dispatch) => {
  const cookieUser = isJSON(getUser());
  if (!user) {
    dispatch(setUser(cookieUser));
  }
};

// export const useTranslatedConstant = <T extends object>(data: T): T => {
//   const { t } = useTranslation();

//   const translateString = (value: string) =>
//     value.startsWith('~') ? t(value.substring(1)) : value;

//   const translators: { [key: string]: TranslatorFunction } = {
//     'string': translateString,
//     'object': (obj: any) => Array.isArray(obj) ? obj.map(translateValue) : translateObject(obj)
//   };

//   const translateValue = (value: any) => {
//     const translator = translators[typeof value];
//     return translator ? translator(value) : value;
//   };

//   const translateObject = (obj: any): any => {
//     const result: Record<string, any> = {};
//     for (const key in obj) {
//       result[key] = translateValue(obj[key]);
//     }
//     return result;
//   };

//   return useMemo(() => translateObject({ ...data }), [data, t]);
// };

export const useTranslatedConstant = <T extends object>(data: T): T => {
  const { t } = useTranslation();

  const translateString = (value: string) =>
    value.startsWith("~") ? t(value.substring(1)) : value;

  const translateValue = (value: any) => {
    const translator = translators[typeof value];
    return translator ? translator(value) : value;
  };

  const translateArray = (arr: any[]): any[] => {
    return arr.map((item) => translateValue(item));
  };

  const translateObject = (obj: any): any => {
    if (Array.isArray(obj)) {
      return translateArray(obj);
    }

    const result: Record<string, any> = {};
    for (const key in obj) {
      result[key] = translateValue(obj[key]);
    }
    return result;
  };

  const translators: { [key: string]: TranslatorFunction } = {
    string: translateString,
    object: translateObject,
  };

  return useMemo(() => translateObject(data), [data, t]);
};

export const _useTimeLeft = (endDate: string) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isTimeEnded, setIsTimeEnded] = useState<boolean>(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const end = new Date(endDate);
      const difference = end.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("Not Sold");
        setIsTimeEnded(true);
      } else if (difference < 3600000) {
        // less than 1 hour in milliseconds
        const minutes = Math.floor(difference / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
        setIsTimeEnded(false);
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        // setTimeLeft(null);
        setIsTimeEnded(false);
      }
    };

    const interval = setInterval(updateTimer, 1000); // update every second

    return () => clearInterval(interval); // clear the interval when component is unmounted
  }, [endDate]);

  return { timeLeft, isTimeEnded };
};

export const __useTimeLeft = (endDate: string) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [isTimeEnded, setIsTimeEnded] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end.getTime() - now.getTime();

    if (difference <= 0) {
      setTimeLeft("Not Sold");
      setIsTimeEnded(true);
    } else if (difference < 3600000) {
      // less than 1 hour in milliseconds
      const minutes = Math.floor(difference / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes}m ${seconds}s`);
      setIsTimeEnded(false);
    } else {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      setIsTimeEnded(false);
    }

    // Set a timeout for the exact difference
    const timer = setTimeout(() => {
      setTimeLeft("Not Sold");
      setIsTimeEnded(true);
    }, difference);

    return () => clearTimeout(timer); // clear the timeout when component is unmounted
  }, [endDate]);

  return { timeLeft, isTimeEnded };
};

export const ___useTimeLeft = (endDate: string) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const isTimeEndedRef = useRef<boolean>(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const end = new Date(endDate);
      const difference = end.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("Not Sold");
        isTimeEndedRef.current = true;
      } else if (difference < 3600000) {
        // less than 1 hour in milliseconds
        const minutes = Math.floor(difference / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateTimer(); // Call immediately for the first update
    const interval = setInterval(updateTimer, 1000); // Then update every second

    return () => clearInterval(interval); // clear the interval when component is unmounted
  }, [endDate]);

  return { timeLeft, isTimeEnded: isTimeEndedRef.current };
};

export const useTimeLeft = (endDate: string) => {
  const timeLeftRef = useRef<string | null>(null);
  const [isTimeEnded, setIsTimeEnded] = useState<boolean>(false);
  const [_, setRender] = useState(0);
  const startTickingRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getTimeLeft = (shouldTick = false) => {
    startTickingRef.current = shouldTick;
    return timeLeftRef.current;
  };

  useEffect(() => {
    if (!endDate) return;

    const updateTimer = () => {
      const now = new Date();
      const end = new Date(endDate);
      const difference = end.getTime() - now.getTime();

      // if (difference <= 0) {
      //   timeLeftRef.current = "Not Sold";
      //   if (!isTimeEnded) setIsTimeEnded(true);
      // } else if (difference < 3600000) {
      //   const minutes = Math.floor(difference / (1000 * 60));
      //   const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      //   timeLeftRef.current = `${minutes}m ${seconds}s`;
      // } else {
      //   const hours = Math.floor(difference / (1000 * 60 * 60));
      //   const minutes = Math.floor(
      //     (difference % (1000 * 60 * 60)) / (1000 * 60)
      //   );
      //   const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      //   timeLeftRef.current = `${hours}h ${minutes}m ${seconds}s`;
      // }

      if (difference <= 3600000 && difference > 0) {
        setIsTimeEnded(true);
      } else {
        setIsTimeEnded(false);
      }

      if (startTickingRef.current) {
        setRender((prev) => prev + 1);
      }
    };

    updateTimer();
    intervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [endDate]);

  useEffect(() => {
    if (!isTimeEnded && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [isTimeEnded]);

  return { getTimeLeft, isTimeEnded, setIsTimeEnded };
};

export const closeModal = (dispatch: Dispatch, type: keyof ModalType) => {
  dispatch(updateModalType(ModalType.NONE));
};

export const useClipboardCopy = <
  T extends HTMLElement = HTMLInputElement
>() => {
  const inputRef = useRef<T | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = useCallback(async () => {
    if (inputRef.current) {
      let textToCopy: string = "";
      if (inputRef.current instanceof HTMLInputElement) {
        textToCopy = inputRef.current.value;
      } else {
        textToCopy = inputRef.current.textContent || "";
      }

      try {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
      } catch (err) {
        setIsCopied(false);
      }
    }
  }, []);

  return { inputRef, handleCopy, isCopied };
};

export const useEmptyStates = (
  CurrentComponent: JSX.Element,
  condition: boolean,
  isLoading: boolean
) => {
  const isEmpty: EmptyStateType = isLoading
    ? EmptyStateType.loading
    : condition
    ? EmptyStateType.hasData
    : EmptyStateType.hasNoData;

  const lookup = {
    [EmptyStateType.hasData]: CurrentComponent,
    [EmptyStateType.loading]: <CustomLoader />,
    [EmptyStateType.hasNoData]: (
      <div className="my-6">
        <NoDataEmptyState
          containerClassName="xMini:py-[153px] w-full flex items-center justify-center"
          className="py-5 px-3 xMini:py-10 xMini:px-6 w-[531px]"
        />
      </div>
    ),
  };
  const data = lookup[isEmpty];
  return data;
};

export const useAdminEmptyStates = (
  CurrentComponent: JSX.Element,
  condition: boolean,
  isLoading: boolean
) => {
  const isEmpty: EmptyStateType = isLoading
    ? EmptyStateType.loading
    : condition
    ? EmptyStateType.hasData
    : EmptyStateType.hasNoData;

  const lookup = {
    [EmptyStateType.hasData]: CurrentComponent,
    [EmptyStateType.loading]: <CustomPuffLoader />,
    [EmptyStateType.hasNoData]: (
      <div className="my-6">
        <NoDataEmptyState
          containerClassName="xMini:py-[153px] w-full flex items-center justify-center"
          className="py-5 px-3 xMini:py-10 xMini:px-6 w-[531px]"
        />
      </div>
    ),
  };
  const data = lookup[isEmpty];
  return data;
};

export const useQueryParams = () => {
  let queryParams = {} as any;
  if (typeof window !== "undefined") {
    queryParams = useMemo(() => {
      const queryParamsObject = {} as { [x: string]: string | number };
      const searchParams = new URLSearchParams(window.location.search);
      for (const [key, value] of searchParams.entries()) {
        queryParamsObject[key] = value;
      }
      return queryParamsObject;
    }, [window.location.search]);
  }
  return queryParams;
};
