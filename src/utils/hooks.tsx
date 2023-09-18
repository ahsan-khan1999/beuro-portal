import { setUser } from '@/api/slices/authSlice/auth';
import { ButtonClickFunction, Locale, User } from '@/types';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';
import { isJSON } from './functions';
import { getCookie } from 'cookies-next';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { TranslatorFunction } from '@/types/global';

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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export const useGlobalUser = (user: User | null, dispatch: Dispatch) => {
  const cookieUser = isJSON(getCookie("kaufesuser"))
  if (!user) {
    dispatch(setUser(cookieUser))
  }
}

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
    value.startsWith('~') ? t(value.substring(1)) : value;

  const translateValue = (value: any) => {
    const translator = translators[typeof value];
    return translator ? translator(value) : value;
  };

  const translateArray = (arr: any[]): any[] => {
    return arr.map(item => translateValue(item));
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
    'string': translateString,
    'object': translateObject
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
                setTimeLeft('Not Sold');
                setIsTimeEnded(true);
            } else if (difference < 3600000) { // less than 1 hour in milliseconds
                const minutes = Math.floor(difference / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft(`${minutes}m ${seconds}s`);
                setIsTimeEnded(false);
            } else {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
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
            setTimeLeft('Not Sold');
            setIsTimeEnded(true);
        } else if (difference < 3600000) { // less than 1 hour in milliseconds
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
            setTimeLeft('Not Sold');
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
                setTimeLeft('Not Sold');
                isTimeEndedRef.current = true;
            } else if (difference < 3600000) { // less than 1 hour in milliseconds
                const minutes = Math.floor(difference / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft(`${minutes}m ${seconds}s`);
            } else {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
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
    const [_, setRender] = useState(0);  // Used only to force a re-render
    const startTickingRef = useRef(false);

    const getTimeLeft = (shouldTick = false) => {
      startTickingRef.current = shouldTick;
      return timeLeftRef.current;
    };

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const end = new Date(endDate);
            const difference = end.getTime() - now.getTime();

            if (difference <= 0) {
                timeLeftRef.current = 'Not Sold';
                if (!isTimeEnded) setIsTimeEnded(true);
            } else if (difference < 3600000) {
                const minutes = Math.floor(difference / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                timeLeftRef.current = `${minutes}m ${seconds}s`;
            } else {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                timeLeftRef.current = `${hours}h ${minutes}m ${seconds}s`;
            }
            
            if (startTickingRef.current) {
                setRender(prev => prev + 1);  // Force a re-render if shouldTick is true
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [endDate, isTimeEnded]);

    return { getTimeLeft, isTimeEnded };
};
