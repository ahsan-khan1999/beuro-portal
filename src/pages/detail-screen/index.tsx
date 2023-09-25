import useDetail from "@/hooks/auth/useDetail";
const Index = () => {
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
  } = useDetail();

  return (
    <CurrentFormComponent
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
export default Index;
