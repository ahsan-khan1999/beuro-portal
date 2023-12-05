import { Form } from "@/base-components/form/form";
import { useAddOfferDetails } from "@/hooks/offers/useAddOfferDetails";
import FormCard from "@/layout/customers/FormCard";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import backIcon from "@/assets/svgs/back_icon.svg";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@/base-components/form/fields";
import { Button } from "@/base-components/ui/button/button";
import icon from "@/assets/svgs/Vector.svg"
import { AddOfferDetailsDateFormField } from "./fields/add-offer-details-fields";
import { Field } from "@/enums/form";

const OfferAddDetails = ({ onHandleNext }: { onHandleNext: Function }) => {
  const router = useRouter();
  const defaultClassName = "";
  const { fields, control, onSubmit, handleSubmit, errors, error, append, testFields, remove, register, loading } =
    useAddOfferDetails(onHandleNext);
  // console.log(testFields,"testFields");
  // const { register } = useForm()
  return (
    <FormCard>
      <div
        className="flex justify-between items-center pb-5 "
        id="Customer Details"
      >
        <div className="flex items-center gap-x-[26px]">
          <Image
            src={backIcon}
            alt="back_icon"
            className="cursor-pointer"
            onClick={() => router.push("/offers")}
          />
          <p className="font-medium text-[24px] leading-6 ">Offer details</p>
        </div>
        <button
          onClick={() => router.push("/offers")}
          className="text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[131px] w-full"
        >
          Cancel
        </button>
      </div>
      <hr className="opacity-20 mb-5" />
     
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
    


    </FormCard>
  );
};

export default OfferAddDetails;
