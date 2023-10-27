import Image from "next/image";
import React from "react";
import atmCardIcon from "@/assets/svgs/bank-name.svg";
import editInfoIcon from "@/assets/svgs/edit_info.svg";

const UpgradeSection = ({
  handleEditPayment,
}: {
  handleEditPayment: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <section
        className="flex flex-col p-[25px] rounded-[10px]"
        style={{
          background: "linear-gradient(180deg, #4A13E7 12.45%, #7B18FF 63.46%)",
        }}
      >
        <p className="text-xl text-white font-medium">
          Upgrade To Gold Membership!
        </p>
        <p className="text-sm text-white font-normal my-3">
          You can use any of the given package on <br /> one month free trail.
          smith amit dolem
          <br /> isplum sumip alpsum Lorem ipsum.
        </p>

        <button className="text-base font-medium text-[#4A13E7] bg-white w-full rounded-lg p-4">
          Upgrade
        </button>
      </section>

      <section className="bg-white p-4 rounded-md mt-[18px]">
        <div className="flex flex-col gap-y-2">
          <p className="text-base font-normal text-[#4B4B4B]">Payment Method</p>
          <p className=" bg-[#5488EE] rounded-md px-3 py-1 w-fit">
            <span className="text-[#4B4B4B] font-normal text-xs">
              Next Renew 24 september 2018
            </span>
          </p>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-x-6">
            <Image src={atmCardIcon} alt="atmCardIcon" className="w-[27px]" />
            <p className="flex flex-col">
              <span className="text-xm font-medium text-[#4B4B4B]">VISA</span>
              <span className="text-base font-medium text-[#4B4B4B]">
                **********13165
              </span>
            </p>
          </div>
          <Image
            src={editInfoIcon}
            alt="editInfoIcon"
            className="cursor-pointer"
            onClick={handleEditPayment}
          />
        </div>
      </section>
    </div>
  );
};

export default UpgradeSection;
