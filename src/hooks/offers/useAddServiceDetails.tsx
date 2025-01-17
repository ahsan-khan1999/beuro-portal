import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import {
  AddOfferDetailsServiceSubmitFormField,
  AddOfferServiceDetailsDescriptionFormField,
  AddOfferServiceDetailsFormField,
} from "@/components/offers/add/fields/add-offer-service-details-fields";
import { generateAddfferServiceDetailsValidation } from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useEffect, useMemo, useState } from "react";
import {
  readService,
  setServiceDetails,
} from "@/api/slices/service/serviceSlice";
import { updateOffer } from "@/api/slices/offer/offerSlice";
import { Service } from "@/types/service";
import { Total } from "@/types/offers";
import { calculateDiscount, calculateTax } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import { readTaxSettings } from "@/api/slices/settingSlice/settings";
import { ServiceType } from "@/enums/offers";
import { TAX_PERCENTAGE } from "@/services/HttpProvider";
import {
  readReportDetails,
  setReportDetails,
} from "@/api/slices/appointment/appointmentSlice";
import { CustomerPromiseActionType } from "@/types/customer";

let prevDisAmount: number | string = "";
export const useAddServiceDetails = (
  onHandleNext: (currentComponent: ComponentsType) => void
) => {
  const router = useRouter();
  const [total, setTotal] = useState<Total>({
    subTotal: 0,
    grandTotal: 0,
    taxAmount: 0,
  });

  const appointmentId = router.query.appointmentId;
  const dispatch = useAppDispatch();
  const { systemSettings, tax } = useAppSelector((state) => state.settings);
  const { reportDetails } = useAppSelector((state) => state.appointment);
  const { loading, error, offerDetails } = useAppSelector(
    (state) => state.offer
  );

  const [serviceType, setServiceType] = useState<ServiceType[]>(
    offerDetails?.serviceDetail?.serviceDetail?.map((item) =>
      item.serviceType === "New Service"
        ? ServiceType.NEW_SERVICE
        : ServiceType.EXISTING_SERVICE
    ) || [ServiceType.EXISTING_SERVICE]
  );

  const { service, serviceDetails } = useAppSelector((state) => state.service);

  useEffect(() => {
    dispatch(readService({ params: { filter: {}, paginate: 0 } }));
    dispatch(readTaxSettings({}));
  }, []);

  useEffect(() => {
    if (appointmentId) {
      dispatch(readReportDetails({ params: { filter: appointmentId } })).then(
        (res: CustomerPromiseActionType) => {
          dispatch(setReportDetails(res?.payload));
        }
      );
    }
  }, [appointmentId]);

  const handleBack = () => {
    onHandleNext(ComponentsType.addressAdded);
  };

  const handleNext = () => {
    onHandleNext(ComponentsType.additionalAdded);
  };

  const schema = generateAddfferServiceDetailsValidation(translate);
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
    const selectedService: Service[] = service?.filter(
      (item) => item?.serviceName === id
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

    if (isDiscount && discountAmount) {
      discount = calculateDiscount(totalPrices, discountAmount, !+discountType);
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
      setValue("discountAmount", prevDisAmount);
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
    if (offerDetails.id) {
      reset({
        serviceDetail: offerDetails?.serviceDetail?.serviceDetail || [
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
        isTax: offerDetails?.isTax,
        isDiscount: offerDetails?.isDiscount,
        discountType: staticEnums["DiscountType"][offerDetails?.discountType],
        taxType: staticEnums["TaxType"][offerDetails?.taxType] || 0,
        discountAmount: offerDetails?.discountAmount || "",
        discountDescription: offerDetails?.discountDescription,
        taxAmount: offerDetails?.taxAmount || 0,
      });
    }
  }, [offerDetails.id]);

  useMemo(() => {
    if (appointmentId && reportDetails?.id) {
      reset({
        serviceDetail: reportDetails?.serviceDetail?.serviceDetail || [
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
        isTax: reportDetails?.isTax,
        isDiscount: reportDetails?.isDiscount,
        discountType: staticEnums["DiscountType"][reportDetails?.discountType],
        taxType: staticEnums["TaxType"][reportDetails?.taxType] || 0,
        discountAmount: reportDetails?.discountAmount || "",
        discountDescription: reportDetails?.discountDescription,
        taxAmount: reportDetails?.taxAmount || 0,
      });
    }
  }, [reportDetails?.id]);

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

  const handleRemoveService = (index: number) => {
    remove(index);
    const data = getValues();
    reset({
      ...data,
    });

    setServiceType((prev) => {
      var newlist = [...prev];
      newlist.splice(index, 1);

      return newlist;
    });
  };

  const onServiceSelectType = (index: number) => {
    setValue(
      `serviceDetail.${index}.price`,
      offerDetails?.serviceDetail?.serviceDetail[index]?.price
    );
    setValue(
      `serviceDetail.${index}.unit`,
      offerDetails?.serviceDetail?.serviceDetail[index]?.unit
    );
    setValue(
      `serviceDetail.${index}.description`,
      offerDetails?.serviceDetail?.serviceDetail[index]?.description
    );
    setValue(
      `serviceDetail.${index}.count`,
      offerDetails?.serviceDetail?.serviceDetail[index]?.count
    );
    setValue(
      `serviceDetail.${index}.totalPrice`,
      offerDetails?.serviceDetail?.serviceDetail[index]?.totalPrice
    );
    setValue(
      `serviceDetail.${index}.serviceTitle`,
      offerDetails?.serviceDetail?.serviceDetail[index]?.serviceTitle
    );
    setValue(
      `serviceDetail.${index}.discount`,
      offerDetails?.serviceDetail?.serviceDetail[index]?.discount
    );
  };

  const handleServiceChange = (index: number, newServiceType: ServiceType) => {
    const updatedService = serviceType.map((type, i) =>
      i === index ? newServiceType : type
    );

    setServiceType(updatedService);
    if (
      newServiceType === ServiceType.NEW_SERVICE &&
      offerDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
        "New Service"
    ) {
      onServiceSelectType(index);
    } else if (
      newServiceType === ServiceType.EXISTING_SERVICE &&
      offerDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
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
      offerDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
        "Existing Service"
    ) {
      onServiceSelectType(index);
    } else if (
      newServiceType === ServiceType.NEW_SERVICE &&
      offerDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
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

  const fields = AddOfferServiceDetailsFormField(
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
      offerDetails,
      reportDetails,
    },
    append,
    handleRemoveService,
    serviceType,
    handleServiceChange,
    serviceFields,
    setValue,
    watch
  );

  const fieldsDescription = AddOfferServiceDetailsDescriptionFormField(
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
      offerDetails: offerDetails,
      reportDetails,
      appointmentId,
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

  const submitFields = AddOfferDetailsServiceSubmitFormField(
    loading,
    handleBack
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData: typeof data = {
      ...data,
      discountAmount: +data.discountAmount,
      step: 3,
      id: offerDetails?.id,
      stage: ComponentsType.additionalAdded,
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
      updateOffer({ data: apiData, router, setError, translate })
    );
    if (response?.payload) {
      handleNext();

      const { pathname, query } = router;
      if (query.appointmentId) {
        delete query.appointmentId;
        router.replace({ pathname, query }, undefined, { shallow: true });
      }
    }
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
    offerDetails,
  };
};
