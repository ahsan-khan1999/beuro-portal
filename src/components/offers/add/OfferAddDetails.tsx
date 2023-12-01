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
      {/* <form onSubmit={handleSubmit(data => console.log(data,"submit"))}>
      <ul>
        {testFields.map((item, index) => (
          <li key={item.id}>
            <input {...register(`date.${index}.firstName`)} className="border-2 border-red mx-2"/>
            
            <button type="button" onClick={() => remove(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ firstName: "", lastName: "" })}
      >
        append
      </button>
      <button type="submit" >Submit</button>
    </form> */}
      <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        className={`${defaultClassName}`}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {
            testFields?.map((item: any, index) => {

              return (
                <div className="grid grid-cols-2 gap-2" key={item.id}>
                  <div className="flex flex-col w-full relative">
                    <label className={`mb-[10px]`} htmlFor={`startDate`}>
                      Start Date
                    </label>
                    <DatePicker
                      id={`startDate_${index}`}
                      name={`date.${index}.startDate`}
                      register={register}
                      dateType={`date`}
                      className={`!p-4 !border-dark focus:!border-primary w-full`}
                      type={Field.date}
                    />

                    {errors?.date && <div>{errors?.date[index]?.startDate?.message}</div>}
                  </div>
                  <div className="flex flex-col w-full">

                    <label className={`mb-[10px]`} htmlFor={`endDate`}>
                      End Date
                    </label>
                    <DatePicker
                      id={`endDate_${index}`}
                      name={`date.${index}.endDate`}
                      register={register}
                      dateType={`date`}
                      className={`!p-4 !border-dark focus:!border-primary w-full`}
                      type={Field.date}
                      remove={index > 0 && "Remove" || ""}
                      onRemove={() => remove(index)}
                    />

                    {errors?.date && <div>{errors?.date[index]?.endDate?.message}</div>}
                  </div>

                </div>
              )
            })
          }
        </div>
        <Button inputType="button" icon={icon} className="rounded-lg border-[1px] border-[#4B4B4B] bg-[#fff] m-1 my-5 p-4  w-[40px] h-[40px] text-white " onClick={() => append({ startDate: "", endDate: "" })} id={"add"} />

        <Button inputType="submit" className="rounded-lg bg-[#4A13E7] px-4  w-[152px] h-[50px] text-white hover-bg-none" id="submit" text="Next" loading={loading} />

      </form>


    </FormCard>
  );
};

export default OfferAddDetails;
