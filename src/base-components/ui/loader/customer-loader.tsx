import { CompanyLogoLoader } from "./company-logo-loader";

export default function CustomLoader() {
  return (
    <div className="flex space-x-2 justify-center items-center bg-transparent h-[300px] mt-10">
      <CompanyLogoLoader />
    </div>
  );
}
