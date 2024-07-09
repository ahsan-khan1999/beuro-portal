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
import { useEffect, useMemo, useState } from "react";
import {
  readCustomer,
  setCustomerDetails,
  setCustomers,
} from "@/api/slices/customer/customerSlice";
import { updateQuery } from "@/utils/update-query";
import { readLead, setLeads } from "@/api/slices/lead/leadSlice";
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
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [filteredCustomers, setFilteredCustomers] = useState([]);

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
    // dispatch(readCustomer({ params: { filter: {}, paginate: 0 } }));
    dispatch(readContent({ params: { filter: {}, paginate: 0 } }));
  }, []);

  const type = watch("type");
  const customerType = watch("customerType");
  const customerID = watch("customerID");
  const selectedContent = watch("content");

  useEffect(() => {
    if (type && customerID)
      dispatch(
        readLead({
          params: {
            filter: { customerID: customerID, status: [0, 1, 3] },
            paginate: 0,
          },
        })
      );
  }, [customerID]);

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

  const onCustomerSelect = (id: string) => {
    if (!id) return;
    const selectedCustomers = customer.find((item) => item.id === id);

    if (selectedCustomers) {
      dispatch(setCustomerDetails(selectedCustomers));

      reset({
        ...selectedCustomers,
        customerID: selectedCustomers?.id,
        type: type,
        content: selectedContent,
        gender: staticEnums["Gender"][selectedCustomers?.gender],
      });
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
        email: null,
        phoneNumber: null,
        mobileNumber: null,
        address: null,
        type: "New Customer",
        content: invoiceDetails?.content?.id,
        gender: null,
      });
    } else if (type === "Existing Customer" && invoiceDetails?.id) {
      reset({
        type: "Existing Customer",
        customerID: invoiceDetails?.customerID,
        // leadID: invoiceDetails?.id,
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
      // setValue("leadID", null);
    }
  }, [type]);

  const fetchCustomers = async (searchItem: string) => {
    const response = await dispatch(
      readCustomer({
        params: {
          filter: {
            text: searchItem,
          },
        },
      })
    );

    if (response.payload) {
      setFilteredCustomers(response.payload?.Customer);
    }
  };
  const invoiceFields = CreateInvoiceCustomerDetailsFormField(
    register,
    loading,
    control,
    {
      customerType,
      type,
      customer: filteredCustomers,
      onCustomerSelect,
      customerDetails,
      onCancel,
      leadDetails,
      lead,
      content,
      handleContentSelect,
      invoiceDetails,
      onEnterPress: fetchCustomers,
      // leadID,
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
        // isLeadCreated: data?.leadID ? true : false,
      };

      // if (!apiData?.isLeadCreated) delete apiData["leadID"];
      const res = await dispatch(
        createMainInvoice({ data: apiData, router, setError, translate })
      );

      if (res?.payload) {
        if (data?.type === "New Customer") {
          dispatch(setLeads([res?.payload]));
          dispatch(
            setCustomers([
              ...customer,
              {
                ...res?.payload?.customerDetail,
                // id: res?.payload?.customerID,
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
      // if (!apiData?.isLeadCreated) delete apiData["leadID"];

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
