import { DocumentHeader } from "../document-header";
import { ContactDetails } from "../contact-details";
import { AggrementTerms } from "./aggrement-terms";
import { SignaturePad } from "./signature-pad";
import { Footer } from "../../footer";
import { AggrementProps } from "@/types/types";
import { EditableAggrement } from "./editable-aggrement";

export const Aggrement = ({
  contactAddress,
  footerDetails,
  headerDetails,
  aggrementDetails,
  templateSettings,
  totalPages,
  currPage,
  isOffer,
}: AggrementProps) => {
  return (
    <div>
      <DocumentHeader {...headerDetails} />
      <div className="px-[80px] flex flex-col bg-white pb-[50px]">
        <ContactDetails {...contactAddress} />
        {!isOffer && <hr className="mb-9" />}
        <AggrementTerms aggrementDetails={aggrementDetails} isOffer={isOffer} />
        {isOffer && (
          <div className="flex justify-between items-center gap-x-[103px] mt-4">
            <div>
              <div className="h-[223.656px] flex flex-col justify-between">
                <div className=" pt-5">
                  <span className="text-[#000] text-base font-medium">
                    Gültigkeit der Offerte:
                  </span>

                  <p className="text-[#000] text-[14px] font-normal">
                    3 Monate ab Erstellung der Offerte
                  </p>
                </div>
                <p className="text-[18px] text-black font-medium pb-[43px]">
                  I share the contract with you.
                </p>
              </div>
              <div className="flex flex-col ">
                <span className="font-medium text-base mb-2">
                  25 December 2023
                </span>
                <hr className="mb-[17px]" />
                <span className="text-base text-black font-normal ">Date</span>
              </div>
            </div>
            <div className="w-[450px] h-[278px]">
              <SignaturePad />
              <div className="flex flex-col gap-y-[18px]">
                <hr />
                <span className="text-base text-black font-normal">
                  Signature
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer
        {...footerDetails}
        columnSettings={templateSettings}
        totalPages={totalPages}
        currPage={currPage}
      />
    </div>
  );
};
