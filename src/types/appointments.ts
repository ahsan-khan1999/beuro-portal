import { staticEnums } from "@/utils/static";
import { AddressID } from "./leads";
import { OfferServiceDetails } from "./offers";
import { ContentTableRowTypes } from "./content";
import { ReportPDFProps, User } from ".";
import { SystemSetting } from "@/api/slices/settingSlice/settings";

export interface Appointments {
  id: string;
  date: string;
  isReportSubmitted: boolean;
  startTime: string;
  endTime: string;
  leadID: {
    id: string;
    refID: string;
    isAppointmentCreated: boolean;
    isOfferCreated: boolean;
    customerDetail: {
      gender: number;
      fullName: string;
      email: string;
      phoneNumber: string;
      mobileNumber: string;
      customerType: number;
      address: {
        streetNumber: string;
        postalCode: string;
        country: string;
      };
      companyName: string;
    };
    customerID: string;
    otherServices: string[] | ContentTableRowTypes[];
    requiredService: string | ContentTableRowTypes;
    additionalDetails: string;
    createdBy: User;
    desireDate: string;
    addressID: AddressID;
  };
  agent: {
    id: string;
    picture: string;
    fullName: string;
  };
  appointmentStatus: string;
  createdAt: string;
}

export interface Report {
  id: string;
  createdAt: string;
  serviceDetail: OfferServiceDetails;
  customerDetail: {
    email: string;
    fullName: string;
    phoneNumber: string;
  };
  subTotal: number;
  total: number;
  discountAmount: number;
  discountDescription: string;
  isDiscount: boolean;
  isTax: boolean;
  taxType: "Include" | "Exclude";
  taxAmount: number;
  discountType: keyof (typeof staticEnums)["DiscountType"];
  livingRoomDetails: {
    sofa: number;
    teacherDesk: number;
    tvTable: number;
    armchair: number;
    table: number;
    shelf: number;
    LSofa: number;
    TV: number;
    decoBig: number;
    box: number;
    descriptions: string;
  };
  kitchenDetails: {
    oven: number;
    refrigerator: number;
    freezer: number;
    stove: number;
    microwave: number;
    coffeeMachine: number;
    washingMachine: number;
    tumbler: number;
    shelf: number;
    box: number;
    descriptions: string;
  };
  bedRoomDetails: {
    bed: number;
    doubleBed: number;
    armchair: number;
    smallWardrobe: number;
    mediumWardrobe: number;
    largeWardrobe: number;
    dressingTable: number;
    nightstand: number;
    shelf: number;
    desk: number;
    plants: number;
    box: number;
    descriptions: string;
  };
  roomDetails: {
    bed: number;
    doubleBed: number;
    armchair: number;
    smallWardrobe: number;
    mediumWardrobe: number;
    largeWardrobe: number;
    shelf: number;
    desk: number;
    tv: number;
    tvTable: number;
    nightstand: number;
    box: number;
    descriptions: string;
  };
  basementAtticDetails: {
    washingMachine: number;
    tumbler: number;
    shelf: number;
    disposal: number;
    bicycle: number;
    stroller: number;
    furniture: number;
    boxes: number;
    descriptions: string;
  };
  specialItemsDetails: {
    aquarium: number;
    piano: number;
    gymEquipment: number;
    electronics: number;
    pool: number;
    safe: number;
    lamp: number;
    descriptions: string;
  };
  appointmentID: {
    id: string;
    date: string;
    isReportSubmitted: false;
    startTime: string;
    endTime: string;
    leadID: {
      id: string;
      refID: string;
      isOfferCreated: false;
      customerDetail: {
        gender: number;
        fullName: string;
        email: string;
        phoneNumber: string;
        mobileNumber: string;
        customerType: number;
        address: {
          streetNumber: string;
          postalCode: string;
          country: string;
        };
      };
      createdBy: {
        fullName: string;
      };
    };
    agent: {
      id: string;
      picture: string;
      fullName: string;
    };
    appointmentStatus: string;
    createdAt: string;
  };
  outDoorDetails: {
    grill: number;
    table: number;
    chairs: number;
    sofa: number;
    shelf: number;
    umbrella: number;
    pots: number;
    plants: number;
    herbGarden: number;
    lawnmower: number;
    descriptions: string;
  };
  offerDetails: {
    employees: number;
    deliveryVehicle: number;
    hours: number;
    cleaningWithHandoverGuarantee: number;
    broomClean: number;
    priceCHF: number;
    remarks: string;
    noteAndInformation: string;
  };
  addressID: AddressID;
}

export interface ReportPdfProps {
  data: ReportPDFProps;
  language: string;
  systemSetting?: SystemSetting | null;
}
