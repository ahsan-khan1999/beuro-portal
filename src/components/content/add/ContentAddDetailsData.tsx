import React, { useState } from "react";
import { tabArrayTypes } from "@/types";
import DetailsTab from "@/base-components/ui/tab/DetailsTab";
import AddConfirmationContentDetails from "./AddConfirmationContentDetails";
import AddInoviceContentDetails from "./AddInoviceContentDetails";
import AddReceiptContentDetails from "./AddReceiptContentDetails";
import OfferContentAddDetails from "./OfferContentAddDetails";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { useRouter } from "next/router";

export enum ComponentsType {
  addOffer,
  addConfirmationContent,
  addInvoiceContent,
  addReceiptContent,
}

const ContentAddDetailsData = () => {
  const [tabType, setTabType] = useState<number>(0);

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  // Function for handling the modal for exiting notes
  const handleContentCreated = () => {
    dispatch(updateModalType(ModalType.CREATION));
  };

  const router = useRouter();

  const route = () => {
    router.push("/content");
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading="Content Created Successful "
        subHeading="Thanks for creating offer we are happy to have you. "
        route={route}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleNextTab = (currentComponent: ComponentsType) => {
    if (tabType === ComponentsType.addReceiptContent) {
      handleContentCreated();
      return;
    }
    setTabType(currentComponent);
  };

  const componentsLookUp = {
    [ComponentsType.addOffer]: (
      <OfferContentAddDetails onHandleNext={handleNextTab} />
    ),
    [ComponentsType.addConfirmationContent]: (
      <AddConfirmationContentDetails onHandleNext={handleNextTab} />
    ),
    [ComponentsType.addInvoiceContent]: (
      <AddInoviceContentDetails onHandleNext={handleNextTab} />
    ),
    [ComponentsType.addReceiptContent]: (
      <AddReceiptContentDetails onHandleNext={handleNextTab} />
    ),
  };

  const tabSection: tabArrayTypes[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill=${
        tabType === 0 ? "#4A13E7" : "#393939"
      }>
      <path d="M19.8222 11.0809C19.7389 10.9106 19.7389 10.7152 19.8222 10.5449L20.594 8.96596C21.0237 8.08683 20.6832 7.039 19.8189 6.58038L18.2664 5.75667C18.0989 5.66783 17.9841 5.50971 17.9513 5.32302L17.6477 3.59197C17.4786 2.62817 16.5871 1.98051 15.6184 2.11757L13.8783 2.36371C13.6905 2.39023 13.5048 2.32984 13.3685 2.19804L12.1054 0.97613C11.4021 0.295737 10.3003 0.295697 9.59704 0.97613L8.3339 2.19816C8.19761 2.33001 8.01189 2.39027 7.82411 2.36384L6.084 2.11769C5.11499 1.98055 4.22377 2.62829 4.05471 3.59209L3.75109 5.32307C3.71831 5.5098 3.60348 5.66787 3.43603 5.75675L1.88358 6.58046C1.01921 7.03904 0.678728 8.08696 1.10845 8.96608L1.88023 10.545C1.96349 10.7153 1.96349 10.9107 1.88023 11.081L1.10841 12.6599C0.678688 13.539 1.01917 14.5869 1.88354 15.0455L3.43599 15.8692C3.60348 15.958 3.71831 16.1162 3.75109 16.3028L4.05471 18.0339C4.20862 18.9113 4.96095 19.5266 5.82561 19.5265C5.91077 19.5265 5.99718 19.5205 6.08404 19.5083L7.82415 19.2621C8.01181 19.2355 8.19765 19.296 8.33394 19.4278L9.59704 20.6497C9.94875 20.9899 10.3999 21.16 10.8512 21.16C11.3024 21.1599 11.7538 20.9899 12.1054 20.6497L13.3685 19.4278C13.5048 19.296 13.6906 19.2358 13.8783 19.2621L15.6184 19.5083C16.5875 19.6454 17.4786 18.9977 17.6477 18.0339L17.9514 16.3029C17.9841 16.1162 18.099 15.9581 18.2664 15.8692L19.8189 15.0455C20.6832 14.5869 21.0237 13.539 20.594 12.6599L19.8222 11.0809ZM8.46409 5.44197C9.67064 5.44197 10.6523 6.4236 10.6523 7.63015C10.6523 8.83671 9.67064 9.81833 8.46409 9.81833C7.25753 9.81833 6.27591 8.83671 6.27591 7.63015C6.27591 6.4236 7.25753 5.44197 8.46409 5.44197ZM7.33465 15.1734C7.21813 15.2899 7.06539 15.3482 6.91269 15.3482C6.75999 15.3482 6.60721 15.2899 6.49073 15.1734C6.25768 14.9403 6.25768 14.5625 6.49073 14.3294L14.3677 6.45242C14.6007 6.21937 14.9786 6.21937 15.2117 6.45242C15.4447 6.68547 15.4447 7.06333 15.2117 7.29638L7.33465 15.1734ZM13.2382 16.1839C12.0317 16.1839 11.0501 15.2023 11.0501 13.9957C11.0501 12.7892 12.0317 11.8075 13.2382 11.8075C14.4448 11.8075 15.4264 12.7892 15.4264 13.9957C15.4264 15.2023 14.4448 16.1839 13.2382 16.1839Z" fill={isSelected ? "#4A13E7" : "#393939"}/>
    </svg>`,
      name: "Offer Content",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18" fill=${
        tabType === 1 ? "#4A13E7" : "#393939"
      }>
      <g clip-path="url(#clip0_1924_79359)">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.2227 0.171875C17.1932 0.171875 21.2227 4.20132 21.2227 9.17188C21.2227 14.1424 17.1932 18.1719 12.2227 18.1719C7.25211 18.1719 3.22266 14.1424 3.22266 9.17188C3.22266 4.20132 7.25211 0.171875 12.2227 0.171875ZM8.00991 9.70621L10.5731 12.0601C10.947 12.4042 11.5258 12.3859 11.8773 12.0232L16.45 7.64514C16.8219 7.28735 16.8334 6.69579 16.4756 6.3239C16.1178 5.95198 15.5263 5.9405 15.1544 6.29825L11.1934 10.0906L9.27628 8.33C8.89626 7.98031 8.30469 8.00488 7.95501 8.3849C7.60532 8.76496 7.62988 9.35653 8.00991 9.70621Z" fill={isSelected ? "#4A13E7" : "#393939"}/>
      </g>
      <defs>
        <clipPath id="clip0_1924_79359">
          <rect width="24" height="24" fill="white" transform="translate(0.105469 0.222656)"/>
        </clipPath>
      </defs>
    </svg>`,
      name: "Confirmation Content",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="19" viewBox="0 0 15 19" fill=${
        tabType === 2 ? "#4A13E7" : "#393939"
      }>
      <g  clip-path="url(#clip0_1924_79355)">
        <path d="M13.9717 2.11845C13.9717 0.948295 13.0234 0 11.8532 0H2.22392C1.05376 0 0.105469 0.948295 0.105469 2.11845V16.3698C0.105469 17.54 1.05376 18.4883 2.22392 18.4883H11.8532C13.0234 18.4883 13.9717 17.54 13.9717 16.3698V2.11845ZM4.6351 7.12569H4.04964C3.1491 7.12569 2.4165 6.39309 2.4165 5.49256C2.4165 4.68293 3.00043 4.01658 3.76461 3.881V3.27397C3.76461 2.95504 4.02344 2.69621 4.34237 2.69621C4.66129 2.69621 4.92013 2.95504 4.92013 3.27397V3.85173H5.69047C6.00939 3.85173 6.26823 4.11056 6.26823 4.42948C6.26823 4.74841 6.00939 5.00724 5.69047 5.00724H4.04964C3.78618 5.00724 3.57202 5.2214 3.57202 5.48486C3.57202 5.75602 3.78618 5.97017 4.04964 5.97017H4.6351C5.53563 5.97017 6.26823 6.70277 6.26823 7.60331C6.26823 8.41294 5.68431 9.07929 4.92013 9.21487V9.82113C4.92013 10.1401 4.66129 10.3989 4.34237 10.3989C4.02344 10.3989 3.76461 10.1401 3.76461 9.82113V9.24414H2.99426C2.67534 9.24414 2.4165 8.9853 2.4165 8.66638C2.4165 8.34746 2.67534 8.08862 2.99426 8.08862H4.6351C4.89856 8.08862 5.11271 7.87447 5.11271 7.61101C5.11271 7.33985 4.89856 7.12569 4.6351 7.12569ZM11.0829 16.1772H2.99426C2.67534 16.1772 2.4165 15.9184 2.4165 15.5995C2.4165 15.2806 2.67534 15.0217 2.99426 15.0217H11.0829C11.4018 15.0217 11.6606 15.2806 11.6606 15.5995C11.6606 15.9184 11.4018 16.1772 11.0829 16.1772ZM11.0829 13.0959H2.99426C2.67534 13.0959 2.4165 12.837 2.4165 12.5181C2.4165 12.1992 2.67534 11.9403 2.99426 11.9403H11.0829C11.4018 11.9403 11.6606 12.1992 11.6606 12.5181C11.6606 12.837 11.4018 13.0959 11.0829 13.0959ZM11.0829 10.0145H8.38668C8.06776 10.0145 7.80892 9.75565 7.80892 9.43673C7.80892 9.1178 8.06776 8.85897 8.38668 8.85897H11.0829C11.4018 8.85897 11.6606 9.1178 11.6606 9.43673C11.6606 9.75565 11.4018 10.0145 11.0829 10.0145ZM11.0829 6.93311H8.38668C8.06776 6.93311 7.80892 6.67427 7.80892 6.35535C7.80892 6.03642 8.06776 5.77759 8.38668 5.77759H11.0829C11.4018 5.77759 11.6606 6.03642 11.6606 6.35535C11.6606 6.67427 11.4018 6.93311 11.0829 6.93311Z" fill={isSelected ? "#4A13E7" : "#393939"}/>
      </g>
      <defs>
        <clipPath id="clip0_1924_79355">
          <rect width="14" height="19" fill="white" transform="translate(0.105469)"/>
        </clipPath>
      </defs>
    </svg>`,
      name: "Invoice Content",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill=${
        tabType === 3 ? "#4A13E7" : "#1E1E1E"
      }>
      <g  clip-path="url(#clip0_1885_60874)">
        <path d="M12.4805 6.1875C11.4792 6.1875 10.5004 6.48441 9.6679 7.04068C8.83537 7.59696 8.1865 8.38761 7.80333 9.31266C7.42016 10.2377 7.31991 11.2556 7.51525 12.2376C7.71058 13.2197 8.19274 14.1217 8.90074 14.8297C9.60875 15.5377 10.5108 16.0199 11.4928 16.2152C12.4749 16.4106 13.4928 16.3103 14.4178 15.9271C15.3429 15.544 16.1335 14.8951 16.6898 14.0626C17.2461 13.2301 17.543 12.2513 17.543 11.25C17.543 9.90734 17.0096 8.61967 16.0602 7.67027C15.1108 6.72087 13.8231 6.1875 12.4805 6.1875ZM11.4961 8.4375H12.6211V9.62438H11.4961V8.4375ZM13.8867 14.0625H11.0742V12.9375H11.918V11.5594H11.0742V10.4344H12.4805C12.6297 10.4344 12.7727 10.4936 12.8782 10.5991C12.9837 10.7046 13.043 10.8477 13.043 10.9969V12.9375H13.8867V14.0625Z" fill={isSelected ? "#4A13E7" : "#1E1E1E"}/>
        <path d="M7.29984 14.625H2.91797V13.5H6.72047C6.44008 12.7829 6.29513 12.02 6.29297 11.25H2.91797V10.125H6.39984C6.64548 8.79922 7.31745 7.58997 8.31353 6.68121C9.30961 5.77245 10.5753 5.21393 11.918 5.09063V1.6875C11.918 1.38913 11.7994 1.10298 11.5885 0.892005C11.3775 0.681026 11.0913 0.5625 10.793 0.5625H4.60547L5.13422 2.15437C5.23584 2.45782 5.26389 2.78108 5.21605 3.0975C5.16821 3.41391 5.04586 3.71443 4.85908 3.97428C4.67229 4.23412 4.42643 4.44586 4.14175 4.59203C3.85707 4.7382 3.54173 4.81463 3.22172 4.815L2.91797 4.79812L0.667969 4.5V16.3125C0.667969 16.6109 0.786495 16.897 0.997474 17.108C1.20845 17.319 1.4946 17.4375 1.79297 17.4375H10.793C10.9648 17.4365 11.1342 17.396 11.288 17.3194C10.4769 17.1594 9.70617 16.8386 9.02119 16.3759C8.33621 15.9131 7.75091 15.3177 7.29984 14.625ZM6.85547 2.8125H9.66797V3.9375H6.85547V2.8125ZM2.91797 6.75H6.29297V7.875H2.91797V6.75Z" fill={isSelected ? "#4A13E7" : "#1E1E1E"}/>
        <path d="M3.88 3.37641C3.98068 3.25895 4.04874 3.11711 4.07737 2.96509C4.106 2.81306 4.09419 2.65618 4.04313 2.51016L3.48063 0.878906L1 3.37641L3.07 3.67453C3.21914 3.69565 3.37118 3.67948 3.51254 3.62745C3.65389 3.57543 3.78014 3.48917 3.88 3.37641Z" fill={isSelected ? "#4A13E7" : "#1E1E1E"}/>
      </g>
      <defs>
        <clipPath id="clip0_1885_60874">
          <rect width="18" height="18" fill="white" transform="translate(0.105469)"/>
        </clipPath>
      </defs>
    </svg>`,
      name: "Receipt Content",
    },
  ];

  return (
    <>
      <div className="flex w-full gap-6">
        <div className="flex flex-col gap-[14px]">
          {tabSection.map((item, index) => (
            <DetailsTab
              isSelected={tabType === index}
              setTabType={setTabType}
              tabType={tabType}
              name={item.name}
              icon={item.icon}
              selectedTab={index}
            />
          ))}
        </div>

        {componentsLookUp[tabType as keyof typeof componentsLookUp]}
      </div>
      {renderModal()}
    </>
  );
};

export default ContentAddDetailsData;
