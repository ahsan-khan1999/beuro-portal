import DescriptionSection from "./DescriptionSection";
import FormSection from "./FormSection";

const LoginOrRegister = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="mx-auto max-w-[1030px]   shadow-loginCard ">
        <div className="p-[14px] flex  ">
          <FormSection />
          <DescriptionSection />
        </div>
      </div>
    </div>
  );
};

export default LoginOrRegister;
