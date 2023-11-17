import useDetail from "@/hooks/auth/useDetail";
const DetailScreens = () => {
  const {
    CurrentFormComponent,
    control,
    errors,
    handleSubmit,
    nextFormHandler,
    onSubmit,
    register,
    setError,
    setValue,
    trigger,
    watch,
    currentFormStage,
    setCurrentFormStage,
    user
  } = useDetail();

  return (
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
      user={user}
    />
  );
};
export default DetailScreens;
