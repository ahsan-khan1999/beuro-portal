import { ProductPurchasedItemsDetails } from "./preview/productDetails/purchased-items-details";
import { Aggrement } from "./preview/aggrement/aggrement";
import { InvoiceEmailHeaderProps, PdfProps, TemplateType } from "@/types/types";
import { PaymentQRCodeDetails } from "./preview/qrCode/payment-qr-code-details";
import { ProductItemNewPage } from "./preview/productDetails/product-item-next-page";
import { Container } from "./container";
import { ServiceList } from "@/types/offers";
import { PreviewCard } from "./preview-card";
import { Button } from "@/base-components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { signOffer } from "@/api/slices/offer/offerSlice";
import localStoreUtil from "@/utils/localstore.util";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { useRouter } from "next/router";

export const SignPdf = <T,>({
    newPageData,
    pdfData,
    templateSettings,
    isQr,
    totalPages,
}: {
    pdfData: PdfProps<T>;
    newPageData: ServiceList[][];
    templateSettings: TemplateType | null;
    isQr?: boolean;
    totalPages: number;
}) => {
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(state => state.offer)
    const { modal } = useAppSelector(state => state.global)
    const router = useRouter();

    const acceptOffer = async () => {
        const signature = await localStoreUtil.get_data("signature")
        if (!signature) return;
        const data = {
            signature: signature,
            id: pdfData?.id
        }
        const response = await dispatch(signOffer({ data }))
        if (response?.payload) dispatch(updateModalType({ type: ModalType.CREATION }))
    }

    const renderModal = () => {
        return MODAL_CONFIG[modal.type] || null;
    };

    const onClose = () => {
        dispatch(updateModalType(ModalType.NONE));
    };


    const route = () => {
        router.push("/login");
        onClose();
    };

    const MODAL_CONFIG: ModalConfigType = {
        [ModalType.CREATION]: (
            <CreationCreated
                onClose={onClose}
                heading={"Offer Accepted Successfully"}
                subHeading={"Thank you very much for your feedback"}
                route={route}
            />
        ),
    };
    return (
        <Container>
            {/* <PreviewCard /> */}
            <div className="flex flex-col gap-y-[30px]">
                {newPageData.length > 0 && (
                    <ProductPurchasedItemsDetails
                        {...pdfData}
                        serviceItem={newPageData[0]}
                        isShowTotal={newPageData.length === 1}
                        templateSettings={templateSettings}
                        totalPages={totalPages}
                        isOffer={pdfData.isOffer}
                    />
                )}
                {newPageData.slice(1).map((pageItems, index) => (
                    <ProductItemNewPage
                        key={index}
                        serviceItem={pageItems}
                        footerDetails={pdfData.footerDetails}
                        headerDetails={pdfData.headerDetails}
                        serviceItemFooter={pdfData.serviceItemFooter}
                        isShowTotal={index === newPageData.length - 2}
                        templateSettings={templateSettings}
                        totalPages={totalPages}
                        currPage={index + 2}
                    />
                ))}
                <Aggrement
                    contactAddress={pdfData?.contactAddress}
                    headerDetails={pdfData?.headerDetails}
                    footerDetails={pdfData?.footerDetails}
                    aggrementDetails={pdfData?.aggrementDetails}
                    templateSettings={templateSettings}
                    totalPages={totalPages}
                    currPage={totalPages}
                    isOffer={pdfData.isOffer}
                    handleDescriptionUpdate={pdfData.movingDetails?.handleDescriptionUpdate}
                    signature={pdfData?.signature}
                />
                {isQr && (
                    <PaymentQRCodeDetails
                        contactAddress={pdfData.contactAddress}
                        headerDetails={pdfData.headerDetails}
                        qrCode={pdfData.qrCode}
                    />
                )}
            </div>
            {
                !pdfData?.signature &&
                <Button
                    className="mt-[55px] w-full bg-[#45C769] rounded-[4px] shadow-md  text-center text-white"
                    onClick={acceptOffer}
                    inputType="button"
                    id="acceptOffer"
                    loading={loading}
                    text="Accept"
                />
            }

            {renderModal()}
        </Container>
    );
};
