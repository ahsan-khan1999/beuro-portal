import { AddressID } from "./leads";

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
  livingRoomDetails: {
    grill: string;
    table: string;
    chairs: string;
    sofa: string;
    shelf: string;
    umbrella: string;
    pots: string;
    plants: string;
    herbGarden: string;
    lawnmower: string;
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
  addressID: {
    id: string;
    address: [
      {
        streetNumber: string;
        postalCode: string;
        country: string;
        description: string;
        floor: string;
        room: string;
        lift: false;
      }
    ];
    createdBy: {
      id: string;
      fullName: string;
    };
    createdAt: string;
  };
}
