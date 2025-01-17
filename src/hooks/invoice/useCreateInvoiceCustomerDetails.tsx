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
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useEffect, useMemo } from "react";
import {
  readCustomer,
  readCustomerDetail,
  setCustomerDetails,
  setCustomers,
} from "@/api/slices/customer/customerSlice";
import { updateQuery } from "@/utils/update-query";
import { setLeads } from "@/api/slices/lead/leadSlice";
import { readContent } from "@/api/slices/content/contentSlice";
import { getKeyByValue } from "@/utils/auth.util";
import { DEFAULT_CUSTOMER, staticEnums } from "../../utils/static";
import { generateInvoiceDetailsValidationSchema } from "@/validation/invoiceSchema";
import { createMainInvoice } from "@/api/slices/invoice/invoiceSlice";
import {
  CreateInvoiceCustomerDetailsFormField,
  CreateInvoiceDateFormField,
  CreateInvoiceDetailsSubmitFormField,
} from "@/components/invoice/createInvoice/fields/create-invoice-customer-details-fields";

export const useCreateInvoiceOfferDetails = (onHandleNext: Function) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch();

  const { loading, error, invoiceDetails } = useAppSelector(
    (state) => state.invoice
  );

  const { customer, customerDetails } = useAppSelector(
    (state) => state.customer
  );

  const { content } = useAppSelector((state) => state.content);
  const { leadDetails, lead } = useAppSelector((state) => state.lead);

  const onCancel = () => {
    router.pathname = "/invoices";
    router.query = { status: "None" };
    updateQuery(router, router.locale as string);
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
    resetField,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  useEffect(() => {
    dispatch(
      readCustomer({ params: { filter: { dropdown: "true" }, paginate: 0 } })
    );
    dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
  }, []);

  const type = watch("type");
  const customerType = watch("customerType");
  const selectedContent = watch("content");

  useEffect(() => {
    if (invoiceDetails?.id) {
      reset({
        type: "Existing Customer",
        customerID: invoiceDetails?.customerID,
        customerType: getKeyByValue(
          staticEnums["CustomerType"],
          invoiceDetails && invoiceDetails?.customerDetail?.customerType
        ),
        fullName: invoiceDetails?.customerDetail?.fullName,
        email: invoiceDetails?.customerDetail?.email,
        phoneNumber: invoiceDetails?.customerDetail?.phoneNumber,
        mobileNumber: invoiceDetails?.customerDetail?.mobileNumber,
        content: invoiceDetails?.content?.id,
        title:
          invoiceDetails?.title ||
          invoiceDetails?.content?.invoiceContent?.title,
        address: invoiceDetails?.customerDetail?.address,
        date: invoiceDetails?.date,
        gender: staticEnums["Gender"][invoiceDetails?.customerDetail?.gender],
        time: invoiceDetails?.time,
      });
    } else {
      setValue("type", "New Customer");
    }
  }, [invoiceDetails?.id]);

  const {
    fields: testFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "date",
  });

  // const handleSearchCustomer = (value: string) => {
  //   dispatch(readCustomer({ params: { filter: { text: value } } }));
  // };

  const onCustomerSelect = async (id: string) => {
    if (!id) return;

    if (id) {
      try {
        const response = await dispatch(
          readCustomerDetail({ params: { filter: id } })
        );

        reset({
          ...response?.payload,
          customerID: response?.payload?.id,
          type: type,
          content: selectedContent,
          gender: staticEnums["Gender"][response?.payload?.gender],
        });
        dispatch(setCustomerDetails(response?.payload));
      } catch (error) {
        console.error("Failed to fetch customer detail:", error);
      }
    }
  };

  const handleContentSelect = () => {};

  useMemo(() => {
    const filteredContent = content?.find(
      (item) => item.id === selectedContent
    );
    if (invoiceDetails?.id) {
      if (filteredContent)
        setValue("title", filteredContent?.invoiceContent?.title);
    } else {
      setValue("content", selectedContent);
      setValue("title", filteredContent?.invoiceContent?.title);
    }
  }, [selectedContent]);

  useMemo(() => {
    if (type === "New Customer") {
      reset({
        ...invoiceDetails,
        customerType: null,
        fullName: null,
        companyName: null,
        email: null,
        phoneNumber: null,
        mobileNumber: null,
        address: null,
        // customerID: null,
        type: "New Customer",
        content: invoiceDetails?.content?.id,
        gender: null,
      });
    } else if (type === "Existing Customer" && invoiceDetails?.id) {
      reset({
        type: "Existing Customer",
        customerID: invoiceDetails?.customerID,
        customerType: getKeyByValue(
          staticEnums["CustomerType"],
          invoiceDetails?.customerDetail?.customerType
        ),
        fullName: invoiceDetails.customerDetail?.fullName,
        email: invoiceDetails?.customerDetail?.email,
        phoneNumber: invoiceDetails?.customerDetail?.phoneNumber,
        mobileNumber: invoiceDetails?.customerDetail?.mobileNumber,
        content: invoiceDetails?.content?.id,
        title:
          invoiceDetails?.title ||
          invoiceDetails?.content?.invoiceContent?.title,
        address: invoiceDetails?.customerDetail?.address,
        date: invoiceDetails?.date,
        gender: staticEnums["Gender"][invoiceDetails?.customerDetail?.gender],
        time: invoiceDetails?.time,
      });
    } else if (type === "Existing Customer" && !invoiceDetails?.id) {
      dispatch(setLeads([]));
      dispatch(setCustomerDetails(DEFAULT_CUSTOMER));
      setValue("content", null);
      setValue("title", null);
    }
  }, [type]);

  const invoiceFields = CreateInvoiceCustomerDetailsFormField(
    register,
    loading,
    control,
    // handleSearchCustomer,
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
      invoiceDetails,
    },
    setValue
  );

  const dateFields = CreateInvoiceDateFormField(
    register,
    append,
    testFields?.length ? testFields?.length : 1,
    remove,
    loading,
    control
  );

  const submit = CreateInvoiceDetailsSubmitFormField(
    register,
    loading,
    control,
    () => console.log(),
    0,
    {}
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (invoiceDetails?.id) {
      const apiData: any = {
        ...data,
        step: 1,
        invoiceId: invoiceDetails?.id === "convert" ? null : invoiceDetails?.id,
        stage: ComponentsType.addressAdded,
      };

      if (data.type === "New Customer") {
        delete apiData.customerID;
      }

      const res = await dispatch(
        createMainInvoice({ data: apiData, router, setError, translate })
      );

      if (res?.payload) {
        if (data?.type === "New Customer") {
          dispatch(
            setCustomers([
              ...customer,
              {
                ...res?.payload?.customerDetail,
                id: res?.payload?.customerID,
              },
            ])
          );
          onHandleNext(ComponentsType.addressAdded);
        }
        onHandleNext(ComponentsType.addressAdded);
      }
    } else {
      const apiData: any = {
        ...data,
        step: 1,
        invoiceId: null,
        stage: ComponentsType.addressAdded,
      };

      if (data.type === "New Customer") {
        delete apiData.customerID;
      }

      const res = await dispatch(
        createMainInvoice({ data: apiData, router, setError, translate })
      );

      if (res?.payload) {
        onHandleNext(ComponentsType.addressAdded);
      }
    }
  };

  return {
    fields: [...invoiceFields, ...dateFields, ...submit],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    invoiceDetails,
  };
};
