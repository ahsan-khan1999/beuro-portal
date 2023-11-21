import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddLeadAddressDetailsFormField } from "@/components/leads/fields/Add-lead-address-fields";
import { generateLeadsAddressEditDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { Field } from "@/enums/form";
import { FormField } from "@/types";

export const useAddLeadAddressDetails = (onHandleNext: Function) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateLeadsAddressEditDetailsValidation(translate, 2);


  // const field = AddLeadAddressDetailsFormField(register, loading, control, () => console.log(""), 2)
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
    defaultValues:
    {
      address: Array.from({ length: 2 }, (_, i): FormField[] => (
        {
          containerClass: "mt-6",
          label: {
            text: `Address ${i + 1} Details`,
            htmlFor: `address-${i + 1}-details`,
            className: "mb-[10px] text-[#8F8F8F]",
          },
          field: {
            type: Field.div,
            id: `div-field-${i + 1}`,
            className: "grid grid-cols-3 gap-x-3",
            children: [
              {
                containerClass: "mb-0 ",
                label: {
                  text: "Street NO.",
                  htmlFor: `streetNo-${i + 1}`,
                  className: "mb-[10px]",
                },
                field: {
                  type: Field.input,
                  className: "!p-4 !border-dark  focus:!border-primary ",
                  inputType: "text",
                  id: `streetNo-${i + 1}`,
                  name: `streetNo-${i + 1}`,
                  placeholder: `Zweibrückenstraße, ${i + 1}`,
                },
              },
              {
                containerClass: "mb-0 ",
                label: {
                  text: "Post Code",
                  htmlFor: `postCode-${i + 1}`,
                  className: "mb-[10px]",
                },
                field: {
                  type: Field.input,
                  className: "!p-4 !border-dark  focus:!border-primary ",
                  inputType: "text",
                  id: `postCode-${i + 1}`,
                  name: `postCode-${i + 1}`,
                  placeholder: `123${i + 1}`,
                },
              },
              {
                containerClass: "mb-0 ",
                label: {
                  text: "Country",
                  htmlFor: `country-${i + 1}`,
                  className: "mb-[10px]",
                },
                field: {
                  type: Field.input,
                  className: "!p-4 !border-dark  focus:!border-primary ",
                  inputType: "text",
                  id: `country-${i + 1}`,
                  name: `country-${i + 1}`,
                  placeholder: `Country ${i + 1}`,
                },
              },
              {
                containerClass: "mb-0 ",
                label: {
                  text: "Street NO.",
                  htmlFor: `streetNos-${i + 1}`,
                  className: "mb-[10px]",
                },
                field: {
                  type: Field.input,
                  className: "!p-4 !border-dark  focus:!border-primary ",
                  inputType: "text",
                  id: `streetNos-${i + 1}`,
                  name: `streetNos-${i + 1}`,
                  placeholder: `Zweibrückenstraße, ${i + 1}`,
                },
              },
            ],
          }

        }
      )),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'address',
  });

  // Convert the structure returned by useFieldArray to your structure
  const convertedFields = fields.map((field, index) => {
    const addressField = field.field?.children?.[0];
    const descriptionField = field.field?.children?.[1];

    if (!addressField || !descriptionField) {
      return null; // Skip if the structure is unexpected
    }


    return {
      containerClass: field.containerClass,
      label: field.label,
      field: {
        type: Field.div,
        id: field.field.id,
        className: field.field.className,
        children: [
          {
            containerClass: "mb-0 ",
            label: {
              text: "Street NO.",
              htmlFor: `streetNo-${index + 1}`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark  focus:!border-primary ",
              inputType: "text",
              id: `streetNo-${index + 1}`,
              name: `streetNo-${index + 1}`,
              placeholder: `Zweibrückenstraße, ${index + 1}`,
              register
            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: "Post Code",
              htmlFor: `postCode-${index + 1}`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark  focus:!border-primary ",
              inputType: "text",
              id: `postCode-${index + 1}`,
              name: `postCode-${index + 1}`,
              placeholder: `123${index + 1}`,
              register

            },
          },
          {
            containerClass: "mb-0 ",
            label: {
              text: "Country",
              htmlFor: `country-${index + 1}`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark  focus:!border-primary ",
              inputType: "text",
              id: `country-${index + 1}`,
              name: `country-${index + 1}`,
              placeholder: `Country ${index + 1}`,
              register
            },
          },
          {
            containerClass: "mb-0 mt-5 col-span-3",
            label: {
              text: "Test",
              htmlFor: `streetNos-${index + 1}`,
              className: "mb-[10px]",
            },
            field: {
              type: Field.input,
              className: "!p-4 !border-dark  focus:!border-primary ",
              inputType: "text",
              id: `streetNos-${index + 1}`,
              name: `streetNos-${index + 1}`,
              placeholder: `Country ${index + 1}`,
              register
            },
          },
        ],
      },

    };
  });

  // Filter out null values in case there are unexpected structures
  const validConvertedFields = convertedFields.filter((field) => field !== null);

  // const fields = 
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    // dispatch(loginUser({ data, router, setError, translate }));
    // onHandleNext(ComponentsType.serviceEdit);
  };
  return {
    fields: validConvertedFields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    append,
    remove
  };
};




