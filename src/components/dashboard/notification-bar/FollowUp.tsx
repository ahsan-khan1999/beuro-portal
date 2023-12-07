import React, { useState } from "react";
import followUpIcon from "@/assets/svgs/follow-up.svg";
import idIcon from "@/assets/svgs/id.svg";
import Image from "next/image";
import timeIcon from "@/assets/svgs/time.svg";
import dayIcon from "@/assets/svgs/day-icon.svg";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import FollowUps from "@/base-components/ui/modals1/FollowUps";
import FollowUpDetails from "@/base-components/ui/modals1/FollowUpDetails";
import AddPostPonedNote from "@/base-components/ui/modals1/AddPostPonedNote";
import AddRemarks from "@/base-components/ui/modals1/AddRemarks";
import AddFollowUp from "@/base-components/ui/modals1/AddFollowUp";
import AllCustomers from "@/base-components/ui/modals1/AllCustomers";
import AllLeads from "@/base-components/ui/modals1/AllLeads";
import FollowUpCustomersDetails from "@/base-components/ui/modals1/FollowUpCustomersDetails";
import FollowUpServiceDetails from "@/base-components/ui/modals1/FollowUpServiceDetails";
import { readFollowUpDetail } from "@/api/slices/followUp/followUp";
import { useTranslation } from "next-i18next";

export const FollowUpNotificationBar = () => {
  const followUp = [
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M8.99398 7.0114C8.99398 6.49518 9.41243 6.07673 9.92864 6.07673H18.9014C20.1415 6.12608 20.1406 7.89713 18.9014 7.94606H9.92864C9.41243 7.94606 8.99398 7.52761 8.99398 7.0114ZM12.1718 17.6198H9.92864C8.68854 17.6692 8.68947 19.4402 9.92864 19.4891H12.1718C13.4119 19.4398 13.411 17.6687 12.1718 17.6198ZM9.92864 13.554H14.9291C16.1692 13.5047 16.1683 11.7336 14.9291 11.6847H9.92864C8.68854 11.7341 8.68947 13.5051 9.92864 13.554ZM6.19 11.6847C5.67379 11.6847 5.25534 12.1032 5.25534 12.6194C5.30459 13.8592 7.07564 13.8588 7.12466 12.6194C7.12466 12.1032 6.70621 11.6847 6.19 11.6847ZM24.5094 20.9925C24.5098 22.4345 23.4014 23.8238 21.8877 23.7886H19.9295C19.878 25.0288 18.1113 25.0279 18.0602 23.7886H16.0553C14.5414 23.8238 13.4332 22.4342 13.4337 20.9925C13.4337 20.59 13.6656 20.2418 14.0468 20.1147C14.1495 20.0727 14.7831 19.784 14.7831 19.0545V18.1339C14.7831 16.1441 16.1898 14.4581 18.0602 14.0324V13.4138C18.1096 12.1737 19.8806 12.1747 19.9296 13.4138V14.0434C21.7766 14.4863 23.16 16.1607 23.16 18.1339V19.0545C23.16 19.784 23.7936 20.0727 23.8963 20.1147C24.2774 20.2417 24.5094 20.59 24.5094 20.9925ZM22.5239 21.4719C21.9052 21.0169 21.2906 20.2286 21.2906 19.0545V18.1339C21.2906 16.8631 20.2582 15.8153 18.9892 15.7983C18.9833 15.7983 18.9774 15.7981 18.9715 15.798C18.9656 15.7981 18.9597 15.7983 18.9538 15.7983C17.6848 15.8153 16.6524 16.8631 16.6524 18.1339V19.0545C16.6524 20.2286 16.0378 21.0169 15.4191 21.4719C15.52 21.6981 15.7077 21.9192 16.0553 21.9192H21.8877C22.2353 21.9192 22.423 21.6981 22.5239 21.4719ZM6.19 6.07673C5.67379 6.07673 5.25534 6.49518 5.25534 7.0114C5.30459 8.25122 7.07564 8.25085 7.12466 7.0114C7.12466 6.49518 6.70621 6.07673 6.19 6.07673ZM6.19 17.6198C5.67379 17.6198 5.25534 18.0382 5.25534 18.5545C5.30459 19.7943 7.07564 19.7939 7.12466 18.5545C7.12466 18.0382 6.70621 17.6198 6.19 17.6198ZM20.7707 0.795898H4.32068C2.25919 0.795898 0.582031 2.47305 0.582031 4.53454V20.9846C0.582031 23.0461 2.25919 24.7232 4.32068 24.7232H11.4241C12.6642 24.6739 12.6633 22.9028 11.4241 22.8539H4.32068C3.28993 22.8539 2.45135 22.0153 2.45135 20.9846V4.53454C2.45135 3.5038 3.28993 2.66522 4.32068 2.66522H20.7707C21.8015 2.66522 22.64 3.5038 22.64 4.53454V12.9465C22.6894 14.1866 24.4604 14.1857 24.5094 12.9465V4.53454C24.5094 2.47305 22.8322 0.795898 20.7707 0.795898Z" fill="url(#paint0_linear_2051_43668)"/>
      <defs>
        <linearGradient id="paint0_linear_2051_43668" x1="12.5556" y1="3.77479" x2="12.5556" y2="15.9805" gradientUnits="userSpaceOnUse">
          <stop offset="5.32779e-09" stop-color="#4A13E7"/>
          <stop offset="1" stop-color="#7B18FF"/>
        </linearGradient>
      </defs>
    </svg>`,
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M8.99398 7.19645C8.99398 6.68024 9.41243 6.26179 9.92864 6.26179H18.9014C20.1415 6.31114 20.1406 8.08219 18.9014 8.13112H9.92864C9.41243 8.13112 8.99398 7.71267 8.99398 7.19645ZM12.1718 17.8049H9.92864C8.68854 17.8542 8.68947 19.6253 9.92864 19.6742H12.1718C13.4119 19.6248 13.411 17.8538 12.1718 17.8049ZM9.92864 13.7391H14.9291C16.1692 13.6897 16.1683 11.9187 14.9291 11.8698H9.92864C8.68854 11.9191 8.68947 13.6902 9.92864 13.7391ZM6.19 11.8698C5.67379 11.8698 5.25534 12.2882 5.25534 12.8044C5.30459 14.0443 7.07564 14.0439 7.12466 12.8044C7.12466 12.2882 6.70621 11.8698 6.19 11.8698ZM24.5094 21.1775C24.5098 22.6195 23.4014 24.0089 21.8877 23.9736H19.9295C19.878 25.2139 18.1113 25.2129 18.0602 23.9736H16.0553C14.5414 24.0089 13.4332 22.6193 13.4337 21.1775C13.4337 20.7751 13.6656 20.4268 14.0468 20.2997C14.1495 20.2577 14.7831 19.969 14.7831 19.2395V18.3189C14.7831 16.3291 16.1898 14.6432 18.0602 14.2175V13.5989C18.1096 12.3588 19.8806 12.3597 19.9296 13.5989V14.2284C21.7766 14.6713 23.16 16.3458 23.16 18.3189V19.2395C23.16 19.969 23.7936 20.2577 23.8963 20.2997C24.2774 20.4268 24.5094 20.7751 24.5094 21.1775ZM22.5239 21.657C21.9052 21.2019 21.2906 20.4137 21.2906 19.2395V18.3189C21.2906 17.0481 20.2582 16.0004 18.9892 15.9834C18.9833 15.9833 18.9774 15.9832 18.9715 15.983C18.9656 15.9832 18.9597 15.9833 18.9538 15.9834C17.6848 16.0004 16.6524 17.0481 16.6524 18.3189V19.2395C16.6524 20.4137 16.0378 21.2019 15.4191 21.657C15.52 21.8832 15.7077 22.1043 16.0553 22.1043H21.8877C22.2353 22.1043 22.423 21.8832 22.5239 21.657ZM6.19 6.26179C5.67379 6.26179 5.25534 6.68024 5.25534 7.19645C5.30459 8.43628 7.07564 8.43591 7.12466 7.19645C7.12466 6.68024 6.70621 6.26179 6.19 6.26179ZM6.19 17.8049C5.67379 17.8049 5.25534 18.2233 5.25534 18.7395C5.30459 19.9793 7.07564 19.979 7.12466 18.7395C7.12466 18.2233 6.70621 17.8049 6.19 17.8049ZM20.7707 0.980957H4.32068C2.25919 0.980957 0.582031 2.65811 0.582031 4.7196V21.1696C0.582031 23.2311 2.25919 24.9083 4.32068 24.9083H11.4241C12.6642 24.8589 12.6633 23.0879 11.4241 23.039H4.32068C3.28993 23.039 2.45135 22.2004 2.45135 21.1696V4.7196C2.45135 3.68886 3.28993 2.85028 4.32068 2.85028H20.7707C21.8015 2.85028 22.64 3.68886 22.64 4.7196V13.1316C22.6894 14.3717 24.4604 14.3707 24.5094 13.1316V4.7196C24.5094 2.65811 22.8322 0.980957 20.7707 0.980957Z" fill="url(#paint0_linear_2051_43669)"/>
      <defs>
        <linearGradient id="paint0_linear_2051_43669" x1="0.588107" y1="12.9389" x2="24.5213" y2="12.9389" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FF3671"/>
          <stop offset="1" stop-color="#FE9841"/>
        </linearGradient>
      </defs>
    </svg>`,
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M8.99398 6.82634C8.99398 6.31012 9.41243 5.89168 9.92864 5.89168H18.9014C20.1415 5.94103 20.1406 7.71207 18.9014 7.761H9.92864C9.41243 7.761 8.99398 7.34255 8.99398 6.82634ZM12.1718 17.4347H9.92864C8.68854 17.4841 8.68947 19.2551 9.92864 19.3041H12.1718C13.4119 19.2547 13.411 17.4837 12.1718 17.4347ZM9.92864 13.369H14.9291C16.1692 13.3196 16.1683 11.5486 14.9291 11.4996H9.92864C8.68854 11.549 8.68947 13.32 9.92864 13.369ZM6.19 11.4996C5.67379 11.4996 5.25534 11.9181 5.25534 12.4343C5.30459 13.6741 7.07564 13.6738 7.12466 12.4343C7.12466 11.9181 6.70621 11.4996 6.19 11.4996ZM24.5094 20.8074C24.5098 22.2494 23.4014 23.6387 21.8877 23.6035H19.9295C19.878 24.8438 18.1113 24.8428 18.0602 23.6035H16.0553C14.5414 23.6387 13.4332 22.2492 13.4337 20.8074C13.4337 20.405 13.6656 20.0567 14.0468 19.9296C14.1495 19.8876 14.7831 19.5989 14.7831 18.8694V17.9488C14.7831 15.959 16.1898 14.2731 18.0602 13.8474V13.2288C18.1096 11.9887 19.8806 11.9896 19.9296 13.2288V13.8583C21.7766 14.3012 23.16 15.9756 23.16 17.9488V18.8694C23.16 19.5989 23.7936 19.8876 23.8963 19.9296C24.2774 20.0567 24.5094 20.405 24.5094 20.8074ZM22.5239 21.2869C21.9052 20.8318 21.2906 20.0436 21.2906 18.8694V17.9488C21.2906 16.678 20.2582 15.6303 18.9892 15.6133C18.9833 15.6132 18.9774 15.6131 18.9715 15.6129C18.9656 15.6131 18.9597 15.6132 18.9538 15.6133C17.6848 15.6303 16.6524 16.678 16.6524 17.9488V18.8694C16.6524 20.0436 16.0378 20.8318 15.4191 21.2869C15.52 21.513 15.7077 21.7342 16.0553 21.7342H21.8877C22.2353 21.7342 22.423 21.513 22.5239 21.2869ZM6.19 5.89168C5.67379 5.89168 5.25534 6.31012 5.25534 6.82634C5.30459 8.06617 7.07564 8.06579 7.12466 6.82634C7.12466 6.31012 6.70621 5.89168 6.19 5.89168ZM6.19 17.4347C5.67379 17.4347 5.25534 17.8532 5.25534 18.3694C5.30459 19.6092 7.07564 19.6089 7.12466 18.3694C7.12466 17.8532 6.70621 17.4347 6.19 17.4347ZM20.7707 0.61084H4.32068C2.25919 0.61084 0.582031 2.288 0.582031 4.34948V20.7995C0.582031 22.861 2.25919 24.5382 4.32068 24.5382H11.4241C12.6642 24.4888 12.6633 22.7178 11.4241 22.6688H4.32068C3.28993 22.6688 2.45135 21.8303 2.45135 20.7995V4.34948C2.45135 3.31874 3.28993 2.48016 4.32068 2.48016H20.7707C21.8015 2.48016 22.64 3.31874 22.64 4.34948V12.7614C22.6894 14.0015 24.4604 14.0006 24.5094 12.7614V4.34948C24.5094 2.288 22.8322 0.61084 20.7707 0.61084Z" fill="url(#paint0_linear_2051_43670)"/>
      <defs>
        <linearGradient id="paint0_linear_2051_43670" x1="-3.89969" y1="12.5776" x2="22.5812" y2="12.5776" gradientUnits="userSpaceOnUse">
          <stop stop-color="#B503FE"/>
          <stop offset="1" stop-color="#FF376F"/>
        </linearGradient>
      </defs>
    </svg>`,
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M8.99398 7.0114C8.99398 6.49518 9.41243 6.07673 9.92864 6.07673H18.9014C20.1415 6.12608 20.1406 7.89713 18.9014 7.94606H9.92864C9.41243 7.94606 8.99398 7.52761 8.99398 7.0114ZM12.1718 17.6198H9.92864C8.68854 17.6692 8.68947 19.4402 9.92864 19.4891H12.1718C13.4119 19.4398 13.411 17.6687 12.1718 17.6198ZM9.92864 13.554H14.9291C16.1692 13.5047 16.1683 11.7336 14.9291 11.6847H9.92864C8.68854 11.7341 8.68947 13.5051 9.92864 13.554ZM6.19 11.6847C5.67379 11.6847 5.25534 12.1032 5.25534 12.6194C5.30459 13.8592 7.07564 13.8588 7.12466 12.6194C7.12466 12.1032 6.70621 11.6847 6.19 11.6847ZM24.5094 20.9925C24.5098 22.4345 23.4014 23.8238 21.8877 23.7886H19.9295C19.878 25.0288 18.1113 25.0279 18.0602 23.7886H16.0553C14.5414 23.8238 13.4332 22.4342 13.4337 20.9925C13.4337 20.59 13.6656 20.2418 14.0468 20.1147C14.1495 20.0727 14.7831 19.784 14.7831 19.0545V18.1339C14.7831 16.1441 16.1898 14.4581 18.0602 14.0324V13.4138C18.1096 12.1737 19.8806 12.1747 19.9296 13.4138V14.0434C21.7766 14.4863 23.16 16.1607 23.16 18.1339V19.0545C23.16 19.784 23.7936 20.0727 23.8963 20.1147C24.2774 20.2417 24.5094 20.59 24.5094 20.9925ZM22.5239 21.4719C21.9052 21.0169 21.2906 20.2286 21.2906 19.0545V18.1339C21.2906 16.8631 20.2582 15.8153 18.9892 15.7983C18.9833 15.7983 18.9774 15.7981 18.9715 15.798C18.9656 15.7981 18.9597 15.7983 18.9538 15.7983C17.6848 15.8153 16.6524 16.8631 16.6524 18.1339V19.0545C16.6524 20.2286 16.0378 21.0169 15.4191 21.4719C15.52 21.6981 15.7077 21.9192 16.0553 21.9192H21.8877C22.2353 21.9192 22.423 21.6981 22.5239 21.4719ZM6.19 6.07673C5.67379 6.07673 5.25534 6.49518 5.25534 7.0114C5.30459 8.25122 7.07564 8.25085 7.12466 7.0114C7.12466 6.49518 6.70621 6.07673 6.19 6.07673ZM6.19 17.6198C5.67379 17.6198 5.25534 18.0382 5.25534 18.5545C5.30459 19.7943 7.07564 19.7939 7.12466 18.5545C7.12466 18.0382 6.70621 17.6198 6.19 17.6198ZM20.7707 0.795898H4.32068C2.25919 0.795898 0.582031 2.47305 0.582031 4.53454V20.9846C0.582031 23.0461 2.25919 24.7232 4.32068 24.7232H11.4241C12.6642 24.6739 12.6633 22.9028 11.4241 22.8539H4.32068C3.28993 22.8539 2.45135 22.0153 2.45135 20.9846V4.53454C2.45135 3.5038 3.28993 2.66522 4.32068 2.66522H20.7707C21.8015 2.66522 22.64 3.5038 22.64 4.53454V12.9465C22.6894 14.1866 24.4604 14.1857 24.5094 12.9465V4.53454C24.5094 2.47305 22.8322 0.795898 20.7707 0.795898Z" fill="url(#paint0_linear_2051_43668)"/>
      <defs>
        <linearGradient id="paint0_linear_2051_43668" x1="12.5556" y1="3.77479" x2="12.5556" y2="15.9805" gradientUnits="userSpaceOnUse">
          <stop offset="5.32779e-09" stop-color="#4A13E7"/>
          <stop offset="1" stop-color="#7B18FF"/>
        </linearGradient>
      </defs>
    </svg>`,
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M8.99398 7.0114C8.99398 6.49518 9.41243 6.07673 9.92864 6.07673H18.9014C20.1415 6.12608 20.1406 7.89713 18.9014 7.94606H9.92864C9.41243 7.94606 8.99398 7.52761 8.99398 7.0114ZM12.1718 17.6198H9.92864C8.68854 17.6692 8.68947 19.4402 9.92864 19.4891H12.1718C13.4119 19.4398 13.411 17.6687 12.1718 17.6198ZM9.92864 13.554H14.9291C16.1692 13.5047 16.1683 11.7336 14.9291 11.6847H9.92864C8.68854 11.7341 8.68947 13.5051 9.92864 13.554ZM6.19 11.6847C5.67379 11.6847 5.25534 12.1032 5.25534 12.6194C5.30459 13.8592 7.07564 13.8588 7.12466 12.6194C7.12466 12.1032 6.70621 11.6847 6.19 11.6847ZM24.5094 20.9925C24.5098 22.4345 23.4014 23.8238 21.8877 23.7886H19.9295C19.878 25.0288 18.1113 25.0279 18.0602 23.7886H16.0553C14.5414 23.8238 13.4332 22.4342 13.4337 20.9925C13.4337 20.59 13.6656 20.2418 14.0468 20.1147C14.1495 20.0727 14.7831 19.784 14.7831 19.0545V18.1339C14.7831 16.1441 16.1898 14.4581 18.0602 14.0324V13.4138C18.1096 12.1737 19.8806 12.1747 19.9296 13.4138V14.0434C21.7766 14.4863 23.16 16.1607 23.16 18.1339V19.0545C23.16 19.784 23.7936 20.0727 23.8963 20.1147C24.2774 20.2417 24.5094 20.59 24.5094 20.9925ZM22.5239 21.4719C21.9052 21.0169 21.2906 20.2286 21.2906 19.0545V18.1339C21.2906 16.8631 20.2582 15.8153 18.9892 15.7983C18.9833 15.7983 18.9774 15.7981 18.9715 15.798C18.9656 15.7981 18.9597 15.7983 18.9538 15.7983C17.6848 15.8153 16.6524 16.8631 16.6524 18.1339V19.0545C16.6524 20.2286 16.0378 21.0169 15.4191 21.4719C15.52 21.6981 15.7077 21.9192 16.0553 21.9192H21.8877C22.2353 21.9192 22.423 21.6981 22.5239 21.4719ZM6.19 6.07673C5.67379 6.07673 5.25534 6.49518 5.25534 7.0114C5.30459 8.25122 7.07564 8.25085 7.12466 7.0114C7.12466 6.49518 6.70621 6.07673 6.19 6.07673ZM6.19 17.6198C5.67379 17.6198 5.25534 18.0382 5.25534 18.5545C5.30459 19.7943 7.07564 19.7939 7.12466 18.5545C7.12466 18.0382 6.70621 17.6198 6.19 17.6198ZM20.7707 0.795898H4.32068C2.25919 0.795898 0.582031 2.47305 0.582031 4.53454V20.9846C0.582031 23.0461 2.25919 24.7232 4.32068 24.7232H11.4241C12.6642 24.6739 12.6633 22.9028 11.4241 22.8539H4.32068C3.28993 22.8539 2.45135 22.0153 2.45135 20.9846V4.53454C2.45135 3.5038 3.28993 2.66522 4.32068 2.66522H20.7707C21.8015 2.66522 22.64 3.5038 22.64 4.53454V12.9465C22.6894 14.1866 24.4604 14.1857 24.5094 12.9465V4.53454C24.5094 2.47305 22.8322 0.795898 20.7707 0.795898Z" fill="url(#paint0_linear_2051_43668)"/>
      <defs>
        <linearGradient id="paint0_linear_2051_43668" x1="12.5556" y1="3.77479" x2="12.5556" y2="15.9805" gradientUnits="userSpaceOnUse">
          <stop offset="5.32779e-09" stop-color="#4A13E7"/>
          <stop offset="1" stop-color="#7B18FF"/>
        </linearGradient>
      </defs>
    </svg>`,
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
    {
      svg: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M8.99398 7.0114C8.99398 6.49518 9.41243 6.07673 9.92864 6.07673H18.9014C20.1415 6.12608 20.1406 7.89713 18.9014 7.94606H9.92864C9.41243 7.94606 8.99398 7.52761 8.99398 7.0114ZM12.1718 17.6198H9.92864C8.68854 17.6692 8.68947 19.4402 9.92864 19.4891H12.1718C13.4119 19.4398 13.411 17.6687 12.1718 17.6198ZM9.92864 13.554H14.9291C16.1692 13.5047 16.1683 11.7336 14.9291 11.6847H9.92864C8.68854 11.7341 8.68947 13.5051 9.92864 13.554ZM6.19 11.6847C5.67379 11.6847 5.25534 12.1032 5.25534 12.6194C5.30459 13.8592 7.07564 13.8588 7.12466 12.6194C7.12466 12.1032 6.70621 11.6847 6.19 11.6847ZM24.5094 20.9925C24.5098 22.4345 23.4014 23.8238 21.8877 23.7886H19.9295C19.878 25.0288 18.1113 25.0279 18.0602 23.7886H16.0553C14.5414 23.8238 13.4332 22.4342 13.4337 20.9925C13.4337 20.59 13.6656 20.2418 14.0468 20.1147C14.1495 20.0727 14.7831 19.784 14.7831 19.0545V18.1339C14.7831 16.1441 16.1898 14.4581 18.0602 14.0324V13.4138C18.1096 12.1737 19.8806 12.1747 19.9296 13.4138V14.0434C21.7766 14.4863 23.16 16.1607 23.16 18.1339V19.0545C23.16 19.784 23.7936 20.0727 23.8963 20.1147C24.2774 20.2417 24.5094 20.59 24.5094 20.9925ZM22.5239 21.4719C21.9052 21.0169 21.2906 20.2286 21.2906 19.0545V18.1339C21.2906 16.8631 20.2582 15.8153 18.9892 15.7983C18.9833 15.7983 18.9774 15.7981 18.9715 15.798C18.9656 15.7981 18.9597 15.7983 18.9538 15.7983C17.6848 15.8153 16.6524 16.8631 16.6524 18.1339V19.0545C16.6524 20.2286 16.0378 21.0169 15.4191 21.4719C15.52 21.6981 15.7077 21.9192 16.0553 21.9192H21.8877C22.2353 21.9192 22.423 21.6981 22.5239 21.4719ZM6.19 6.07673C5.67379 6.07673 5.25534 6.49518 5.25534 7.0114C5.30459 8.25122 7.07564 8.25085 7.12466 7.0114C7.12466 6.49518 6.70621 6.07673 6.19 6.07673ZM6.19 17.6198C5.67379 17.6198 5.25534 18.0382 5.25534 18.5545C5.30459 19.7943 7.07564 19.7939 7.12466 18.5545C7.12466 18.0382 6.70621 17.6198 6.19 17.6198ZM20.7707 0.795898H4.32068C2.25919 0.795898 0.582031 2.47305 0.582031 4.53454V20.9846C0.582031 23.0461 2.25919 24.7232 4.32068 24.7232H11.4241C12.6642 24.6739 12.6633 22.9028 11.4241 22.8539H4.32068C3.28993 22.8539 2.45135 22.0153 2.45135 20.9846V4.53454C2.45135 3.5038 3.28993 2.66522 4.32068 2.66522H20.7707C21.8015 2.66522 22.64 3.5038 22.64 4.53454V12.9465C22.6894 14.1866 24.4604 14.1857 24.5094 12.9465V4.53454C24.5094 2.47305 22.8322 0.795898 20.7707 0.795898Z" fill="url(#paint0_linear_2051_43668)"/>
      <defs>
        <linearGradient id="paint0_linear_2051_43668" x1="12.5556" y1="3.77479" x2="12.5556" y2="15.9805" gradientUnits="userSpaceOnUse">
          <stop offset="5.32779e-09" stop-color="#4A13E7"/>
          <stop offset="1" stop-color="#7B18FF"/>
        </linearGradient>
      </defs>
    </svg>`,
      title: "Recent Follow up",
      description: "Call for information of cleaning and moving services",
      time: "14:20:05",
      date: "12/09/2023",
      id: "00071",
      day: "1 Day",
    },
  ];
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);
  const { followUpDetails } = useAppSelector((state) => state.followUp);

  const [status, setStatus] = useState({
    postpond: false,
    completed: false,
    neutral: true,
  });

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handleFollowUps = () => {
    dispatch(updateModalType({ type: ModalType.FOLLOW_UPS }));
  };

  const handleFollowUpsDetails = (id: string) => {

    if (id) dispatch(readFollowUpDetail({ params: { filter: id } }));
    dispatch(updateModalType({ type: ModalType.FOLLOW_UPS_DETAILS, data: id }));
  };

  const handleAddPostPonedNote = () => {
    dispatch(updateModalType({ type: ModalType.ADD_POSTSPONED_NOTE }));
    // setStatus({
    //   postpond: true,
    //   completed: false,
    //   neutral: false,
    // });
  };

  const handleAddRemarks = () => {
    dispatch(updateModalType({type:ModalType.ADD_REMARKS}));
    
  };

  const handleAddFollowUp = () => {
    dispatch(updateModalType(ModalType.ADD_FOLLOW_UP));
  };

  const handleAllCustomers = () => {
    dispatch(updateModalType(ModalType.ALL_CUSTOMERS_LIST));
  };

  const handleCustomerDetail = () => {
    dispatch(updateModalType(ModalType.SELECTED_CUSTOMER_DETAIL));
  };

  const handleAllLeads = () => {
    dispatch(updateModalType(ModalType.ALL_LEADS_LIST));
  };

  const handleLeadDetail = () => {
    dispatch(updateModalType(ModalType.SELECTED_LEADS_DETAIL));
  };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.FOLLOW_UPS]: (
      <FollowUps
        onClose={onClose}
        handleFollowUpsDetails={handleFollowUpsDetails}
      />
    ),
    [ModalType.FOLLOW_UPS_DETAILS]: (
      <FollowUpDetails
        onClose={onClose}
        handleAddPostPonedNote={handleAddPostPonedNote}
        handleAddRemarks={handleAddRemarks}
        status={status}
        followUpDetails={followUpDetails}
      />
    ),
    [ModalType.ADD_POSTSPONED_NOTE]: (
      <AddPostPonedNote
        onClose={onClose}
        handleFollowUpsDetails={handleFollowUpsDetails}
      />
    ),
    [ModalType.ADD_REMARKS]: (
      <AddRemarks
        onClose={onClose}
        handleFollowUpsDetails={handleFollowUpsDetails}
      />
    ),
    [ModalType.ADD_FOLLOW_UP]: (
      <AddFollowUp
        onClose={onClose}
        handleFollowUps={handleFollowUps}
        handleAllCustomers={handleAllCustomers}
        handleAllLeads={handleAllLeads}
      />
    ),
    [ModalType.ALL_CUSTOMERS_LIST]: (
      <AllCustomers
        onClose={onClose}
        handleCustomerDetail={handleCustomerDetail}
      />
    ),
    [ModalType.ALL_LEADS_LIST]: (
      <AllLeads onClose={onClose} handleLeadDetail={handleLeadDetail} />
    ),
    [ModalType.SELECTED_CUSTOMER_DETAIL]: (
      <FollowUpCustomersDetails onClose={onClose} />
    ),
    [ModalType.SELECTED_LEADS_DETAIL]: (
      <FollowUpServiceDetails onClose={onClose} />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };
  return (
    <>
      <div className="bg-white rounded-[20px] h-[397.089px]">
        <h1 className=" mb-3 ml-[40px] pt-5 text-[#18181B]  font-medium">
          {translate("dashboard_detail.follow_up_heading")}
        </h1>

        <hr className="opacity-10" />

        <div className="overflow-y-scroll max-h-[340px] dashboard_scrollbar pl-5 pr-[5px] pb-[14px] mr-1">
          {followUp.map((item, index) => {
            return (
              <div
                onClick={() => handleFollowUpsDetails(item.id)}
                key={index}
                className={`pt-[10px] px-4 cursor-pointer hover:bg-primary hover:bg-opacity-10  bg-opacity-10 `}
              >
                <div className=" pb-[5px]  flex items-center border-b border-[#000] border-opacity-10 ">
                  <div
                    className="mr-6"
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />
                  <div>
                    <div>
                      <span className="text-dark text-sm">{item.title}: </span>
                      <span className="text-dark text-sm font-medium">
                        {item.description}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center ">
                        <Image
                          src={timeIcon}
                          alt="Time Icon"
                          className="mr-[6px]"
                        />
                        <span className="text-[#393939] text-xs ">
                          {item.time},{item.date}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Image
                          src={idIcon}
                          alt="Id Icon"
                          className="mr-[6px]"
                        />
                        <span className="text-[#4B4B4B] text-xs ">
                          {item.id}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Image
                          src={dayIcon}
                          alt="Id Icon"
                          className="mr-[6px]"
                        />
                        <span className="text-[#4B4B4B] text-xs ">
                          {item.day}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center py-4">
            <button
              onClick={() => handleFollowUps()}
              className=" text-primary w-fit text-sm font-medium "
            >
              {translate("dashboard_detail.view_all")}
            </button>
          </div>
        </div>
      </div>
      {renderModal()}
    </>
  );
};
