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
import { generateAddfferServiceDetailsValidation } from "@/validation/offersSchema";
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
import {
  AddOfferDetailsServiceSubmitFormField,
  AddOfferServiceDetailsDescriptionFormField,
  AddOfferServiceDetailsFormField,
} from "@/components/offers/add/fields/add-offer-service-details-fields";
import { updateOffer } from "@/api/slices/offer/offerSlice";
import { readTaxSettings } from "@/api/slices/settingSlice/settings";
import { ServiceType } from "@/enums/offers";

export const useServiceOfferEditDetail = ({
  handleNext,
}: {
  handleNext: (currentComponent: EditComponentsType) => void;
}) => {
  const { t: translate } = useTranslation();
  const { systemSettings } = useAppSelector((state) => state.settings);

  const router = useRouter();
  const [total, setTotal] = useState<Total>({
    subTotal: 0,
    grandTotal: 0,
    taxAmount: 0,
  });


  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector(
    (state) => state.offer
  );
  const [serviceType, setServiceType] = useState<ServiceType[]>(
    offerDetails?.serviceDetail?.serviceDetail?.map((item) => item.serviceType === "New Service" ? ServiceType.NEW_SERVICE : ServiceType.EXISTING_SERVICE) || [ServiceType.EXISTING_SERVICE],
  );
  const { service, serviceDetails } = useAppSelector((state) => state.service);
  const { tax } = useAppSelector((state) => state.settings);

  useEffect(() => {
    dispatch(readService({ params: { filter: { paginate: 0 } } }));
    dispatch(readTaxSettings({}));
  }, []);

  const handleBack = () => {
    handleNext(EditComponentsType.addressEdit);
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
  const taxPercentage = watch("taxPercentage");

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
    }
  };

  const onServiceSelectType = (index: number) => {

    setValue(`serviceDetail.${index}.price`, offerDetails?.serviceDetail?.serviceDetail[index]?.price);
    setValue(`serviceDetail.${index}.unit`, offerDetails?.serviceDetail?.serviceDetail[index]?.unit);
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
    setValue(`serviceDetail.${index}.serviceTitle`, offerDetails?.serviceDetail?.serviceDetail[index]?.serviceTitle);


  };
  const generateTotalPrice = (index: number) => {
    const data = getValues();
    setTimeout(() => {
      let totalPrice =
        Number(data?.serviceDetail[index]?.price) *
        Number(data?.serviceDetail[index]?.count);
      setValue(`serviceDetail.${index}.totalPrice`, totalPrice);
      generateGrandTotal();
    }, 10);
  };

  const generateGrandTotal = () => {
    const data = getValues();
    const totalPrices =
      data?.serviceDetail?.reduce(
        (acc: number, element: any) => acc + parseInt(element.totalPrice, 10),
        0
      ) || 0;

    let taxAmount =
      isTax && taxType == "0"
        ? calculateTax(totalPrices, 8.1)
        : isTax && taxType == "1"
          ? calculateTax(totalPrices, data?.taxPercentage || 0)
          : 0;
    let discount = 0;

    if (isDiscount && discountAmount) {
      discount = calculateDiscount(
        totalPrices,
        discountAmount,
        !+discountType
      );
      if (!+discountType && discountAmount > 100) {
        setValue("discountAmount", 100);
        console.warn("Percentage should not be greater than 100%");
      } else if (!!+discountType && discountAmount > totalPrices) {
        setValue("discountAmount", totalPrices);
        console.warn("Amount should not be greater than total price");
      }
    } else {
      setValue("discountAmount", 0);
    }

    const grandTotal = totalPrices + taxAmount - discount;

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
      setTotal({
        taxAmount: Number(
          (offerDetails.total - offerDetails.subTotal).toFixed(2)
        ),
        subTotal: offerDetails.subTotal,
        grandTotal: offerDetails.total,
      });

      reset({
        serviceDetail: offerDetails?.serviceDetail?.serviceDetail,
        isTax: offerDetails?.isTax,
        isDiscount: offerDetails?.isDiscount,
        discountType: staticEnums["DiscountType"][offerDetails?.discountType],
        taxType: staticEnums["TaxType"][offerDetails?.taxType],
        discountAmount: offerDetails?.discountAmount || 0,
        discountDescription: offerDetails?.discountDescription,
        taxAmount: offerDetails?.taxAmount || 0,
      });
    }
    generateGrandTotal();
  }, [offerDetails.id]);
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
  }, [serviceFields?.length]);

  const handleServiceChange = (index: number, newServiceType: ServiceType) => {
    const updatedService = serviceType.map((type, i) =>
      i === index ? newServiceType : type
    );
    setServiceType(updatedService);

    const fieldNamePrefix = 'serviceDetail';
    if (newServiceType === ServiceType.NEW_SERVICE && offerDetails?.serviceDetail?.serviceDetail[index]?.serviceType == "New Service") {
      onServiceSelectType(index)
    } else if (newServiceType === ServiceType.EXISTING_SERVICE && offerDetails?.serviceDetail?.serviceDetail[index]?.serviceType == "New Service") {
      setValue(`serviceDetail.${index}.serviceTitle`, '')
      setValue(`serviceDetail.${index}.price`, ``)
      setValue(`serviceDetail.${index}.count`, ``)
      setValue(`serviceDetail.${index}.unit`, ``)
      setValue(`serviceDetail.${index}.totalPrice`, ``)
      setValue(`serviceDetail.${index}.description`, ``)
    } else if (newServiceType === ServiceType.EXISTING_SERVICE && offerDetails?.serviceDetail?.serviceDetail[index]?.serviceType == "Existing Service") {
      onServiceSelectType(index)

    } else if (newServiceType === ServiceType.NEW_SERVICE && offerDetails?.serviceDetail?.serviceDetail[index]?.serviceType == "Existing Service") {

      setValue(`serviceDetail.${index}.serviceTitle`, '')
      setValue(`serviceDetail.${index}.price`, ``)
      setValue(`serviceDetail.${index}.count`, ``)
      setValue(`serviceDetail.${index}.unit`, ``)
      setValue(`serviceDetail.${index}.totalPrice`, ``)
      setValue(`serviceDetail.${index}.description`, ``)
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
    },
    append,
    remove,
    serviceType,
    handleServiceChange,
    serviceFields,
    setValue
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
      taxType: taxType,
      discountType,
      tax: tax,
      currency: systemSettings?.currency

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
      step: 3,
      id: offerDetails?.id,
      stage: EditComponentsType.additionalEdit,
      taxAmount: !data?.taxType ? 8.1 : data?.taxAmount,
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
    systemSettings
  };
};
