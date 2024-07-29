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
  };
  agent: {
    id: string;
    picture: string;
    fullName: string;
  };
  appointmentStatus: string;
  createdAt: string;
}
