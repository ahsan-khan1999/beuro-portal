import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import FormSection from "@/components/loginAndRegister/FormSection";

const Index = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="mx-auto max-w-[1030px]    shadow-loginCard ">
        <div className="p-[14px] flex min-h-[749px] ">
          <FormSection heading="Sign Up to Büro-365" name="register" />
          <DescriptionSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
