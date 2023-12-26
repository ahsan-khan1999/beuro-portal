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
import { useEffect, useMemo } from "react";
import {
  readCustomer,
  setCustomerDetails,
  setCustomers,
} from "@/api/slices/customer/customerSlice";
import { updateQuery } from "@/utils/update-query";
import { readLead, setLeads } from "@/api/slices/lead/leadSlice";
import { readContent } from "@/api/slices/content/contentSlice";
import { createOffer } from "@/api/slices/offer/offerSlice";
import { getKeyByValue } from "@/utils/auth.util";
import { staticEnums } from '../../utils/static';

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
  const leadID = watch("leadID");

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
      console.log(offerDetails);
      
      reset({
        type: "Existing Customer",
        customerID: offerDetails?.leadID?.customerID,
        leadID: offerDetails?.leadID?.id,
        customerType: getKeyByValue(staticEnums["CustomerType"], offerDetails?.leadID?.customerDetail?.customerType),
        fullName: offerDetails?.leadID?.customerDetail?.fullName,
        email: offerDetails?.leadID?.customerDetail?.email,
        phoneNumber: offerDetails?.leadID?.customerDetail?.phoneNumber,
        mobileNumber: offerDetails?.leadID?.customerDetail?.mobileNumber,
        content: offerDetails?.content?.id,
        title: offerDetails?.title,
        address: offerDetails?.leadID?.customerDetail?.address,
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
      customerID: selectedCustomers[0]?.id,
      type: type,
      content: selectedContent,
      leadID: ""
    });
  };
  const handleContentSelect = () => {

  };
  useMemo(() => {
    const filteredContent = content?.find(
      (item) => item.id === selectedContent
    );
    if (filteredContent)
      setValue("title", filteredContent?.offerContent?.title);

  }, [selectedContent])
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
      offerDetails,
      leadID
    },
    setValue
  );
  useMemo(() => {
    if (type === "New Customer") {
      reset({
        ...offerDetails,
        leadID: null,
        customerType: null,
        fullName: null,
        email: null,
        phoneNumber: null,
        mobileNumber: null,
        address: null,
        customerID: "",
        type: "New Customer",
        content: offerDetails?.content?.id,

      })
    }

  }, [type]);

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
      if (res?.payload) {
        if (data?.type === "New Customer") {
          dispatch(setLeads([...lead, res?.payload?.leadID]))
          dispatch(setCustomers([...customer, { ...res?.payload?.leadID?.customerDetail, id: res?.payload?.leadID?.customerID }]))
          onHandleNext(ComponentsType.addressAdded);
        }
        onHandleNext(ComponentsType.addressAdded);

      }
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
    translate
  };
};
