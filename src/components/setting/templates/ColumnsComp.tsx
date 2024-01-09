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
import {
  ColumnStructure,
  MainColumns,
  Template,
  colsData,
} from "@/types/settings";
import { Button } from "@/base-components/ui/button/button";

const Column = ({
  title,
  data,
  handleChange,
  handleToggle,
  column,
  mainColumns,
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
}) => {
  return (
    <section className="px-[30px] pt-[20px] pb-[25px] rounded-md bg-white mb-6">
      <div className="flex justify-between mb-3">
        <span className="text-lg font-medium text-[#393939]">{title}</span>
        <ToggleButton
          isChecked={mainColumns[column]}
          onChange={(value) => handleToggle(column, value.target.checked)}
        />
      </div>
      {data.map((item, index) => (
        <div className="mb-5" key={index}>
          <span className="text-[#1E1E1E] text-sm font-normal">
            {item.title}
          </span>
          <div className="border rounded-lg border-[#EBEBEB] p-4 flex justify-between items-center mt-[10px]">
            <span className="text-[#484848] text-base font-normal ">
              {item.data.type}
            </span>
            <CheckBox
              isChecked={item.data.value}
              id={item.data.column + index.toString()}
              key={index}
              onChange={(value) =>
                handleChange(item.data.column, item.data.type, value, index)
              }
            />
          </div>
        </div>
      ))}
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
        },
      },
      {
        title: `${translate("setting.templates.first_col_heading.email")}`,
        placeholder: "youremail@gmail.com",
        data: {
          column: "firstColumn",
          type: "isEmail",
          value: templateSettings?.firstColumn?.isEmail || false,
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
        },
      },
      {
        title: `${translate("setting.templates.first_col_heading.website")}`,
        placeholder: "www.your website.com",
        data: {
          column: "firstColumn",
          type: "isTaxNumber",
          value: templateSettings?.firstColumn?.isWebsite || false,
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
        },
      },
      {
        title: `${translate("setting.templates.second_column.post_code")}`,
        placeholder: "00000",
        data: {
          column: "secondColumn",
          type: "isPostCode",
          value: templateSettings?.secondColumn?.isPostCode || false,
        },
      },
      {
        title: `${translate("setting.templates.second_column.bank_name")}`,
        placeholder: "ABC",
        data: {
          column: "secondColumn",
          type: "isBankName",
          value: templateSettings?.secondColumn?.isBankName || false,
        },
      },
      {
        title: `${translate("setting.templates.second_column.account_number")}`,
        placeholder: "0000000",
        data: {
          column: "secondColumn",
          type: "isAccountNumber",
          value: templateSettings?.secondColumn?.isAccountNumber || false,
        },
      },
      {
        title: `${translate("setting.templates.second_column.iban_number")}`,
        placeholder: "00000000",
        data: {
          column: "secondColumn",
          type: "isIBAN",
          value: templateSettings?.secondColumn?.isIBAN || false,
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
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_two")}`,
        placeholder: " ",
        data: {
          column: "thirdColumn",
          type: "isRow2",
          value: templateSettings?.thirdColumn?.isRow2 || false,
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_three")}`,
        placeholder: " ",
        data: {
          column: "thirdColumn",
          type: "isRow3",
          value: templateSettings?.thirdColumn?.isRow3 || false,
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_fourth")}`,
        placeholder: " ",
        data: {
          column: "thirdColumn",
          type: "isRow4",
          value: templateSettings?.thirdColumn?.isRow4 || false,
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_fifth")}`,
        placeholder: " ",
        data: {
          column: "thirdColumn",
          type: "isRow5",
          value: templateSettings?.thirdColumn?.isRow5 || false,
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
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_two")}`,
        placeholder: " ",
        data: {
          column: "fourthColumn",
          type: "isRow2",
          value: templateSettings?.fourthColumn?.isRow2 || false,
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_three")}`,
        placeholder: " ",
        data: {
          column: "fourthColumn",
          type: "isRow3",
          value: templateSettings?.fourthColumn?.isRow3 || false,
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_fourth")}`,
        placeholder: " ",
        data: {
          column: "fourthColumn",
          type: "isRow4",
          value: templateSettings?.fourthColumn?.isRow4 || false,
        },
      },
      {
        title: `${translate("setting.templates.third_column.row_fifth")}`,
        placeholder: " ",
        data: {
          column: "fourthColumn",
          type: "isRow5",
          value: templateSettings?.fourthColumn?.isRow5 || false,
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
    };
    const response = await dispatch(
      updateTemplateSetting({ data: apiData, translate })
    );
    if (response?.payload) handleSuccess();
  };
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-[27px]">
        <Column
          title={`${translate("setting.templates.first_col_heading.heading")}`}
          data={columnSettings["firstColumn"]}
          handleChange={handleChange}
          handleToggle={handleToggle}
          column="firstColumn"
          mainColumns={mainColumns}
        />
        <Column
          title={`${translate("setting.templates.second_column.heading")}`}
          data={columnSettings["secondColumn"]}
          handleChange={handleChange}
          handleToggle={handleToggle}
          column="secondColumn"
          mainColumns={mainColumns}
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
        />
      </div>
      <Button
        id="setting"
        inputType="button"
        className="px-4 text-white text-base font-medium rounded-md ml-[32px] bg-[#4A13E7] "
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
    const apiValue = apiColumn?.[columnType];
    column.data.value = apiValue;
  });
};
