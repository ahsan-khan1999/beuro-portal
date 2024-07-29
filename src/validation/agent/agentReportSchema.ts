import {
  AdditionalInfoFieldsId,
  HouseDetailsFieldsId,
  ReportContactDetailsFieldsId,
  ServiceDetailFieldsId,
} from "@/enums/agent/appointments-report";
import * as yup from "yup";

export const ReportContactDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    [ReportContactDetailsFieldsId.NAME]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.EMAIL]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.TELEPHONE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.MOVE_OUT_STREET_NO]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.MOVE_OUT_POSTAL_CODE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.MOVE_OUT_FLOOR]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.MOVE_OUT_ROOM]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.MOVE_OUT_LIFT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.MOVE_OUT_PARKING_PERMIT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.COLLECTION_STREET_NO]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.COLLECTION_POSTAL_CODE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.COLLECTION_FLOOR]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.COLLECTION_ROOM]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.COLLECTION_LIFT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.COLLECTION_PARKING_PERMIT]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const ReportHouseDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    [HouseDetailsFieldsId.LIVING_ROOM_SOFA]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.LIVING_ROOM_SESSEL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.LIVING_ROOM_L_SOFA]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.LIVING_ROOM_BOX]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.LIVING_ROOM_PUIT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.LIVING_ROOM_TISCH]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.LIVING_ROOM_FERNSEHER]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.LIVING_ROOM_FERNSEHTISCH]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.LIVING_ROOM_REGAL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.LIVING_ROOM_DECO_GROSS]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.LIVING_ROOM_REMARK]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_BACKOFEN]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_HERD]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_WASHING_MACHINE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_TUMBLER]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_BOX]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_REFREGIRATOR]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_MICROWAVE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_DEEP_FREEZER]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_COFFEE_MACHINE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_REGAL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KITCHEN_REMARK]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_BETT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_SCHRANK_KELEIN]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_SCHMINKANLAGE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_PULT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_DOPPEIBETT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_SCHRANK_MITTEL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_NACHTTISCH]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_PFLANZEN]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_SESSEL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_SCHRANK_GROSS]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_REGAL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_BOX]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BEDROOM_REMARK]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_BETT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_DOPPEIBETT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_SESSEL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_REGAL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_SCHRANK_KLEIN]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_FERNSEHTISCH]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_SCHRANK_MITTEL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_PULT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_NACHTTISCH]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_SCHRANK_GROSS]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_FERNSEHER]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_BOX]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.ZIMMER_REMARK]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_GRILL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_TISCH]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_STUHLE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_SOFA]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_REGAL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_SCHIRM]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_TOPFE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_PFLANZEN]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_KRAUTERBEET]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_RASENMAHER]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.BALKON_REMARK]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KELLER_WASH_MACHINE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KELLER_TUMBLER]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KELLER_REGAL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KELLER_ENTSORGUNGEN]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KELLER_FAHRRAD]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KELLER_KINDERWAGEN]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KELLER_MOBEL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KELLER_BOXEN]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.KELLER_REMARK]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.SPEZIELL_AQUARIUM]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.SPEZIELL_PIANO]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.SPEZIELL_SPORTGERAT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.SPEZIELL_ELEKTRONISCHES]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.SPEZIELL_POOL]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.SPEZIELL_TRESSOR]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.SPEZIELL_LAMPE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [HouseDetailsFieldsId.SPEZIELL_REMARK]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const ReportServiceDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    // [ServiceDetailFieldsId.SERVICE_TYPE]: yup.string().when("serviceType", {
    //   is: (serviceType: string) => serviceType === "Existing Service",
    //   then: () =>
    //     yup.string().required(translate("validationMessages.required")),
    // }),
    [ServiceDetailFieldsId.SERVICE_TYPE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ServiceDetailFieldsId.COUNT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ServiceDetailFieldsId.UNIT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ServiceDetailFieldsId.PRICE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ServiceDetailFieldsId.DISCOUNT]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ServiceDetailFieldsId.DESCRIPTION]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};

export const ReportAdditionalDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    [AdditionalInfoFieldsId.EMPLOYYES]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AdditionalInfoFieldsId.DELIVERT_VAN]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AdditionalInfoFieldsId.HOURS]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AdditionalInfoFieldsId.CLEANING_DELIVERY_GUARANTEE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AdditionalInfoFieldsId.BROOM_CLEAN]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AdditionalInfoFieldsId.PRICE]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AdditionalInfoFieldsId.REMARK]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AdditionalInfoFieldsId.NOTE_INFORMATION]: yup
      .string()
      .required(translate("validationMessages.required")),
    [AdditionalInfoFieldsId.IMAGES]: yup
      .string()
      .required(translate("validationMessages.required")),
  });
};
