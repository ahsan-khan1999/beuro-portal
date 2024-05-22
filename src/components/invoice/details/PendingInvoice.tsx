import noInvoiceIcon from "@/assets/pngs/pending_invoice.png";
import Image from "next/image";
import { Button } from "@/base-components/ui/button/button";
import { useTranslation } from "next-i18next";

export const PendingInvoice = ({
  handleInvoiceCreation,
}: {
  handleInvoiceCreation: () => void;
}) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex items-center justify-center bg-white py-[113px]">
      <div className="w-[90%] md:w-[550px] bg-[#E5EFFF] rounded-[24px] py-8 px-6 flex items-center flex-col gap-y-4">
        <Image src={noInvoiceIcon} alt="no invoice" />
        <h2 className="text-[#222B45] font-semibold text-2xl">
          {translate("common.no_invoice_created")}
        </h2>

        <p className="text-sm font-normal text-[#909090] text-center max-w-[70%]">
          {translate("common.no_invoice_des")}
        </p>

        <Button
          inputType="button"
          onClick={handleInvoiceCreation}
          className="gap-x-2 !h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
          text={translate("common.create_invoice")}
          id="Create Invoice"
          iconAlt="Create Invoice"
        />
      </div>
    </div>
  );
};
