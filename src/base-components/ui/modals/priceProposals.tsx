import React from "react";
import { InfoModal } from "./info-modal";
import Image from "next/image";
import userIcon from "@/assets/user-img.png";
import ratingIcon from "@/assets/svgs/rating-star.svg";
const PriceProposals = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Price Proposals"
      containerClassName="max-w-[670px] w-full min-h-[891px]"
    >
      <div className="pt-5">
        <p className="font-medium text-dark mb-5">
          You have received 3 proposals
        </p>
        <div className="p-4 rounded-lg border-2 border-lightGray">
          <div className="flex justify-between items-center border-b-2 border-[#707070] border-opacity-5 pb-5">
            <div className="flex items-center">
              <Image src={userIcon} alt="User Icon" className="mr-2" />
              <div>
                <h2 className="font-medium text-dark mb-0.5">Dianne4548</h2>
                <h3 className="font-semibold text-dark flex items-center">
                  3.5&nbsp;
                  <Image src={ratingIcon} alt="Rating Icon" />
                  &nbsp;
                  <span className="text-sm text-gray">(102)</span>
                </h3>
              </div>
            </div>
            <div>
              <h2 className="text-sm text-gray mb-3">Delivery</h2>
              <h3 className="font-medium text-dark">Collection</h3>
            </div>
            <div>
              <h2 className="text-sm text-gray mb-3">Suggested Price</h2>
              <h3 className="font-medium text-2xl text-lightGray">
                CHF:&nbsp;<span className="font-semibold text-dark">420</span>
              </h3>
            </div>
          </div>
          <div className="flex justify-between items-center pt-5">
            <div className="max-w-fit">
              <h2 className="text-sm text-gray mb-0.5">Offer Expires in</h2>
              <h3 className="font-medium text-xl text-dark">30h 45m</h3>
            </div>
            <div className="flex items-center max-w-full">
              <button className="rounded-lg py-3 px-2 w-[180px]  mr-5 bg-[#55A46C] text-white font-medium ">
                Accept
              </button>
              <button className="rounded-lg py-3 px-2 w-[180px]  bg-[#CB2C2C] text-white font-medium">
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className="rounded-lg border border-lightGray py-3 font-medium text-gray w-full  mt-7 ">
        Schließen
      </button>
    </InfoModal>
  );
};

export default PriceProposals;
