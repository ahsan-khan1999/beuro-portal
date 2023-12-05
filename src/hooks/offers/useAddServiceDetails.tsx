import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddOfferDetailsServiceSubmitFormField, AddOfferServiceDetailsDescriptionFormField, AddOfferServiceDetailsFormField } from "@/components/offers/add/fields/add-offer-service-details-fields";
import { generateAddfferServiceDetailsValidation, generateOfferDiscountValidation, mergeOfferSchemas } from "@/validation/offersSchema";
import { ComponentsType } from "@/components/offers/add/AddOffersDetailsData";
import { useEffect, useMemo, useState } from "react";
import { readService, setServiceDetails } from "@/api/slices/service/serviceSlice";
import { updateOffer } from "@/api/slices/offer/offerSlice";
import { FormField } from "@/types";
import { AddOffAddressDetailsFormField } from "@/components/offers/add/fields/add-address-details-fields";
import { Service } from "@/types/service";
import { Total } from "@/types/offers";
import { calculateTax } from "@/utils/utility";
import { staticEnums } from "@/utils/static";

export const useAddServiceDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const [total, setTotal] = useState<Total>({
    subTotal: 0,
    grandTotal: 0,
    taxAmount: 0
  })

  const dispatch = useAppDispatch();
  const { loading, error, offerDetails } = useAppSelector((state) => state.offer);

  const { service, serviceDetails } = useAppSelector((state) => state.service);

  useEffect(() => {
    dispatch(readService({ params: { filter: { paginate: 0 } } }))
  }, [])

  const handleBack = () => {
    onHandleNext(ComponentsType.addressAdded)
  }
  const handleNext = () => {
    onHandleNext(ComponentsType.additionalAdded)
  }
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

  const isTax = watch("isTax")
  const isDiscount = watch("isDiscount")
  const taxType = watch("taxType")
  const discountType = watch("discountType")
  const discountAmount = watch("discountAmount")




  const onServiceSelect = (id: string, index: number) => {

    if (!id) return;
    const selectedService: Service[] = service.filter((item) => item.id === id)
    if (selectedService?.length > 0) {
      dispatch(setServiceDetails(selectedService[0]))
      setValue(`serviceDetail.${index}.price`, selectedService[0].price)
      setValue(`serviceDetail.${index}.unit`, selectedService[0].unit)
    }

  }
  const generateTotalPrice = (index: number) => {
    const data = getValues()
    setTimeout(() => {
      let totalPrice = Number(data?.serviceDetail[index]?.price) * Number(data?.serviceDetail[index]?.count)
      setValue(`serviceDetail.${index}.totalPrice`, totalPrice)
      generateGrandTotal()
    }, 10);
  }


  const generateGrandTotal = () => {
    const data = getValues();
    let totalPrices = 0;
    let totalPricesWithTax = 0;
    let totalPricesWithDiscount = 0;
    let taxAmount = 0;

    data?.serviceDetail?.forEach((element: any) => {
      totalPrices += parseInt(element.totalPrice);
    });

    if (data?.isTax) {
      taxAmount = calculateTax(totalPrices);
      totalPricesWithTax = totalPrices + taxAmount;
    }

    if (data?.isDiscount) {

      if (data?.discountType == 1) {
        totalPricesWithDiscount = totalPrices - parseInt(data?.discountAmount);
      } else if (data?.discountType == 0) {
        const discountPercentage = parseInt(data?.discountAmount);
        const discountAmount = (totalPrices * (discountPercentage / 100)).toFixed(2);

        totalPricesWithDiscount = totalPrices - parseFloat(discountAmount);
      }
    }

    let grandTotal;

    if (data?.isTax && data?.isDiscount) {
      // Case: Both tax and discount are true
      if (data?.discountType == 0) {
        const discountPercentage = parseInt(data?.discountAmount);
        const discountAmount = (totalPrices * (discountPercentage / 100)).toFixed(2);

        grandTotal = totalPricesWithTax - parseInt(data?.discountAmount);
      }else{
        grandTotal = totalPricesWithDiscount

      }


    } else if (data?.isTax) {
      // Case: Only tax is true
      grandTotal = totalPricesWithTax;
    } else if (data?.isDiscount) {
      // Case: Only discount is true
      grandTotal = totalPricesWithDiscount;
    } else {
      // Case: Neither tax nor discount is true
      grandTotal = totalPrices;
    }

    setTotal({
      subTotal: totalPrices,
      grandTotal: grandTotal,
      taxAmount: taxAmount,
    });
  };


  useMemo(() => {

    generateGrandTotal()
  }, [discountAmount, discountType, taxType, isTax, isDiscount])
  useMemo(() => {
    if (offerDetails.id) {
      setTotal({
        taxAmount: Number((offerDetails.total - offerDetails.subTotal).toFixed(2)),
        subTotal: offerDetails.subTotal,
        grandTotal: offerDetails.total,

      })
      reset({
        serviceDetail: offerDetails?.serviceDetail?.serviceDetail,
        isTax: offerDetails?.isTax,
        isDiscount: offerDetails?.isDiscount,
        discountType: offerDetails?.discountType,
        taxType: staticEnums["TaxType"][offerDetails?.taxType],
        discountAmount: offerDetails?.discountAmount,
        discountDescription: offerDetails?.discountDescription

      })
    }
    generateGrandTotal()
  }, [offerDetails.id])
  const { fields: serviceFields, append, remove } = useFieldArray({
    control,
    name: "serviceDetail",

  });

  const fields = AddOfferServiceDetailsFormField(register, loading, control, () => console.log(), serviceFields?.length === 0 ? 1 : serviceFields?.length, { service: service, onCustomerSelect: onServiceSelect, serviceDetails: serviceDetails, generatePrice: generateTotalPrice, offerDetails }, append, remove, serviceFields, setValue);

  const fieldsDescription = AddOfferServiceDetailsDescriptionFormField(register, loading, control, () => console.log(), serviceFields?.length, { service: service, total: total, generateTotal: generateGrandTotal, isTax, isDiscount, offerDetails: offerDetails, taxType: taxType, discountType }, append, remove, serviceFields, setValue);
  const submitFields = AddOfferDetailsServiceSubmitFormField(loading, handleBack)


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData: typeof data = { ...data, step: 3, id: offerDetails?.id, stage: ComponentsType.additionalAdded, taxAmount: total?.taxAmount, taxType: Number(data?.taxType), discountType: Number(data?.discountType) }
    if (!apiData?.isDiscount) {
      delete apiData["discountAmount"]
      delete apiData["discountType"]

    }
    if (!apiData?.isTax) {
      delete apiData["taxAmount"]
      delete apiData["taxType"]
    }

    const response = await dispatch(updateOffer({ data: apiData, router, setError, translate }));
    if (response?.payload) handleNext()

  };

  return {
    fields: [...fields, ...fieldsDescription, ...submitFields],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
  };
};
