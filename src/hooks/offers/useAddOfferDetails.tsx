import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  AddDateFormField,
  AddOfferDetailsFormField,
  AddOfferDetailsSubmitFormField,
} from "@/components/offers/add/fields/add-offer-details-fields";
import {
  generateOfferDetailsDateValidationSchema,
  generateOfferDetailsValidationSchema,
} from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormField } from "@/types";
import { useFormFields } from "@/base-components/form/hook";
import * as yup from "yup";
import {
  readCustomer,
  setCustomerDetails,
} from "@/api/slices/customer/customerSlice";
import { updateQuery } from "@/utils/update-query";
import { readLead } from "@/api/slices/lead/leadSlice";
import { readContent } from "@/api/slices/content/contentSlice";
import { createOffer } from "@/api/slices/offer/offerSlice";
import { transformDateFormValues } from "@/utils/utility";

export const useAddOfferDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  let [dateCount, setDateCount] = useState<number>(1);
  const [formFields, setFormFields] = useState<any[]>([]);
  const [shouldRegenerateFields, setShouldRegenerateFields] = useState(true);


  const { loading, error, offerDetails } = useAppSelector(
    (state) => state.offer
  );
  const { customer, customerDetails } = useAppSelector(
    (state) => state.customer
  );
  const { content } = useAppSelector((state) => state.content);

  const { leadDetails, lead } = useAppSelector((state) => state.lead);

  const count = useRef(1);

  const onCancel = () => {
    router.pathname = "/offers";
    updateQuery(router, router.locale as string);
  };
  const schema = generateOfferDetailsValidationSchema(translate);
  const schemaDate = generateOfferDetailsDateValidationSchema(
    translate,
    dateCount
  );
  const mergedSchema = schema.concat(schemaDate);
  useEffect(() => {
    // dispatch(readCustomer({ params: { filter: { paginate: 0 } } }))
    // dispatch(readContent({ params: { filter: { paginate: 0 } } }))

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
    setDateCount(prev => prev + 1);
    setShouldRegenerateFields(true);
  };
  const handleRemoveDateField = (key: string) => {
    setDateCount(prevCount => prevCount - 1);
    setShouldRegenerateFields(false);
    setFormFields(prev => {
      const updatedFormFields = { ...prev[0] };
      if (updatedFormFields.field && updatedFormFields.field.children) {
        updatedFormFields.field.children = updatedFormFields.field.children.filter((item: any) => item.field.id !== key);
      }
      // updatedFormFields.field.children.forEach((item: any, index: number) => {
      //   const newKey = `date.date_${index}`;
      //   item.field.id = newKey;
      //   item.field.name = `date.startDate_${index}`;
      //   item.field.children[0].field.id = `date.startDate_${index}`;
      //   item.field.children[1].field.id = `date.endDate_${index}`;
      //   item.field.children[1].field.name = `date.endDate_${index}`;
      // });
      console.log(updatedFormFields, "updated form ");

      return [updatedFormFields];
    });
  };

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
      })
      // setDateFieldValues(setValue, offerDetails?.date)

    }
  }, [offerDetails?.id])

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
  const offerSubmitField = AddOfferDetailsSubmitFormField(
    register,
    loading,
    control,
    () => console.log(""), 0, {}
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data?.date);

    if (offerDetails?.id) {
      const apiData = { ...data, step: 1, offerId: offerDetails?.id, stage: ComponentsType.addressAdded, date: transformDateFormValues(data?.date), isLeadCreated: data?.leadID ? true : false }
      const res = await dispatch(createOffer({ data: apiData, router, setError, translate }));
      if (res?.payload) onHandleNext(ComponentsType.addressAdded);
    } else {
      const apiData = { ...data, step: 1, offerId: null, stage: ComponentsType.addressAdded, date: transformDateFormValues(data?.date), isLeadCreated: data?.leadID ? true : false }
      const res = await dispatch(createOffer({ data: apiData, router, setError, translate }));
      if (res?.payload) onHandleNext(ComponentsType.addressAdded);
    }
  };

  const formFieldss = useMemo((): FormField[] => {
    if (!shouldRegenerateFields) {
      return formFields;
    }
    const dynamicFormFields = [];
    dynamicFormFields.push(
      ...AddDateFormField(
        register,
        handleAddDateField,
        dateCount,
        handleRemoveDateField,
        offerDetails
      )
    );
    return dynamicFormFields;
  }, [dateCount]);
  const fields = [...offerFields, ...formFields, ...offerSubmitField];

  useEffect(() => {
    setFormFields(formFieldss);
  }, [formFieldss]);
  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};
