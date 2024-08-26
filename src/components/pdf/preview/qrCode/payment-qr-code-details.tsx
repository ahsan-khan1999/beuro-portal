import React from "react";
import { PaymentQrCodeDetailsProps } from "@/types/types";
import { DocumentHeader } from "../document-header";
import { ContactDetails } from "../contact-details";
import { QrCodeDetails } from "./qr-code-details";

export const PaymentQRCodeDetails = ({
  contactAddress,
  headerDetails,
}: Partial<PaymentQrCodeDetailsProps>) => {
  return (
    <div>
      <DocumentHeader {...headerDetails} />
      <div className="px-[80px] flex flex-col bg-white pb-[50px]">
        <ContactDetails {...contactAddress} />
        <hr className="h-[3px] bg-black" />
        {/* <QrCodeDetails qrCode={qrCode} /> */}
      </div>
    </div>
  );
};
