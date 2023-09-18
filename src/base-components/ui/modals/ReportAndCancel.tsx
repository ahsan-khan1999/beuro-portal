import Image from "next/image";
import React from "react";
import tooltipIcon from "@/assets/svgs/info-icon.svg";
import { reportAndCancel } from "@/types";
import RadioButton from "../radioButton/RadioButton";
import CheckBox from "../checkbox/CheckBox";

const ReportAndCancel = ({
  description,
  label1,
  label2,
  label3,
  label4,
  label5,
  label6,
  textAreaLabel,
  placeholder,
  checkBoxLabel,
  button1,
  button2,
}: reportAndCancel) => {
  return (
    <div>
      <p className="mt-3 font-medium  text-gray ">{description}</p>
      <hr className="h-[2px] text-[#707070] opacity-20 mt-6 mb-9" />
      <div className="space-y-3">
        <div className="flex items-center">
          <RadioButton label={label1} />
          {/* <input type="radio" />
          <label className="text-dark ml-4 font-medium text-sm  ">
            {label1}
          </label> */}
          <Image src={tooltipIcon} alt="Info Icon" className="ml-2" />
        </div>
        <div className="flex items-center">
          <RadioButton label={label2} />
          {/* <input type="radio" />
          <label className="text-dark ml-4 font-medium text-sm  ">
            {label2}
          </label> */}
          <Image src={tooltipIcon} alt="Info Icon" className="ml-2" />
        </div>
        <div className="flex items-center">
          <RadioButton label={label3} />
          {/* <input type="radio" />
          <label className="text-dark ml-4 font-medium text-sm  ">
            {label3}
          </label> */}
          <Image src={tooltipIcon} alt="Info Icon" className="ml-2" />
        </div>
        <div className="flex items-center">
          <RadioButton label={label4} />
          {/* <input type="radio" />
          <label className="text-dark ml-4 font-medium text-sm  ">
            {label4}
          </label> */}
          <Image src={tooltipIcon} alt="Info Icon" className="ml-2" />
        </div>
        <div className="flex items-center">
          <RadioButton label={label5} />
          {/* <input type="radio" />
          <label className="text-dark ml-4 font-medium text-sm  ">
            {label5}
          </label> */}
          <Image src={tooltipIcon} alt="Info Icon" className="ml-2" />
        </div>
        <div className="flex items-center">
          <RadioButton label={label6} />
          {/* <input type="radio" />
          <label className="text-dark ml-4 font-medium text-sm  ">
            {label6}
          </label> */}
          <Image src={tooltipIcon} alt="Info Icon" className="ml-2" />
        </div>
      </div>
      <hr className="h-[2px] text-[#707070] opacity-20 mt-6 mb-5" />
      <label className="font-medium text-sm text-dark ">{textAreaLabel}</label>
      <textarea
        placeholder={placeholder}
        rows={3}
        className="mt-3 p-3 w-full focus:outline-none rounded-lg border border-lightGray placeholder:text-lightGray text-sm resize-none"
      />
      <div className="flex items-center my-7">
        <CheckBox label={checkBoxLabel} />
        {/* <input type="checkbox" />
        <label className="text-sm text-dark ml-3">{checkBoxLabel}</label> */}
      </div>
      <button className=" font-medium text-white bg-[#CB2C2C] rounded-lg py-[14px] min-w-full">
        {button1}
      </button>
      <button className="mt-3 font-medium   rounded-lg py-[14px] border border-[#C4C4C4] min-w-full text-[#616161]">
        {button2}
      </button>
      {/* <label className="checkbox-container">
        Checkbox One
        <input type="checkbox" name="checkbox" />
        <span className="checkbox-checkmark" />
      </label> */}
    </div>
  );
};

export default ReportAndCancel;
