import React from "react";

const OfferDetailsData = () => {
  return (
    <div className="rounded-md border-none bg-white pt-6 px-[30px] pb-[23px] border w-full h-fit" id="Offer Details">
      <h2 className="text-[#393939] text-lg font-medium">Offer Details</h2>
      <hr className="opacity-20 my-6" />
      <div className="mt-5">
        <div className="grid grid-cols-3 gap-x-3 mb-5">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Customer Type
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              Individual
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Your Name
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              Rahal
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Company Name
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              Cloud Mesh Solutions
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-3">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Email Address
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              rahal.ahmad@gmail.com
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Phone Number
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              +49 445612 2112
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Mobile Number
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              +49 445612 2112
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h4 className="text-[#8F8F8F] mb-[10px]">Address Details</h4>
          <div className="grid grid-cols-3 gap-x-3">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                Street NO.
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                Zweibrückenstraße, 12
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                Post Code
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                1234
              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                Country
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                Switzerland
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsData;
