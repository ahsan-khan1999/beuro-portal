import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  AddDateFormField,
  AddOfferDetailsFormField,
  AddOfferDetailsSubmitFormField,
} from "@/components/offers/add/fields/add-offer-details-fields";
import {
  generateOfferDetailsValidationSchema,
} from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  readCustomer,
  setCustomerDetails,
} from "@/api/slices/customer/customerSlice";
import { updateQuery } from "@/utils/update-query";
import { readLead } from "@/api/slices/lead/leadSlice";
import { readContent } from "@/api/slices/content/contentSlice";
import { createOffer } from "@/api/slices/offer/offerSlice";

export const useAddOfferDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();


  const { loading, error, offerDetails } = useAppSelector(
    (state) => state.offer
  );
  const { customer, customerDetails } = useAppSelector(
    (state) => state.customer
  );
  const { content } = useAppSelector((state) => state.content);

  const { leadDetails, lead } = useAppSelector((state) => state.lead);
  console.log(offerDetails, "offerDetails");


  const onCancel = () => {
    router.pathname = "/offers";
    updateQuery(router, router.locale as string);
  };
  const schema = generateOfferDetailsValidationSchema(translate);
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
    resolver: yupResolver<FieldValues>(schema),
  });
  useEffect(() => {
    dispatch(readCustomer({ params: { filter: { paginate: 0 } } }))
    dispatch(readContent({ params: { filter: { paginate: 0 } } }))
  }, [])


  const type = watch("type");

  const customerType = watch("customerType");
  const customerID = watch("customerID");
  const selectedContent = watch("content");
  useMemo(() => {
    if (type && customerID)
      dispatch(
        readLead({
          params: { filter: { customerID: customerID, paginate: 0 } },
        })
      );
  }, [customerID]);

  useMemo(() => {
    if (offerDetails?.id) {
      reset({
        type: offerDetails?.type,
        customerID: offerDetails?.customerID?.id,
        leadID: offerDetails?.leadID?.id,
        customerType: offerDetails?.customerID?.customerType,
        fullName: offerDetails?.customerID?.fullName,
        email: offerDetails?.customerID?.email,
        phoneNumber: offerDetails?.customerID?.phoneNumber,
        mobileNumber: offerDetails?.customerID?.mobileNumber,
        content: offerDetails?.content?.id,
        title: offerDetails?.title,
        address: offerDetails?.customerID?.address,
        date: offerDetails?.date
      })
    }
  }, [offerDetails?.id])
  const { fields: testFields, append, remove } = useFieldArray({
    control,
    name: "date",

  });
  const onCustomerSelect = (id: string) => {
    if (!id) return;
    const selectedCustomers = customer.filter((item) => item.id === id);
    dispatch(
      setCustomerDetails(selectedCustomers?.length > 0 && selectedCustomers[0])
    );

    reset({
      ...selectedCustomers[0],
      type: type,
      content: selectedContent,
    });
  };
  const handleContentSelect = () => {
    const filteredContent = content?.find(
      (item) => item.id === selectedContent
    );
    if (filteredContent)
      setValue("title", filteredContent?.offerContent?.title);
  };

  const offerFields = AddOfferDetailsFormField(
    register,
    loading,
    control,
    {
      customerType,
      type,
      customer,
      onCustomerSelect,
      customerDetails,
      onCancel,
      leadDetails,
      lead,
      content,
      handleContentSelect,
    },
    setValue
  );


  const dateFields = AddDateFormField(register,
    append,
    testFields?.length ? testFields?.length : 1,
    remove,
    offerDetails,
    control

  )
  const submit = AddOfferDetailsSubmitFormField(register,
    loading,
    control,
    () => console.log(), 0, {}


  )

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    if (offerDetails?.id) {
      const apiData = { ...data, step: 1, offerId: offerDetails?.id, stage: ComponentsType.addressAdded, isLeadCreated: data?.leadID ? true : false }
      const res = await dispatch(createOffer({ data: apiData, router, setError, translate }));
      if (res?.payload) onHandleNext(ComponentsType.addressAdded);
    } else {
      const apiData = { ...data, step: 1, offerId: null, stage: ComponentsType.addressAdded, isLeadCreated: data?.leadID ? true : false }
      const res = await dispatch(createOffer({ data: apiData, router, setError, translate }));
      if (res?.payload) onHandleNext(ComponentsType.addressAdded);
    }
  };

  return {
    fields: [...offerFields, ...dateFields, ...submit],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    append,
    testFields,
    remove,
    register,
    loading
  };
};
