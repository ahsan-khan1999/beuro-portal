import { PDFResponse } from "@/types/pdf";
import {
    Document,
    Font,
    PDFViewer,
    Page,
    StyleSheet,
    View,
    PDFDownloadLink,
    usePDF,
    BlobProvider
} from "@react-pdf/renderer";
import { usePdfDownload } from "@/hooks/contract/usePdfDownload";
import { Header } from "../reactPdf/header";
import { ContactAddress } from "../reactPdf/contact-address";
import { AddressDetails } from "../reactPdf/address-details";
import { ServiceTableHederRow } from "../reactPdf/service-table-header-row";
import { ServiceTableRow } from "../reactPdf/service-table-row";
import { ServicesTotalAmount } from "../reactPdf/services-total-ammount";
import { Footer } from "../reactPdf/footer";
import { AdditionalDetails } from "../reactPdf/additional-details";
import { EmailHeaderProps, PdfProps } from "@/types";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/base-components/ui/button/button";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { rejectOfferPublic, signOffer } from "@/api/slices/offer/offerSlice";
import localStoreUtil from "@/utils/localstore.util";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { blobToFile } from "@/utils/utility";

Font.register({
    family: "Poppins",
    fonts: [
        {
            src: "/assets/fonts/Poppins-Thin.ttf",
            fontStyle: "thin",
            fontWeight: 100,
        },
        {
            src: "/assets/fonts/Poppins-Regular.ttf",
            fontStyle: "normal",
            fontWeight: 400,
        },
        {
            src: "/assets/fonts/Poppins-Medium.ttf",
            fontStyle: "medium",
            fontWeight: 500,
        },
        {
            src: "/assets/fonts/Poppins-Light.ttf",
            fontStyle: "light",
            fontWeight: 300,
        },
        {
            src: "/assets/fonts/Poppins-SemiBold.ttf",
            fontStyle: "semibold",
            fontWeight: 600,
        },
        {
            src: "/assets/fonts/Poppins-Bold.ttf",
            fontStyle: "bold",
            fontWeight: 700,
        },
        {
            src: "/assets/fonts/Poppins-Black.ttf",
            fontStyle: "black",
            fontWeight: 800,
        },
    ],
});

export const PDF_DATA: PDFResponse = {
    header: {
        companyLogo: "",
        offerNumber: "R-2004",
        offerDate: "2012-1-1",
        createdBy: {
            fullName: "Talha R",
        },
    },
    contactAddress: {
        company: {
            phoneNumber: "+923088924153",
            bankDetails: {},
            address: {},
        },
        createdBy: {
            email: "talha@cloudmeshsoltuions.com",
        },
        customerDetail: {
            address: {
                country: "Pakistan",
                postalCode: "13150",
                streetNumber: "24A",
            },
            fullName: "Talha Nazir R",
        },
    },
    addressDetails: {
        addresses: [
            {
                country: "Pakistan",
                postalCode: "13150",
                streetNumber: "24A",
                description: "This is description 1",
            },
            {
                country: "Pakistan",
                postalCode: "13150",
                streetNumber: "24A",
                description: "This is description 2",
            },
            {
                country: "Pakistan",
                postalCode: "13150",
                streetNumber: "24A",
                description: "This is description 3",
            },
        ],
        dates: [
            {
                endDate: "2022-33-21",
                startDate: "2021-4-02",
            },
            {
                endDate: "2022-33-21",
                startDate: "2021-4-02",
            },
        ],
        title: "This is dummy Title",
    },
    serviceDetails: [
        {
            count: "1",
            description:
                "This is dummy description This is dummy description This is dummy description This is dummy description",
            price: "345",
            total: "3450",
            unit: "std",
        },
        {
            count: "2",
            description: "This is dummy description",
            price: "345",
            total: "3450",
            unit: "std",
        },
        {
            count: "3",
            description: "This is dummy description",
            price: "345",
            total: "3450",
            unit: "std",
        },
        {
            count: "10",
            description: "This is dummy description",
            price: "345",
            total: "3450",
            unit: "std",
        },
        {
            count: "10",
            description: "This is dummy description",
            price: "345",
            total: "3450",
            unit: "std",
        },
        {
            count: "10",
            description: "This is dummy description",
            price: "345",
            total: "3450",
            unit: "std",
        },
        {
            count: "10",
            description: "This is dummy description",
            price: "345",
            total: "3450",
            unit: "std",
        },
    ],
    createdBy: {
        email: "talha@gmail.com",
    },
    footer: {
        company: {
            address: {
                city: "Islamabad",
                country: "Pakistan",
                houseNumber: "3rd Floor",
                postalCode: "13150",
                streetNumber: "24A",
            },
            bankDetails: {
                bankName: "Meezan Bank",
                ibanNumber: "PKMZ1234567890987",
            },
            companyName: "CMS",
            mobileNumber: "+923088922423",
            phoneNumber: "+155433455",
            taxNumber: "R-5555",
            website: "https://cloudmeshsolutions.com",
        },
        createdBy: {
            email: "talha@cloudmeshsolutions.com",
        },
    },
    additionalDetails: {
        heading: "Zahlungsarten",
        description:
            "<h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p><h5>Banküberweisung:</h5><p>Sie können den <br> Betrag auf unser <em>angegebenes</em> Bankkonto überweisen. Bitte beachten Sie, dass die Zahlung rechtzeitig vor dem Umzugstermin eingehen muss (mindestens einen Tag vorher).</p>",
    },

    offerID: {
        discountAmount: "65675",
        discountDescription:
            "This is discount description, This is discount description, , This is discount description, This is discount description",
        subTotal: "555",
        taxAmount: "7.7",
        total: "3456",
    },
    qrDetails: {
        bank: {
            heading: "Empfangsschenin",
            account: "Konto/ Zahlbar an",
            ibanNumber: "CH48 0900 0000 1556 1356 9",
            bankName: "Rahal GmbH",
            companyAddress: "St.Urbanstrasse 79",
            street: "4914 Roggwil",
            referenceNumber: "27 12323 0000 0000 0006 22926",
            payable: "Zahlbar durch",
            payableName: "Rahal GmbH",
            payableAddress: "St. Urbanstrasse  79",
            payableStreet: "4914 Roggwill BE",
            currency: "CHF",
            amount: "12221",
        },
        qr: {
            heading: "Zahlteil",
            currency: "CHF",
            amount: "23232",
            qrCodeImage: "",
        },
    },
};

export const A4_WIDTH = 595; // 72dpi
export const A4_HEIGHT = 842; // 72dpi

const OfferSignedPdf = ({ offerData, signature }: { offerData?: PdfProps<EmailHeaderProps>, signature: any }) => {
    const { loading: offerLoading } = useAppSelector(state => state.offer)
    const headerDetails = offerData?.headerDetails;
    const { address, header, workDates } = offerData?.movingDetails || {};
    const contactAddress = offerData?.contactAddress;
    const serviceItem = offerData?.serviceItem;
    const serviceItemFooter = offerData?.serviceItemFooter;
    const aggrementDetails = offerData?.aggrementDetails;
    const router = useRouter();
    const dispatch = useAppDispatch()
    const { action: pdfAction } = router.query
    console.log(pdfAction, "pdfAction");

    const pdfDoc = (
        <Document style={{ width: A4_WIDTH, height: A4_HEIGHT }}>
            <Page style={styles.body}>
                <Header {...headerDetails} />
                <View
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 120,
                    }}
                >
                    <ContactAddress {...{ ...contactAddress }} />

                    <AddressDetails {...{ address, header, workDates }} />

                    <ServiceTableHederRow />
                    {serviceItem?.map((item, index) => (
                        <ServiceTableRow {...item} key={index} />
                    ))}
                    <ServicesTotalAmount {...serviceItemFooter} />
                </View>
                <Footer {...PDF_DATA.footer} />
            </Page>

            {/* Additional details */}
            <Page style={styles.body}>
                <Header {...headerDetails} />
                <View
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 120,
                    }}
                >
                    <ContactAddress {...{ ...contactAddress }} />
                    <AdditionalDetails description={aggrementDetails} signature={signature} />
                </View>
                <Footer {...PDF_DATA.footer} />
            </Page>


        </Document>
    )

    const [instance, updateInstance] = usePDF({ document: pdfDoc })

    useMemo(() => {
        if (signature && instance?.url) {

            updateInstance(pdfDoc)
        }
    }, [signature])

    const acceptOffer = async (file: any) => {
        const convertedFile = blobToFile(file, "offer.pdf")
        if (!signature) {
            toast.error("please sign first")
            return
        };

        const formData = new FormData()
        formData.append("signature", convertedFile);

        const data = {
            id: offerData?.id
        }
        const response = await dispatch(signOffer({ data, formData }))
        if (response?.payload) { dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS })) }
    }
    const rejectOffer = async () => {
        const params = {
            id: offerData?.id
        }
        const response = await dispatch(rejectOfferPublic({ params }))
        if (response?.payload) { dispatch(updateModalType({ type: ModalType.CREATE_SUCCESS })) }
    }
    return (
        <div className="download-link">
            <BlobProvider
                document={
                    <Document>

                        <Page style={styles.body}>
                            <Header {...headerDetails} />
                            <View
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    right: 0,
                                    top: 120,
                                }}
                            >
                                <ContactAddress {...{ ...contactAddress }} />

                                <AddressDetails {...{ address, header, workDates }} />

                                <ServiceTableHederRow />
                                {serviceItem?.map((item, index) => (
                                    <ServiceTableRow {...item} key={index} />
                                ))}
                                <ServicesTotalAmount {...serviceItemFooter} />
                            </View>
                            <Footer {...PDF_DATA.footer} />
                        </Page>

                        {/* Additional details */}
                        <Page style={styles.body}>
                            <Header {...headerDetails} />
                            <View
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    right: 0,
                                    top: 120,
                                }}
                            >
                                <ContactAddress {...{ ...contactAddress }} />
                                <AdditionalDetails description={aggrementDetails} signature={signature} />
                            </View>
                            <Footer {...PDF_DATA.footer} />
                        </Page>


                    </Document>
                }

            >
                {({ blob, url, loading, error }) => {
                    return (
                        pdfAction === "Reject" ?
                            <Button
                                className={`mt-[55px] w-full ${'bg-red'} rounded-[4px] shadow-md  text-center text-white`}
                                onClick={rejectOffer}
                                inputType="button"
                                id="acceptOffer"
                                loading={offerLoading}
                                text={pdfAction as string}
                            />

                            : pdfAction === "Accept" ?
                                <Button
                                    className={`mt-[55px] w-full ${'bg-[#45C769]'} rounded-[4px] shadow-md  text-center text-white`}
                                    onClick={() => acceptOffer(blob)}
                                    inputType="button"
                                    id="acceptOffer"
                                    loading={offerLoading}
                                    text={pdfAction}
                                /> : null
                    )

                }}
            </BlobProvider>
        </div >
    );
};

export default OfferSignedPdf;

const styles = StyleSheet.create({
    body: {
        paddingBottom: 95,
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

