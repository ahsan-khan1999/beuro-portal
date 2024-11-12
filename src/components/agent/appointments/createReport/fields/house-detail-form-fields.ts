import {
  AquariumIconString,
  ArmChairIconString,
  BalconyTableIconString,
  BedIconString,
  BicycleIconString,
  BoxesIconString,
  BoxIconString,
  ChairsIconString,
  CoffeeMachineIconString,
  DecobigIconString,
  DeleteIconString,
  DeskIconString,
  DisposalIconString,
  DoublebedIconString,
  DressingTableIconString,
  EditIconString,
  ElectronicsIconString,
  FreezerIconString,
  freshnerIconString,
  FurnitureIconString,
  GrillIconString,
  GymIconString,
  HerbgardenIconString,
  LampIconString,
  largeWardrobeIconString,
  LawnmoverIconString,
  LsofaIconString,
  MediumWardrobeIconString,
  MicrowaveIconString,
  NightstandIconString,
  OvanIconString,
  PianoIconString,
  PlantsIconString,
  PoolIconString,
  PostIconString,
  RefrigeratorIconString,
  RegalIconString,
  SafeIconString,
  ShelfIconString,
  SmallWardrobeIconString,
  SofaIconString,
  StoveIconString,
  StrollerIconString,
  TableIconString,
  TeacherDeskIconString,
  TumblerIconString,
  TVTableIconString,
  UmbrellaIconString,
  WashingMachineIconString,
} from "@/assets/svgs/strings/svg-strings";
import {
  AppointmentReportsFormStages,
  HouseDetailsFieldsId,
} from "@/enums/agent/appointments-report";
import { Field } from "@/enums/form";
import { FormField, GenerateHouseDetailReportFormField } from "@/types";
import { useTranslation } from "next-i18next";

export const houseDetailReportFormField: GenerateHouseDetailReportFormField = (
  register,
  loading,
  control,
  onHandleBack,
  handleAddNewRoom,
  count,
  roomType,
  handleChangeLabel,
  generalRoomDetails,
  onEditTitle,
  onDeleteRoom
) => {
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      containerClass: "pt-5 mb-2",
      field: {
        type: Field.span,
        id: "test",
        name: "test",
        text: `${translate("agent.house_detail_fields.living_room_heading")}`,
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] rounded-t-lg px-2 pt-3",
        children: [
          {
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden md:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            containerClass: "",
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden mlg:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] gap-y-2 px-2 pb-2",
        children: [
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.sofa}`,
              name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.sofa}`,
              inputLabelValue: translate("agent.house_detail_fields.sofa"),
              svg: SofaIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.teacherDesk}`,
              name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.teacherDesk}`,
              inputLabelValue: translate("agent.house_detail_fields.puit"),
              svg: TeacherDeskIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.tvTable}`,
              name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.tvTable}`,
              inputLabelValue: translate("agent.house_detail_fields.tv_table"),
              svg: TVTableIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.armchair}`,
              name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.armchair}`,
              inputLabelValue: translate("agent.house_detail_fields.sessel"),
              svg: ArmChairIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.table}`,
              name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.table}`,
              inputLabelValue: translate("agent.house_detail_fields.tisch"),
              svg: TableIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.shelf}`,
              name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.shelf}`,
              inputLabelValue: translate("agent.house_detail_fields.regal"),
              svg: ShelfIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.LSofa}`,
              name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.LSofa}`,
              inputLabelValue: translate("agent.house_detail_fields.l_sofa"),
              svg: LsofaIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.TV}`,
              name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.TV}`,
              inputLabelValue: translate("agent.house_detail_fields.fernseher"),
              svg: freshnerIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.decoBig}`,
              name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.decoBig}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.deco_gross"
              ),
              svg: DecobigIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.box}`,
              name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.box}`,
              inputLabelValue: translate("agent.house_detail_fields.box"),
              svg: BoxIconString,
              register,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("agent.house_detail_fields.remark")}`,
        htmlFor: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.descriptions}`,
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        rows: 2,
        id: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.descriptions}`,
        name: `${HouseDetailsFieldsId.livingRoomDetails}.${HouseDetailsFieldsId.descriptions}`,
        register,
      },
    },
    {
      containerClass: "mt-5 mb-2",
      field: {
        type: Field.span,
        id: "test",
        name: "test",
        text: `${translate("agent.house_detail_fields.kuche")}`,
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] rounded-t-lg px-2 pt-3",
        children: [
          {
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden md:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            containerClass: "",
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden mlg:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] gap-y-2 p-2",
        children: [
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.oven}`,
              name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.oven}`,
              inputLabelValue: translate("agent.house_detail_fields.backofen"),
              svg: OvanIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.refrigerator}`,
              name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.refrigerator}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.kuhlschrank"
              ),
              svg: RefrigeratorIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.freezer}`,
              name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.freezer}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.tiefkuhler"
              ),
              svg: FreezerIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.stove}`,
              name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.stove}`,
              inputLabelValue: translate("agent.house_detail_fields.herd"),
              svg: StoveIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.microwave}`,
              name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.microwave}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.mikrowelle"
              ),
              svg: MicrowaveIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.coffeeMachine}`,
              name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.coffeeMachine}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.kaffeemaschine"
              ),
              svg: CoffeeMachineIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.washingMachine}`,
              name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.washingMachine}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.washchmashine"
              ),
              svg: WashingMachineIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.tumbler}`,
              name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.tumbler}`,
              inputLabelValue: translate("agent.house_detail_fields.Tumbler"),
              svg: TumblerIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.shelf}`,
              name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.shelf}`,
              inputLabelValue: translate("agent.house_detail_fields.regal"),
              svg: ShelfIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.box}`,
              name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.box}`,
              inputLabelValue: translate("agent.house_detail_fields.box"),
              svg: BoxIconString,
              register,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("agent.house_detail_fields.remark")}`,
        htmlFor: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.descriptions}`,
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        rows: 2,
        id: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.descriptions}`,
        name: `${HouseDetailsFieldsId.kitchenDetails}.${HouseDetailsFieldsId.descriptions}`,
        register,
      },
    },

    {
      containerClass: "mt-5 mb-2",
      field: {
        type: Field.span,
        id: "test",
        name: "test",
        text: `${translate("agent.house_detail_fields.bedroom_heading")}`,
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] rounded-t-lg px-2 pt-3",
        children: [
          {
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden md:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            containerClass: "",
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden mlg:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] gap-y-2 p-2",
        children: [
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.bed}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.bed}`,
              inputLabelValue: translate("agent.house_detail_fields.bett"),
              svg: BedIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.doubleBed}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.doubleBed}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.doppeltbett"
              ),
              svg: DoublebedIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.armchair}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.armchair}`,
              inputLabelValue: translate("agent.house_detail_fields.sessel"),
              svg: ArmChairIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.smallWardrobe}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.smallWardrobe}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.schrank_klein"
              ),
              svg: SmallWardrobeIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.mediumWardrobe}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.mediumWardrobe}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.schrank_mittel"
              ),
              svg: MediumWardrobeIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.largeWardrobe}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.largeWardrobe}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.schrank_gross"
              ),
              svg: largeWardrobeIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.dressingTable}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.dressingTable}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.schminkanlage"
              ),
              svg: DressingTableIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.nightstand}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.nightstand}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.nachttisch"
              ),
              svg: NightstandIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.shelf}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.shelf}`,
              inputLabelValue: translate("agent.house_detail_fields.regal"),
              svg: ShelfIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.desk}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.desk}`,
              inputLabelValue: translate("agent.house_detail_fields.pult"),
              svg: DeskIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.plants}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.plants}`,
              inputLabelValue: translate("agent.house_detail_fields.pflanzen"),
              svg: PlantsIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.box}`,
              name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.box}`,
              inputLabelValue: translate("agent.house_detail_fields.box"),
              svg: BoxIconString,
              register,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("agent.house_detail_fields.remark")}`,
        htmlFor: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.descriptions}`,
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        rows: 2,
        id: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.descriptions}`,
        name: `${HouseDetailsFieldsId.bedRoomDetails}.${HouseDetailsFieldsId.descriptions}`,
        register,
      },
    },

    {
      containerClass: "mt-5 mb-2",
      field: {
        type: Field.span,
        id: "test",
        name: "test",
        text: `${translate("agent.house_detail_fields.zimmer_heading")}`,
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] rounded-t-lg px-2 pt-3",
        children: [
          {
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden md:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            containerClass: "",
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden mlg:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] gap-y-2 p-2",
        children: [
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.bed}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.bed}`,
              inputLabelValue: translate("agent.house_detail_fields.bett"),
              svg: BedIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.doubleBed}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.doubleBed}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.doppeltbett"
              ),
              svg: DoublebedIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.armchair}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.armchair}`,
              inputLabelValue: translate("agent.house_detail_fields.sessel"),
              svg: ArmChairIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.smallWardrobe}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.smallWardrobe}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.schrank_klein"
              ),
              svg: SmallWardrobeIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.mediumWardrobe}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.mediumWardrobe}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.schrank_mittel"
              ),
              svg: MediumWardrobeIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.largeWardrobe}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.largeWardrobe}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.schrank_gross"
              ),
              svg: largeWardrobeIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.shelf}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.shelf}`,
              inputLabelValue: translate("agent.house_detail_fields.regal"),
              svg: ShelfIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.desk}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.desk}`,
              inputLabelValue: translate("agent.house_detail_fields.pult"),
              svg: DeskIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.tv}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.tv}`,
              inputLabelValue: translate("agent.house_detail_fields.fernseher"),
              svg: freshnerIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.tvTable}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.tvTable}`,
              inputLabelValue: translate("agent.house_detail_fields.tv_table"),
              svg: TVTableIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.nightstand}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.nightstand}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.nachttisch"
              ),
              svg: NightstandIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.box}`,
              name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.box}`,
              inputLabelValue: translate("agent.house_detail_fields.box"),
              svg: BoxIconString,
              register,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("agent.house_detail_fields.remark")}`,
        htmlFor: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.descriptions}`,
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        rows: 2,
        id: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.descriptions}`,
        name: `${HouseDetailsFieldsId.roomDetails}.${HouseDetailsFieldsId.descriptions}`,
        register,
      },
    },
    {
      containerClass: "mt-5 mb-2",
      field: {
        type: Field.span,
        id: "test",
        name: "test",
        text: `${translate("agent.house_detail_fields.balcony_heading")}`,
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] rounded-t-lg px-2 pt-3",
        children: [
          {
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden md:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            containerClass: "",
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden mlg:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] gap-y-2 p-2",
        children: [
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.grill}`,
              name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.grill}`,
              inputLabelValue: translate("agent.house_detail_fields.grill"),
              svg: GrillIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.table}`,
              name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.table}`,
              inputLabelValue: translate("agent.house_detail_fields.tisch"),
              svg: BalconyTableIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.chairs}`,
              name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.chairs}`,
              inputLabelValue: translate("agent.house_detail_fields.stuhle"),
              svg: ChairsIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.sofa}`,
              name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.sofa}`,
              inputLabelValue: translate("agent.house_detail_fields.sofa"),
              svg: SofaIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.shelf}`,
              name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.shelf}`,
              inputLabelValue: translate("agent.house_detail_fields.regal"),
              svg: ShelfIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.umbrella}`,
              name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.umbrella}`,
              inputLabelValue: translate("agent.house_detail_fields.schirm"),
              svg: UmbrellaIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.pots}`,
              name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.pots}`,
              inputLabelValue: translate("agent.house_detail_fields.topfe"),
              svg: PostIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.plants}`,
              name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.plants}`,
              inputLabelValue: translate("agent.house_detail_fields.pflanzen"),
              svg: PlantsIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.herbGarden}`,
              name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.herbGarden}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.krauterbeet"
              ),
              svg: HerbgardenIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.lawnmower}`,
              name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.lawnmower}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.rasenmaher"
              ),
              svg: LawnmoverIconString,
              register,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("agent.house_detail_fields.remark")}`,
        htmlFor: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.descriptions}`,
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        rows: 2,
        id: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.descriptions}`,
        name: `${HouseDetailsFieldsId.outDoorDetails}.${HouseDetailsFieldsId.descriptions}`,
        register,
      },
    },

    {
      containerClass: "mt-5 mb-2",
      field: {
        type: Field.span,
        id: "test",
        name: "test",
        text: `${translate("agent.house_detail_fields.keller_heading")}`,
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] rounded-t-lg px-2 pt-3",
        children: [
          {
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden md:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            containerClass: "",
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden mlg:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] gap-y-2 p-2",
        children: [
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.washingMachine}`,
              name: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.washingMachine}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.washchmashine"
              ),
              svg: WashingMachineIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.tumbler}`,
              name: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.tumbler}`,
              inputLabelValue: translate("agent.house_detail_fields.Tumbler"),
              svg: TumblerIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.shelf}`,
              name: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.shelf}`,
              inputLabelValue: translate("agent.house_detail_fields.regal"),
              svg: ShelfIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.disposal}`,
              name: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.disposal}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.entsorgungen"
              ),
              svg: DisposalIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.bicycle}`,
              name: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.bicycle}`,
              inputLabelValue: translate("agent.house_detail_fields.fahrrad"),
              svg: BicycleIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.stroller}`,
              name: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.stroller}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.kinderwagen"
              ),
              svg: StrollerIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.furniture}`,
              name: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.furniture}`,
              inputLabelValue: translate("agent.house_detail_fields.mobel"),
              svg: FurnitureIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.boxes}`,
              name: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.boxes}`,
              inputLabelValue: translate("agent.house_detail_fields.boxen"),
              svg: BoxesIconString,
              register,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("agent.house_detail_fields.remark")}`,
        htmlFor: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.descriptions}`,
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        rows: 2,
        id: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.descriptions}`,
        name: `${HouseDetailsFieldsId.basementAtticDetails}.${HouseDetailsFieldsId.descriptions}`,
        register,
      },
    },

    {
      containerClass: "mt-5 mb-2",
      field: {
        type: Field.span,
        id: "test",
        name: "test",
        text: `${translate("agent.house_detail_fields.speziell")}`,
      },
    },

    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] rounded-t-lg px-2 pt-3",
        children: [
          {
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden md:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
          {
            containerClass: "",
            field: {
              type: Field.div,
              id: "div-field",
              className:
                "hidden mlg:flex items-center justify-between mb-[14px]",
              children: [
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.item")}`,
                  },
                },
                {
                  containerClass: "mb-0",
                  field: {
                    type: Field.span,
                    id: "test",
                    name: "test",
                    text: `${translate("agent.house_detail_fields.qty")}`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      field: {
        type: Field.div,
        id: "div-field",
        className:
          "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] gap-y-2 p-2",
        children: [
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.aquarium}`,
              name: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.aquarium}`,
              inputLabelValue: translate("agent.house_detail_fields.aquarium"),
              svg: AquariumIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.piano}`,
              name: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.piano}`,
              inputLabelValue: translate("agent.house_detail_fields.piano"),
              svg: PianoIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.gymEquipment}`,
              name: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.gymEquipment}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.sportgerat"
              ),
              svg: GymIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.electronics}`,
              name: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.electronics}`,
              inputLabelValue: translate(
                "agent.house_detail_fields.elektronisches"
              ),
              svg: ElectronicsIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.pool}`,
              name: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.pool}`,
              inputLabelValue: translate("agent.house_detail_fields.pool"),
              svg: PoolIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.safe}`,
              name: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.safe}`,
              inputLabelValue: translate("agent.house_detail_fields.tressor"),
              svg: SafeIconString,
              register,
            },
          },
          {
            field: {
              type: Field.quantityInput,
              inputType: "number",
              id: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.lamp}`,
              name: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.lamp}`,
              inputLabelValue: translate("agent.house_detail_fields.lampe"),
              svg: LampIconString,
              register,
            },
          },
        ],
      },
    },
    {
      containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
      label: {
        text: `${translate("agent.house_detail_fields.remark")}`,
        htmlFor: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.descriptions}`,
        className: "mb-[10px]",
      },
      field: {
        type: Field.textArea,
        className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
        rows: 2,
        id: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.descriptions}`,
        name: `${HouseDetailsFieldsId.specialItemsDetails}.${HouseDetailsFieldsId.descriptions}`,
        register,
      },
    },
  ];

  let allRooms: any[] = generalRoomDetails || [];

  const total = generalRoomDetails?.length || 0;

  for (let i = 0; i < total; i++) {
    const isEditable = i === roomType;
    const mainHeading =
      allRooms[i]?.mainHeading ||
      translate("agent.house_detail_fields.living_room_heading");

    const inputField: FormField = {
      containerClass: "pt-5 mb-2",
      field: {
        type: Field.div,
        id: "div-field",
        className: "flex justify-between ",
        children: [
          {
            containerClass: "mb-0",
            field: {
              type: Field.div,
              id: "div-field",
              className: "flex items-center gap-4",

              children: [
                isEditable
                  ? {
                      containerClass: "mb-0",
                      field: {
                        type: Field.input,
                        className:
                          "!mx-0 !px-2 !border-[#BFBFBF] focus:!border-primary !h-[40px] w-[150px]",
                        id: `generalRoomDetails.${[i]}.mainHeading`,
                        name: `generalRoomDetails.${[i]}.mainHeading`,
                        inputType: "text",
                        value: allRooms[i]?.mainHeading || "",
                        register,
                        onChange: (value) =>
                          handleChangeLabel && handleChangeLabel(value, i),
                      },
                    }
                  : {
                      containerClass: "mb-0",
                      field: {
                        type: Field.span,
                        containerClassName: "min-w-[100px]",
                        id: "test",
                        name: "test",
                        text: mainHeading,
                      },
                    },

                isEditable
                  ? {
                      containerClass: "mb-0",
                      field: {
                        type: Field.button,
                        id: "button",
                        text: translate("common.cancel_button"),
                        className: "!h-[40px] !bg-[transparent] !text-[black]",
                        inputType: "button",
                        onClick: () => onEditTitle && onEditTitle(null),
                      },
                    }
                  : {
                      containerClass: "mb-0",
                      field: {
                        type: Field.icon,
                        id: "button",
                        containerClassName: "!h-[40px]",
                        onClick: () => onEditTitle && onEditTitle(i),
                        icon: EditIconString,
                      },
                    },
              ],
            },
          },
          {
            containerClass: "mb-0",
            field: {
              type: Field.icon,
              id: "button",
              containerClassName: "!h-[40px]",
              onClick: () => onDeleteRoom && onDeleteRoom(i),
              icon: DeleteIconString,
            },
          },
        ],
      },
    };

    formField?.push(
      inputField,
      {
        field: {
          type: Field.div,
          id: "div-field",
          className:
            "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] rounded-t-lg px-2 pt-3",
          children: [
            {
              field: {
                type: Field.div,
                id: "div-field",
                className: "flex items-center justify-between mb-[14px]",
                children: [
                  {
                    containerClass: "mb-0",
                    field: {
                      type: Field.span,
                      id: "test",
                      name: "test",
                      text: `${translate("agent.house_detail_fields.item")}`,
                    },
                  },
                  {
                    containerClass: "mb-0",
                    field: {
                      type: Field.span,
                      id: "test",
                      name: "test",
                      text: `${translate("agent.house_detail_fields.qty")}`,
                    },
                  },
                ],
              },
            },
            {
              field: {
                type: Field.div,
                id: "div-field",
                className:
                  "hidden md:flex items-center justify-between mb-[14px]",
                children: [
                  {
                    containerClass: "mb-0",
                    field: {
                      type: Field.span,
                      id: "test",
                      name: "test",
                      text: `${translate("agent.house_detail_fields.item")}`,
                    },
                  },
                  {
                    containerClass: "mb-0",
                    field: {
                      type: Field.span,
                      id: "test",
                      name: "test",
                      text: `${translate("agent.house_detail_fields.qty")}`,
                    },
                  },
                ],
              },
            },
            {
              containerClass: "",
              field: {
                type: Field.div,
                id: "div-field",
                className:
                  "hidden mlg:flex items-center justify-between mb-[14px]",
                children: [
                  {
                    containerClass: "mb-0",
                    field: {
                      type: Field.span,
                      id: "test",
                      name: "test",
                      text: `${translate("agent.house_detail_fields.item")}`,
                    },
                  },
                  {
                    containerClass: "mb-0",
                    field: {
                      type: Field.span,
                      id: "test",
                      name: "test",
                      text: `${translate("agent.house_detail_fields.qty")}`,
                    },
                  },
                ],
              },
            },
          ],
        },
      },

      {
        field: {
          type: Field.div,
          id: "div-field",
          className:
            "grid grid-cols-1 md:grid-cols-2 mlg:grid-cols-3 bg-[#EDF4FF] md:gap-x-[71px] gap-y-2 px-2 pb-2",
          children: [
            {
              field: {
                type: Field.quantityInput,
                inputType: "number",
                id: `generalRoomDetails.${[i]}.label1Value`,
                name: `generalRoomDetails.${[i]}.label1Value`,
                inputLabelValue: allRooms[i]?.label1,
                // || translate("agent.house_detail_fields.sofa"),
                svg: SofaIconString,
                register,
              },
            },
            {
              field: {
                type: Field.quantityInput,
                inputType: "number",
                id: `generalRoomDetails.${[i]}.label2Value`,
                name: `generalRoomDetails.${[i]}.label2Value`,
                inputLabelValue: allRooms[i]?.label2,
                // inputLabelValue: translate("agent.house_detail_fields.puit"),
                svg: TeacherDeskIconString,
                register,
              },
            },
            {
              field: {
                type: Field.quantityInput,
                inputType: "number",
                id: `generalRoomDetails.${[i]}.label3Value`,
                name: `generalRoomDetails.${[i]}.label3Value`,
                inputLabelValue: allRooms[i]?.label3,
                // inputLabelValue: translate("agent.house_detail_fields.tv_table"),
                svg: TVTableIconString,
                register,
              },
            },
            {
              field: {
                type: Field.quantityInput,
                inputType: "number",
                id: `generalRoomDetails.${[i]}.label4Value`,
                name: `generalRoomDetails.${[i]}.label4Value`,
                inputLabelValue: allRooms[i]?.label4,
                // inputLabelValue: translate("agent.house_detail_fields.sessel"),
                svg: ArmChairIconString,
                register,
              },
            },
            {
              field: {
                type: Field.quantityInput,
                inputType: "number",
                id: `generalRoomDetails.${[i]}.label5Value`,
                name: `generalRoomDetails.${[i]}.label5Value`,
                inputLabelValue: allRooms[i]?.label5,
                // inputLabelValue: translate("agent.house_detail_fields.tisch"),
                svg: TableIconString,
                register,
              },
            },
            {
              field: {
                type: Field.quantityInput,
                inputType: "number",
                id: `generalRoomDetails.${[i]}.label6Value`,
                name: `generalRoomDetails.${[i]}.label6Value`,
                inputLabelValue: allRooms[i]?.label6,
                // inputLabelValue: translate("agent.house_detail_fields.regal"),
                svg: RegalIconString,
                register,
              },
            },
            {
              field: {
                type: Field.quantityInput,
                inputType: "number",
                id: `generalRoomDetails.${[i]}.label7Value`,
                name: `generalRoomDetails.${[i]}.label7Value`,
                inputLabelValue: allRooms[i]?.label7,
                // inputLabelValue: translate("agent.house_detail_fields.l_sofa"),
                svg: LsofaIconString,
                register,
              },
            },
            {
              field: {
                type: Field.quantityInput,
                inputType: "number",
                id: `generalRoomDetails.${[i]}.label8Value`,
                name: `generalRoomDetails.${[i]}.label8Value`,
                inputLabelValue: allRooms[i]?.label8,
                // inputLabelValue: translate("agent.house_detail_fields.fernseher"),
                svg: freshnerIconString,
                register,
              },
            },
            {
              field: {
                type: Field.quantityInput,
                inputType: "number",
                id: `generalRoomDetails.${[i]}.label9Value`,
                name: `generalRoomDetails.${[i]}.label9Value`,
                inputLabelValue: allRooms[i]?.label9,
                // inputLabelValue: translate("agent.house_detail_fields.deco_gross"),
                svg: DecobigIconString,
                register,
              },
            },
            {
              field: {
                type: Field.quantityInput,
                inputType: "number",
                id: `generalRoomDetails.${[i]}.label10Value`,
                name: `generalRoomDetails.${[i]}.label10Value`,
                inputLabelValue: allRooms[i]?.label10,
                // inputLabelValue: translate("agent.house_detail_fields.box"),
                svg: BoxIconString,
                register,
              },
            },
          ],
        },
      },
      {
        containerClass: "mb-0 rounded-b-lg px-2 pb-3 bg-[#EDF4FF]",
        label: {
          text: `${translate("agent.house_detail_fields.remark")}`,
          htmlFor: `generalRoomDetails${[i]}.descriptions`,
          className: "mb-[10px]",
        },
        field: {
          type: Field.textArea,
          className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
          rows: 2,
          id: `generalRoomDetails.${[i]}.descriptions`,
          name: `generalRoomDetails.${[i]}.descriptions`,
          register,
        },
      }
    );
  }

  formField.push({
    containerClass: "mt-[30px]",
    field: {
      type: Field.div,
      id: "div-field",
      className: "flex justify-between flex-row-reverse",
      children: [
        {
          field: {
            type: Field.div,
            id: "div-field",
            className: "flex justify-between items-center space-x-[18px]",
            children: [
              {
                containerClass: "mb-0",
                field: {
                  type: Field.button,
                  id: "button",
                  text: translate("content.details.back_button"),
                  inputType: "button",
                  className:
                    "rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[100px] w-fit !h-10 xMini:!h-[50px] text-dark hover:bg-none",
                  onClick: () =>
                    onHandleBack &&
                    onHandleBack(
                      AppointmentReportsFormStages.CONTACT_AND_ADDRESS
                    ),
                },
              },
              {
                containerClass: "mb-0",
                field: {
                  type: Field.button,
                  id: "button",
                  text: translate("content.details.next_button"),
                  inputType: "submit",
                  className:
                    "rounded-lg px-4 min-w-[100px] xMini:min-w-[152px] w-fit !h-10 xMini:!h-[50px] text-white hover:bg-none",
                  loading,
                },
              },
            ],
          },
        },
        {
          containerClass: "mb-0",
          field: {
            type: Field.button,
            id: "button",
            text: translate("agent.house_detail_fields.add_new_room"),
            inputType: "button",
            className:
              "rounded-lg px-4 min-w-[100px] xMini:min-w-[152px] w-fit !h-10 xMini:!h-[50px] text-white hover:bg-none",
            // loading,
            onClick: () => {
              handleAddNewRoom && handleAddNewRoom();
            },
          },
        },
      ],
    },
  });

  return formField;
};
