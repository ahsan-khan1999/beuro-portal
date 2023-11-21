import React from "react";
import { FormField, FormProps } from "@/types";
import { getTypedFieldComponent, isFieldType } from "./helpers";
import { combineClasses } from "@/utils/utility";


export const Form = React.memo(
  ({ formFields, handleSubmit, onSubmit, errors, className }: FormProps) => {
    const renderField = (fieldData: FormField, error: string, errors?: Record<string, any>
    ) => {
      if (!fieldData?.field || !isFieldType(fieldData?.field?.type)) {
        return null;
      }
      return getTypedFieldComponent(
        fieldData?.field?.type,
        fieldData?.field,
        error,
        errors
      );
    };
    
    return (
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        {formFields?.map((fieldData, index) => {
          const fieldName = fieldData?.field?.name;

          const error =
            errors && fieldName ? errors[fieldName]?.message : undefined;

          const containerClasses = combineClasses(
            `flex flex-col  `,
            fieldData?.containerClass
          );
          const labelClasses = combineClasses(
            "text-dark font-medium mb-3 text-sm",
            fieldData?.label?.className
          );
          return (
            <div key={index} className={`${containerClasses}`}>
              {fieldData.label && (
                <label
                  htmlFor={fieldData.label.htmlFor}
                  className={`${labelClasses}`}
                >
                  {fieldData?.label?.text}
                </label>
              )}
              {renderField(fieldData, error, errors)}
            </div>
          );
        })}
      </form>
    );
  }
);
