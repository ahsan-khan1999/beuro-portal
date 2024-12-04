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
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { updateQuery } from "@/utils/update-query";
import localStoreUtil from "@/utils/localstore.util";
import { LeadEmailFormField } from "@/components/leads/compose-mail/leads-email-formfields";
import { sendLeadEmail } from "@/api/slices/lead/leadSlice";

export const useSendLeadEmail = (backRouteHandler: Function) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isMail = router.query?.isMail;
  const { t: translate } = useTranslation();
  const [isMailSend, setIsMailSend] = useState(false);
  const [isMoreEmail, setIsMoreEmail] = useState({ isCc: false, isBcc: false });
  const { content, contentDetails } = useAppSelector((state) => state.content);
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const [attachements, setAttachements] = useState<Attachement[]>(
    (leadDetails?.id &&
      transformAttachments(
        leadDetails?.content?.leadContent?.attachments as string[]
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
      email: leadDetails?.customerDetail?.email,
      content: leadDetails?.content?.id,
      subject:
        leadDetails?.title ||
        "" +
          " " +
          leadDetails?.refID +
          " " +
          leadDetails?.createdBy?.company?.companyName,

      description: leadDetails?.content?.leadContent?.body || "",
      attachments: leadDetails?.content?.leadContent?.attachments,
      title: leadDetails?.title,
      additionalDetails: leadDetails?.additionalDetails || "",
    });
  }, []);

  const onContentSelect = (id: string) => {
    const selectedContent = content.find((item) => item.id === id);
    if (selectedContent) {
      reset({
        email: leadDetails?.customerDetail?.email,
        content: selectedContent?.id,
        subject:
          selectedContent?.leadContent?.title ||
          "" +
            " " +
            leadDetails?.refID +
            " " +
            leadDetails?.createdBy?.company?.companyName,
        description: selectedContent?.leadContent?.body || "",
        attachments: selectedContent?.leadContent?.attachments,
        title: leadDetails?.title,
        additionalDetails: leadDetails?.additionalDetails || "",
      });
      setAttachements(
        transformAttachments(
          selectedContent?.leadContent?.attachments as string[]
        ) || []
      );
      dispatch(setContentDetails(selectedContent));
    }
  };

  const fields = LeadEmailFormField(
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
    leadDetails,
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
        id: leadDetails?.id,
        pdf: fileUrl,
      };

      setIsMailSend(true);
      const res = await dispatch(sendLeadEmail({ data: apiData }));
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
        id: leadDetails?.id,
        attachments: attachements?.map((item) => item.value),
      };
      localStoreUtil.store_data("contractComposeEmail", updatedData);
      //   router.pathname = "/offers/pdf-preview";
      router.query = { ...router.query, leadID: leadDetails?.id };
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
