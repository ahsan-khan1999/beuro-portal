import React from "react";
import { InfoModal } from "./info-modal";
import SuccessPopupBody from "./successPopupBody";
import { Button } from "../button/button";
import qrCodeIcon from "@/assets/qr-code.png";
import Image from "next/image";
import { BaseModal } from "./base-modal";
const SellerBankDetails = ({ onClose }: { onClose: () => void }) => {
  return (
   <BaseModal
      onClose={onClose}
      containerClassName="max-w-[1160px] w-full"
    >
      <div className="flex pt-5 ">
        <div className="max-w-[474px]">
          <h1 className="font-medium text-xl text-dark mb-3">
            Seller Bank Details
          </h1>
          <p className="text-sm text-gray">
            Use the payment details below or the QR code to make a bank
            transfer.
          </p>
          <div className="mt-5 space-y-3">
            <div className="space-y-3">
              <label className="font-medium text-sm text-gray">IBAN</label>
              <div className="rounded-lg border-2 border-[#EEEEEE] px-4 py-2 flex items-center">
                <input
                  className="w-full font-medium text-dark focus:outline-none"
                  type="text"
                />
                <button className="p-1 font-medium text-primary ml-2 rounded-[4px] bg-[#F6F6F6]">
                  Copy
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="font-medium text-sm text-gray">
                Deposit for
              </label>
              <div className="rounded-lg border-2 border-[#EEEEEE] px-4 py-2 flex items-center">
                <input
                  className="w-full font-medium text-dark focus:outline-none"
                  type="text"
                />
                <button className="p-1 font-medium text-primary ml-2 rounded-[4px] bg-[#F6F6F6]">
                  Copy
                </button>
              </div>
              <div className="rounded-lg border-2 border-[#EEEEEE] px-4 py-2 flex items-center">
                <input
                  className="w-full font-medium text-dark focus:outline-none"
                  type="text"
                />
                <button className="p-1 font-medium text-primary ml-2 rounded-[4px] bg-[#F6F6F6]">
                  Copy
                </button>
              </div>
              <div className="rounded-lg border-2 border-[#EEEEEE] px-4 py-2 flex items-center">
                <input
                  className="w-full font-medium text-dark focus:outline-none"
                  type="text"
                />
                <button className="p-1 font-medium text-primary ml-2 rounded-[4px] bg-[#F6F6F6]">
                  Copy
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="font-medium text-sm text-gray">IBAN</label>
              <div className="rounded-lg border-2 border-[#EEEEEE] px-4 py-2 flex items-center">
                <span className="font-medium text-lightGray mr-1">CHF</span>
                <input
                  className="w-full font-medium text-dark focus:outline-none"
                  type="text"
                />
                <button className="p-1 font-medium text-primary ml-2 rounded-[4px] bg-[#F6F6F6]">
                  Copy
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="font-medium text-sm text-gray">
                Payment Reference
              </label>
              <div className="rounded-lg border-2 border-[#EEEEEE] px-4 py-2 flex items-center">
                <input
                  className="w-full font-medium text-dark focus:outline-none"
                  type="text"
                />
                <button className="p-1 font-medium text-primary ml-2 rounded-[4px] bg-[#F6F6F6]">
                  Copy
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="font-medium text-sm text-gray">
                Purpose of Payments
              </label>
              <div className="rounded-lg border-2 border-[#EEEEEE] px-4 py-2 flex items-center">
                <input
                  className="w-full font-medium text-dark focus:outline-none"
                  type="text"
                />
                <button className="p-1 font-medium text-primary ml-2 rounded-[4px] bg-[#F6F6F6]">
                  Copy
                </button>
              </div>
            </div>
          </div>
          <Button
            text="Mark as Paid"
            inputType="button"
            className="rounded-lg w-[278px] mt-5"
          />
        </div>
        <div className="pt-[56px] pl-[52px]">
          <h2 className="font-medium text-xl text-dark mb-3">
            Payment via QR code
          </h2>
          <p className="text-sm text-gray">
            Scan this code with your e-banking app
          </p>
          <Image
            className="mt-8 mb-5"
            src={qrCodeIcon}
            alt="QR Code Image"
            width={320}
            height={320}
          />
          <button className="rounded-lg border border-lightGray py-3 text-gray font-medium px-2 w-full hover:bg-[#9B19E6] hover:text-white">
            Download QR Code
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default SellerBankDetails;
