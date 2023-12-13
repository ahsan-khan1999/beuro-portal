import Image from "next/image";
import React, { useState } from "react";
import toggle_active from "@/assets/svgs/toggle_active.svg";
import toggle_inactive from "@/assets/svgs/toggle_inactive.svg";
import { useTranslation } from "next-i18next";
import { CheckBox } from "@/base-components/ui/checkbox/check-box";
import { ToggleButton } from "@/base-components/ui/button/toggle-button";

type colsData = {
  title: string;
  placeholder: string;
  data: { column: string, type: string, value: boolean },

};

const Column = ({
  title,
  isActive,
  toggle,
  data,
  handleChange,
  handleToggle,
  column

}: {
  title: string;
  isActive: boolean;
  toggle: () => void;
  data: colsData[];
  handleChange: (column: string, type: string, value: boolean) => void,
  handleToggle: (column: string, value: boolean) => void,
  column: string
}) => {
  return (

    <section className="px-[30px] pt-[20px] pb-[25px] rounded-md bg-white mb-6">
      <div className="flex justify-between mb-3">
        <span className="text-lg font-medium text-[#393939]">{title}</span>
        <ToggleButton onChange={(value) => handleToggle(column, value.target.checked)} />
      </div>
      {data.map((item, index) => (
        <div className="mb-5" key={index}>
          <span className="text-[#1E1E1E] text-sm font-normal">{item.title}</span>
          <div className="border rounded-lg border-[#EBEBEB] p-4 flex justify-between items-center mt-[10px]">
            <span className="text-[#484848] text-base font-normal ">
              {item.data.type}
            </span>
            <CheckBox id={item.data.column + index.toString()} key={index} onChange={(value) => handleChange(item.data.column, item.data.type, value)} />

          </div>
        </div>
      ))}
    </section>
  )
};
type Template = {
  firstColumn: {
    isCompanyName: boolean;
    isEmail: boolean;
    isPhoneNumber: boolean;
    isTaxNumber: boolean;
    isWebsite: boolean;
  };
  [key: string]: {
    [key: string]: boolean;
  };
};
const ColumnsComp = () => {
  const [isActive, setIsActive] = useState(true);
  const [isSecondActive, setIsSecondActive] = useState(true);
  const [isThirdActive, setIsThirdActive] = useState(true);
  const [isFourthActive, setIsFourthActive] = useState(true);
  const { t: translate } = useTranslation();

  let firstColumnsData: colsData[] = [
    {
      title: `${translate("setting.templates.first_col_heading.company_name")}`,
      placeholder: "Company Name",
      data: { column: "firstColumn", type: "isCompanyName", value: false },
    },
    {
      title: `${translate("setting.templates.first_col_heading.email")}`,
      placeholder: "youremail@gmail.com",
      data: { column: "firstColumn", type: "isEmail", value: false },


    },
    {
      title: `${translate("setting.templates.first_col_heading.phone_number")}`,
      placeholder: "Phone Number",
      data: { column: "firstColumn", type: "isPhoneNumber", value: false },


    },
    {
      title: `${translate("setting.templates.first_col_heading.website")}`,
      placeholder: "www.your website.com",
      data: { column: "firstColumn", type: "isTaxNumber", value: false },


    },
    {
      title: `${translate("setting.templates.first_col_heading.mwst_number")}`,
      placeholder: "MwST Number",
      data: { column: "firstColumn", type: "isWebsite", value: false },


    },
  ];

  const secondColumnsData: colsData[] = [
    {
      title: `${translate("setting.templates.second_column.street_no")}`,
      placeholder: "Street no#",
      data: { column: "secondColumn", type: "isStreetNumber", value: false },


    },
    {
      title: `${translate("setting.templates.second_column.post_code")}`,
      placeholder: "00000",
      data: { column: "secondColumn", type: "isPostCode", value: false },


    },
    {
      title: `${translate("setting.templates.second_column.bank_name")}`,
      placeholder: "ABC",
      data: { column: "secondColumn", type: "isBankName", value: false },


    },
    {
      title: `${translate("setting.templates.second_column.account_number")}`,
      placeholder: "0000000",
      data: { column: "secondColumn", type: "isAccountNumber", value: false },


    },
    {
      title: `${translate("setting.templates.second_column.iban_number")}`,
      placeholder: "00000000",
      data: { column: "secondColumn", type: "isIBAN", value: false },


    },
  ];

  const thirdColumnsData: colsData[] = [
    {
      title: `${translate("setting.templates.third_column.row_one")}`,
      placeholder: " ",
      value: false,

    },
    {
      title: `${translate("setting.templates.third_column.row_two")}`,
      placeholder: " ",
      value: false,

    },
    {
      title: `${translate("setting.templates.third_column.row_three")}`,
      placeholder: " ",
      value: false,

    },
    {
      title: `${translate("setting.templates.third_column.row_fourth")}`,
      placeholder: " ",
      value: false,

    },
    {
      title: `${translate("setting.templates.third_column.row_fifth")}`,
      placeholder: " ",
      value: false,

    },
  ];
  const fourthColumnsData: colsData[] = [
    {
      title: `${translate("setting.templates.third_column.row_one")}`,
      placeholder: " ",
      value: false,

    },
    {
      title: `${translate("setting.templates.third_column.row_two")}`,
      placeholder: " ",
      value: false,

    },
    {
      title: `${translate("setting.templates.third_column.row_three")}`,
      placeholder: " ",
      value: false,

    },
    {
      title: `${translate("setting.templates.third_column.row_fourth")}`,
      placeholder: " ",
      value: false,

    },
    {
      title: `${translate("setting.templates.third_column.row_fifth")}`,
      placeholder: " ",
      value: false,

    },
  ];

  const [templates, setTemplates] = useState<Template>({
    firstColumn: {
      isCompanyName: false,
      isEmail: false,
      isPhoneNumber: false,
      isTaxNumber: false,
      isWebsite: false
    },
    secondColumn: {
      isStreetNumber: false,
      isPostCode: false,
      isBankName: false,
      isAccountNumber: false,
      isIBAN: false
    },
  })
  const handleChange = (column: string, type: string, value: boolean) => {

    setTemplates({
      ...templates,
      [column]: {
        ...templates[column],
        [type]: value
      }
    });
  };
  const handleToggle = (column: string, value: boolean) => {
    let template = { ...templates }
    for (const key in template[column]) {
      template = {
        ...template,
        [column]: {
          ...template[column],
          [key]: value
        }
      }
    }
    firstColumnsData.map((item) => item.data.value == value)
    console.log(firstColumnsData,"firstColumnsData");
    
    setTemplates(template)
  }
  const handleSaveSetings = () => {
    console.log(templates, "templates");

  }
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-[27px]">
        <Column
          title={`${translate("setting.templates.first_col_heading.heading")}`}
          isActive={isActive}
          toggle={() => setIsActive(!isActive)}
          data={firstColumnsData}
          handleChange={handleChange}
          handleToggle={handleToggle}
          column="firstColumn"
        />
        <Column
          title={`${translate("setting.templates.second_column.heading")}`}
          isActive={isSecondActive}
          toggle={() => setIsSecondActive(!isSecondActive)}
          data={secondColumnsData}
          handleChange={handleChange}
          handleToggle={handleToggle}
          column="secondColumn"


        />
        {/* <Column
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
        /> */}
      </div>

      <button className="px-4 py-2 text-white text-base font-medium rounded-md ml-[32px] bg-[#4A13E7] " onClick={handleSaveSetings}>
        {translate("setting.save_setting")}
      </button>
    </>
  );
};

export default ColumnsComp;
