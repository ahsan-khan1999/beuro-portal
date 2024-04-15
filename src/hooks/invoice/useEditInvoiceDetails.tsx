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
  AddOfferDetailsSubmitFormField,
} from "@/components/offers/add/fields/add-offer-details-fields";
import { useEffect, useMemo } from "react";
import {
  readCustomer,
  setCustomerDetails,
  setCustomers,
} from "@/api/slices/customer/customerSlice";
import { readContent } from "@/api/slices/content/contentSlice";
import { EditComponentsType } from "@/components/offers/edit/EditOffersDetailsData";
import { staticEnums } from "@/utils/static";
import { getKeyByValue } from "@/utils/auth.util";
import { generateInvoiceDetailsValidationSchema } from "@/validation/invoiceSchema";
import {
  createInvoiceDetial,
  readInvoiceDetails,
  setInvoiceDetails,
} from "@/api/slices/invoice/invoiceSlice";
import { InvoiceDetailTableRowTypes } from "@/types/invoice";
import { AddInvoiceDetailsFormField } from "@/components/invoice/edit/fields/add-offer-details-fields";

export const useEditInvoiceDetails = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { invoice } = router.query;
  const { t: translate } = useTranslation();

  const { loading, error, invoiceDetails } = useAppSelector(
    (state) => state.invoice
  );

  const { customer, customerDetails } = useAppSelector(
    (state) => state.customer
  );

  const { content } = useAppSelector((state) => state.content);
  const { leadDetails, lead } = useAppSelector((state) => state.lead);

  const onCancel = () => {
    router.back();
    // updateQuery(router, router.locale as string);
  };

  const schema = generateInvoiceDetailsValidationSchema(translate);
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
    if (invoice) {
      dispatch(readInvoiceDetails({ params: { filter: invoice } })).then(
        (res: { payload: InvoiceDetailTableRowTypes }) => {
          dispatch(
            setInvoiceDetails({ ...res.payload, type: "Existing Customer" })
          );
          reset({
            type: "Existing Customer",
            // leadID: res?.payload?.leadID?.id,
            customerType: getKeyByValue(
              staticEnums["CustomerType"],
              res?.payload?.customerDetail?.customerType
            ),
            fullName: res?.payload?.customerDetail?.fullName,
            email: res?.payload?.customerDetail?.email,
            phoneNumber: res?.payload?.customerDetail?.phoneNumber,
            mobileNumber: res?.payload?.customerDetail?.mobileNumber,
            content: res?.payload?.content?.id,
            title: res?.payload?.content?.invoiceContent?.title,
            address: res?.payload?.customerDetail?.address,
            date: res?.payload?.date,
            customerID: res?.payload?.customerID,
            gender: staticEnums["Gender"][res?.payload?.customerDetail?.gender],
            time: res?.payload?.time,
            companyName: res?.payload?.customerDetail?.companyName,
          });
        }
      );
    }
  }, [invoice]);

  const type = watch("type");
  const customerType = watch("customerType");
  const customerID = watch("customerID");
  const selectedContent = watch("content");

  useEffect(() => {
    dispatch(readCustomer({ params: { filter: {}, paginate: 0 } }));
    dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
  }, []);

  // useMemo(() => {
  //   if (type && customerID) {
  //     dispatch(
  //       readLead({
  //         params: { filter: { customerID: customerID, paginate: 0 } },
  //       })
  //     );
  //   }
  // }, [customerID]);

  useMemo(() => {
    if (type === "New Customer") {
      reset({
        ...invoiceDetails,
        leadID: null,
        customerType: null,
        fullName: null,
        email: null,
        phoneNumber: null,
        mobileNumber: null,
        address: null,
        customerID: "",
        type: "New Customer",
        content: invoiceDetails?.content?.id,
        gender: null,
        companyName: null,
      });
    } else {
      const type = getKeyByValue(
        staticEnums["CustomerType"],
        invoiceDetails?.customerDetail?.customerType
      );

      reset({
        type: "Existing Customer",
        // leadID: invoiceDetails?.leadID?.id,
        customerType: type,
        fullName: invoiceDetails?.customerDetail?.fullName,
        companyName: invoiceDetails?.customerDetail?.companyName,
        email: invoiceDetails?.customerDetail?.email,
        phoneNumber: invoiceDetails?.customerDetail?.phoneNumber,
        mobileNumber: invoiceDetails?.customerDetail?.mobileNumber,
        content: invoiceDetails?.content?.id,
        title: invoiceDetails?.content?.invoiceContent?.title,
        address: invoiceDetails?.customerDetail?.address,
        date: invoiceDetails?.date,
        customerID: invoiceDetails?.customerID,
        gender: staticEnums["Gender"][invoiceDetails?.customerDetail?.gender],
        time: invoiceDetails?.time,
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
    const selectedCustomers = customer.find((item) => item.id === id);
    if (selectedCustomers) {
      dispatch(setCustomerDetails(selectedCustomers));

      reset({
        ...selectedCustomers,
        type: type,
        content: selectedContent,
        customerID: selectedCustomers?.id,
        // leadID: "",
        gender: staticEnums["Gender"][selectedCustomers?.gender],
      });
    }
  };

  useMemo(() => {
    const filteredContent = content?.find(
      (item) => item.id === selectedContent
    );

    if (filteredContent)
      setValue("title", filteredContent?.invoiceContent?.title);
  }, [selectedContent]);

  const handleContentSelect = () => {};

  const offerFields = AddInvoiceDetailsFormField(
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
      invoiceDetails,
    },
    setValue
  );

  const dateFields = AddDateFormField(
    register,
    append,
    testFields?.length ? testFields?.length : 1,
    remove,
    loading,
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
      invoiceId: invoiceDetails?.id,
      stage: EditComponentsType.addressEdit,
      // isLeadCreated: data?.leadID ? true : false,
    };
    // if (!apiData?.isLeadCreated) delete apiData["leadID"];

    const res = await dispatch(
      createInvoiceDetial({ data: apiData, router, setError, translate })
    );
    if (res?.payload) {
      if (data?.type === "New Customer") {
        // dispatch(setLeads([...lead, res?.payload?.leadID]));
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
    invoiceDetails,
  };
};
