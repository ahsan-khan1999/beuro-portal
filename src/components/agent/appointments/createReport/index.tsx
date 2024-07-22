import { useAgentReport } from "@/hooks/agent/appointments/useAgentReport";

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

  return (
    <div className="mt-[115px]">
      <h1 className="text-[#222B45] font-semibold text-[32px] mb-6 text-center">
        {translate("agent.main_heading")}
      </h1>

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
