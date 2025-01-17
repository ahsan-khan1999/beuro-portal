import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateContractEmailValidationSchema } from "@/validation/contractSchema";
import { useEffect, useMemo, useState } from "react";
import { setContentDetails } from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { sendOfferEmail } from "@/api/slices/offer/offerSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { updateQuery } from "@/utils/update-query";
import { OfferEmailFormField } from "@/components/offers/compose-mail/fields";
import localStoreUtil from "@/utils/localstore.util";

export const useSendEmail = (backRouteHandler: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector(
    (state) => state.offer
  );
  const isMail = router.query?.isMail;
  const [isMoreEmail, setIsMoreEmail] = useState({ isCc: false, isBcc: false });
  const { content, contentDetails } = useAppSelector((state) => state.content);
  const [isMailSend, setIsMailSend] = useState(false);
  const [attachements, setAttachements] = useState<Attachement[]>(
    (offerDetails?.id &&
      transformAttachments(
        offerDetails?.content?.offerContent?.attachments as string[]
      )) ||
      []
  );

  const schema = generateContractEmailValidationSchema(translate);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    reset({
      email: offerDetails?.leadID?.customerDetail?.email,
      content: offerDetails?.content?.id,
      subject:
        offerDetails?.title ||
        "" +
          " " +
          offerDetails?.offerNumber +
          " " +
          offerDetails?.createdBy?.company?.companyName,

      description: offerDetails?.content?.offerContent?.body || "",
      attachments: offerDetails?.content?.offerContent?.attachments,
      title: offerDetails?.title,
      additionalDetails: offerDetails?.additionalDetails || "",
    });
  }, []);

  const onContentSelect = (id: string) => {
    const selectedContent = content.find((item) => item.id === id);
    if (selectedContent) {
      reset({
        email: offerDetails?.leadID?.customerDetail?.email,
        content: selectedContent?.id,
        subject:
          selectedContent?.offerContent?.title ||
          "" +
            " " +
            offerDetails?.offerNumber +
            " " +
            offerDetails?.createdBy?.company?.companyName,
        description: selectedContent?.offerContent?.body || "",
        attachments: selectedContent?.offerContent?.attachments,
        title: offerDetails?.title,
        additionalDetails: offerDetails?.additionalDetails || "",
      });
      setAttachements(
        transformAttachments(
          selectedContent?.offerContent?.attachments as string[]
        ) || []
      );
      dispatch(setContentDetails(selectedContent));
    }
  };

  const fields = OfferEmailFormField(
    register,
    loading,
    control,
    () => console.log(),
    backRouteHandler,
    content,
    contentDetails,
    onContentSelect,
    attachements,
    setAttachements,
    offerDetails,
    isMoreEmail,
    setIsMoreEmail,
    setValue
  );

  useMemo(() => {
    isMailSend &&
      dispatch(updateModalType({ type: ModalType.LOADING_MAIL_GIF }));
  }, [isMailSend]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (isMail) {
      const fileUrl = await JSON.parse(localStorage.getItem("pdf") as string);

      let apiData = {
        ...data,
        id: offerDetails?.id,
        pdf: fileUrl,
      };

      setIsMailSend(true);
      const res = await dispatch(sendOfferEmail({ data: apiData }));
      setTimeout(() => {
        if (res?.payload) {
          setIsMailSend(false);
          dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
        } else {
          setIsMailSend(false);
        }
      }, 1800);
    } else {
      const updatedData = {
        ...data,
        id: offerDetails?.id,
        attachments: attachements?.map((item) => item.value),
      };
      localStoreUtil.store_data("contractComposeEmail", updatedData);
      router.pathname = "/offers/pdf-preview";
      router.query = { ...router.query, offerID: offerDetails?.id };
      updateQuery(router, router.locale as string);
    }
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
