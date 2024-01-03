import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateContractEmailValidationSchema } from "@/validation/contractSchema";
import { ContractEmailPreviewFormField } from "@/components/contract/fields/contract-email-fields";
import { useEffect, useMemo, useState } from "react";
import {
  readContent,
  setContentDetails,
} from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { sendOfferEmail } from "@/api/slices/offer/offerSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import CreationCreated from "@/base-components/ui/modals1/CreationCreated";
import { updateQuery } from "@/utils/update-query";
import { OfferEmailFormField } from "@/components/offers/compose-mail/fields";
import localStoreUtil from "@/utils/localstore.util";
import { CompanySettingsActionType, TemplateType } from "@/types";
import { getTemplateSettings } from "@/api/slices/settingSlice/settings";

export const useSendEmail = (
  backRouteHandler: Function,
  onNextHandle: Function
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector(
    (state) => state.offer
  );

  const { content, contentDetails } = useAppSelector((state) => state.content);
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
    setError,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  useEffect(() => {
    dispatch(readContent({ params: { filter: {}, paginate: 0 } }))
    reset({
      email: offerDetails?.leadID?.customerDetail?.email,
      content: offerDetails?.content?.id,
      subject: offerDetails?.content?.offerContent?.title,
      description: offerDetails?.content?.offerContent?.description,
      pdf: offerDetails?.content?.offerContent?.attachments,
    });

  }, []);

  const onContentSelect = (id: string) => {
    const selectedContent = content.find((item) => item.id === id);
    if (selectedContent) {
      reset({
        email: offerDetails?.leadID?.customerDetail?.email,
        content: selectedContent?.id,
        subject: selectedContent?.offerContent?.title,
        description: selectedContent?.offerContent?.description,
        pdf: selectedContent?.offerContent?.attachments,
      });
      setAttachements(transformAttachments(
        selectedContent?.offerContent?.attachments as string[]
      ) || [])
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
    offerDetails
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatedData = {
      ...data,
      id: offerDetails?.id,
      pdf: attachements?.map((item) => item.value),
      // router,
      // translate,
      // setError,
    };

    localStoreUtil.store_data("contractComposeEmail", updatedData);

    router.pathname = "/offers/pdf-preview";
    router.query = { offerID: offerDetails?.id };
    updateQuery(router, router.locale as string);
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
