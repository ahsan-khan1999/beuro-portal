import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { AddLeadAdditionalDetailsFormField } from "@/components/leads/fields/Add-lead-additional-fields";
import { generateLeadAdditionalDetailsValidation } from "@/validation/leadsSchema";
import { ComponentsType } from "@/components/leads/add/AddNewLeadsData";
import { updateLead } from "@/api/slices/lead/leadSlice";
import { useMemo } from "react";
import { ContentTableRowTypes } from "@/types/content";
import { staticEnums } from "@/utils/static";
import { getKeyByValue } from "@/utils/auth.util";
import { formatDateTimeToDate } from "@/utils/utility";

export const useAddLeadAdditionalDetails = ({
  onHandleBack,
  onHandleNext,
}: {
  onHandleBack: (currentComponent: ComponentsType) => void;
  onHandleNext: (currentComponent: ComponentsType) => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, leadDetails } = useAppSelector((state) => state.lead);
  const content = leadDetails?.requiredService as ContentTableRowTypes;
  const contentList = leadDetails?.otherServices as ContentTableRowTypes[];

  const schema = generateLeadAdditionalDetailsValidation(translate);
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const customerType = translate(
    `customer_type.${getKeyByValue(
      staticEnums["CustomerType"],
      leadDetails?.customerDetail?.customerType
    )}`
  );

  const flexibility =
    leadDetails?.flexibility === "0"
      ? translate("common.flexible")
      : leadDetails?.flexibility;

  const updatedFlexibility =
    flexibility !== "0" &&
    (flexibility === "1" ? translate("common.day") : translate("common.days"));

  const otherServices =
    Array?.isArray(contentList) &&
    contentList?.map((item) => item?.contentName + ", ");

  const updatedLeadsDetails = `<span style="color: #4A13E7; font-size: 24px; text-decoration: underline;"><strong>---  ${
    content?.contentName
  } --- </strong></span><br><br>  

  <span style="color: #4A13E7;"><strong>---${translate(
    "leads.tabs_headings.customer"
  )}:--- </strong></span><br>
  </span>

  
    <span style="color: #405068;"><strong>${translate(
      "leads.customer_details.customer_type"
    )}</strong>: <strong>
    <span style="color: #ff6600;">${customerType}</span></strong>
    </span>
    <br>

    <span style="color: #405068;"><strong>${translate(
      "leads.customer_details.full_name"
    )}</strong>: 
      <strong><span style="color: #ff6600;">${
        leadDetails?.customerDetail?.fullName
      }</span></strong>
    </span>
<br>

    ${
      Number(leadDetails?.customerDetail?.customerType) === 1
        ? `<span style="color: #405068;"><strong>${translate(
            "login_detail.company_details.company_name"
          )}</strong>: 
      <strong><span style="color: #ff6600;">${
        leadDetails?.customerDetail?.companyName
      }</span></strong>
    </span>`
        : ""
    }
<br>

    <span style="color: #405068;"><strong>${translate(
      "leads.customer_details.email_address"
    )}</strong>: 
      <strong><span style="color: #ff6600;">${
        leadDetails?.customerDetail?.email
      }</span></strong>
    </span>
<br>

      ${
        leadDetails?.customerDetail?.phoneNumber
          ? `<span style="color: #405068;"><strong>${translate(
              "leads.customer_details.phone_number"
            )}</strong>: 
        <strong><span style="color: #ff6600;">${
          leadDetails?.customerDetail?.phoneNumber
        }</span></strong>
      </span>`
          : ""
      }
<br>

   ${
     leadDetails?.customerDetail?.mobileNumber
       ? `<span style="color: #405068;"><strong>${translate(
           "leads.customer_details.mobile_number"
         )}</strong>: 
      <strong><span style="color: #ff6600;">${
        leadDetails?.customerDetail?.mobileNumber
      }</span></strong>
    </span>`
       : ""
   }
<br>

    ${
      leadDetails?.customerDetail?.gender
        ? `<span style="color: #405068;"><strong>${translate(
            "customers.details.gender"
          )}</strong>: 
      <strong><span style="color: #ff6600;">${translate(
        `gender.${leadDetails?.customerDetail?.gender}`
      )}</span></strong>
    </span>`
        : ""
    }
<br>
    
    <span style="color: #405068;"><strong>${translate(
      "leads.customer_details.street_no"
    )}</strong>: 
      <strong><span style="color: #ff6600;">${
        leadDetails?.customerDetail?.address?.streetNumber
      }</span></strong>
    </span>
<br>

    ${
      leadDetails?.customerDetail?.address?.postalCode
        ? `<span style="color: #405068;"><strong>${translate(
            "leads.customer_details.post_code"
          )}</strong>: 
      <strong><span style="color: #ff6600;">${
        leadDetails?.customerDetail?.address?.postalCode
      }</span></strong>
    </span>`
        : ""
    }
<br>

    ${
      leadDetails?.customerDetail?.address?.country
        ? `<span style="color: #405068;"><strong>${translate(
            "leads.customer_details.country"
          )}</strong>: 
      <strong><span style="color: #ff6600;">${
        leadDetails?.customerDetail?.address?.country
      }</span></strong>
    </span>`
        : ""
    }
    <br>
    <br>


    <span style="color: #4A13E7;"><strong>---${translate(
      "leads.tabs_headings.address"
    )}:--- </strong></span><br>
  </span>

   ${
     leadDetails?.addressID?.address?.length > 0
       ? `${leadDetails?.addressID?.address
           ?.map(
             (address: any, index: number) => `
                          <div key=${index}">
                             <span style="color: #405068;"><strong>
                              ${address.label}:
                            </strong></span><br>
                            <span style="color: #405068;"><strong>${translate(
                              "leads.customer_details.street_no"
                            )}</strong>:<strong><span style="color: #ff6600;">${
               address.streetNumber
             }</span></strong>
                            </span><br>
                            <span style="color: #405068;"><strong>${translate(
                              "leads.customer_details.post_code"
                            )}</strong>:<strong><span style="color: #ff6600;">${
               address.postalCode
             }</span></strong>
                            </span><br>
                            <span style="color: #405068;"><strong>${translate(
                              "leads.customer_details.country"
                            )}</strong>:<strong><span style="color: #ff6600;">${
               address.country
             }</span></strong>
                            </span><br>
                          </div>
                        `
           )
           .join("")}
                  `
       : ""
   }

    <span style="color: #4A13E7;"><strong>---${translate(
      "leads.tabs_headings.service"
    )}:--- </strong></span><br>


  <span style="color: #405068;"><strong>${translate(
    "leads.service_details.required_service"
  )}</strong>: 
      <strong><span style="color: #ff6600;">${
        content?.contentName
      }</span></strong>
    </span>
<br>

  <span style="color: #405068;"><strong>${translate(
    "leads.service_details.desire_date"
  )}</strong>: 
      <strong><span style="color: #ff6600;">${formatDateTimeToDate(
        leadDetails?.desireDate
      )}</span></strong>
    </span>
  <br>

  ${
    leadDetails?.contactAvailability
      ? `<span style="color: #405068;"><strong>${translate(
          "leads.service_details.availability"
        )}</strong>: 
      <strong><span style="color: #ff6600;">${
        leadDetails?.contactAvailability
      }</span></strong>
    </span>
  <br>`
      : ""
  }


  ${
    leadDetails?.flexibility !== undefined && leadDetails?.flexibility !== ""
      ? `<span style="color: #405068;"><strong>${translate(
          "leads.service_details.flexibility"
        )}</strong>: 
      <strong><span style="color: #ff6600;"> ${flexibility} ${updatedFlexibility}</span></strong>
    </span>
  <br>`
      : ""
  }


 ${
   leadDetails?.preferredContact
     ? `<span style="color: #405068;"><strong>${translate(
         "leads.service_details.prefer_contact"
       )}</strong>: 
      <strong><span style="color: #ff6600;">${
        leadDetails?.preferredContact
      }</span></strong>
    </span>
  <br>`
     : ""
 }

  ${
    leadDetails?.leadSource
      ? `<span style="color: #405068;"><strong>${translate(
          "leads.service_details.lead_source"
        )}</strong>: 
      <strong><span style="color: #ff6600;">${
        leadDetails?.leadSource
      }</span></strong>
    </span>
  <br>`
      : ""
  }


  ${
    otherServices
      ? `<span style="color: #405068;"><strong>${translate(
          "leads.service_details.other_services"
        )}</strong>: 
      <strong><span style="color: #ff6600;">${otherServices}</span></strong>
    </span>
  <br>`
      : ""
  }

  </span>
`;

  useMemo(() => {
    if (leadDetails.id) {
      reset({
        additionalDetails: updatedLeadsDetails,
      });
    }
  }, [leadDetails.id]);

  const fields = AddLeadAdditionalDetailsFormField(
    loading,
    control,
    onHandleBack,
    leadDetails
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const apiData = {
      ...data,
      step: 4,
      id: leadDetails?.id,
      stage: ComponentsType.additionalAdd,
    };
    const response = await dispatch(
      updateLead({ data: apiData, router, setError, translate })
    );
    if (response?.payload) onHandleNext(ComponentsType.additionalAdd);
  };

  return {
    fields,
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
