import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { ServiceDetailDataProps } from "../report-detail/detail-screens/services-detail";
import { useRouter } from "next/router";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
import { DetailDiv } from "@/base-components/ui/detail-div";

export const ReportServiceMobileDetail = ({
  reportDetail,
  currency,
  calculatedTax,
  discountValue,
}: ServiceDetailDataProps) => {
  const router = useRouter();
  const { companyAppointment } = router.query;

  const handleEditClick = () => {
    const query: any = { report: reportDetail?.appointmentID?.id, tab: 2 };
    if (companyAppointment) {
      query.companyAppointment = companyAppointment;
    }
    router.push({
      pathname: "/agent/appointments/update-report",
      query,
    });
  };

  return (
    <>
      <div
        className="flex justify-between items-center bg-[#C50EE0] py-3 px-6 rounded-t-lg"
        id={translate("offers.tabs_heading.additional")}
      >
        <h2 className="text-[#fff] text-sm xMini:text-xl font-medium">
          {translate("offers.service_details.main_heading")}
        </h2>
        <button
          onClick={handleEditClick}
          className="flex items-center gap-x-4 font-medium rounded-lg border border-[#4A13E7] py-[7px] px-3 xMini:px-4 xMini:min-w-[161px] w-fit bg-white text-[#4B4B4B]"
        >
          <EditIcon title={translate("offers.service_details.edit_button")} />
          <span className="hidden xMini:block">
            {translate("offers.service_details.edit_button")}
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-y-5">
        {reportDetail?.serviceDetail?.serviceDetail?.map((item, index) => (
          <div
            className={`p-[9px] bg-white ${
              index === 0 ? "rounded-b-lg" : "rounded-lg"
            }`}
          >
            <div
              className="bg-[#EDF4FF] rounded-lg p-2 flex flex-col gap-y-4"
              key={index}
            >
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#344054]">
                  {translate("offers.service_details.detail_headings.title")}
                </p>
                <DetailDiv value={item?.serviceTitle} />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#344054]">
                  {translate(
                    "offers.service_details.detail_headings.description"
                  )}
                </p>
                <DetailDiv value={item?.description} />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#344054]">
                  {translate("offers.service_details.detail_headings.count")}
                </p>
                <DetailDiv value={item?.count} />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#344054]">
                  {translate("offers.service_details.detail_headings.unit")}
                </p>
                <DetailDiv value={item?.unit} />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#344054]">
                  {translate("offers.service_details.detail_headings.price")}
                </p>
                <DetailDiv value={item?.price} />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#344054]">
                  {translate("offers.service_details.detail_headings.discount")}
                </p>
                <DetailDiv value={item?.discount} />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#344054]">
                  {translate(
                    "offers.service_details.detail_headings.total_price"
                  )}
                </p>
                <DetailDiv value={item?.totalPrice} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-[9px] bg-white rounded-lg flex flex-col gap-y-5 mt-5">
        <div className="p-2 rounded-lg bg-[#EDF4FF]">
          <div className="flex flex-col gap-y-1">
            <p className="text-sm font-medium text-[#344054]">
              {translate("offers.service_details.discount_decription")}
            </p>
            <DetailDiv value={reportDetail?.discountDescription} />
          </div>
        </div>
        <div className="p-2 rounded-lg bg-[#EDF4FF]">
          <div className="flex items-center justify-between border-b border-b-[#000] border-opacity-10 pb-2">
            <span className="text-sm font-medium text-[#344054]">
              {translate("offers.service_details.detail_headings.sub_total")}
            </span>
            <span className="text-sm font-medium text-[#344054]">
              {reportDetail?.subTotal} {currency}
            </span>
          </div>

          <div className="flex flex-col gap-y-[10px] border-b border-b-[#000] border-opacity-10 pb-[13px] pt-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#344054] min-w-[78px]">
                {translate("offers.service_details.detail_headings.tax")}:
              </span>
              <span className="text-base font-medium text-[#344054]">
                {Number(calculatedTax).toFixed(2)} ({reportDetail?.taxAmount}%)
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-[#344054] min-w-[78px]">
                {translate("offers.service_details.detail_headings.discount")}:
              </span>
              <span className="text-base font-medium text-[#344054]">
                {discountValue && discountValue.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-x-4 py-3">
            <span className="text-base font-medium text-[#344054] min-w-[78px]">
              {translate("offers.service_details.detail_headings.grand_total")}:
            </span>
            <span className="text-base font-semibold text-[#344054]">
              {reportDetail?.total} {currency}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
