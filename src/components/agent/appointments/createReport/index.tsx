import { SteperFormTab } from "@/base-components/ui/steperFormTab/indx";
import { useAgentReport } from "@/hooks/agent/appointments/useAgentReport";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";

const CreateReport = () => {
  const {
    translate,
    CurrentFormComponent,
    control,
    currentFormStage,
    errors,
    handleBackStage,
    handleNextStage,
    handleSubmit,
    nextFormHandler,
    onSubmit,
    register,
    setCurrentFormStage,
    setError,
    setValue,
    trigger,
    watch,
  } = useAgentReport();

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

  return (
    <div className="mt-[115px]">
      <h1 className="text-[#222B45] font-semibold text-[32px] mb-6 text-center">
        {translate("agent.main_heading")}
      </h1>

      <div className="border-y border-y-[#000] border-opacity-10 py-4 mb-6 flex items-center justify-center gap-x-4">
        {stages.map((stage, index) => (
          <SteperFormTab
            key={stage}
            heading={stageNames[stage]}
            step={(index + 1).toString()}
            showArrow={index < stages.length - 1}
            isActive={stage === currentFormStage}
            onClick={() => setCurrentFormStage(stage)}
          />
        ))}
      </div>

      <CurrentFormComponent
        currentFormStage={currentFormStage}
        setCurrentFormStage={setCurrentFormStage}
        register={register}
        handleSubmit={handleSubmit}
        control={control}
        watch={watch}
        setValue={setValue}
        onSubmit={onSubmit}
        trigger={trigger}
        errors={errors}
        nextFormHandler={nextFormHandler}
        setError={setError}
      />
    </div>
  );
};

export default CreateReport;
