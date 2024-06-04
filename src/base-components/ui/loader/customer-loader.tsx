// import { LoaderType } from "@/types";
import { CSSProperties } from "react";
import { CompanyLogoLoader } from "./company-logo-loader";

export default function CustomLoader() {
  return (
    <div className="flex space-x-2 justify-center items-center bg-transparent h-[300px] mt-10">
      {/* <Puff
        visible={true}
        height="120"
        width="120"
        color="#4A13E7"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      /> */}

      <CompanyLogoLoader />
    </div>
  );
}
