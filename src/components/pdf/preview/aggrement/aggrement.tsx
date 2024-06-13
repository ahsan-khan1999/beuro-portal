import { DocumentHeader } from "../document-header";
import { ContactDetails } from "../contact-details";
import { AggrementTerms } from "./aggrement-terms";
import { SignaturePad } from "./signature-pad";
import { Footer } from "../../footer";
import { AggrementProps } from "@/types/types";
import { SetStateAction } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Button } from "@/base-components/ui/button/button";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { useAppDispatch } from "@/hooks/useRedux";
import { pdfDateFormat } from "@/utils/utility";

export const Aggrement = ({
  contactAddress,
  footerDetails,
  headerDetails,
  aggrementDetails,
  templateSettings,
  totalPages,
  currPage,
  isOffer,
  handleDescriptionUpdate,
  signature,
  isCanvas,
  setIsSignatureDone,
  isSignatureDone,
  emailTemplateSettings,
  setOfferSignature,
  systemSettings,
  pdfData,
  setComponentMounted,
}: AggrementProps) => {
  const { t: translation } = useTranslation();
  const router = useRouter();
  const currentDate = new Date().toString();
  const date = pdfDateFormat(currentDate, router.locale as string);
  const dispatch = useAppDispatch();
  const { action: pdfAction } = router.query;

  const rejectOffer = async () => {
    dispatch(updateModalType({ type: ModalType.REJECT_OFFER }));
  };

  return (
    <div id="signature">
      <DocumentHeader {...headerDetails} />
      <div className="px-[80px] flex flex-col bg-white pb-[50px]">
        <ContactDetails {...contactAddress} />
        {!isOffer && <hr className="mb-9" />}
        <AggrementTerms
          aggrementDetails={aggrementDetails}
          isOffer={isOffer}
          handleDescriptionUpdate={handleDescriptionUpdate}
        />
        {isOffer && (
          <div className="flex justify-between items-center gap-x-[103px] mt-4">
            <div>
              <div className="h-[223.656px] flex flex-col justify-between">
                <div className=" pt-5">
                  <span className="text-[#000] text-sm font-medium">
                    {translation("pdf.validate_heading")}:
                  </span>

                  <p className="text-[#000] text-[14px] font-normal">
                    {translation("pdf.validate_des")}
                  </p>
                </div>
                <p className="text-[18px] text-black font-medium pb-[43px]">
                  {translation("pdf.share_des")}.
                </p>
              </div>
              <div className="flex flex-col ">
                <span className="font-medium text-sm mb-2">{date}</span>
                <hr className="mb-[17px]" />
                <span className="text-sm text-black font-normal">
                  {translation("pdf.date")}
                </span>
              </div>
            </div>
            <div className="w-[450px] h-[278px] flex flex-col justify-end mt-5">
              {(isCanvas && (
                <SignaturePad
                  signature={signature}
                  isCanvas={isCanvas}
                  isSignatureDone={isSignatureDone}
                  setIsSignatureDone={
                    setIsSignatureDone as SetStateAction<boolean>
                  }
                  setOfferSignature={setOfferSignature}
                  emailTemplateSettings={emailTemplateSettings}
                  pdfData={pdfData}
                  setComponentMounted={setComponentMounted}
                  systemSettings={systemSettings}
                  templateSettings={templateSettings}
                  offerSignature={signature as string}
                />
              )) || (
                <div className="flex flex-col gap-y-[18px]">
                  {signature && (
                    <Image
                      src={signature}
                      alt="signature"
                      height={177}
                      width={446}
                    />
                  )}

                  <hr />
                  <span className="text-sm text-black font-normal">
                    {translation("pdf.signature")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        {!isOffer && (
          <>
            <div className="flex  gap-x-[103px] mt-4">
              <div>
                <div className="h-[223.656px] flex flex-col justify-between">
                  <div className=" pt-5">
                    <span className="text-[#000] text-sm font-medium">
                      Validity of the offer:
                    </span>

                    <p className="text-[#000] text-[14px] font-normal">
                      3 months from preparation of the offer
                    </p>
                  </div>
                  <p className="text-[18px] text-black font-medium pb-[43px]">
                    I share the contract with you.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-[103px] mt-4 items-center">
              <div className="flex flex-col  ">
                <span className="font-medium text-sm mb-2">{date}</span>
                <hr className="mb-[17px]" />
                <span className="text-sm text-black font-normal">Date</span>
              </div>
              <div className="flex flex-col gap-y-[18px]">
                {signature && (
                  <Image
                    src={signature}
                    alt="signature"
                    height={177}
                    width={446}
                  />
                )}

                <hr />
                <span className="text-sm text-black font-normal">
                  {translation("pdf.signature")}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer
        {...footerDetails}
        columnSettings={templateSettings}
        totalPages={totalPages}
        currPage={currPage}
        emailTemplateSettings={emailTemplateSettings}
      />
      {pdfAction === "Reject" && (
        <Button
          className={`mt-[0px]   ${
            pdfAction === "Reject" ? "bg-red" : "bg-[#45C769]"
          } rounded-[4px] shadow-md  text-center text-white w-full`}
          onClick={() => rejectOffer()}
          inputType="button"
          id="gohere"
          text={pdfAction as string}
        />
      )}
    </div>
  );
};
