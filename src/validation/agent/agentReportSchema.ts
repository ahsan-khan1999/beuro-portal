import {
  AdditionalInfoFieldsId,
  HouseDetailsFieldsId,
  ReportContactDetailsFieldsId,
} from "@/enums/agent/appointments-report";
import * as yup from "yup";

export const ReportContactAddressDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    [ReportContactDetailsFieldsId.fullName]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.email]: yup
      .string()
      .email()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.phoneNumber]: yup
      .string()
      .required(translate("validationMessages.required")),
    [ReportContactDetailsFieldsId.address]: yup
      .array()
      .of(
        yup.object().shape({
          [ReportContactDetailsFieldsId.streetNumber]: yup
            .string()
            .required(translate("validationMessages.required")),
          [ReportContactDetailsFieldsId.postalCode]: yup
            .string()
            .required(translate("validationMessages.required")),
          [ReportContactDetailsFieldsId.country]: yup
            .string()
            .required(translate("validationMessages.required")),
          // [ReportContactDetailsFieldsId.description]: yup
          //   .string()
          //   .notRequired(),
          [ReportContactDetailsFieldsId.floor]: yup
            .string()
            .required(translate("validationMessages.required")),
          [ReportContactDetailsFieldsId.room]: yup
            .string()
            .required(translate("validationMessages.required")),
          [ReportContactDetailsFieldsId.lift]: yup
            .string()
            .required(translate("validationMessages.required")),
        })
      )
      .required(),
  });
};

export const ReportHouseDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    // [HouseDetailsFieldsId.livingRoomDetails]: yup.object({
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.sofa}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.teacherDesk}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.tvTable}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.armchair}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.table}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.shelf}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.LSofa}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.TV}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.decoBig}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.box}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.descriptions}`]:
      yup.string().required(translate("validationMessages.required")),
    // }),
    // [HouseDetailsFieldsId.kitchenDetails]: yup.object({
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.oven}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.refrigerator}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.freezer}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.stove}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.microwave}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.coffeeMachine}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.washingMachine}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.tumbler}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.shelf}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.box}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.descriptions}`]:
      yup.string().required(translate("validationMessages.required")),
    // }),
    // [HouseDetailsFieldsId.bedRoomDetails]: yup.object({
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.bed}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.doubleBed}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.armchair}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.smallWardrobe}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.mediumWardrobe}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.largeWardrobe}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.dressingTable}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.nightstand}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.shelf}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.desk}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.plants}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.box}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.descriptions}`]:
      yup.string().required(translate("validationMessages.required")),
    // }),
    // [HouseDetailsFieldsId.roomDetails]: yup.object({
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.bed}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.doubleBed}`]:
      yup.string().required(translate("validationMessages.required")),

    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.armchair}`]:
      yup.string().required(translate("validationMessages.required")),

    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.smallWardrobe}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.mediumWardrobe}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.largeWardrobe}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.shelf}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.desk}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.tv}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.tvTable}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.nightstand}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.box}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.descriptions}`]:
      yup.string().required(translate("validationMessages.required")),
    // }),
    // [HouseDetailsFieldsId.outDoorDetails]: yup.object({
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.grill}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.table}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.chairs}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.sofa}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.shelf}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.umbrella}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.pots}`]: yup
      .string()
      .required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.plants}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.herbGarden}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.lawnmower}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.descriptions}`]:
      yup.string().required(translate("validationMessages.required")),
    // }),
    // [HouseDetailsFieldsId.basementAtticDetails]: yup.object({
    [`${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.washingMachine}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.tumbler}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.shelf}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.disposal}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.bicycle}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.stroller}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.furniture}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.boxes}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.descriptions}`]:
      yup.string().required(translate("validationMessages.required")),
    // }),
    // [HouseDetailsFieldsId.specialItemsDetails]: yup.object({
    [`${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.aquarium}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.piano}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.gymEquipment}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.electronics}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.pool}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.safe}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.lamp}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.descriptions}`]:
      yup.string().required(translate("validationMessages.required")),
    // }),
  });
};

export const ReportAdditionalDetailsValidation = (translate: Function) => {
  return yup.object().shape({
    [`${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.employees}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.deliveryVehicle}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.hours}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.cleaningWithHandoverGuarantee}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.broomClean}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.priceCHF}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.remarks}`]:
      yup.string().required(translate("validationMessages.required")),
    [`${AdditionalInfoFieldsId.offerDetails}.${AdditionalInfoFieldsId.noteAndInformation}`]:
      yup.string().required(translate("validationMessages.required")),
  });
};
