import Image from "next/image";
import React, { useState } from "react";
import toggle_active from "@/assets/svgs/toggle_active.svg";
import toggle_inactive from "@/assets/svgs/toggle_inactive.svg";
import { useTranslation } from "next-i18next";

type colsData = {
  title: string;
  placeholder: string;
};

const Column = ({
  title,
  isActive,
  toggle,
  data,
}: {
  title: string;
  isActive: boolean;
  toggle: () => void;
  data: colsData[];
}) => (
  <section className="px-[30px] pt-[20px] pb-[25px] rounded-md bg-white mb-6">
    <div className="flex justify-between mb-3">
      <span className="text-lg font-medium text-[#393939]">{title}</span>
      <Image
        src={isActive ? toggle_active : toggle_inactive}
        alt="toggle_button"
        className="cursor-pointer"
        onClick={toggle}
      />
    </div>
    {data.map((item, index) => (
      <section className="mb-5" key={index}>
        <span className="text-[#1E1E1E] text-sm font-normal">{item.title}</span>
        <div className="border rounded-lg border-[#EBEBEB] p-4 flex justify-between items-center mt-[10px]">
          <span className="text-[#484848] text-base font-normal ">
            {item.placeholder}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill={isActive ? "#4A13E7" : "#BFBFBF"}
          >
            <path d="M7.2208 0C3.31035 0 0.128906 3.18137 0.128906 7.0919C0.128906 11.0024 3.31035 14.1839 7.2208 14.1839C11.1313 14.1839 14.3127 11.0024 14.3127 7.0919C14.3127 3.18137 11.1313 0 7.2208 0ZM11.2931 5.89402L6.83762 10.3495C6.64817 10.5389 6.39634 10.6432 6.12845 10.6432C5.86056 10.6432 5.60873 10.5389 5.41928 10.3495L3.14851 8.07872C2.95906 7.88927 2.85472 7.63744 2.85472 7.36955C2.85472 7.10159 2.95906 6.84976 3.14851 6.66031C3.33788 6.47087 3.58971 6.36652 3.85768 6.36652C4.12557 6.36652 4.37747 6.47087 4.56685 6.66039L6.12838 8.22184L9.87461 4.47561C10.0641 4.28616 10.3159 4.18189 10.5838 4.18189C10.8517 4.18189 11.1035 4.28616 11.2929 4.47561C11.6841 4.86678 11.6841 5.50299 11.2931 5.89402Z" />
          </svg>
        </div>
      </section>
    ))}
  </section>
);

const ColumnsComp = () => {
  const [isActive, setIsActive] = useState(true);
  const [isSecondActive, setIsSecondActive] = useState(true);
  const [isThirdActive, setIsThirdActive] = useState(true);
  const [isFourthActive, setIsFourthActive] = useState(true);
  const { t: translate } = useTranslation();

  const firstColumnsData: colsData[] = [
    {
      title: `${translate("setting.templates.first_col_heading.company_name")}`,
      placeholder: "Company Name",
    },
    {
      title: `${translate("setting.templates.first_col_heading.email")}`,
      placeholder: "youremail@gmail.com",
    },
    {
      title: `${translate("setting.templates.first_col_heading.phone_number")}`,
      placeholder: "Phone Number",
    },
    {
      title: `${translate("setting.templates.first_col_heading.website")}`,
      placeholder: "www.your website.com",
    },
    {
      title: `${translate("setting.templates.first_col_heading.mwst_number")}`,
      placeholder: "MwST Number",
    },
  ];

  const secondColumnsData: colsData[] = [
    {
      title: `${translate("setting.templates.second_column.street_no")}`,
      placeholder: "Street no#",
    },
    {
      title: `${translate("setting.templates.second_column.post_code")}`,
      placeholder: "00000",
    },
    {
      title: `${translate("setting.templates.second_column.bank_name")}`,
      placeholder: "ABC",
    },
    {
      title: `${translate("setting.templates.second_column.account_number")}`,
      placeholder: "0000000",
    },
    {
      title: `${translate("setting.templates.second_column.iban_number")}`,
      placeholder: "00000000",
    },
  ];

  const thirdColumnsData: colsData[] = [
    {
      title: `${translate("setting.templates.third_column.row_one")}`,
      placeholder: " ",
    },
    {
      title: `${translate("setting.templates.third_column.row_two")}`,
      placeholder: " ",
    },
    {
      title: `${translate("setting.templates.third_column.row_three")}`,
      placeholder: " ",
    },
    {
      title: `${translate("setting.templates.third_column.row_fourth")}`,
      placeholder: " ",
    },
    {
      title: `${translate("setting.templates.third_column.row_fifth")}`,
      placeholder: " ",
    },
  ];
  const fourthColumnsData: colsData[] = [
    {
      title: `${translate("setting.templates.third_column.row_one")}`,
      placeholder: " ",
    },
    {
      title: `${translate("setting.templates.third_column.row_two")}`,
      placeholder: " ",
    },
    {
      title: `${translate("setting.templates.third_column.row_three")}`,
      placeholder: " ",
    },
    {
      title: `${translate("setting.templates.third_column.row_fourth")}`,
      placeholder: " ",
    },
    {
      title: `${translate("setting.templates.third_column.row_fifth")}`,
      placeholder: " ",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-[27px]">
        <Column
          title={`${translate("setting.templates.first_col_heading.heading")}`}
          isActive={isActive}
          toggle={() => setIsActive(!isActive)}
          data={firstColumnsData}
        />
        <Column
          title={`${translate("setting.templates.second_column.heading")}`}
          isActive={isSecondActive}
          toggle={() => setIsSecondActive(!isSecondActive)}
          data={secondColumnsData}
        />
        <Column
          title={`${translate(
            "setting.templates.third_column.third_column_heading"
          )}`}
          isActive={isThirdActive}
          toggle={() => setIsThirdActive(!isThirdActive)}
          data={thirdColumnsData}
        />
        <Column
          title={`${translate(
            "setting.templates.third_column.fourth_column_heading"
          )}`}
          isActive={isFourthActive}
          toggle={() => setIsFourthActive(!isFourthActive)}
          data={fourthColumnsData}
        />
      </div>

      <button className="px-4 py-2 text-white text-base font-medium rounded-md ml-[32px] bg-[#4A13E7] ">
      {translate("setting.save_setting")}
      </button>
    </>
  );
};

export default ColumnsComp;
