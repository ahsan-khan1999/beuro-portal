import React, { useState } from "react";
import Image from "next/image";
import addIcon from "@/assets/svgs/plus_icon.svg";
import SettingLayout from "../SettingLayout";

const TaxVerifiedComp = ({
  addTaxHandler,
  exclusiveTaxHandler,
}: {
  addTaxHandler: () => void;
  exclusiveTaxHandler: () => void;
}) => {
  const toggleBtnsData: string[] = ["No Tax", "Inclusive Tax", "Exclusive Tax"];
  const toggleInfo: string[] = ["Name", "Tax Rate (%)", "Action"];
  const toggleInfoValue: (string | JSX.Element)[] = [
    "Gst Tax",
    "10%",
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
  <path d="M11.6199 3.02938H13.5867H13.5867C14.4127 3.02955 15.1085 3.6507 15.215 4.47847L15.215 4.47849C15.3181 5.28035 14.8378 6.03834 14.0824 6.28024V16.2943C14.0824 16.9143 13.8583 17.4992 13.4632 17.9208C13.0698 18.3437 12.5219 18.5841 11.948 18.5851H11.9478H4.30996H4.30979C3.73603 18.5841 3.18813 18.3437 2.7946 17.9208C2.3995 17.4992 2.17544 16.9143 2.17544 16.2943V6.28024C1.42 6.03834 0.939729 5.28035 1.04278 4.47849L1.04278 4.47847C1.14936 3.6507 1.84512 3.02955 2.67107 3.02938H2.67109H4.63793V2.61781V2.61752L11.6199 3.02938ZM11.6199 3.02938V2.61772V2.61752H11.5199L11.6199 3.02938ZM5.64531 2.61752H5.64532L5.6453 2.61626C5.64295 2.42965 5.71529 2.2503 5.84546 2.11895L5.8455 2.11892C5.97541 1.98769 6.15194 1.91581 6.33485 1.91901L6.33485 1.91902H6.3366H9.92121V1.91904L9.92296 1.91901C10.1059 1.91581 10.2824 1.98769 10.4123 2.11892L10.4124 2.11899C10.5425 2.25014 10.6149 2.42962 10.6125 2.61626L10.6125 2.61626V2.61752V3.02938H5.64531V2.61752ZM9.92121 1.81902H6.3366H9.92121ZM10.5105 7.23493C10.2309 7.23493 10.0068 7.46436 10.0068 7.74441V15.4837C10.0068 15.7636 10.2309 15.9932 10.5105 15.9932C10.79 15.9932 11.0141 15.7636 11.0141 15.4837V7.74441C11.0141 7.46436 10.79 7.23493 10.5105 7.23493ZM5.74714 7.23493C5.4676 7.23493 5.24345 7.46436 5.24345 7.74441V15.4837C5.24345 15.7636 5.46757 15.9932 5.74714 15.9932C6.02671 15.9932 6.25082 15.7636 6.25082 15.4837V7.74441C6.25082 7.46436 6.02668 7.23493 5.74714 7.23493ZM11.9478 17.5661H4.30996C3.68522 17.5661 3.18282 17.0203 3.18282 16.2943V6.34147H13.075V16.2943C13.075 17.0203 12.5726 17.5661 11.9478 17.5661ZM2.67109 4.04835H13.5867C13.9315 4.04835 14.2134 4.33222 14.2134 4.68542C14.2134 5.03863 13.9315 5.3225 13.5867 5.3225H2.67109C2.32633 5.3225 2.04445 5.03863 2.04445 4.68542C2.04445 4.33222 2.32633 4.04835 2.67109 4.04835ZM8.12851 7.23493C7.84897 7.23493 7.62483 7.46436 7.62483 7.74441V15.4837C7.62483 15.7636 7.84895 15.9932 8.12851 15.9932C8.40808 15.9932 8.6322 15.7636 8.6322 15.4837V7.74441C8.6322 7.46436 8.40806 7.23493 8.12851 7.23493Z" fill="#ED2F2F" stroke="#ED2F2F" strokeWidth="0.2"/>
</svg>
      `,
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    />,
  ];

  // State to track the active button index (set to 0 for the first item by default)
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (index: number) => {
    setActiveButton(index);
    if (index === toggleBtnsData.length - 1) {
      exclusiveTaxHandler();
    }
  };

  return (
    <SettingLayout>
      <div>
        <div className="flex justify-between items-center  my-4">
          <p className="text-[18px] font-normal text-[#393939]">Tax</p>
          {activeButton === 2 && (
            <button
              onClick={addTaxHandler}
              className="bg-[#4A13E7] flex items-center rounded-md p-2 gap-2 cursor-pointer"
            >
              <Image src={addIcon} alt="addIcon" />
              <span className="text-white font-semibold text-[13px]">
                Add New
              </span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-[110px]">
          {toggleBtnsData.map((item, index) => (
            <div
              className={`border rounded-md py-4 px-[18px] flex justify-between items-center w-full 
              ${
                index === 1
                  ? "border-[#EBEBEB] cursor-default"
                  : activeButton === index
                  ? "border-[#4A13E7] cursor-pointer"
                  : "border-[#EBEBEB] cursor-pointer"
              }
              
            `}
              key={index}
              onClick={index !== 1 ? () => handleButtonClick(index) : undefined}
            >
              <span
                className={`text-base font-medium
                ${
                  index === 1
                    ? "text-[#4B4B4B]"
                    : activeButton === index
                    ? "text-[#4A13E7]"
                    : "text-[#4B4B4B]"
                }
              `}
              >
                {item}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill={
                  index === 1
                    ? "#BFBFBF"
                    : activeButton === index
                    ? "#4A13E7"
                    : "#BFBFBF"
                }
              >
                <path d="M7.2208 0C3.31035 0 0.128906 3.18137 0.128906 7.0919C0.128906 11.0024 3.31035 14.1839 7.2208 14.1839C11.1313 14.1839 14.3127 11.0024 14.3127 7.0919C14.3127 3.18137 11.1313 0 7.2208 0ZM11.2931 5.89402L6.83762 10.3495C6.64817 10.5389 6.39634 10.6432 6.12845 10.6432C5.86056 10.6432 5.60873 10.5389 5.41928 10.3495L3.14851 8.07872C2.95906 7.88927 2.85472 7.63744 2.85472 7.36955C2.85472 7.10159 2.95906 6.84976 3.14851 6.66031C3.33788 6.47087 3.58971 6.36652 3.85768 6.36652C4.12557 6.36652 4.37747 6.47087 4.56685 6.66039L6.12838 8.22184L9.87461 4.47561C10.0641 4.28616 10.3159 4.18189 10.5838 4.18189C10.8517 4.18189 11.1035 4.28616 11.2929 4.47561C11.6841 4.86678 11.6841 5.50299 11.2931 5.89402Z" />
              </svg>
            </div>
          ))}
        </div>

        {activeButton === 2 && (
          <div className="mt-[30px] mb-4">
            <div className=" bg-[#F9F9F9] h-[45px] grid grid-cols-3 gap-[110px]">
              {toggleInfo.map((item, index) => (
                <span
                  className={`text-base font-medium text-[#8F8F8F] ${
                    index === 2 ? "text-center" : ""
                  }`}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 h-[45px] grid grid-cols-3 gap-[110px] ">
              {toggleInfoValue.map((item, index) => (
                <span
                  className={"text-base font-medium text-[#8F8F8F] "}
                  key={index}
                >
                  {typeof item === "string" ? item : item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </SettingLayout>
  );
};

export default TaxVerifiedComp;
