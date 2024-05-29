import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateContractEmailValidationSchema } from "@/validation/contractSchema";
import { ContractEmailPreviewFormField } from "@/components/contract/fields/contract-email-fields";
import { useEffect, useState } from "react";
import {
  readContent,
  setContentDetails,
} from "@/api/slices/content/contentSlice";
import { Attachement } from "@/types/global";
import { transformAttachments } from "@/utils/utility";
import { sendContractEmail } from "@/api/slices/contract/contractSlice";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalType } from "@/enums/ui";
import localStoreUtil from "@/utils/localstore.util";
import { updateQuery } from "@/utils/update-query";

export const useContractEmail = (
  backRouteHandler: Function,
  onNextHandle: Function
) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, contractDetails } = useAppSelector(
    (state) => state.contract
  );
  const isMail = router.query?.isMail;

  const { content, contentDetails } = useAppSelector((state) => state.content);
  const [moreEmail, setMoreEmail] = useState({ isCc: false, isBcc: false });
  const [attachements, setAttachements] = useState<Attachement[]>(
    (contractDetails?.id &&
      transformAttachments(
        contractDetails?.offerID?.content?.confirmationContent
          ?.attachments as string[]
      )) ||
      []
  );

  const schema = generateContractEmailValidationSchema(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
  }, []);

  useEffect(() => {
    reset({
      email: contractDetails?.offerID?.leadID?.customerDetail?.email,
      content: contractDetails?.offerID?.content?.id,
      subject:
        contractDetails?.title ||
        "" +
          " " +
          contractDetails?.contractNumber +
          " " +
          contractDetails?.offerID?.createdBy?.company?.companyName,
      description:
        contractDetails?.offerID?.content?.confirmationContent?.body || "",
      pdf: contractDetails?.offerID?.content?.confirmationContent?.attachments,
      // title: contractDetails?.title,
      // additionalDetails: contractDetails?.additionalDetails || "",
    });
  }, []);

  const onContentSelect = (id: string) => {
    const selectedContent = content.find((item) => item.id === id);
    if (selectedContent) {
      reset({
        email: contractDetails?.offerID?.leadID?.customerDetail?.email,
        content: selectedContent?.id,
        subject:
          selectedContent?.confirmationContent?.title ||
          "" +
            " " +
            contractDetails?.contractNumber +
            " " +
            contractDetails?.offerID?.createdBy?.company?.companyName,
        description: selectedContent?.confirmationContent?.body || "",
        pdf: selectedContent?.confirmationContent?.attachments,
        // title: contractDetails?.title,
        // additionalDetails: contractDetails?.additionalDetails || "",
      });
      setAttachements(
        transformAttachments(
          selectedContent?.confirmationContent?.attachments as string[]
        ) || []
      );
      dispatch(setContentDetails(selectedContent));
    }
  };
  const fields = ContractEmailPreviewFormField(
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
    contractDetails,
    moreEmail,
    setMoreEmail,
    setValue
  );
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const apiData = {
    //   id: contractDetails?.id,
    //   title: data?.title,
    //   additionalDetails: data?.additionalDetails,

    // };
    // const response = await dispatch(updateContractContent({ data: apiData }));
    // if (response?.payload) {

    if (isMail) {
      const fileUrl = await JSON.parse(localStorage.getItem("pdf") as string);

      let apiData = {
        ...data,
        id: contractDetails?.id,
        pdf: fileUrl,
        attachments: attachements.map((item) => {
          return `${item.name}`;
        }),
      };

      const res = await dispatch(sendContractEmail({ data: apiData }));
      if (res?.payload) {
        dispatch(updateModalType({ type: ModalType.EMAIL_CONFIRMATION }));
      }
    } else {
      const updatedData = {
        ...data,
        id: contractDetails?.id,
        attachments: attachements?.map((item) => item.value),
      } as { [key: string]: any };
      delete updatedData["pdf"];
      localStoreUtil.store_data("contractComposeEmail", updatedData);
      router.pathname = "/contract/pdf-preview";
      router.query = { offerID: contractDetails?.id };
      updateQuery(router, router.locale as string);
    }

    // }
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
