import { PayableToProps } from "@/types/types";

export const PayableTo = ({
  accountDetails: { accountNumber, city, name, street },
  additionalInformation,
  payableByDetails: {
    city: payableCity,
    name: payableName,
    street: payableStreet,
  },
  referenceNumber,
}: PayableToProps) => {
  return (
    <div className="flex flex-col pt-[48px] pb-[52px]">
      <div className="flex flex-col ">
        <span className="text-[22px] font-semibold text-black mb-3">
          Konto / Zahlbar an
        </span>

        <div className="flex flex-col  gap-[3px]">
          <span className="text-base font-normal text-[#000]">
            {accountNumber}
          </span>
          <span className="text-base font-normal text-[#000]">{name}</span>
          <span className="text-base font-normal text-[#000]">{street}</span>
          <span className="text-base font-normal text-[#000]">{city}</span>
        </div>
      </div>
      <div className="mt-[38px]">
        <span className="tex-base text-black font-medium">Referenz</span>
        <span className="tex-base text-black font-normal">
          {referenceNumber}
        </span>
      </div>

      <div className="flex flex-col mt-[37px]">
        <span className="tex-base text-black font-medium mb-3">
          Zahlbar durch
        </span>
        <div className="flex flex-col gap-1">
          <span className="tex-base text-black font-normal">{payableName}</span>
          <span className="tex-base text-black font-normal">
            {payableStreet}
          </span>
          <span className="tex-base text-black font-normal">{payableCity}</span>
        </div>
      </div>
    </div>
  );
};
