import React, { useEffect, useState } from "react";
import TaxVerifiedComp from "./TaxVerifiedComp";
import InvoiceSection from "./InvoiceSection";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import ConnectWithBuro from "./ConnectWithBuro";
import SettingLayout from "../SettingLayout";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { SystemSetting, readSystemSettings, readTaxSettings, updateSystemSetting } from "@/api/slices/settingSlice/settings";
import { SystemSettingDataProps } from "@/types/settings";
import { staticEnums } from "@/utils/static";
import { Button } from "@/base-components/ui/button/button";
import RecordCreateSuccess from "@/base-components/ui/modals1/OfferCreated";
import { ModalConfigType, ModalType } from "@/enums/ui";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { getValueByKey } from "@/utils/auth.util";


const SystemSettingDetails = ({
  addTaxHandler,
  exclusiveTaxHandler,
}: {
  addTaxHandler: () => void;
  exclusiveTaxHandler: () => void;
}) => {
  const { systemSettings, loading, tax } = useAppSelector(state => state.settings)
  const { modal } = useAppSelector(state => state.global)


  const dropDownItems = [{ item: " EUR - Euro" }];
  const [systemSetting, setSystemSetting] = useState<SystemSettingDataProps>({
    allowedDomains: systemSettings?.allowedDomains || [],
    currency: systemSettings?.currency || "",
    daysLimit: systemSettings?.daysLimit || 0,
    isInvoiceOverDue: systemSettings?.isInvoiceOverDue || false,
    taxType: staticEnums["TaxType"][systemSettings?.taxType as string],
  })
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch()
  const handleItemSelected = (selectedItem: string) => {
    setSystemSetting({ ...systemSetting, "currency": selectedItem })
  };
  useEffect(() => {
    dispatch(readTaxSettings())
    dispatch(readSystemSettings()).then((response: any) => {

      setSystemSetting({
        allowedDomains: response?.payload?.Setting?.allowedDomains,
        currency: response?.payload?.Setting?.currency,
        daysLimit: response?.payload?.Setting?.daysLimit,
        isInvoiceOverDue: response?.payload?.Setting?.isInvoiceOverDue,
        taxType: staticEnums["TaxType"][response?.payload?.Setting?.taxType],
      })
    })
  }, [])
  const onClose = () => {
    dispatch(updateModalType({ type: ModalType.NONE }))
  }
  const handleSuccess = () => {
    dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS }))
  }

  const MODAL_CONFIG: ModalConfigType = {

    [ModalType.CREATE_SUCCESS]: (
      <RecordCreateSuccess
        onClose={onClose}
        modelHeading="Settings Updated Successful "
        modelSubHeading="Thanks! we are happy to have you. "
        routeHandler={onClose}
      />
    ),

  };
  const handleSettingUpdate = async () => {
    const response = await dispatch(updateSystemSetting({ data: { ...systemSetting, currency: staticEnums["currency"][systemSetting?.currency], daysLimit: Number(systemSetting?.daysLimit) }, translate }))
    if (response?.payload) handleSuccess()
  }
  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <TaxVerifiedComp
        addTaxHandler={addTaxHandler}
        exclusiveTaxHandler={exclusiveTaxHandler}
        systemSettings={systemSetting}
        setSystemSetting={setSystemSetting}
        tax={tax}
      />
      <div className="my-2">
        <InvoiceSection setSystemSetting={setSystemSetting} systemSetting={systemSetting} />
      </div>

      <SettingLayout>
        <div className="my-3 ">
          <p className="text-[#393939] font-normal text-[18px] my-3">
            {translate("setting.system_setting.currency")}
          </p>
          <DropDown
            items={Object.keys(staticEnums["currency"]).map((item) => ({ item: item }))}
            onItemSelected={handleItemSelected}
            selectedItem={systemSetting?.currency}
            dropDownTextClassName="custom-text-style "
            dropDownIconClassName="custom-icon-style"
            dropDownDisabled={false}
            shouldNotSelectItem={false}
          />
        </div>
      </SettingLayout>

      <div className="mt-2">
        <ConnectWithBuro systemSetting={systemSetting} setSystemSetting={setSystemSetting} />
      </div>

      <div className="my-3 ml-[31px]">
        <Button
          id="settings"
          inputType="button"
          className="text-white text-base font-medium px-6  bg-[#4A13E7] rounded-md"
          loading={loading}
          text=" Save Setting"
          onClick={handleSettingUpdate}
        />
      </div>
      {renderModal()}
    </>
  );
};

export default SystemSettingDetails;
