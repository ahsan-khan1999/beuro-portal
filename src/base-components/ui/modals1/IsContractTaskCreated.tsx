import { useRouter } from "next/router";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React, { useEffect } from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { useTranslation } from "next-i18next";
import {
  readContractDetails,
  setContractTaskDetails,
  updateContractStatus,
} from "@/api/slices/contract/contractSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { useDispatch } from "react-redux";
import { ModalType } from "@/enums/ui";
import { staticEnums } from "@/utils/static";
import localStoreUtil from "@/utils/localstore.util";
import { useAppSelector } from "@/hooks/useRedux";
import moment from "moment";
import { formatDateTimeToDate, pdfDateFormat } from "@/utils/utility";
import { contractTableTypes } from "@/types/contract";
export interface IsTaskModalProps {
  onClose: () => void;
  onSuccess: () => void;
  heading: string;
  contractId: string | null;
  status: string;
  currentPageRows?: contractTableTypes[];
  setCurrentPageRows?: React.Dispatch<
    React.SetStateAction<contractTableTypes[]>
  >;
}

export const IsContractTaskCreated = ({
  onClose,
  onSuccess,
  heading,
  contractId,
  status,
  currentPageRows,
  setCurrentPageRows,
}: IsTaskModalProps) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentLanguage } = useAppSelector((state) => state.global);
  const { contractDetails } = useAppSelector((state) => state.contract);
  const { systemSettings } = useAppSelector((state) => state.settings);

  useEffect(() => {
    localStoreUtil.remove_data("contractComposeEmail");

    if (contractId) {
      dispatch(readContractDetails({ params: { filter: contractId } }));
    }
  }, [contractId]);

  const handleConfirm = () => {
    if (contractId) {
      const updatedDates = contractDetails?.offerID?.date?.map(
        (dateItem: any) => {
          const { startDate, endDate } = dateItem;
          const taskTime = contractDetails?.offerID?.time || "00:00";

          const startMoment = moment(startDate).set({
            hour: parseInt(taskTime.split(":")[0], 10),
            minute: parseInt(taskTime.split(":")[1], 10),
          });

          let endMoment;

          if (endDate) {
            endMoment = moment(endDate)
              .set({
                hour: parseInt(taskTime.split(":")[0], 10),
                minute: parseInt(taskTime.split(":")[1], 10),
              })
              .add(1, "hour");
          } else {
            endMoment = startMoment.clone().add(1, "hour");
          }

          return {
            ...dateItem,
            startDate: startMoment.format("YYYY-MM-DDTHH:mm"),
            endDate: endMoment.format("YYYY-MM-DDTHH:mm"),
          };
        }
      );

      const customerName =
        contractDetails?.offerID?.leadID?.customerDetail?.fullName;
      const customerEmail =
        contractDetails?.offerID?.leadID?.customerDetail?.email;
      const customerPhoneNumber =
        contractDetails?.offerID?.leadID?.customerDetail?.phoneNumber;
      const workDates = contractDetails?.offerID?.date;
      const time = contractDetails?.offerID?.time;
      const serviceItem =
        contractDetails?.offerID?.serviceDetail?.serviceDetail;

      const noteDetail = `
          <span style="font-size: 16px; font-weight: 600; color: #4A13E7;">
              ${translate("contracts.card_content.heading")}.
          </span>
          
          <div style="display: flex; flex-direction: column;">
              <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                      ${translate("pdf.label_nr_contract")} ${translate(
        "pdf.no"
      )}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${contractDetails?.contractNumber}
                  </span>
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                      ${translate("pdf.offer_date")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${pdfDateFormat(
                        contractDetails?.createdAt || "",
                        currentLanguage || "de"
                      )}
                  </span>
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                      ${translate("pdf.created_by")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${contractDetails?.offerID?.createdBy?.fullName}
                  </span>
              </div>
          </div>
          
          <br />
          
          <span style="font-size: 16px; font-weight: 600; color: #FE9244;">
              ${translate("customers.tab_heading")}.
          </span>
          
          <div style="display: flex; flex-direction: column;">
          ${
            customerName &&
            customerName.trim() !== "" &&
            `<div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                    ${translate("pdf.name")}:
                </span>
                <span style="font-size: 14px; font-weight: 400; color: #FE9244;">
                    ${customerName}
                </span>
            </div>`
          }
          
              ${
                customerEmail &&
                customerEmail.trim() !== "" &&
                `<div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                      ${translate("pdf.email")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #FE9244;">
                      ${customerEmail}
                  </span>
              </div>`
              }
              ${
                customerPhoneNumber &&
                customerPhoneNumber.trim() !== "" &&
                `<div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
                      ${translate("pdf.phone")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #FE9244;">
                      ${customerPhoneNumber}
                  </span>
              </div>`
              }
          </div>
          
          <br />
          
          <span style="font-size: 16px; font-weight: 600; color: #4A13E7;">
              ${translate("contracts.table_headings.title")}.
          </span>
          <p style="font-size: 16px; font-weight: 500; color: #2A2E3A;">
              ${contractDetails?.title}
          </p>
          
          <br />
          
          ${
            contractDetails?.offerID?.addressID?.address?.length > 0
              ? `
                <span style="font-size: 16px; font-weight: 600; color: #FE9244;">
                  ${translate("customers.details.address_details")}.
                </span>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${contractDetails.offerID.addressID.address
                    .map(
                      (address, index) => `
                      <div key=${index} style="display: flex; flex-direction: column; gap: 2px;">
                        <p style="font-size: 14px; font-weight: 500; color: #2A2E3A;">
                          ${address.label}:
                        </p>
                        <p style="font-size: 14px; font-weight: 500; color: #2A2E3A;">
                          ${address.streetNumber}, ${address.postalCode}, ${
                        address.country || ""
                      }
                        </p>
                      </div>
                    `
                    )
                    .join("")}
                </div>
              `
              : ""
          }
          
          <br />
          
          
          <div style="display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 14px; font-weight: 600; color: #45C769;">
                  ${
                    workDates?.length === 1
                      ? translate("pdf.work_date")
                      : translate("pdf.work_dates")
                  }
                  :
              </span>
             <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
  ${workDates
    ?.map(
      (date, index) =>
        `${formatDateTimeToDate(date.startDate)}${
          date.endDate
            ? " bis " +
              formatDateTimeToDate(date.endDate) +
              (workDates?.length - 1 != index ? ", " : ".")
            : workDates?.length - 1 != index
            ? ", "
            : "."
        }`
    )
    .join("")}
  ${time ? ` Um ${time} Uhr` : ""}
</span>

          </div>
          
          <br />
          
          ${
            serviceItem?.length > 0
              ? `
            <span style="font-size: 16px; font-weight: 600; color: #4A13E7;">
              ${translate("services.service_detail_tab")}
            </span>
          
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${serviceItem
                .map(
                  (item, index) => `
                  <div key=${index} style="display: flex; align-items: center; gap: 4px;">
                    <p style="font-size: 14px; font-weight: 400; color: #2A2E3A;">${item?.serviceTitle}</p>
                    <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${item?.totalPrice}
                    </span>
                  </div>
                `
                )
                .join("")}
            </div>
          `
              : ""
          }
          
</div>

          <br />
          <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      ${translate("pdf.sub_total")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${Number(contractDetails?.offerID?.subTotal).toFixed(
                        2
                      )} ${systemSettings?.currency}
                  </span>
              </div>
              <div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      Mwst (${contractDetails?.offerID?.taxAmount}%):
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${Number(contractDetails?.offerID?.subTotal).toFixed(
                        2
                      )} ${systemSettings?.currency}
                  </span>
              </div>
              <div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      ${translate("pdf.grand_total")}:
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${Number(contractDetails?.offerID?.total).toFixed(2)} ${
        systemSettings?.currency
      }
                  </span>
              </div>
          </div>
          `;

      dispatch(
        setContractTaskDetails({
          id: "convert",
          colour: "#5CDD42",
          contractID: {
            id: contractDetails?.id,
          },
          date: updatedDates,
          title: contractDetails?.title,
          isAllDay: false,
          type: "Contract",
          alertTime: 15,
          note: noteDetail,
        })
      );

      dispatch(updateModalType(ModalType.NONE));
      router.push(`/calendar?isContractId=${contractId}`);
    }
  };

  const handleCancel = async () => {
    const res = await dispatch(
      updateContractStatus({
        data: {
          id: contractId,
          contractStatus: staticEnums["ContractStatus"][status],
          isTaskCreated: false,
        },
      })
    );

    if (res?.payload) {
      if (currentPageRows && setCurrentPageRows) {
        let index = currentPageRows?.findIndex(
          (item) => item.id === res.payload?.id
        );
        if (index !== -1) {
          let prevPageRows = [...currentPageRows];
          prevPageRows.splice(index, 1, res.payload);
          setCurrentPageRows(prevPageRows);
          onSuccess();
        }
      } else {
        onSuccess();
      }
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[340px] xMini:max-w-[524.862px] min-h-fit"
    >
      <div className="relative flex flex-col items-center px-6 xMini:px-0">
        <Image
          src={createdIcon}
          alt="creation_icon"
          className="mt-10 xMini:mt-50px] w-[70px] h-[70px] xMini:w-fit xMini:h-fit"
        />
        <p className="font-medium mt-5 text-base xMini:text-2xl xMini:mt-8 text-center">
          {heading}
        </p>

        <div className="flex gap-[33px] mt-[26px] mb-[38px]">
          <button
            onClick={handleCancel}
            className="py-[11px] w-[120px] text-[#fff] bg-[#FF0000] rounded-md hover:bg-buttonHover"
          >
            {translate("common.no")}
          </button>
          <button
            onClick={handleConfirm}
            className="py-[11px] w-[120px] text-[#fff] bg-[#45C769] rounded-md hover:bg-buttonHover"
          >
            {translate("common.yes")}
          </button>


        </div>
      </div>
    </BaseModal>
  );
};
