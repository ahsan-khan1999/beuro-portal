import companyLogo from "@/assets/svgs/company-logo.svg";
import createOfferIcon from "@/assets/svgs/create-offer.svg";
import userIcon from "@/assets/svgs/user.svg";
import { LanguageSelector } from "@/base-components/languageSelector/language-selector";
import { Button } from "@/base-components/ui/button/button";
import followUpIcon from "@/assets/svgs/follow-up.svg";
import timeIcon from "@/assets/svgs/time.svg";
import idIcon from "@/assets/svgs/id.svg";

import Image from "next/image";
export default function Home() {
  const followUp = [
    { id: "00071" },
    { id: "00045" },
    { id: "00075" },
    { id: "00034" },
    { id: "00082" },
    { id: "00025" },
  ];
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="p-4 flex justify-between items-center shadow-header">
        <div className="flex items-center">
          <Image
            src={companyLogo}
            alt="Company Logo"
            className="pr-[50px] border-r-2 border-[#000000] border-opacity-10"
          />
          <span className="font-medium text-2xl tracking-[0.15px] text-dark pl-8">
            Solar EEG{" "}
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center pr-8">
            <Image
              src={createOfferIcon}
              alt="Create Offer Icon"
              className="mr-6"
            />
            <LanguageSelector />
          </div>
          <div className="border-l-2 border-[#000000] border-opacity-10 flex items-center pl-8">
            <Image src={userIcon} alt="User Icon" className="mr-3" />
            <div className="">
              <span className="font-semibold tracking-[0.5px] text-[#0A0A0A] block">
                Khanif Alfan
              </span>
              <span className="text-sm tracking-[0.4 px] text-[#8F8F8F] block">
                Manager
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md shadow-followUp max-w-[405px]">
        <div className="flex justify-between items-center pt-5 pb-3 px-4 border-b-2 border-[#000] border-opacity-10">
          <h1 className="text-[#222B45] text-lg font-medium ">Follow Up</h1>
          <Button
            inputType="button"
            text="Add Follow Up"
            className="text-white text-[13px] font-semibold rounded-md !h-8"
          />
        </div>
        {followUp.map((item, index) => {
          return (
            <div
              key={index}
              className={`pt-[10px] px-4 ${
                (index == 0 || index == 1) && "bg-primary"
              } bg-opacity-10 `}
            >
              <div className=" pb-[5px]  flex items-center border-b border-[#000] border-opacity-10 ">
                <Image
                  src={followUpIcon}
                  alt="Follow Up Icon"
                  className="mr-6"
                />
                <div>
                  <div>
                    <span className="text-dark text-sm">
                      Up coming Follow up:{" "}
                    </span>
                    <span className="text-dark text-sm font-medium">
                      Call for information of cleaning and moving services
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center mr-7">
                      <Image
                        src={timeIcon}
                        alt="Time Icon"
                        className="mr-[10px]"
                      />
                      <span className="text-[#4B4B4B] text-[13px] ">
                        14:20:05,12/09/2023
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Image src={idIcon} alt="Id Icon" className="mr-[10px]" />
                      <span className="text-[#4B4B4B] text-[13px] ">
                        {item.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center py-4">
          <button className=" text-primary w-fit text-sm font-medium ">
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
