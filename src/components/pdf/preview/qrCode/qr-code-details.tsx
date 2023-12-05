import Image from "next/image";
import horizontalCuterIcon from "@/assets/svgs/horizontal_cuter_icon.svg";
import { QRCodeAcknowledgementSlip } from "./qr-code-acknowledgment-slip";
import { QrCodeImage } from "./qr-code-image";
import { PayableTo } from "./qr-code-payable-to";
import { QrCodeDetailsProps } from "@/types/types";

export const QrCodeDetails = ({
  qrCode: { acknowledgementSlip, payableTo },
}: QrCodeDetailsProps) => {
  return (
    <div className="relative border-t-2 border-dashed border-[#8F8F8F] mt-[560px] mb-[52px]">
      <Image
        src={horizontalCuterIcon}
        alt="horizontalCuterIcon"
        className="absolute -top-4 left-[80px]"
      />
      <div className="grid grid-cols-3 gap-[50px] w-[90%] mx-auto">
        <QRCodeAcknowledgementSlip {...acknowledgementSlip} />
        <QrCodeImage />
        <PayableTo {...payableTo} />
      </div>
    </div>
  );
};
