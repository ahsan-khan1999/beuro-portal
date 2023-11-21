import React, { useState } from "react";
import { tabArrayTypes } from "@/types";
import AddLeadsCustomerDetails from "./AddLeadsCustomerDetails";
import AddLeadAddressDetails from "./AddLeadAddressDetails";
import AddLeadServiceDetails from "./AddLeadServiceDetails";
import AddLeadAdditionalDetails from "./AddLeadAdditionalDetails";
import DetailsTab from "@/base-components/ui/tab/DetailsTab";
import LeadCreated from "@/base-components/ui/modals1/LeadCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import ImagesUpload from "@/base-components/ui/modals1/ImagesUpload";
import ImageSlider from "@/base-components/ui/modals1/ImageSlider";
import { useAppSelector } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export enum ComponentsType {
  customerEdit,
  addressEdit,
  serviceEdit,
  additionalEdit,
}

const AddNewLeadsData = () => {
  const [tabType, setTabType] = useState<ComponentsType>(
    ComponentsType.addressEdit
  );

  const router = useRouter();

  const tabSection: tabArrayTypes[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill=${
        tabType === 0 ? "#4A13E7" : "#8F8F8F"
      }>
      <g clip-path="url(#clip0_1199_34418)">
        <path d="M21.8281 3.79688H3.32812C1.81113 3.79688 0.578125 5.02988 0.578125 6.54688V19.0469C0.578125 20.5639 1.81113 21.7969 3.32812 21.7969H21.8281C23.3451 21.7969 24.5781 20.5639 24.5781 19.0469V6.54688C24.5781 5.02988 23.3451 3.79688 21.8281 3.79688ZM8.07812 7.79688C9.45613 7.79688 10.5781 8.91887 10.5781 10.2969C10.5781 11.6749 9.45613 12.7969 8.07812 12.7969C6.70012 12.7969 5.57812 11.6749 5.57812 10.2969C5.57812 8.91887 6.70012 7.79688 8.07812 7.79688ZM12.5781 17.0469C12.5781 17.4609 12.2421 17.7969 11.8281 17.7969H4.32812C3.91412 17.7969 3.57812 17.4609 3.57812 17.0469V16.5469C3.57812 15.0299 4.81112 13.7969 6.32812 13.7969H9.82812C11.3451 13.7969 12.5781 15.0299 12.5781 16.5469V17.0469ZM20.8281 17.7969H15.3281C14.9141 17.7969 14.5781 17.4609 14.5781 17.0469C14.5781 16.6329 14.9141 16.2969 15.3281 16.2969H20.8281C21.2421 16.2969 21.5781 16.6329 21.5781 17.0469C21.5781 17.4609 21.2421 17.7969 20.8281 17.7969ZM20.8281 13.7969H15.3281C14.9141 13.7969 14.5781 13.4609 14.5781 13.0469C14.5781 12.6329 14.9141 12.2969 15.3281 12.2969H20.8281C21.2421 12.2969 21.5781 12.6329 21.5781 13.0469C21.5781 13.4609 21.2421 13.7969 20.8281 13.7969ZM20.8281 9.79688H15.3281C14.9141 9.79688 14.5781 9.46088 14.5781 9.04688C14.5781 8.63287 14.9141 8.29688 15.3281 8.29688H20.8281C21.2421 8.29688 21.5781 8.63287 21.5781 9.04688C21.5781 9.46088 21.2421 9.79688 20.8281 9.79688Z" fill={isSelected ? "#4A13E7" : "#8F8F8F"}/>
      </g>
      <defs>
        <clipPath id="clip0_1199_34418">
          <rect width="24" height="24" fill="white" transform="translate(0.578125 0.796875)"/>
        </clipPath>
      </defs>
    </svg>`,
      name: "Customer Details",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill=${
        tabType === 1 ? "#4A13E7" : "#8F8F8F"
      }>
      <path d="M12.0845 3.46973C8.78825 3.46973 6.03906 6.12494 6.03906 9.51512C6.03906 10.8049 6.42663 11.955 7.17043 13.0327L11.6218 19.9786C11.8378 20.3163 12.3316 20.3156 12.5471 19.9786L17.0178 13.009C17.7456 11.9802 18.1298 10.7721 18.1298 9.51512C18.1298 6.18169 15.4179 3.46973 12.0845 3.46973ZM12.0845 12.263C10.5693 12.263 9.33655 11.0302 9.33655 9.51512C9.33655 8 10.5693 6.76721 12.0845 6.76721C13.5996 6.76721 14.8324 8 14.8324 9.51512C14.8324 11.0302 13.5996 12.263 12.0845 12.263Z" fill={isSelected ? "#4A13E7" : "#8F8F8F"}/>
      <path d="M16.3839 16.0996L13.6165 20.4262C12.9002 21.543 11.2708 21.5393 10.5579 20.4272L7.786 16.1007C5.34718 16.6646 3.84375 17.6976 3.84375 18.932C3.84375 21.0739 8.09121 22.2295 12.0875 22.2295C16.0837 22.2295 20.3312 21.0739 20.3312 18.932C20.3312 17.6967 18.8257 16.6632 16.3839 16.0996Z" fill={isSelected ? "#4A13E7" : "#8F8F8F"}
      }/>
    </svg>`,
      name: "Address Details",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill=${
        tabType === 2 ? "#4A13E7" : "#8F8F8F"
      }>
      <g  clip-path="url(#clip0_1199_31194)">
        <path d="M24.6665 10.7537C24.6286 10.4164 24.2351 10.1626 23.8949 10.1626C22.7953 10.1626 21.8195 9.51724 21.4102 8.51835C20.9925 7.49548 21.262 6.30282 22.0812 5.55126C22.3393 5.31535 22.3707 4.92032 22.1544 4.6461C21.5914 3.93139 20.9519 3.2857 20.2534 2.72617C19.9801 2.50696 19.5785 2.53747 19.3413 2.79996C18.6261 3.5921 17.3413 3.88645 16.3484 3.47222C15.3156 3.03764 14.6637 1.9907 14.7277 0.86695C14.7488 0.513748 14.4905 0.206836 14.1386 0.165839C13.2421 0.0620473 12.3378 0.0590373 11.4388 0.158781C11.0913 0.197184 10.8332 0.49683 10.8448 0.845569C10.8837 1.95832 10.2244 2.98679 9.20154 3.40579C8.22061 3.80653 6.9447 3.51436 6.23093 2.72918C5.99501 2.47053 5.6005 2.43877 5.32535 2.6533C4.60628 3.21762 3.95229 3.86372 3.38414 4.57261C3.16275 4.84818 3.19544 5.24757 3.45565 5.48432C4.29107 6.24085 4.56041 7.4438 4.12666 8.4786C3.71253 9.46513 2.68822 10.1006 1.51568 10.1006C1.13519 10.0884 0.864394 10.344 0.822358 10.6901C0.716906 11.5913 0.715764 12.5101 0.817272 13.4187C0.855156 13.7574 1.26025 14.009 1.60422 14.009C2.6494 13.9824 3.65223 14.6291 4.07352 15.6532C4.49273 16.676 4.22288 17.8682 3.4023 18.6208C3.14562 18.8567 3.11283 19.2508 3.32954 19.5247C3.8868 20.2349 4.52698 20.881 5.22758 21.4454C5.50262 21.6669 5.90264 21.6358 6.14105 21.373C6.85907 20.579 8.1437 20.2852 9.13252 20.7002C10.1684 21.1337 10.82 22.1805 10.7563 23.3046C10.7355 23.6578 10.9943 23.9656 11.345 24.0057C11.8038 24.0593 12.2649 24.0859 12.7275 24.0859C13.1666 24.0859 13.6057 24.0619 14.0449 24.0131C14.3928 23.9747 14.6504 23.6747 14.6387 23.3259C14.5985 22.2136 15.2592 21.1851 16.2808 20.7669C17.2683 20.3635 18.5385 20.6587 19.2527 21.4428C19.4899 21.7009 19.882 21.7322 20.1583 21.5185C20.8761 20.9557 21.5288 20.3099 22.0995 19.5991C22.3211 19.3241 22.2896 18.9242 22.028 18.687C21.1928 17.931 20.922 16.7275 21.3557 15.6938C21.7634 14.7205 22.7496 14.067 23.8104 14.067L23.9588 14.071C24.3032 14.0989 24.6197 13.8337 24.6613 13.4824C24.7672 12.5803 24.7684 11.6626 24.6665 10.7537ZM12.742 19.0041C8.9211 19.0041 5.82386 15.9068 5.82386 12.0861C5.82386 8.26531 8.9212 5.16807 12.742 5.16807C16.5627 5.16807 19.6601 8.26531 19.6601 12.0861C19.6601 13.3829 19.3025 14.596 18.6815 15.6333L15.6523 12.6039C15.8716 12.0868 15.9874 11.5262 15.9873 10.9477C15.9873 9.81481 15.5461 8.7498 14.7449 7.94885C13.944 7.14789 12.879 6.70677 11.7463 6.70677C11.3683 6.70677 10.992 6.75701 10.6281 6.85613C10.4686 6.89962 10.3383 7.03102 10.2958 7.19075C10.2524 7.35412 10.3013 7.52154 10.429 7.6493C10.429 7.6493 11.9245 9.15635 12.4249 9.65663C12.4773 9.70904 12.4772 9.83411 12.4698 9.87916L12.4652 9.91206C12.4147 10.4622 12.3175 11.1225 12.2372 11.3762C12.2264 11.3869 12.2163 11.396 12.2053 11.407C12.1937 11.4185 12.1832 11.4296 12.1721 11.441C11.915 11.5235 11.2445 11.6219 10.6857 11.6719L10.6858 11.6689L10.6606 11.6753C10.6562 11.6758 10.6479 11.6764 10.6369 11.6764C10.5765 11.6764 10.4876 11.6595 10.4069 11.5788C9.88605 11.058 8.44916 9.63141 8.44916 9.63141C8.32025 9.50291 8.18802 9.47593 8.0999 9.47593C7.8945 9.47593 7.71058 9.62435 7.65266 9.83723C7.25711 11.301 7.67643 12.8755 8.74725 13.9464C9.54841 14.7475 10.6135 15.1886 11.7464 15.1886C12.3249 15.1886 12.8855 15.0729 13.4025 14.8536L16.4647 17.9157C15.3896 18.6037 14.113 19.0041 12.742 19.0041Z" fill={isSelected ? "#4A13E7" : "#8F8F8F"}/>
      </g>
      <defs>
        <clipPath id="clip0_1199_31194">
          <rect width="24" height="24" fill="white" transform="translate(0.742188 0.0859375)"/>
        </clipPath>
      </defs>
    </svg>`,
      name: "Service Details",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill=${
        tabType === 3 ? "#4A13E7" : "#8F8F8F"
      }>
      <g clip-path="url(#clip0_1199_31185)">
        <path d="M17.3359 8.5293C16.0009 8.5293 14.6959 8.92518 13.5858 9.66688C12.4758 10.4086 11.6106 11.4628 11.0998 12.6962C10.5889 13.9296 10.4552 15.2868 10.7156 16.5962C10.9761 17.9055 11.619 19.1083 12.563 20.0523C13.507 20.9963 14.7097 21.6391 16.0191 21.8996C17.3285 22.16 18.6857 22.0264 19.9191 21.5155C21.1525 21.0046 22.2067 20.1394 22.9484 19.0294C23.6901 17.9194 24.0859 16.6143 24.0859 15.2793C24.0859 13.4891 23.3748 11.7722 22.1089 10.5063C20.843 9.24046 19.1262 8.5293 17.3359 8.5293ZM16.0234 11.5293H17.5234V13.1118H16.0234V11.5293ZM19.2109 19.0293H15.4609V17.5293H16.5859V15.6918H15.4609V14.1918H17.3359C17.5349 14.1918 17.7256 14.2708 17.8663 14.4115C18.0069 14.5521 18.0859 14.7429 18.0859 14.9418V17.5293H19.2109V19.0293Z" fill={isSelected ? "#4A13E7" : "#8F8F8F"}/>
        <path d="M10.4284 19.7793H4.58594V18.2793H9.65594C9.28209 17.3231 9.08882 16.3059 9.08594 15.2793H4.58594V13.7793H9.22844C9.55595 12.0116 10.4519 10.3993 11.78 9.18757C13.1081 7.97589 14.7957 7.2312 16.5859 7.0668V2.5293C16.5859 2.13147 16.4279 1.74994 16.1466 1.46864C15.8653 1.18733 15.4838 1.0293 15.0859 1.0293H6.83594L7.54094 3.1518C7.67643 3.5564 7.71383 3.9874 7.65004 4.40929C7.58626 4.83118 7.42312 5.23187 7.17408 5.57833C6.92504 5.9248 6.59722 6.20711 6.21765 6.40201C5.83808 6.5969 5.41762 6.6988 4.99094 6.6993L4.58594 6.6768L1.58594 6.2793V22.0293C1.58594 22.4271 1.74397 22.8087 2.02528 23.09C2.30658 23.3713 2.68811 23.5293 3.08594 23.5293H15.0859C15.3151 23.5279 15.5409 23.474 15.7459 23.3718C14.6646 23.1586 13.6369 22.7308 12.7236 22.1138C11.8103 21.4967 11.0299 20.703 10.4284 19.7793ZM9.83594 4.0293H13.5859V5.5293H9.83594V4.0293ZM4.58594 9.2793H9.08594V10.7793H4.58594V9.2793Z" fill={isSelected ? "#4A13E7" : "#8F8F8F"}/>
        <path d="M5.8693 4.77922C6.00354 4.62262 6.09428 4.4335 6.13245 4.2308C6.17062 4.02809 6.15488 3.81892 6.0868 3.62422L5.3368 1.44922L2.0293 4.77922L4.7893 5.17672C4.98814 5.20488 5.19087 5.18331 5.37934 5.11395C5.56782 5.04458 5.73615 4.92957 5.8693 4.77922Z" fill={isSelected ? "#4A13E7" : "#8F8F8F"}/>
      </g>
      <defs>
        <clipPath id="clip0_1199_31185">
          <rect width="24" height="24" fill="white" transform="translate(0.835938 0.279297)"/>
        </clipPath>
      </defs>
    </svg>`,
      name: "Additional Details",
    },
  ];

  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const routeHandler = () => {
    router.push("/leads");
  };

  const leadCreatedHandler = () => {
    dispatch(updateModalType(ModalType.PASSWORD_CHANGE_SUCCESSFULLY));
  };

  const imageUploadHandler = () => {
    dispatch(updateModalType(ModalType.UPLOAD_IMAGE));
  };

  const handleImageSlider = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.IMAGE_SLIDER));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_CHANGE_SUCCESSFULLY]: (
      <LeadCreated
        imageUploadHandler={imageUploadHandler}
        onClose={onClose}
        routeHandler={routeHandler}
      />
    ),
    [ModalType.UPLOAD_IMAGE]: (
      <ImagesUpload onClose={onClose} handleImageSlider={handleImageSlider} />
    ),
    [ModalType.IMAGE_SLIDER]: <ImageSlider onClose={onClose} />,
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleNextTab = (currentComponent: ComponentsType) => {
    if (tabType === ComponentsType.additionalEdit) {
      leadCreatedHandler();
      return;
    }
    setTabType(currentComponent);
  };

  const onHandleBack = (currentComponent: ComponentsType) => {
    setTabType(currentComponent);
  };

  const componentsLookUp = {
    [ComponentsType.customerEdit]: (
      <AddLeadsCustomerDetails onHandleNext={handleNextTab} />
    ),
    [ComponentsType.addressEdit]: (
      <AddLeadAddressDetails onHandleNext={handleNextTab} onHandleBack={onHandleBack}/>
    ),
    [ComponentsType.serviceEdit]: (
      <AddLeadServiceDetails onHandleNext={handleNextTab} />
    ),
    [ComponentsType.additionalEdit]: (
      <AddLeadAdditionalDetails onHandleNext={handleNextTab} />
    ),
  };

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

export default AddNewLeadsData;
