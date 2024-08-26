import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { CheckBox } from "@/base-components/ui/checkbox/check-box";
import { ToggleButton } from "@/base-components/ui/button/toggle-button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateTemplateSetting } from "@/api/slices/settingSlice/settings";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ColumnStructure, MainColumns, colsData } from "@/types/settings";
import { Button } from "@/base-components/ui/button/button";
import InputField from "@/base-components/filter/fields/input-field";
// import leftAlignTemplate from "@/assets/pngs/Left_alight.png";
import leftAlignTemplate from "@/assets/svgs/Group 48096404.svg";

import rightAlignTemplate from "@/assets/svgs/Group 48096404 (1).svg";

import { CheckIcon } from "@/assets/svgs/components/check-icon";

const Column = ({
  title,
  data,
  handleChange,
  handleToggle,
  column,
  mainColumns,
  handleChangeInput,
}: {
  title: string;
  data: colsData[];
  handleChange: (
    column: string,
    type: string,
    value: boolean,
    index: number
  ) => void;
  handleToggle: (column: string, value: boolean) => void;
  column: string;
  mainColumns: MainColumns;
  handleChangeInput: (
    column: string,
    type: string,
    value: string,
    index: number
  ) => void;
}) => {
  return (
    <section className="px-6 py-5 rounded-md bg-white mb-6">
      <div className="rounded-lg px-2 py-3 bg-[#EDF4FF]">
        <div className="flex justify-between mb-3">
          <span className="text-lg font-medium text-[#393939]">{title}</span>
          <ToggleButton
            isChecked={mainColumns[column]}
            onChange={(value) => handleToggle(column, value.target.checked)}
          />
        </div>
        {data.map((item, index) => (
          <div className="mb-5" key={index}>
            <div className="flex space-x-2">
              <CheckBox
                isChecked={item.data.value}
                id={item.data.column + index.toString()}
                key={index}
                onChange={(value) =>
                  handleChange(item.data.column, item.data.type, value, index)
                }
              />
              <span className="text-[#1E1E1E] text-sm font-normal">
                {item.title}
              </span>
            </div>
            <div className=" p-4 flex justify-between items-center mt-[10px]">
              <InputField
                containerClassName="w-full"
                value={item.data.text}
                textClassName="!p-4 border rounded-lg border-[#EBEBEB]"
                handleChange={(value) =>
                  handleChangeInput(
                    item.data.column,
                    item.data.textType,
                    value,
                    index
                  )
                }
              />
              {/* <span className="text-[#484848] text-base font-normal ">
              
              {item.data.type}
            </span> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ColumnsComp = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const { modal } = useAppSelector((state) => state.global);
  const { loading, templateSettings } = useAppSelector(
    (state) => state.settings
  );

  const [mainColumns, setMainColumns] = useState<MainColumns>({
    firstColumn: templateSettings?.isFirstColumn || false,
    secondColumn: templateSettings?.isSecondColumn || false,
    thirdColumn: templateSettings?.isThirdColumn || false,
    fourthColumn: templateSettings?.isFourthColumn || false,
    order: templateSettings?.order || false,
  });

  const [columnSettings, setColumnSettings] = useState<ColumnStructure>({
    firstColumn: [
      {
        title: `${translate(
          "setting.templates.first_col_heading.company_name"
        )}`,
        placeholder: "Company Name",
        data: {
          column: "firstColumn",
          type: "isCompanyName",
          value: templateSettings?.firstColumn?.isCompanyName || false,
          text: templateSettings?.firstColumn?.companyName || "",
          textType: "companyName",
        },
      },
      {
        title: `${translate("setting.templates.first_col_heading.email")}`,
        placeholder: "youremail@gmail.com",
        data: {
          column: "firstColumn",
          type: "isEmail",
          value: templateSettings?.firstColumn?.isEmail || false,
          text: templateSettings?.firstColumn?.email || "",
          textType: "email",
        },
      },
      {
        title: `${translate(
          "setting.templates.first_col_heading.phone_number"
        )}`,
        placeholder: "Phone Number",
        data: {
          column: "firstColumn",
          type: "isPhoneNumber",
          value: templateSettings?.firstColumn?.isPhoneNumber || false,
          text: templateSettings?.firstColumn?.phoneNumber || "",
          textType: "phoneNumber",
        },
      },
      {
        title: `${translate("setting.templates.first_col_heading.website")}`,
        placeholder: "www.your website.com",
        data: {
          column: "firstColumn",
          type: "isTaxNumber",
          value: templateSettings?.firstColumn?.isWebsite || false,
          text: templateSettings?.firstColumn?.website || "",
          textType: "website",
        },
      },
      {
        title: `${translate(
          "setting.templates.first_col_heading.mwst_number"
        )}`,
        placeholder: "MwST Number",
        data: {
          column: "firstColumn",
          type: "isWebsite",
          value: templateSettings?.firstColumn?.isTaxNumber || false,
          text: templateSettings?.firstColumn?.taxNumber?.toString() || "",
          textType: "taxNumber",
        },
      },
    ],
    secondColumn: [
      {
        title: `${translate("setting.templates.second_column.street_no")}`,
        placeholder: "Street no#",
        data: {
          column: "secondColumn",
          type: "isStreetNumber",
          value: templateSettings?.secondColumn?.isStreetNumber || false,
          text: templateSettings?.secondColumn?.streetNumber || "",
          textType: "streetNumber",
        },
      },
      {
        title: `${translate("setting.templates.second_column.post_code")}`,
        placeholder: "00000",
        data: {
          column: "secondColumn",
          type: "isPostCode",
          value: templateSettings?.secondColumn?.isPostCode || false,
          text: templateSettings?.secondColumn?.postCode || "",
          textType: "postCode",
        },
      },
      {
        title: `${translate("setting.templates.second_column.bank_name")}`,
        placeholder: "ABC",
        data: {
          column: "secondColumn",
          type: "isBankName",
          value: templateSettings?.secondColumn?.isBankName || false,
          text: templateSettings?.secondColumn?.bankName || "",
          textType: "bankName",
        },
      },
      {
        title: `${translate("setting.templates.second_column.account_number")}`,
        placeholder: "0000000",
        data: {
          column: "secondColumn",
          type: "isAccountNumber",
          value: templateSettings?.secondColumn?.isAccountNumber || false,
          text: templateSettings?.secondColumn?.accountNumber || "",
          textType: "accountNumber",
        },
      },
      {
        title: `${translate("setting.templates.second_column.iban_number")}`,
        placeholder: "00000000",
        data: {
          column: "secondColumn",
          type: "isIBAN",
          value: templateSettings?.secondColumn?.isIBAN || false,
          text: templateSettings?.secondColumn?.iban || "",
          textType: "iban",
        },
      },
    ],
    thirdColumn: [
      {
        title: `${translate("setting.templates.third_column.row_one")}`,
        placeholder: " ",
        data: {
          column: "thirdColumn",
          type: "isRow1",
          value: templateSettings?.thirdColumn?.isRow1 || false,
          text: templateSettings?.thirdColumn?.row1 || "",
          textType: "row1",
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_two")}`,
        placeholder: " ",
        data: {
          column: "thirdColumn",
          type: "isRow2",
          value: templateSettings?.thirdColumn?.isRow2 || false,
          text: templateSettings?.thirdColumn?.row2 || "",
          textType: "row2",
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_three")}`,
        placeholder: " ",
        data: {
          column: "thirdColumn",
          type: "isRow3",
          value: templateSettings?.thirdColumn?.isRow3 || false,
          text: templateSettings?.thirdColumn?.row3 || "",
          textType: "row3",
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_fourth")}`,
        placeholder: " ",
        data: {
          column: "thirdColumn",
          type: "isRow4",
          value: templateSettings?.thirdColumn?.isRow4 || false,
          text: templateSettings?.thirdColumn?.row4 || "",
          textType: "row4",
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_fifth")}`,
        placeholder: " ",
        data: {
          column: "thirdColumn",
          type: "isRow5",
          value: templateSettings?.thirdColumn?.isRow5 || false,
          text: templateSettings?.thirdColumn?.row5 || "",
          textType: "row5",
        },
      },
    ],
    fourthColumn: [
      {
        title: `${translate("setting.templates.third_column.row_one")}`,
        placeholder: " ",
        data: {
          column: "fourthColumn",
          type: "isRow1",
          value: templateSettings?.fourthColumn?.isRow1 || false,
          text: templateSettings?.fourthColumn?.row1 || "",
          textType: "row1",
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_two")}`,
        placeholder: " ",
        data: {
          column: "fourthColumn",
          type: "isRow2",
          value: templateSettings?.fourthColumn?.isRow2 || false,
          text: templateSettings?.fourthColumn?.row2 || "",
          textType: "row2",
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_three")}`,
        placeholder: " ",
        data: {
          column: "fourthColumn",
          type: "isRow3",
          value: templateSettings?.fourthColumn?.isRow3 || false,
          text: templateSettings?.fourthColumn?.row3 || "",
          textType: "row3",
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_fourth")}`,
        placeholder: " ",
        data: {
          column: "fourthColumn",
          type: "isRow4",
          value: templateSettings?.fourthColumn?.isRow4 || false,
          text: templateSettings?.fourthColumn?.row4 || "",
          textType: "row4",
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_fifth")}`,
        placeholder: " ",
        data: {
          column: "fourthColumn",
          type: "isRow5",
          value: templateSettings?.fourthColumn?.isRow5 || false,
          text: templateSettings?.fourthColumn?.row5 || "",
          textType: "row5",
        },
      },
    ],
  });

  useEffect(() => {
    setMainColumns({
      ...mainColumns,
      firstColumn: templateSettings?.isFirstColumn || false,
      secondColumn: templateSettings?.isSecondColumn || false,
      thirdColumn: templateSettings?.isThirdColumn || false,
      fourthColumn: templateSettings?.isFourthColumn || false,
      order: templateSettings?.order || false,
    });
    updateColumnValues(
      columnSettings.firstColumn,
      templateSettings?.firstColumn
    );
    updateColumnValues(
      columnSettings.secondColumn,
      templateSettings?.secondColumn
    );
    updateColumnValues(
      columnSettings.thirdColumn,
      templateSettings?.thirdColumn
    );
    updateColumnValues(
      columnSettings.fourthColumn,
      templateSettings?.fourthColumn
    );
  }, [templateSettings]);

  const handleChange = (
    column: string,
    type: string,
    value: boolean,
    index: number
  ) => {
    const columns = { ...columnSettings };
    columns[column as keyof ColumnStructure][index].data.value = value;
    setColumnSettings(columns);
  };

  const handleChangeInput = (
    column: string,
    type: string,
    value: string,
    index: number
  ) => {
    const columns = { ...columnSettings };
    columns[column as keyof ColumnStructure][index].data.text = value;
    setColumnSettings(columns);
  };

  const handleToggle = (column: string, value: boolean) => {
    let columnsetting = { ...columnSettings };
    let mainColumn = { ...mainColumns };
    columnsetting[column as keyof ColumnStructure]?.forEach((element) => {
      element.data.value = value;
    });
    mainColumn[column] = value;

    setColumnSettings(columnsetting);
    setMainColumns(mainColumn);
  };

  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }));
  };

  const handleSuccess = () => {
    dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }));
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading={translate("common.modals.update_setting")}
        modelSubHeading={translate("common.modals.setting_update_des")}
        routeHandler={onClose}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const handleSaveSetings = async () => {
    let formatObj: any = {};
    for (const [key, value] of Object.entries(columnSettings)) {
      for (let item of value) {
        formatObj = {
          ...formatObj,
          [key]: {
            ...formatObj[key],
            [item.data.type]: item.data.value,
            [item.data.textType]: item.data.text?.toString(),
          },
        };
      }
    }
    let apiData = {
      ...formatObj,
      isFirstColumn: mainColumns?.firstColumn,
      isSecondColumn: mainColumns?.secondColumn,
      isThirdColumn: mainColumns?.thirdColumn,
      isFourthColumn: mainColumns?.fourthColumn,
      order: mainColumns?.order,
    };
    const response = await dispatch(
      updateTemplateSetting({ data: apiData, translate })
    );
    if (response?.payload) handleSuccess();
  };

  return (
    <>
      <div className="flex flex-col gap-x-5 mb-5 bg-white">
        <p className="text-base font-semibold px-5 mt-5">
          {translate("header_alignment.header_heading")}
        </p>
        <div className="flex">
          <button
            className={`relative px-6 my-3`}
            onClick={() => setMainColumns({ ...mainColumns, order: false })}
          >
            {mainColumns.order === false && (
              <div className="absolute -right-2 -top-5">
                <CheckIcon />
              </div>
            )}
            <div
              className={`border-2 rounded-lg p-4 ${
                !mainColumns.order ? "border-primary" : "border-lightGray"
              }`}
            >
              <Image
                src={leftAlignTemplate}
                height={250}
                width={250}
                alt="left aligned"
              />
            </div>
            <p className="text-base font-medium py-2">
              {translate("header_alignment.left_align")}
            </p>
          </button>

          <button
            className={`relative`}
            onClick={() => setMainColumns({ ...mainColumns, order: true })}
          >
            {mainColumns.order && (
              <div className="absolute -right-8 -top-2">
                <CheckIcon />
              </div>
            )}
            <div
              className={`border-2 rounded-lg p-4 ${
                mainColumns.order ? "border-primary" : "border-lightGray"
              }`}
            >
              <Image
                src={rightAlignTemplate}
                height={250}
                width={250}
                alt="right aligned"
              />
            </div>
            <p className="text-base font-medium py-2">
              {translate("header_alignment.right_align")}
            </p>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-[27px]">
        <Column
          title={`${translate("setting.templates.first_col_heading.heading")}`}
          data={columnSettings["firstColumn"]}
          handleChange={handleChange}
          handleToggle={handleToggle}
          column="firstColumn"
          mainColumns={mainColumns}
          handleChangeInput={handleChangeInput}
        />
        <Column
          title={`${translate("setting.templates.second_column.heading")}`}
          data={columnSettings["secondColumn"]}
          handleChange={handleChange}
          handleToggle={handleToggle}
          column="secondColumn"
          mainColumns={mainColumns}
          handleChangeInput={handleChangeInput}
        />
        <Column
          title={`${translate(
            "setting.templates.third_column.third_column_heading"
          )}`}
          data={columnSettings["thirdColumn"]}
          handleChange={handleChange}
          handleToggle={handleToggle}
          column="thirdColumn"
          mainColumns={mainColumns}
          handleChangeInput={handleChangeInput}
        />
        <Column
          title={`${translate(
            "setting.templates.third_column.fourth_column_heading"
          )}`}
          data={columnSettings["fourthColumn"]}
          handleChange={handleChange}
          handleToggle={handleToggle}
          column="fourthColumn"
          mainColumns={mainColumns}
          handleChangeInput={handleChangeInput}
        />
      </div>
      <Button
        id="setting"
        inputType="button"
        className="px-4 text-white text-base font-medium rounded-md bg-[#4A13E7] float-right mb-4"
        text={translate("setting.save_setting")}
        loading={loading}
        onClick={handleSaveSetings}
        iconAlt="save button"
      />
      {renderModal()}
    </>
  );
};

export default ColumnsComp;

const updateColumnValues = (columns: any, apiColumn: any) => {
  columns.forEach((column: any) => {
    const columnType = column?.data?.type;
    const columnTextType = column?.data?.textType;

    const apiValue = apiColumn?.[columnType];
    const apiValueText = apiColumn?.[columnTextType];

    column.data.value = apiValue;
    column.data.text = apiValueText;
  });
};
