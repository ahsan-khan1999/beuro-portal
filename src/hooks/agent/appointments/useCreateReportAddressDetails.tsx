import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AppointmentReportsFormStages } from "@/enums/agent/appointments-report";
import { ReportContactAddressDetailsValidation } from "@/validation/agent/agentReportSchema";
import {
  contactAgentReportFormField,
  ContactReportAddressFormField,
  ReportCustAddressFormField,
} from "@/components/agent/appointments/createReport/fields/contact-address-form-fields";
import { useEffect, useState } from "react";
import {
  createReport,
  readAppointmentDetails,
  readReportDetails,
} from "@/api/slices/appointment/appointmentSlice";
import { ReportPromiseActionType } from "@/types/customer";
import { CustomerPromiseActionType } from "@/types/company";
import { staticEnums } from "@/utils/static";
import { convertUTCToLocalDate } from "@/utils/utility";

export interface ReportAddressHookProps {
  onNextHandler: (currentComponent: AppointmentReportsFormStages) => void;
}

export const useCreateReportAddressDetails = ({
  onNextHandler,
}: ReportAddressHookProps) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { report, companyAppointment, appointmentId } = router.query;
  const { error, loading, appointmentDetails, reportDetails } = useAppSelector(
    (state) => state.appointment
  );

  const handleCancel = () => {
    const pathname = companyAppointment
      ? "/appointments/details"
      : report
      ? "/agent/appointments/report-detail"
      : "/agent/appointments/details";

    const query: any = {
      appointment: report
        ? reportDetails?.appointmentID?.id
        : appointmentDetails?.id,
      status: "None",
    };

    if (companyAppointment) {
      query.companyAppointment = companyAppointment;
    }

    router.push({
      pathname,
      query,
    });
  };

  const schema = ReportContactAddressDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });
  const {
    fields: addressFields,
    remove,
    append,
  } = useFieldArray({
    control,
    name: "address",
  });

  const [addressType, setAddressType] = useState<number | null>(null);

  useEffect(() => {
    const transformData = (data: any) => {
      return {
        ...data,
        address: data?.address?.map((item: any) => ({
          ...item,
          lift: item?.lift === true ? "1" : "0",
          ParkingPermit: item?.ParkingPermit === "true" ? true : false,
        })),
      };
    };

    const resetFormWithAddresses = (addresses: any[], labelPrefix: string) => {
      return addresses.map((item, index) => ({
        ...item,
        label: item?.label || `${labelPrefix} ${++index}`,
      }));
    };

    if (report) {
      dispatch(readReportDetails({ params: { filter: report } })).then(
        (response: ReportPromiseActionType) => {
          if (response?.payload) {
            const transformedData = transformData({
              customerType: response.payload?.customerDetail?.customerType,
              gender:
                staticEnums["Gender"][reportDetails?.customerDetail?.gender],
              fullName: response.payload?.customerDetail?.fullName,
              email: response.payload?.customerDetail?.email,
              phoneNumber: response.payload?.customerDetail?.phoneNumber,
              mobileNumber: response.payload?.customerDetail?.mobileNumber,
              companyName: response.payload?.customerDetail?.companyName,
              desireDate: response.payload?.desireDate
                ? convertUTCToLocalDate(response.payload?.desireDate)
                : "",
              streetNumber:
                response.payload?.customerDetail?.address?.streetNumber,
              country: response.payload?.customerDetail?.address?.country,
              postalCode: response.payload?.customerDetail?.address?.postalCode,
              address: resetFormWithAddresses(
                response.payload?.addressID?.address || [],
                "Adresse"
              ),
            });

            reset(transformedData);
          }
        }
      );
    } else if (reportDetails?.id) {
      const transformedData = transformData({
        // fullName: reportDetails?.customerDetail?.fullName,
        // email: reportDetails.customerDetail?.email,
        // phoneNumber: reportDetails.customerDetail?.phoneNumber,
        // address: resetFormWithAddresses(
        //   reportDetails?.addressID?.address || [],
        //   "Adresse"
        // ),
        customerType: reportDetails?.customerDetail?.customerType,
        gender: staticEnums["Gender"][reportDetails?.customerDetail?.gender],

        fullName: reportDetails?.customerDetail?.fullName,
        email: reportDetails?.customerDetail?.email,
        phoneNumber: reportDetails?.customerDetail?.phoneNumber,
        mobileNumber: reportDetails?.customerDetail?.mobileNumber,
        companyName: reportDetails?.customerDetail?.companyName,
        desireDate: convertUTCToLocalDate(
          reportDetails?.customerDetail?.desireDate || ""
        ),
        streetNumber: reportDetails?.customerDetail?.address?.streetNumber,
        country: reportDetails?.customerDetail?.address?.country,
        postalCode: reportDetails?.customerDetail?.address?.postalCode,
        address: resetFormWithAddresses(
          reportDetails?.addressID?.address || [],
          "Adresse"
        ),
      });

      reset(transformedData);
    } else if (appointmentId) {
      dispatch(
        readAppointmentDetails({
          params: { filter: appointmentId },
        })
      ).then((response: CustomerPromiseActionType) => {
        if (response.payload) {
          const transformedData = transformData({
            customerType:
              response.payload?.leadID?.customerDetail?.customerType,
            gender:
              staticEnums["Gender"][
                response.payload?.leadID?.customerDetail?.gender
              ],
            fullName: response.payload?.leadID?.customerDetail?.fullName,
            email: response.payload?.leadID?.customerDetail?.email,
            phoneNumber: response.payload?.leadID?.customerDetail?.phoneNumber,
            mobileNumber:
              response.payload?.leadID?.customerDetail?.mobileNumber,
            companyName: response.payload?.leadID?.customerDetail?.companyName,
            desireDate: convertUTCToLocalDate(
              response.payload?.leadID?.desireDate || ""
            ),
            streetNumber:
              response.payload?.leadID?.customerDetail?.address?.streetNumber,
            country: response.payload?.leadID?.customerDetail?.address?.country,
            postalCode:
              response.payload?.leadID?.customerDetail?.address?.postalCode,

            address: resetFormWithAddresses(
              response.payload?.leadID?.addressID?.address || [],
              "Adresse"
            ),
          });

          reset(transformedData);
        }
      });
    }
  }, [appointmentDetails?.id, reportDetails?.id, report, appointmentId]);

  const addressFieldsLength = addressFields.length || 1;

  const handleChangeLabel = (value: string, index: number) => {
    setValue(`address.${index}.label`, value);
  };
  const onDeleteAddress = (index: number) => {
    remove(index);
    const data = getValues();
    reset({ ...data });
  };
  const onEditTitle = (idx: number | null) => {
    setAddressType(idx);
  };

  const handleAddNewAddress = () => {
    append({
      label: `Adresse ${addressFieldsLength}`,
      streetNumber: "",
      postalCode: "",
      country: "",
      description: "",
      floor: "",
      room: "",
      lift: false,
      ParkingPermit: false,
    });
  };

  const fields = contactAgentReportFormField(
    register,
    false,
    control,
    watch("customerType")
  );

  const address = ContactReportAddressFormField(
    register,
    loading,
    control,
    addressFieldsLength,
    addressFields,
    watch()?.address || [],
    addressType,
    handleChangeLabel,
    onEditTitle,
    onDeleteAddress,
    handleAddNewAddress,
    handleCancel
  );

  const customerAddress = ReportCustAddressFormField(
    register,
    loading,
    control
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (report) {
        const apiData = {
          ...data,
          customerType: Number(data.customerType),
          gender: Number(data.gender),
          step: 1,
          appointmentID: reportDetails?.appointmentID?.id,
          companyName: data?.companyName,
          desireDate: data?.desireDate,
        };

        if (apiData.customerType === 0) {
          delete apiData?.companyName;
        }
        if (!apiData?.desireDate || apiData?.desireDate == "Invalid date") {
          delete apiData?.desireDate;
        }

        const response = await dispatch(
          createReport({
            data: apiData,
            router,
            setError,
            translate,
          })
        );

        if (response?.payload)
          onNextHandler(AppointmentReportsFormStages.HOUSE_DETAILS);
      } else {
        const apiData = {
          ...data,
          customerType: Number(data.customerType),
          gender: Number(data.gender),
          step: 1,
          appointmentID: appointmentDetails?.id,
          companyName: data?.companyName,
          desireDate: data?.desireDate,
        };

        if (apiData.customerType === 0) {
          delete apiData?.companyName;
        }
        if (!apiData?.desireDate || apiData?.desireDate == "Invalid date") {
          delete apiData?.desireDate;
        }

        const response = await dispatch(
          createReport({
            data: apiData,
            router,
            setError,
            translate,
          })
        );

        if (response?.payload)
          onNextHandler(AppointmentReportsFormStages.HOUSE_DETAILS);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return {
    fields: [...fields, ...customerAddress, ...address],
    onSubmit,
    control,
    handleSubmit,
    errors,
    error,
    translate,
  };
};
