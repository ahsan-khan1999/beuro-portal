import useDetail from "@/hooks/auth/useDetail";
const DetailScreens = () => {
  const {
    CurrentFormComponent,
    control,
    errors,
    handleSubmit,
    nextFormHandler,
    onSubmit,
    progress,
    register,
    setError,
    setValue,
    trigger,
    watch,
    currentFormStage,
  } = useDetail();

  return (
    <CurrentFormComponent
      currentFormStage={currentFormStage}
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
  );
};
export default DetailScreens;
