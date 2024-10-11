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
import {
  calculateTax,
  formatDateTimeToDate,
  pdfDateFormat,
} from "@/utils/utility";
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

          const startMoment = moment(startDate)
            .set({
              hour: parseInt(taskTime.split(":")[0], 10),
              minute: parseInt(taskTime.split(":")[1], 10),
            })
            .utc();

          let endMoment;

          if (endDate) {
            endMoment = moment(endDate)
              .set({
                hour: parseInt(taskTime.split(":")[0], 10),
                minute: parseInt(taskTime.split(":")[1], 10),
              })
              .add(1, "hour")
              .utc();
          } else {
            endMoment = startMoment.clone().add(1, "hour").utc();
          }

          return {
            ...dateItem,
            startDate: startMoment.format("YYYY-MM-DDTHH:mm:ss[Z]"),
            endDate: endMoment.format("YYYY-MM-DDTHH:mm:ss[Z]"),
          };
        }
      );

      const customerName =
        contractDetails?.offerID?.leadID?.customerDetail?.fullName;
      const customerGender =
        contractDetails?.offerID?.leadID?.customerDetail?.gender;
      const customerEmail =
        contractDetails?.offerID?.leadID?.customerDetail?.email;
      const customerPhoneNumber =
        contractDetails?.offerID?.leadID?.customerDetail?.phoneNumber;
      const workDates = contractDetails?.offerID?.date;
      const time = contractDetails?.offerID?.time;
      const serviceItem =
        contractDetails?.offerID?.serviceDetail?.serviceDetail;
      const subTotal = contractDetails?.offerID?.subTotal;
      const taxType = contractDetails?.offerID?.taxType;
      const tax = contractDetails?.offerID?.taxAmount;
      const isDiscount = contractDetails?.offerID?.isDiscount;
      const discount = contractDetails?.offerID?.discountAmount;
      const discountType = contractDetails?.offerID?.discountType;
      const grandTotal = contractDetails?.offerID?.total;

      const calculatedDiscount =
        discountType && discountType === "Amount"
          ? discount
          : calculateTax(Number(discount), Number(subTotal));

      const calculatedTax =
        (taxType &&
          calculateTax(
            Number(tax),
            Number(
              Number(subTotal) - Number(isDiscount ? calculatedDiscount : 0)
            )
          )) ||
        0;

      const discountAmount = (Number(discount) / 100) * Number(subTotal);

      const discountValue =
        discountType && discountType === "Amount" ? discount : discountAmount;

      const totalAfterDiscount =
        discountType && discountType === "Amount"
          ? Number(subTotal) - Number(discount)
          : Number(subTotal) - Number(discountAmount);

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
                  ${contractDetails?.offerID?.addressID?.address
                    ?.map(
                      (address: any, index: number) => `
                      <div key=${index} style="display: flex; flex-direction: column; gap: 2px;">
                        <p style="font-size: 14px; font-weight: 500; color: #2A2E3A;">
                          ${address.label}:
                        </p>
                        <p style="font-size: 14px; font-weight: 500; color: #2A2E3A;">
                          ${address.streetNumber}, ${address.postalCode}, ${
                        (address.country, address.description || "")
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
      (date: any, index: number) =>
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
          
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${serviceItem
                ?.map(
                  (item: any, index: number) => `
                  <div key=${index} style="display: flex; flex-direction: column;">
  <div style="display: flex; gap: 8px;">
    <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
      ${translate("common.title")}:
    </span>
    <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
      ${item?.serviceTitle}
    </span>
  </div>

  ${
    item?.description &&
    `<div style="display: flex; gap: 8px;">
    <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
      ${translate("pdf.description")}:
    </span>

    <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
      ${item?.description}
    </span>
  </div>`
  }

  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px;">
    ${
      item?.count &&
      `<div style="display: flex; gap: 8px;">
      <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
        ${translate("contracts.service_details.count")}:
      </span>
      <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
        ${item?.count}
      </span>
    </div>`
    }
    ${
      item?.unit &&
      `<div style="display: flex;  gap: 8px;">
      <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
        ${translate("contracts.service_details.unit")}:
      </span>
      <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
        ${item?.unit}
      </span>
    </div>`
    }
    ${
      item?.price &&
      `<div div style="display: flex; gap: 4px;">
      <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
        ${translate("contracts.service_details.price")}:
      </span>
      <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
        ${item?.price}
      </span>
    </div>`
    }
    <div style="display: flex; gap: 4px;">
          <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
            ${translate("common.discount")}:
          </span>
          <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
            ${item?.discount}
          </span>
        </div>
    ${
      item?.totalPrice &&
      `<div style="display: flex; gap: 4px;">
      <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
        ${translate("contracts.service_details.total_price")}:
      </span>
      <span style="font-size: 14px; font-weight: 400; color: #2A2E3A;">
        ${item?.totalPrice}
      </span>
    </div>`
    }
  </div>
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
          ${
            subTotal != null && subTotal !== 0
              ? `<div style="display: flex; flex-direction: column; gap: 8px;">
              ${
                subTotal &&
                `<div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      ${translate("pdf.sub_total")}: 
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${Number(subTotal).toFixed(2)} ${systemSettings?.currency}
                  </span>
              </div>`
              }
              ${
                discount &&
                discount !== 0 &&
                discountValue &&
                `<div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      ${translate("pdf.discount")} ${
                  discountType && discountType === "Percent" && `(${discount}%)`
                }: 
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      - ${Number(discountValue).toFixed(2)} ${
                  systemSettings?.currency
                }
                  </span>
              </div>`
              }
             ${
               totalAfterDiscount &&
               `<div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      ${translate("pdf.total_after_discount")}: 
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                       ${Number(totalAfterDiscount).toFixed(2)} ${
                 systemSettings?.currency
               }
                  </span>
              </div>`
             }
              ${
                tax &&
                calculatedTax &&
                `<div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      Mwst (${tax}%): 
                  </span>
                 
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${Number(calculatedTax).toFixed(2)} ${
                  systemSettings?.currency
                }
                  </span>
              </div>`
              }
              ${
                grandTotal &&
                `<div style="display: flex; align-items: center; gap:4px">
                  <span style="font-size: 14px; font-weight: 600; color: #2A2E3A;">
                      ${translate("pdf.grand_total")}: 
                  </span>
                  <span style="font-size: 14px; font-weight: 400; color: #4A13E7;">
                      ${Number(grandTotal).toFixed(2)} ${
                  systemSettings?.currency
                }
                  </span>
              </div>`
              }
          </div>`
              : ""
          }
          `;

      dispatch(
        setContractTaskDetails({
          id: "convert",
          colour: "#5CDD42",
          contractID: {
            id: contractDetails?.id,
          },
          date: updatedDates,
          title:
            (contractDetails?.title || "") +
            " " +
            translate(`gender.${customerGender}`) +
            " " +
            customerName,
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
