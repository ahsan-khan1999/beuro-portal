import { staticEnums } from "@/utils/static";
import { AddressID } from "./leads";
import { OfferServiceDetails } from "./offers";

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
    oven: string;
    refrigerator: string;
    freezer: string;
    stove: string;
    microwave: string;
    coffeeMachine: string;
    washingMachine: string;
    tumbler: string;
    shelf: string;
    box: string;
    descriptions: string;
  };
  bedRoomDetails: {
    bed: string;
    doubleBed: string;
    armchair: string;
    smallWardrobe: string;
    mediumWardrobe: string;
    largeWardrobe: string;
    dressingTable: string;
    nightstand: string;
    shelf: string;
    desk: string;
    plants: string;
    box: string;
    descriptions: string;
  };
  roomDetails: {
    bed: string;
    doubleBed: string;
    armchair: string;
    smallWardrobe: string;
    mediumWardrobe: string;
    largeWardrobe: string;
    shelf: string;
    desk: string;
    tv: string;
    tvTable: string;
    nightstand: string;
    box: string;
    descriptions: string;
  };
  basementAtticDetails: {
    washingMachine: string;
    tumbler: string;
    shelf: string;
    disposal: string;
    bicycle: string;
    stroller: string;
    furniture: string;
    boxes: string;
    descriptions: string;
  };
  specialItemsDetails: {
    aquarium: string;
    piano: string;
    gymEquipment: string;
    electronics: string;
    pool: string;
    safe: string;
    lamp: string;
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
