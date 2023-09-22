import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import Register from "@/components/loginAndRegister/registration/Register";

const Index = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="mx-auto max-w-[1030px]    shadow-loginCard ">
        <div className="p-[14px] flex min-h-[749px] ">
          <Register />
          <DescriptionSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
