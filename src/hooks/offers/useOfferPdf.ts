import { readOfferDetails } from "@/api/slices/offer/offerSlice";
import { getTemplateSettings, readEmailSettings } from "@/api/slices/settingSlice/settings";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { EmailTemplate } from "@/types/settings";
import { AcknowledgementSlipProps, ContractEmailHeaderProps, PayableToProps, PdfProps, TemplateType } from "@/types";
import { OffersTableRowTypes, ServiceList } from "@/types/offers";

const qrCodeAcknowledgementData: AcknowledgementSlipProps = {
    accountDetails: {
        accountNumber: "CH48 0900 0000 1556 1356 9",
        name: "Rahal GmbH",
        street: "St.Urbanstrasse 79",
        city: "4914 Roggwil",
    },
    referenceNumber: "27 12323 0000 0000 0006 22926",
    payableByDetails: {
        name: "Rahal GmbH",
        street: "St. Urbanstrasse 79",
        city: "4914 Roggwill BE",
    },
    currency: "CHF",
    amount: 6418.92,
};

const qrCodePayableToData: PayableToProps = {
    accountDetails: {
        accountNumber: "CH48 0900 0000 1556 1356 9",
        name: "Rahal GmbH",
        street: "St.Urbanstrasse 79",
        city: "4914 Roggwil",
    },
    referenceNumber: "27 12323 0000 0000 0006 22926",
    payableByDetails: {
        name: "Rahal GmbH",
        street: "St. Urbanstrasse 79",
        city: "4914 Roggwill BE",
    },
    additionalInformation: "R-2000 Umzugsfuchs",
};
let contractPdfInfo = {
    subject: "",
    description: "",
};


export const useOfferPdfDownload = () => {
    const [offerData, setOfferData] = useState<PdfProps>();
    const [templateSettings, setTemplateSettings] = useState<TemplateType | null>(
        null
    );

    const [emailTemplateSettings, setEmailTemplateSettings] = useState<EmailTemplate | null>(
        null
    );
    const [activeButtonId, setActiveButtonId] = useState<"post" | "email" | null>(
        null
    );
    const {
        auth: { user },
        global: { modal },
        offer: { error, loading, offerDetails },
    } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();


    const router = useRouter();
    const { offerID } = router.query;

    useEffect(() => {
        (async () => {
            if (offerID) {

                const [template, emailTemplate, offerData] = await Promise.all([dispatch(
                    getTemplateSettings()
                ), dispatch(
                    readEmailSettings()
                ), dispatch(readOfferDetails({ params: { filter: offerID } }))])
                if (template?.payload?.Template) {
                    const {
                        firstColumn,
                        fourthColumn,
                        isFirstColumn,
                        isFourthColumn,
                        isSecondColumn,
                        isThirdColumn,
                        secondColumn,
                        thirdColumn,
                    }: TemplateType = template.payload.Template;

                    setTemplateSettings(() => ({
                        firstColumn,
                        secondColumn,
                        thirdColumn,
                        fourthColumn,
                        isFirstColumn,
                        isFourthColumn,
                        isSecondColumn,
                        isThirdColumn,
                    }));
                }
                if (emailTemplate?.payload) {
                    setEmailTemplateSettings({
                        logo: emailTemplate?.payload?.logo,
                        FooterColour: emailTemplate?.payload?.FooterColour,
                        email: emailTemplate?.payload?.email,
                        mobileNumber: emailTemplate?.payload?.mobileNumber,
                        phoneNumber: emailTemplate?.payload?.phoneNumber,
                        textColour: emailTemplate?.payload?.textColour,

                    })
                }
                if (offerData?.payload) {
                    const offerDetails: OffersTableRowTypes = offerData?.payload;
                    let formatData: PdfProps<ContractEmailHeaderProps> = {
                        id: offerDetails?.id,
                        attachement: offerDetails?.attachement,
                        emailHeader: {
                            offerNo: offerDetails?.offerNumber,
                            emailStatus: offerDetails?.emailStatus,
                            contractTitle: offerDetails?.title,
                            worker: offerDetails?.createdBy?.fullName,
                        },
                        headerDetails: {
                            offerNo: offerDetails?.offerNumber,
                            offerDate: offerDetails?.createdAt,
                            createdBy: offerDetails?.createdBy?.fullName,
                            logo: offerDetails?.createdBy?.company?.logo,
                            emailTemplateSettings: emailTemplate?.payload,
                        },
                        contactAddress: {
                            address: {
                                name: offerDetails?.leadID?.customerDetail
                                    ?.fullName,
                                city: offerDetails?.leadID?.customerDetail?.address
                                    ?.country,
                                postalCode:
                                    offerDetails?.leadID?.customerDetail?.address
                                        ?.postalCode,
                                streetWithNumber:
                                    offerDetails?.leadID?.customerDetail?.address
                                        ?.streetNumber,
                            },
                            email: offerDetails?.leadID?.customerDetail?.email,
                            phone:
                                offerDetails?.leadID?.customerDetail?.phoneNumber,
                        },
                        movingDetails: {
                            address: offerDetails?.addressID?.address,
                            header: offerDetails?.title,
                            workDates: offerDetails?.date,
                            handleTitleUpdate: () => { },
                            handleDescriptionUpdate: () => { },
                        },
                        serviceItem: offerDetails?.serviceDetail?.serviceDetail,
                        serviceItemFooter: {
                            subTotal: offerDetails?.subTotal?.toString(),
                            tax: offerDetails?.taxAmount?.toString(),
                            discount: offerDetails?.discountAmount?.toString(),
                            grandTotal: offerDetails?.total?.toString(),
                        },
                        footerDetails: {
                            firstColumn: {
                                companyName: offerDetails?.createdBy?.company?.companyName,
                                email: offerDetails?.createdBy?.email,
                                phoneNumber: offerDetails?.createdBy?.company?.phoneNumber,
                                taxNumber: offerDetails?.createdBy?.company?.taxNumber,
                                website: offerDetails?.createdBy?.company?.website,
                            },
                            secondColumn: {
                                address: {
                                    postalCode: offerDetails?.createdBy?.company.address.postalCode,
                                    streetNumber: offerDetails?.createdBy?.company.address.streetNumber,
                                },
                                bankDetails: {
                                    accountNumber: offerDetails?.createdBy?.company.bankDetails.accountNumber,
                                    bankName: offerDetails?.createdBy?.company.bankDetails.bankName,
                                    ibanNumber: offerDetails?.createdBy?.company.bankDetails.ibanNumber,
                                },
                            },
                            thirdColumn: {},
                            fourthColumn: {},
                            columnSettings: null,
                            currPage: 1,
                            totalPages: 10,
                        },
                        qrCode: {
                            acknowledgementSlip: qrCodeAcknowledgementData,
                            payableTo: qrCodePayableToData,
                        },
                        aggrementDetails: offerDetails?.additionalDetails || "",
                        isOffer: true,
                        signature: offerDetails?.signature,
                        isCanvas: false,
                    };

                    setOfferData(formatData);
                    contractPdfInfo = {
                        ...contractPdfInfo,
                        subject:
                            offerDetails?.content?.confirmationContent?.title as string,
                        description:
                            offerDetails?.content?.confirmationContent?.body as string,
                    };
                }
            }
        })()


    }, [offerID]);
    return { offerData, templateSettings, emailTemplateSettings, setActiveButtonId, activeButtonId };

};