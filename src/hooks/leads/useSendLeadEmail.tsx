import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { useEffect, useMemo, useState } from "react";
import { setContentDetails } from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import { sendLeadEmail } from "@/api/slices/lead/leadSlice";
import { generateContractEmailValidationSchema } from "@/validation/contractSchema";
import { LeadEmailFormField } from "@/components/leads/compose-mail/leads-email-formfields";

export const useSendLeadEmail = (backRouteHandler: Function) => {
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const [isMailSend, setIsMailSend] = useState(false);
  const { content, contentDetails } = useAppSelector((state) => state.content);
  const [isMoreEmail, setIsMoreEmail] = useState({ isCc: false, isBcc: false });
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const [attachements, setAttachements] = useState<Attachement[]>(
    (leadDetails?.id &&
      transformAttachments(
        leadDetails?.requiredService?.leadContent?.attachments as string[]
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
    if (leadDetails?.id) {
      reset({
        email: leadDetails?.customerDetail?.email,
        content: leadDetails?.requiredService?.id,
        subject:
          leadDetails?.requiredService?.leadContent?.title ||
          "" +
            " " +
            leadDetails?.refID +
            " " +
            leadDetails?.createdBy?.company?.companyName,

        description: leadDetails?.requiredService?.leadContent?.body || "",
        attachments: leadDetails?.requiredService?.leadContent?.attachments,
        title: leadDetails?.requiredService?.leadContent?.title,
      });
    }
  }, [leadDetails?.id]);

  const onContentSelect = (id: string) => {
    const selectedContent = content.find((item) => item.id === id);
    if (selectedContent) {
      reset({
        email: leadDetails?.customerDetail?.email,
        content: selectedContent?.id,
        subject:
          selectedContent?.leadContent?.title ||
          "" +
            // " " +
            // leadDetails?.refID +
            " " +
            leadDetails?.createdBy?.company?.companyName,
        description: selectedContent?.leadContent?.body || "",
        attachments: selectedContent?.leadContent?.attachments,
        title: leadDetails?.title,
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
    let apiData = {
      ...data,
      id: leadDetails?.id,
      attachments: attachements.map((item) => item.value),
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
