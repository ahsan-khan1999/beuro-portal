import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useRouter } from "next/router";
import { generateAddfferServiceDetailsValidation } from "@/validation/offersSchema";
import { useEffect, useMemo, useState } from "react";
import {
  readService,
  setServiceDetails,
} from "@/api/slices/service/serviceSlice";
import { Service } from "@/types/service";
import { Total } from "@/types/offers";
import { calculateDiscount, calculateTax } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import {
  readSystemSettings,
  readTaxSettings,
} from "@/api/slices/settingSlice/settings";
import { ServiceType } from "@/enums/offers";
import { TAX_PERCENTAGE } from "@/services/HttpProvider";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import {
  readReportdetails,
  updateReport,
} from "@/api/slices/appointment/appointmentSlice";
import {
  ReportDetailsServiceSubmitFormField,
  ReportServiceDetailsDescriptionFormField,
  ReportServiceDetailsFormField,
} from "@/components/agent/appointments/createReport/fields/service-detail-form-fields";
import { ReportPromiseActionType } from "@/types/customer";

let prevDisAmount: number | string = "";

export interface ReportServiceHookProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
  onBackHandler: (currentComponent: AppointmentReportsFormStages) => void;
}

export const useCreateReportServicesDetails = ({
  onNextHandler,
  onBackHandler,
}: ReportServiceHookProps) => {
  const router = useRouter();
  const [total, setTotal] = useState<Total>({
    subTotal: 0,
    grandTotal: 0,
    taxAmount: 0,
  });

  const dispatch = useAppDispatch();
  const { systemSettings } = useAppSelector((state) => state.settings);
  const { loading, error, reportDetails, appointmentDetails } = useAppSelector(
    (state) => state.appointment
  );

  const { report } = router.query;

  const [serviceType, setServiceType] = useState<ServiceType[]>(
    reportDetails?.serviceDetail?.serviceDetail?.map((item) =>
      item.serviceType === "New Service"
        ? ServiceType.NEW_SERVICE
        : ServiceType.EXISTING_SERVICE
    ) || [ServiceType.EXISTING_SERVICE]
  );

  const { tax } = useAppSelector((state) => state.settings);
  const { service, serviceDetails } = useAppSelector((state) => state.service);

  useEffect(() => {
    dispatch(readService({ params: { filter: {}, paginate: 0 } }));
    dispatch(readTaxSettings({}));
  }, []);

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
    if (report) {
      dispatch(readReportdetails({ params: { filter: report } })).then(
        (response: ReportPromiseActionType) => {
          if (response?.payload) {
            reset({
              serviceDetail: response?.payload?.serviceDetail
                ?.serviceDetail || [
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
              isTax: response?.payload?.isTax,
              isDiscount: response?.payload?.isDiscount,
              discountType:
                staticEnums["DiscountType"][response?.payload?.discountType],
              taxType: staticEnums["TaxType"][response?.payload?.taxType] || 0,
              discountAmount: response?.payload?.discountAmount || "",
              discountDescription: response?.payload?.discountDescription,
              taxAmount: response?.payload?.taxAmount || 0,
            });
          }
        }
      );
    } else {
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
  }, [reportDetails?.id, report]);

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
      reportDetails?.serviceDetail?.serviceDetail[index]?.price
    );
    setValue(
      `serviceDetail.${index}.unit`,
      reportDetails?.serviceDetail?.serviceDetail[index]?.unit
    );
    setValue(
      `serviceDetail.${index}.description`,
      reportDetails?.serviceDetail?.serviceDetail[index]?.description
    );
    setValue(
      `serviceDetail.${index}.count`,
      reportDetails?.serviceDetail?.serviceDetail[index]?.count
    );
    setValue(
      `serviceDetail.${index}.totalPrice`,
      reportDetails?.serviceDetail?.serviceDetail[index]?.totalPrice
    );
    setValue(
      `serviceDetail.${index}.serviceTitle`,
      reportDetails?.serviceDetail?.serviceDetail[index]?.serviceTitle
    );
    setValue(
      `serviceDetail.${index}.discount`,
      reportDetails?.serviceDetail?.serviceDetail[index]?.discount
    );
  };

  const handleServiceChange = (index: number, newServiceType: ServiceType) => {
    const updatedService = serviceType.map((type, i) =>
      i === index ? newServiceType : type
    );

    setServiceType(updatedService);
    if (
      newServiceType === ServiceType.NEW_SERVICE &&
      reportDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
        "New Service"
    ) {
      onServiceSelectType(index);
    } else if (
      newServiceType === ServiceType.EXISTING_SERVICE &&
      reportDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
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
      reportDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
        "Existing Service"
    ) {
      onServiceSelectType(index);
    } else if (
      newServiceType === ServiceType.NEW_SERVICE &&
      reportDetails?.serviceDetail?.serviceDetail[index]?.serviceType ==
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

  const fields = ReportServiceDetailsFormField(
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

  const fieldsDescription = ReportServiceDetailsDescriptionFormField(
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
      reportDetails: reportDetails,
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

  const submitFields = ReportDetailsServiceSubmitFormField(
    loading,
    onBackHandler
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (report) {
        const apiData: typeof data = {
          ...data,
          discountAmount: +data.discountAmount,
          step: 3,
          id: reportDetails?.id,
          appointmentID: reportDetails?.appointmentID?.id,
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
          updateReport({ data: apiData, router, setError, translate })
        );
        if (response?.payload)
          onNextHandler(AppointmentReportsFormStages.ADDITIONAL_INFO);
      } else {
        const apiData: typeof data = {
          ...data,
          discountAmount: +data.discountAmount,
          step: 3,
          id: reportDetails?.id,
          appointmentID: appointmentDetails?.id,
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
          updateReport({ data: apiData, router, setError, translate })
        );
        if (response?.payload)
          onNextHandler(AppointmentReportsFormStages.ADDITIONAL_INFO);
      }
    } catch (error) {
      console.error("Submission error:", error);
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
    reportDetails,
  };
};
