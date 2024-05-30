import { Layout } from "@/layout";
import React from "react";
import OfferDetailsCard from "./OfferDetailsCard";
import OffersDetailsData from "./OffersDetailsData";
import useOfferDetails from "@/hooks/offers/useOfferDetails";
import ComposeMail from "../compose-mail/ComposeMail";

const OfferDetails = () => {
  const {
    offerDeleteHandler,
    offerDetails,
    renderModal,
    handleImageUpload,
    handleNotes,
    handlePaymentStatusUpdate,
    handleStatusUpdate,
    handleSendEmail,
    isSendEmail,
    setIsSendEmail,
    onNextHandle,
    loading,
    handleSendByPost,
    handleUpdateDiscount,
    systemSettings,
    handleImageSlider,
    handleUploadImages,
    shareImgModal,
    handleUploadFile,
  } = useOfferDetails();

  return (
    <Layout>
      {/* {loading ? (
         <CustomLoader />
      ) : ( */}
      <div className="bg-white rounded-md px-5 pt-5 pb-10 2xl:fixed offerCardCalWidth z-10 2xl:-mt-[314px] 2xl:border-t-[14px] 2xl:border-t-defaultBackground">
        <OfferDetailsCard
          offerDetails={offerDetails}
          offerDeleteHandler={offerDeleteHandler}
          handleNotes={handleNotes}
          handleImageUpload={handleImageUpload}
          handleStatusUpdate={handleStatusUpdate}
          handlePaymentStatusUpdate={handlePaymentStatusUpdate}
          handleSendEmail={handleSendEmail}
          isSendEmail={isSendEmail}
          handleSendByPost={handleSendByPost}
          loading={loading}
          onFileUpload={handleUploadFile}
        />
      </div>

      <div className="2xl:mt-[395px] w-full 2xl:block mb-10">
        {isSendEmail ? (
          <div className="mt-5">
            <ComposeMail
              backRouteHandler={handleSendEmail}
              onNextHandle={onNextHandle}
            />
          </div>
        ) : (
          <OffersDetailsData
            offerDetails={offerDetails}
            loading={loading}
            handleUpdateDiscount={handleUpdateDiscount}
            currency={systemSettings?.currency}
            shareImgModal={shareImgModal}
            handleImagesUpload={handleUploadImages}
            handleImageSlider={handleImageSlider}
          />
        )}
      </div>

      {/* )} */}
      {renderModal()}
    </Layout>
  );
};

export default OfferDetails;
