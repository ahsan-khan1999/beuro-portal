import React from "react";
import { InfoModal } from "./info-modal";
import Image from "next/image";
import car from "@/assets/car-img.png";
import { Button } from "../button/button";
import publishIcon from "@/assets/svgs/publish-icon.svg";
import { EditIcon } from "@/assets/svgs/components/sideBar/edit-icons";

const PublishConfirmation = ({ onClose }: { onClose: () => void }) => {
  const offers = [
    { name: "Audi S6 Avant quattro", date: "Jul 25,2023" },
    { name: "Audi S6 Avant quattro", date: "Jul 25,2023" },
  ];

  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Publish Selected Offers"
      containerClassName="max-w-[572px] w-full min-h-fit"
    >
      <div className="pt-5">
        <p className="font-medium text-dark mb-7">
          The following offers cannot be published
        </p>
        <div className="space-y-4">
          {offers.map((item, index) => {
            return (
              <div
                key={index}
                className="rounded-lg border border-[#CB2C2C] py-2 pl-2 pr-6 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="relative">
                    <Image className="mr-3" src={car} alt="Car Image" />
                    {index == 0 && (
                      <Image
                        className="absolute -bottom-2 -left-1"
                        src={publishIcon}
                        alt="Publish Icon"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-dark">
                      {item.name}
                    </h2>
                    <h2 className="text-sm font-medium text-gray">
                      Updated:&nbsp;
                      <span className="text-dark">{item.date}</span>
                    </h2>
                  </div>
                </div>
                <button className="text-sm font-medium text-dark flex items-start">
                  <EditIcon className="text-[#616161] mr-1" />
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        text={"Skip incomplete and Publish"}
        inputType="button"
        className="w-full mt-8 rounded-lg"
      />
      <button className="rounded-lg border border-lightGray py-3 font-medium text-gray w-full  mt-4 ">
        Schließen Sie
      </button>
    </InfoModal>
  );
};

export default PublishConfirmation;
