import React from "react";
import Image from "next/image";
import betterManagementIcon from "@/assets/pngs/forget-pasword-img.png";
const DescriptionSection = () => {
  return (
    <div
      className="w-[50%] flex flex-col justify-center  px-8"
      style={{
        // backgroundImage: 'url("/assets/svgs/calender-icon.svg")',
        // backgroundPosition: "4% 50%",
        background: "#4A13E7",
      }}
    >
      <Image
        src={betterManagementIcon}
        alt="Better Management Icon"
        className="mx-auto"
      />
      <h2 className="font-semibold text-white text-[32px] text-center">
        Better management
      </h2>
      <p className="text-white text-xs mt-2 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation
      </p>
    </div>
  );
};

export default DescriptionSection;
