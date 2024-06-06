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
import { generateCreateInvoiceServiceDetailsValidation } from "@/validation/offersSchema";
import { EditComponentsType } from "@/components/offers/edit/EditOffersDetailsData";
import { Total } from "@/types/offers";
import { useEffect, useMemo, useState } from "react";
import {
  readService,
  setServiceDetails,
} from "@/api/slices/service/serviceSlice";
import { Service } from "@/types/service";
import { calculateDiscount, calculateTax } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import { readTaxSettings } from "@/api/slices/settingSlice/settings";
import { ServiceType } from "@/enums/offers";
import { TAX_PERCENTAGE } from "@/services/HttpProvider";
import {
  EditInvoiceDetailsServiceSubmitFormField,
  EditInvoiceServiceDetailsDescriptionFormField,
  EditInvoiceServiceDetailsFormField,
} from "@/components/invoice/edit/fields/edit-invoice-service-details-fields";
import { updateInvoiceDetials } from "@/api/slices/invoice/invoiceSlice";

let prevDisAmount: number | string = "";
export const useServiceInvoiceEditDetail = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
}) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const [total, setTotal] = useState<Total>({
    subTotal: 0,
    grandTotal: 0,
    taxAmount: 0,
  });

  const dispatch = useAppDispatch();
  const { systemSettings } = useAppSelector((state) => state.settings);
  const { loading, error, invoiceDetails } = useAppSelector(
    (state) => state.invoice
  );

  const [serviceType, setServiceType] = useState<ServiceType[]>(
    invoiceDetails?.serviceDetail?.serviceDetail?.map((item: any) =>
      item.serviceType === "New Service"
        ? ServiceType.NEW_SERVICE
        : ServiceType.EXISTING_SERVICE
    ) || [ServiceType.EXISTING_SERVICE]
  );

  const { service, serviceDetails } = useAppSelector((state) => state.service);
  const { tax } = useAppSelector((state) => state.settings);

  useEffect(() => {
    dispatch(readService({ params: { filter: {}, paginate: 0 } }));
    dispatch(readTaxSettings({}));
  }, []);

  const handleBack = () => {
    handleNext(EditComponentsType.addressEdit);
  };

  const schema = generateCreateInvoiceServiceDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
    reset,
    watch,
    getValues,
    trigger,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const isTax = watch("isTax");
  const isDiscount = watch("isDiscount");
  const taxType = watch("taxType");
  const discountType = watch("discountType");
  const discountAmount = watch("discountAmount");
  const taxPercentage = watch("taxAmount");

  const onServiceSelect = (id: string, index: number) => {
    if (!id) return;
    const selectedService: Service[] = service.filter(
      (item) => item.serviceName === id
    );

    if (selectedService?.length > 0) {
      dispatch(setServiceDetails(selectedService[0]));
      setValue(`serviceDetail.${index}.price`, selectedService[0].price);
      setValue(`serviceDetail.${index}.unit`, selectedService[0].unit);
      setValue(
        `serviceDetail.${index}.description`,
        selectedService[0].description
      );
      setValue(`serviceDetail.${index}.discount`, 0);
      setValue(`serviceDetail.${index}.totalPrice`, 0);
      setValue(`serviceDetail.${index}.count`, 0);
    }
  };

  const onServiceSelectType = (index: number) => {
    setValue(
      `serviceDetail.${index}.price`,
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.price
    );
    setValue(
      `serviceDetail.${index}.unit`,
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.unit
    );
    setValue(
      `serviceDetail.${index}.description`,
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.description
    );
    setValue(
      `serviceDetail.${index}.count`,
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.count
    );
    setValue(
      `serviceDetail.${index}.totalPrice`,
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.totalPrice
    );
    setValue(
      `serviceDetail.${index}.serviceTitle`,
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.serviceTitle
    );
    setValue(
      `serviceDetail.${index}.discount`,
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.discount
    );
  };

  const generateTotalPrice = (index: number) => {
    const data = getValues();
    setTimeout(() => {
      let totalPrice =
        Number(data?.serviceDetail[index]?.price) *
          Number(data?.serviceDetail[index]?.count) -
        Number(data?.serviceDetail[index]?.discount || 0);

      if (data?.serviceDetail[index]?.discount > totalPrice) {
        setValue(`serviceDetail.${index}.totalPrice`, 0);
      } else {
        setValue(`serviceDetail.${index}.totalPrice`, totalPrice?.toFixed(2));
      }
      generateGrandTotal();
    }, 10);
  };

  const generateGrandTotal = () => {
    const data = getValues();
    const totalPrices = data?.serviceDetail?.reduce(
      (acc: number, element: any) => acc + parseFloat(element.totalPrice || 0),
      0
    );

    let discount = 0;

    if (discountAmount) {
      discount = calculateDiscount(totalPrices, discountAmount, !+discountType);
      console.log(
        !+discountType && discountAmount > 100,
        "test",
        discountAmount
      );

      if (!+discountType && discountAmount > 100) {
        setValue("discountAmount", 100);
        console.info("Percentage should not be greater than 100%");
      } else if (!!+discountType && discountAmount > totalPrices) {
        setValue("discountAmount", totalPrices);
        console.info("Amount should not be greater than total price");
      } else if (!!+discountType && discountAmount === "") {
        // Handle case where discountAmount is empty
      }
    } else {
      setValue(
        "discountAmount",
        discountAmount || invoiceDetails?.discountAmount
      );
    }
    if (!isDiscount) {
      setValue("discountAmount", 0);
    }

    const discountedTotal = totalPrices - discount;

    let taxAmount = 0;

    if (isTax) {
      if (String(taxType) === "0") {
        taxAmount = calculateTax(discountedTotal, Number(TAX_PERCENTAGE));
      } else if (String(taxType) === "1") {
        taxAmount = calculateTax(discountedTotal, data?.taxAmount || 0);
      }
    }

    const grandTotal =
      String(taxType) === "0"
        ? totalPrices - discount
        : totalPrices + taxAmount - discount;

    if (discountAmount === "") {
      setValue("discountAmount", "");
    }

    prevDisAmount = discountAmount === "" || discount === 0 ? "" : discount;

    setTotal({
      subTotal: totalPrices,
      grandTotal: grandTotal,
      taxAmount: taxAmount,
    });
  };

  useMemo(() => {
    generateGrandTotal();
  }, [discountAmount, discountType, taxType, isTax, isDiscount, taxPercentage]);

  useMemo(() => {
    if (invoiceDetails.id) {
      reset({
        serviceDetail: invoiceDetails?.serviceDetail?.serviceDetail || [
          {
            serviceTitle: "",
            price: "",
            unit: "",
            count: "",
            description: "",
            totalPrice: "",
            serviceType: "Existing Service",
            discount: 0,
          },
        ],
        isTax: invoiceDetails?.isTax,
        isDiscount: invoiceDetails?.isDiscount,
        discountType: staticEnums["DiscountType"][invoiceDetails?.discountType],
        taxType: staticEnums["TaxType"][invoiceDetails?.taxType] || 0,
        discountAmount: invoiceDetails?.discountAmount || "",
        discountDescription: invoiceDetails?.discountDescription,
        taxAmount: invoiceDetails?.taxAmount || 0,
      });
    }
  }, [invoiceDetails.id]);

  const {
    fields: serviceFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "serviceDetail",
  });

  useMemo(() => {
    const currentLength = serviceType?.length;
    const newLength = serviceFields?.length === 0 ? 1 : serviceFields?.length;

    if (newLength > currentLength) {
      setServiceType([
        ...serviceType,
        ...new Array(newLength - currentLength).fill(
          ServiceType.EXISTING_SERVICE
        ),
      ]);
    } else if (newLength < currentLength) {
      setServiceType(serviceType.slice(0, newLength));
    }
    generateGrandTotal();
  }, [serviceFields?.length]);

  const handleServiceChange = (index: number, newServiceType: ServiceType) => {
    const updatedService = serviceType.map((type, i) =>
      i === index ? newServiceType : type
    );
    setServiceType(updatedService);

    const fieldNamePrefix = "serviceDetail";
    if (
      newServiceType === ServiceType.NEW_SERVICE &&
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
        "New Service"
    ) {
      onServiceSelectType(index);
    } else if (
      newServiceType === ServiceType.EXISTING_SERVICE &&
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
        "New Service"
    ) {
      setValue(`serviceDetail.${index}.serviceTitle`, "");
      setValue(`serviceDetail.${index}.price`, ``);
      setValue(`serviceDetail.${index}.count`, ``);
      setValue(`serviceDetail.${index}.unit`, ``);
      setValue(`serviceDetail.${index}.totalPrice`, ``);
      setValue(`serviceDetail.${index}.description`, ``);
      setValue(`serviceDetail.${index}.discount`, ``);
    } else if (
      newServiceType === ServiceType.EXISTING_SERVICE &&
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
        "Existing Service"
    ) {
      onServiceSelectType(index);
    } else if (
      newServiceType === ServiceType.NEW_SERVICE &&
      invoiceDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
        "Existing Service"
    ) {
      setValue(`serviceDetail.${index}.serviceTitle`, "");
      setValue(`serviceDetail.${index}.price`, ``);
      setValue(`serviceDetail.${index}.count`, ``);
      setValue(`serviceDetail.${index}.unit`, ``);
      setValue(`serviceDetail.${index}.totalPrice`, ``);
      setValue(`serviceDetail.${index}.description`, ``);
      setValue(`serviceDetail.${index}.discount`, ``);
    }
  };

  const handleRemoveService = (index: number) => {
    remove(index);
    const data = getValues();

    reset({
      ...data,
    });
  };

  const fields = EditInvoiceServiceDetailsFormField(
    register,
    loading,
    control,
    () => console.log(),
    serviceFields?.length === 0 ? 1 : serviceFields?.length,
    {
      service: service,
      onCustomerSelect: onServiceSelect,
      serviceDetails: serviceDetails,
      generatePrice: generateTotalPrice,
      invoiceDetails,
    },
    append,
    handleRemoveService,
    serviceType,
    handleServiceChange,
    serviceFields,
    setValue
  );

  const fieldsDescription = EditInvoiceServiceDetailsDescriptionFormField(
    register,
    loading,
    control,
    () => console.log(),
    serviceFields?.length,
    {
      service: service,
      total: total,
      generateTotal: generateGrandTotal,
      isTax,
      isDiscount,
      invoiceDetails,
      taxType: taxType,
      discountType,
      tax: tax,
      currency: systemSettings?.currency,
    },
    append,
    remove,
    serviceType,
    handleServiceChange,
    serviceFields,
    setValue
  );

  const submitFields = EditInvoiceDetailsServiceSubmitFormField(
    loading,
    handleBack
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData: typeof data = {
      ...data,
      discountAmount: +data.discountAmount,
      step: 3,
      id: invoiceDetails?.id,
      stage: EditComponentsType.additionalEdit,
      taxAmount: !data?.taxType ? Number(TAX_PERCENTAGE) : data?.taxAmount,
      taxType: Number(data?.taxType),
      discountType: Number(data?.discountType),
    };
    if (!apiData?.isDiscount) {
      delete apiData["discountAmount"];
      delete apiData["discountType"];
      delete apiData["discountDescription"];
    }
    if (!apiData?.isTax) {
      delete apiData["taxAmount"];
      delete apiData["taxType"];
    }

    const response = await dispatch(
      updateInvoiceDetials({ data: apiData, router, setError, translate })
    );
    if (response?.payload) handleNext(EditComponentsType.additionalEdit);
  };

  return {
    fields: [...fields, ...fieldsDescription, ...submitFields],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
    systemSettings,
    invoiceDetails,
  };
};
