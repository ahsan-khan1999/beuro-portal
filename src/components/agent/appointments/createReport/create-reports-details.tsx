import { SteperFormTab } from "@/base-components/ui/steperFormTab/indx";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { useState } from "react";
import { ContactAndAddressReport } from "./forms/contact-and-address-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { HouseDetailReport } from "./forms/house-detail-form";
import { ServicesDetailReport } from "./forms/services-detail-form";
import { AdditionalInfoReport } from "./forms/additional-detail-form";

export const CreateReportDetails = () => {
  const { appointmentDetails } = useAppSelector((state) => state.appointment);
  const [currentComponent, setCurrrentComponent] =
    useState<AppointmentReportsFormStages>(
      AppointmentReportsFormStages.CONTACT_AND_ADDRESS
    );

  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.global);

  const [tabType, setTabType] = useState<AppointmentReportsFormStages>(
    (appointmentDetails?.id && appointmentDetails?.stage) ||
      AppointmentReportsFormStages.CONTACT_AND_ADDRESS
  );

  const stageNames = {
    [AppointmentReportsFormStages.CONTACT_AND_ADDRESS]: translate(
      "agent.report_tabs_heading.contact"
    ),
    [AppointmentReportsFormStages.HOUSE_DETAILS]: translate(
      "agent.report_tabs_heading.house"
    ),
    [AppointmentReportsFormStages.SERVICES]: translate(
      "agent.report_tabs_heading.services"
    ),
    [AppointmentReportsFormStages.ADDITIONAL_INFO]: translate(
      "agent.report_tabs_heading.additional"
    ),
  };

  const stages = Object.values(AppointmentReportsFormStages);

  const handleReportCreated = () => {
    dispatch(updateModalType(ModalType.CREATION));
  };

  const handleNextTab = (currentComponent: AppointmentReportsFormStages) => {
    if (tabType === AppointmentReportsFormStages.ADDITIONAL_INFO) {
      handleReportCreated();
      return;
    }
    setTabType(currentComponent);
  };

  const handleBack = (currentComponent: AppointmentReportsFormStages) => {
    setTabType(currentComponent);
  };

  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const componentLookUp = {
    [AppointmentReportsFormStages.CONTACT_AND_ADDRESS]: (
      <ContactAndAddressReport onNextHandle={handleNextTab} />
    ),
    [AppointmentReportsFormStages.HOUSE_DETAILS]: (
      <HouseDetailReport
        onNextHandler={handleNextTab}
        onBackHandler={handleBack}
      />
    ),
    [AppointmentReportsFormStages.SERVICES]: (
      <ServicesDetailReport
        onNextHandler={handleNextTab}
        onBackHandler={handleBack}
      />
    ),
    [AppointmentReportsFormStages.ADDITIONAL_INFO]: (
      <AdditionalInfoReport
        onNextHandler={handleNextTab}
        onHandleBack={handleBack}
      />
    ),
  };

  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.CREATION]: (
      <CreationCreated
        onClose={onClose}
        heading={translate("common.modals.report_created")}
        subHeading={translate("common.modals.report_created_des")}
        route={onClose}
      />
    ),
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  return (
    <>
      <div>
        <div className="border-y border-y-[#000] border-opacity-10 py-4 mb-6 flex items-center justify-center gap-x-4">
          {stages.map((stage, index) => (
            <SteperFormTab
              key={stage}
              heading={stageNames[stage]}
              step={(index + 1).toString()}
              showArrow={index < stages.length - 1}
              isActive={stage === currentComponent}
              onClick={() => setCurrrentComponent(stage)}
            />
          ))}
        </div>

        {componentLookUp[currentComponent as keyof typeof componentLookUp]}
      </div>
      {renderModal}
    </>
  );
};
