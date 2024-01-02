import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  AddDateFormField,
  AddOfferDetailsFormField,
  AddOfferDetailsSubmitFormField,
} from "@/components/offers/add/fields/add-offer-details-fields";
import { generateOfferDetailsValidationSchema } from "@/validation/offersSchema";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  readCustomer,
  setCustomerDetails,
  setCustomers,
} from "@/api/slices/customer/customerSlice";
import { updateQuery } from "@/utils/update-query";
import { readLead, setLeads } from "@/api/slices/lead/leadSlice";
import { readContent } from "@/api/slices/content/contentSlice";
import {
  createOffer,
  readOfferDetails,
  setOfferDetails,
} from "@/api/slices/offer/offerSlice";
import {
  CustomerPromiseActionType,
  OfferPromiseActionType,
} from "@/types/customer";
import { EditComponentsType } from "@/components/offers/edit/EditOffersDetailsData";
import { getKeyByValue } from "@/utils/auth.util";
import { staticEnums } from "@/utils/static";

export const useEditOfferDetails = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
}) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { offer } = router.query;

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
    if (offer) {
      dispatch(readOfferDetails({ params: { filter: offer } })).then(
        (res: OfferPromiseActionType) => {
          dispatch(
            setOfferDetails({ ...res.payload, type: "Existing Customer" })
          );
          reset({
            type: "Existing Customer",
            leadID: res?.payload?.leadID?.id,
            customerType: getKeyByValue(
              staticEnums["CustomerType"],
              res?.payload?.leadID?.customerDetail?.customerType
            ),
            fullName: res?.payload?.leadID?.customerDetail?.fullName,
            email: res?.payload?.leadID?.customerDetail?.email,
            phoneNumber: res?.payload?.leadID?.customerDetail?.phoneNumber,
            mobileNumber: res?.payload?.leadID?.customerDetail?.mobileNumber,
            content: res?.payload?.content?.id,
            title: res?.payload?.title,
            address: res?.payload?.leadID?.customerDetail?.address,
            date: res?.payload?.date,
            customerID: res?.payload?.leadID?.customerID,
          });
        }
      );
    }
  }, [offer]);
  const type = watch("type");

  const customerType = watch("customerType");
  const customerID = watch("customerID");
  const selectedContent = watch("content");
  useEffect(() => {
    dispatch(readCustomer({ params: { filter: {}, paginate: 0 } }));
    dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
  }, []);

  useMemo(() => {
    if (type && customerID) {
      dispatch(
        readLead({
          params: { filter: { customerID: customerID, paginate: 0 } },
        })
      );
    }
  }, [customerID]);

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
      });
    }
  }, [type]);

  const {
    fields: testFields,
    append,
    remove,
  } = useFieldArray({
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
      customerID: selectedCustomers[0]?.id,
      leadID: "",
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
      selectedContent,
      offerDetails,
    },
    setValue
  );

  const dateFields = AddDateFormField(
    register,
    append,
    testFields?.length ? testFields?.length : 1,
    remove,
    offerDetails,
    control
  );

  const submit = AddOfferDetailsSubmitFormField(
    register,
    loading,
    control,
    () => console.log(),
    0,
    {}
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData: any = {
      ...data,
      step: 1,
      offerId: offerDetails?.id,
      stage: EditComponentsType.addressEdit,
      isLeadCreated: data?.leadID ? true : false,
    };
    if (!apiData?.isLeadCreated) delete apiData["leadID"];

    const res = await dispatch(
      createOffer({ data: apiData, router, setError, translate })
    );
    if (res?.payload) {
      if (data?.type === "New Customer") {
        dispatch(setLeads([...lead, res?.payload?.leadID]));
        dispatch(
          setCustomers([
            ...customer,
            {
              ...res?.payload?.leadID?.customerDetail,
              id: res?.payload?.leadID?.customerID,
            },
          ])
        );
      }
      handleNext(EditComponentsType.addressEdit);
    }
  };

  return {
    fields: [...offerFields, ...dateFields, ...submit],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
