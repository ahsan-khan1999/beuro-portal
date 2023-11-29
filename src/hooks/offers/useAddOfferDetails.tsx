import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddDateFormField, AddOfferDetailsFormField, AddOfferDetailsSubmitFormField } from "@/components/offers/add/fields/add-offer-details-fields";
import { generateOfferDetailsDateValidationSchema, generateOfferDetailsValidationSchema } from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormField } from "@/types";
import { useFormFields } from "@/base-components/form/hook";
import * as yup from 'yup';
import { readCustomer, setCustomerDetails } from "@/api/slices/customer/customerSlice";
import { updateQuery } from "@/utils/update-query";
import { readLead } from "@/api/slices/lead/leadSlice";
import { readContent } from "@/api/slices/content/contentSlice";
import { createOffer } from "@/api/slices/offer/offerSlice";
import { transformDateFormValues } from "@/utils/utility";

export const useAddOfferDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  let [dateCount, setDateCount] = useState<number>(1)

  const { loading, error, offerDetails } = useAppSelector((state) => state.offer);
  const { customer, customerDetails } = useAppSelector((state) => state.customer);
  const { content } = useAppSelector((state) => state.content);

  const { leadDetails, lead } = useAppSelector((state) => state.lead);

  const count = useRef(1)



  const onCancel = () => {
    router.pathname = "/offers"
    updateQuery(router, router.locale as string)
  }
  const schema = generateOfferDetailsValidationSchema(translate);
  const schemaDate = generateOfferDetailsDateValidationSchema(translate, dateCount);
  const mergedSchema = schema.concat(schemaDate);
  useEffect(() => {
    dispatch(readCustomer({ params: { filter: { paginate: 0 } } }))
    dispatch(readContent({ params: { filter: { paginate: 0 } } }))

  }, [])
  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(mergedSchema),
  });
  const handleAddDateField = () => {
    setDateCount(dateCount + 1)
  }
  const handleRemoveDateField = () => {
    setDateCount(--dateCount)
  }
  const type = watch("type")

  const customerType = watch("customerType")
  const customerID = watch("customerID")
  const selectedContent = watch("content")

  useMemo(() => {
    if (type && customerID) dispatch(readLead({ params: { filter: { customerID: customerID, paginate: 0 } } }))
  }, [customerID])

  const onCustomerSelect = (id: string) => {
    if (!id) return;
    const selectedCustomers = customer.filter((item) => item.id === id)
    dispatch(setCustomerDetails(selectedCustomers?.length > 0 && selectedCustomers[0]))

    reset({
      ...selectedCustomers[0],
      type: type,
      content: selectedContent
    })

  }
  const handleContentSelect = () => {
    const filteredContent = content?.find((item) => item.id === selectedContent)
    if (filteredContent) setValue("title", filteredContent?.offerContent?.title)

  }
 
  const offerFields = AddOfferDetailsFormField(register, loading, control, { customerType, type, customer, onCustomerSelect, customerDetails, onCancel, leadDetails, lead, content, handleContentSelect }, setValue
  );
  const offerSubmitField = AddOfferDetailsSubmitFormField(register, loading, control, () => console.log("")
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    if (offerDetails?.id) {
      const apiData = { ...data, step: 1, offerId: offerDetails?.id, stage: ComponentsType.addressAdded, date: transformDateFormValues(data?.date) }
      const res = await dispatch(createOffer({ data: apiData, router, setError, translate }));
      if (res?.payload) onHandleNext(ComponentsType.addressAdded);
    } else {
      const apiData = { ...data, step: 1, offerId: null, stage: ComponentsType.addressAdded, date: transformDateFormValues(data?.date) }
      const res = await dispatch(createOffer({ data: apiData, router, setError, translate }));
      if (res?.payload) onHandleNext(ComponentsType.addressAdded);
    }
  };

  const formFields = useMemo((): FormField[] => {
    const dynamicFormFields = [];
    dynamicFormFields.push(
      ...AddDateFormField(control, handleAddDateField, dateCount, handleRemoveDateField)
    );
    return dynamicFormFields;
  }, [dateCount]);
  const fields = [...offerFields, ...formFields, ...offerSubmitField]


  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};
