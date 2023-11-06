import { Country, State } from "@/enums/auth";
import { SideBar, countryType } from "@/types";
import { Customers } from "@/types/customer";
import { LeadsTableRowTypes } from "@/types/leads";
import editImage from "@/assets/svgs/edit_image.svg";
import editNote from "@/assets/svgs/Edit_note.svg";
import { OffersTableRowTypes } from "@/types/offers";
import { contractTableTypes } from "@/types/contract";
import { InvoiceTableRowTypes } from "@/types/invoice";
import { TRowServices } from "@/types/service";
import { TRowEmployees } from "@/types/employee";
import { ContentTableRowTypes } from "@/types/content";
import { TableRowEmailTracker } from "@/types/emailTracker";
// import personalDetailsIcon from "@/assets/personel-details-icon.png";
// import securityIcon from "@/assets/security-icon.png";
// import locationIcon from "@/assets/location-icon.png";
// import paymentIcon from "@/assets/payments-icon.png";
// import notificationIcon from "@/assets/notifications-icon.png";

// Function for handling the date format
function parseCustomDate(dateString: string) {
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }

  return null;
}

export const countryList: countryType = {
  [Country.Swizterland]: {
    [State.state]: [
      {
        label: "Zürich",
        value: "Zürich",
        key: "Zürich",
      },
      {
        label: "Bern",
        value: "Bern",
        key: "Bern",
      },
      {
        label: "Luzern",
        value: "Luzern",
        key: "Luzern",
      },
      {
        label: "Uri",
        value: "Uri",
        key: "Uri",
      },
      {
        label: "Schwyz",
        value: "Schwyz",
        key: "Schwyz",
      },
      {
        label: "Obwalden",
        value: "Obwalden",
        key: "Obwalden",
      },
      {
        label: "Nidwalden",
        value: "Nidwalden",
        key: "Nidwalden",
      },
      {
        label: "Glarus",
        value: "Glarus",
        key: "Glarus",
      },
      {
        label: "Zug",
        value: "Zug",
        key: "Zug",
      },
      {
        label: "Fribourg",
        value: "Fribourg",
        key: "Fribourg",
      },
      {
        label: "Solothurn",
        value: "Solothurn",
        key: "Solothurn",
      },
      {
        label: "Basel",
        value: "Basel",
        key: "Basel",
      },
      {
        label: "Schaffhausen",
        value: "Schaffhausen",
        key: "Schaffhausen",
      },
      {
        label: "Appenzell Ausserrhoden",
        value: "Appenzell Ausserrhoden",
        key: "Appenzell Ausserrhoden",
      },
      {
        label: "Appenzell Innerrhoden",
        value: "Appenzell Innerrhoden",
        key: "Appenzell Innerrhoden",
      },
      {
        label: "St. Gallen",
        value: "St. Gallen",
        key: "St. Gallen",
      },
      {
        label: "Graubünden",
        value: "Graubünden",
        key: "Graubünden",
      },
      {
        label: "Aargau",
        value: "Aargau",
        key: "Aargau",
      },
      {
        label: "Thurgau",
        value: "Thurgau",
        key: "Thurgau",
      },
      {
        label: "Ticino",
        value: "Ticino",
        key: "Ticino",
      },
      {
        label: "Vaud",
        value: "Vaud",
        key: "Vaud",
      },
      {
        label: "Valais",
        value: "Valais",
        key: "Valais",
      },
      {
        label: "Neuchâtel",
        value: "Neuchâtel",
        key: "Neuchâtel",
      },
      {
        label: "Genève",
        value: "Genève",
        key: "Genève",
      },
      {
        label: "Jura",
        value: "Jura",
        key: "Jura",
      },
    ],
  },
  [Country.Germany]: {
    [State.state]: [
      {
        label: "Baden-Württemberg",
        value: "Baden-Württemberg",
        key: "Baden-Württemberg",
      },
      {
        label: "Bavaria",
        value: "Bavaria",
        key: "Bavaria",
      },
      {
        label: "Berlin",
        value: "Berlin",
        key: "Berlin",
      },
      {
        label: "Brandenburg",
        value: "Brandenburg",
        key: "Brandenburg",
      },
      {
        label: "Bremen",
        value: "Bremen",
        key: "Bremen",
      },
      {
        label: "Hamburg",
        value: "Hamburg",
        key: "Hamburg",
      },
      {
        label: "Hesse",
        value: "Hesse",
        key: "Hesse",
      },
      {
        label: "Lower Saxony",
        value: "Lower Saxony",
        key: "Lower Saxony",
      },
      {
        label: "Mecklenburg-Vorpommern",
        value: "Mecklenburg-Vorpommern",
        key: "Mecklenburg-Vorpommern",
      },
      {
        label: "North Rhine-Westphalia",
        value: "North Rhine-Westphalia",
        key: "North Rhine-Westphalia",
      },
      {
        label: "Rhineland-Palatinate",
        value: "Rhineland-Palatinate",
        key: "Rhineland-Palatinate",
      },
      {
        label: "Saarland",
        value: "Saarland",
        key: "Saarland",
      },
      {
        label: "Saxony",
        value: "Saxony",
        key: "Saxony",
      },
      {
        label: "Saxony-Anhalt",
        value: "Saxony-Anhalt",
        key: "Saxony-Anhalt",
      },
      {
        label: "Schleswig-Holstein",
        value: "Schleswig-Holstein",
        key: "Schleswig-Holstein",
      },
      {
        label: "Thuringia",
        value: "Thuringia",
        key: "Thuringia",
      },
    ],
  },
  [Country.Austria]: {
    [State.state]: [
      {
        label: "Burgenland",
        value: "Burgenland",
        key: "Burgenland",
      },
      {
        label: "Carinthia",
        value: "Carinthia",
        key: "Carinthia",
      },
      {
        label: "Lower Austria",
        value: "Lower Austria",
        key: "Lower Austria",
      },
      {
        label: "Upper Austria",
        value: "Upper Austria",
        key: "Upper Austria",
      },
      {
        label: "Salzburg",
        value: "Salzburg",
        key: "Salzburg",
      },
      {
        label: "Styria",
        value: "Styria",
        key: "Styria",
      },
      {
        label: "Tyrol",
        value: "Tyrol",
        key: "Tyrol",
      },
      {
        label: "Vorarlberg",
        value: "Vorarlberg",
        key: "Vorarlberg",
      },
      {
        label: "Vienna",
        value: "Vienna",
        key: "Vienna",
      },
    ],
  },
  [Country.Italy]: {
    [State.state]: [
      {
        label: "Abruzzo",
        value: "Abruzzo",
        key: "Abruzzo",
      },
      {
        label: "Aosta Valley",
        value: "Aosta Valley",
        key: "Aosta Valley",
      },
      {
        label: "Apulia",
        value: "Apulia",
        key: "Apulia",
      },
      {
        label: "Basilicata",
        value: "Basilicata",
        key: "Basilicata",
      },
      {
        label: "Calabria",
        value: "Calabria",
        key: "Calabria",
      },
      {
        label: "Campania",
        value: "Campania",
        key: "Campania",
      },
      {
        label: "Emilia-Romagna",
        value: "Emilia-Romagna",
        key: "Emilia-Romagna",
      },
      {
        label: "Friuli Venezia Giulia",
        value: "Friuli Venezia Giulia",
        key: "Friuli Venezia Giulia",
      },
      {
        label: "Lazio",
        value: "Lazio",
        key: "Lazio",
      },
      {
        label: "Liguria",
        value: "Liguria",
        key: "Liguria",
      },
      {
        label: "Lombardy",
        value: "Lombardy",
        key: "Lombardy",
      },
      {
        label: "Marche",
        value: "Marche",
        key: "Marche",
      },
      {
        label: "Molise",
        value: "Molise",
        key: "Molise",
      },
      {
        label: "Piedmont",
        value: "Piedmont",
        key: "Piedmont",
      },
      {
        label: "Sardinia",
        value: "Sardinia",
        key: "Sardinia",
      },
      {
        label: "Sicily",
        value: "Sicily",
        key: "Sicily",
      },
      {
        label: "Trentino-Alto Adige",
        value: "Trentino-Alto Adige",
        key: "Trentino-Alto Adige",
      },
      {
        label: "Tuscany",
        value: "Tuscany",
        key: "Tuscany",
      },
      {
        label: "Umbria",
        value: "Umbria",
        key: "Umbria",
      },
      {
        label: "Veneto",
        value: "Veneto",
        key: "Veneto",
      },
    ],
  },
  [Country.France]: {
    [State.state]: [
      {
        label: "Zürich",
        value: "Zürich",
        key: "Zürich",
      },
      {
        label: "Bern",
        value: "Bern",
        key: "Bern",
      },
      {
        label: "Luzern",
        value: "Luzern",
        key: "Luzern",
      },
      {
        label: "Uri",
        value: "Uri",
        key: "Uri",
      },
      {
        label: "Schwyz",
        value: "Schwyz",
        key: "Schwyz",
      },
      {
        label: "Obwalden",
        value: "Obwalden",
        key: "Obwalden",
      },
      {
        label: "Nidwalden",
        value: "Nidwalden",
        key: "Nidwalden",
      },
      {
        label: "Glarus",
        value: "Glarus",
        key: "Glarus",
      },
      {
        label: "Zug",
        value: "Zug",
        key: "Zug",
      },
      {
        label: "Fribourg",
        value: "Fribourg",
        key: "Fribourg",
      },
      {
        label: "Solothurn",
        value: "Solothurn",
        key: "Solothurn",
      },
      {
        label: "Basel",
        value: "Basel",
        key: "Basel",
      },
      {
        label: "Schaffhausen",
        value: "Schaffhausen",
        key: "Schaffhausen",
      },
      {
        label: "Appenzell Ausserrhoden",
        value: "Appenzell Ausserrhoden",
        key: "Appenzell Ausserrhoden",
      },
      {
        label: "Appenzell Innerrhoden",
        value: "Appenzell Innerrhoden",
        key: "Appenzell Innerrhoden",
      },
      {
        label: "St. Gallen",
        value: "St. Gallen",
        key: "St. Gallen",
      },
      {
        label: "Graubünden",
        value: "Graubünden",
        key: "Graubünden",
      },
      {
        label: "Aargau",
        value: "Aargau",
        key: "Aargau",
      },
      {
        label: "Thurgau",
        value: "Thurgau",
        key: "Thurgau",
      },
      {
        label: "Ticino",
        value: "Ticino",
        key: "Ticino",
      },
      {
        label: "Vaud",
        value: "Vaud",
        key: "Vaud",
      },
      {
        label: "Valais",
        value: "Valais",
        key: "Valais",
      },
      {
        label: "Neuchâtel",
        value: "Neuchâtel",
        key: "Neuchâtel",
      },
      {
        label: "Genève",
        value: "Genève",
        key: "Genève",
      },
      {
        label: "Jura",
        value: "Jura",
        key: "Jura",
      },
    ],
  },
};
export const staticEnums = {
  User: {
    role: {
      Admin: 0,
      Private: 1,
      Commercial: 2,
    },
    salutation: {
      Mr: 0,
      Ms: 1,
      Other: 2,
    },
    accountStatus: {
      blocked: 0,
      active: 1,
      deactivated: 2,
    },
    oAuthIds: {
      google: "google",
      facebook: "facebook",
      apple: "apple",
    },
    idVerificationStatus: {
      notSubmitted: 0,
      submittedProcessing: 1,
      approved: 2,
      rejected: 3,
    },
  },
  OTP: {
    purpose: {
      resetPwd: 0,
      emailVerification: 1,
      phoneVerification: 2,
    },
  },
  IdVerificationRequest: {
    typeOfDocument: {
      drivingLicense: 0,
      passport: 1,
      idCard: 2,
    },
    status: {
      pending: 0,
      approved: 1,
      rejected: 2,
      deprecated: 3,
    },
  },
  CommercialSellerRequest: {
    status: {
      pending: 0,
      approved: 1,
      rejected: 2,
    },
  },
  gender: {
    Male: 0,
    Female: 1,
    Other: 2,
  },
};

export const customers: Customers[] = [
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Germany",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 2,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 3,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 4,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 5,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 6,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 7,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 8,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 9,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 10,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 11,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "0215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  {
    id: 12,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "412545214541",
    date: "25/08/2023",
    location: "Islamabad",
    customerType: "Individual",
    address: {
      country: "Switzerland",
      postCode: "12345",
      streetNo: "Zweibrückenstraße, 12",
    },
    companyName: "SwissHelden",
    mobile: "02154512120215451212",
    editImg: "",
    status: "",
    editNote: "",
    lead: {
      id: "054631",
      name: "Hassam",
      source: "Instagram",
      status: "Open",
      expires: "25/08/2023",


    }
  },
  // Add more rows as needed
];
export const leads: LeadsTableRowTypes[] = [
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Close",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Close",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Expired",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Expired",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Expired",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Close",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Close",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: 1,
    name: "Rahal Ahmed",
    email: "Test12@gmail.com",
    phone: "+49 302 1231234",
    createdOn: parseCustomDate("25/08/2023"),
    location: "Islamabad",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },

  // Add more rows as needed
];
export const offersData: OffersTableRowTypes[] = [
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Draft",
    payment: "Cash",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Send",
    payment: "Cash",
    status: "Signed",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Faild",
    payment: "Cash",
    status: "Expired",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Draft",
    payment: "Cash",
    status: "Rejected",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Send",
    payment: "Cash",
    status: "Signed",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Faild",
    payment: "Cash",
    status: "Expired",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Draft",
    payment: "Cash",
    status: "Rejected",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Send",
    payment: "Cash",
    status: "Signed",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Faild",
    payment: "Cash",
    status: "Expired",
    editImg: editImage,
    editNote: editNote,
  },

  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Faild",
    payment: "Cash",
    status: "Expired",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Draft",
    payment: "Cash",
    status: "Rejected",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Send",
    payment: "Cash",
    status: "Signed",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "A-2000",
    customer: "Rahal Ahmed",
    offerTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    email: "Faild",
    payment: "Cash",
    status: "Expired",
    editImg: editImage,
    editNote: editNote,
  },

  // Add more rows as needed
];
export const contractData: contractTableTypes[] = [
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Cash",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Online",
    status: "Confirmed",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Cash",
    status: "Cancelled",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Online",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Online",
    status: "Confirmed",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Cash",
    status: "Cancelled",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Online",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Cash",
    status: "Confirmed",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Online",
    status: "Confirmed",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Cash",
    status: "Cancelled",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Online",
    status: "Confirmed",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Cash",
    status: "Open",
    editImg: editImage,
    editNote: editNote,
  },
  {
    id: "V-2000",
    customer: "Rahal Ahmed",
    contractTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    createdOn: parseCustomDate("25/08/2023"),
    payment: "Online",
    status: "Cancelled",
    editImg: editImage,
    editNote: editNote,
  },

  // Add more rows as needed
];
export const invoicesData: InvoiceTableRowTypes[] = [
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "1/2 Sent",
    paid: {
      initialValue: "300",
      finalValue: "500",
    },
    status: "1 Overdue",
    editNote: editNote,
  },
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "2/2 Sent",
    paid: {
      initialValue: "500",
      finalValue: "300",
    },
    status: "Paid",
    editNote: editNote,
  },
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "1/2 Sent",
    paid: {
      initialValue: "200",
      finalValue: "500",
    },
    status: "Pending",
    editNote: editNote,
  },
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "1/3 Sent",
    paid: {
      initialValue: "500",
      finalValue: "200",
    },
    status: "Paid",
    editNote: editNote,
  },
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "1/2 Sent",
    paid: {
      initialValue: "200",
      finalValue: "500",
    },
    status: "1 Overdue",
    editNote: editNote,
  },
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "2/2 Sent",
    paid: {
      initialValue: "500",
      finalValue: "300",
    },
    status: "Paid",
    editNote: editNote,
  },

  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "1/2 Sent",
    paid: {
      initialValue: "200",
      finalValue: "500",
    },
    status: "Pending",
    editNote: editNote,
  },
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "1/2 Sent",
    paid: {
      initialValue: "300",
      finalValue: "500",
    },
    status: "1 Overdue",
    editNote: editNote,
  },
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "2/2 Sent",
    paid: {
      initialValue: "500",
      finalValue: "300",
    },
    status: "Paid",
    editNote: editNote,
  },
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "1/2 Sent",
    paid: {
      initialValue: "200",
      finalValue: "500",
    },
    status: "Pending",
    editNote: editNote,
  },
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "1/3 Sent",
    paid: {
      initialValue: "500",
      finalValue: "200",
    },
    status: "Paid",
    editNote: editNote,
  },
  {
    id: "R-2000",
    customer: "Rahal Ahmed",
    invoiceTitle: "Umzug Cleaning Service",
    totalPrice: "1000 CHF",
    emailStatus: "1/2 Sent",
    paid: {
      initialValue: "200",
      finalValue: "500",
    },
    status: "1 Overdue",
    editNote: editNote,
  },
  // Add more rows as needed
];
export const servicesData: TRowServices[] = [
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "002",
    service: "Moving",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },

  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
  {
    id: "001",
    service: "Cleaning",
    createdBy: "Ahmed Rahal",
    createdOn: parseCustomDate("25/08/2023"),
    price: {
      value: 300,
      currency: "CHF",
    },
    unit: "Std.",
    description: "We need to move office furniture to.....",
    action: "edit",
  },
];
export const employeesData: TRowEmployees[] = [
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "002",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
  {
    id: "001",
    name: "Rahal Ahmad",
    email: "Test12@gmail.com",
    phone: +49014561235,
    designation: "Islamabad",
    createdOn: parseCustomDate("25/08/2023"),
    action: "edit",
  },
];
export const contentData: ContentTableRowTypes[] = [
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "002",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
  {
    id: "001",
    name: "Text For Contract",
    contentTitle: "Umzug Cleaning Service lrem ipsum dollar smith",
    offer: {
      name: "Text for Offer",
      addressLabels: "Dummy address",
      title: "Dummy title",
      description: "Dummy Description ...............",
      emailBody: "Dummy email body",
      attachmentName: "Dummy attachment Name",
    },
    confirmation: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    invoice: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },
    receipt: {
      title: "dummy title",
      description: "dummy description .......",
      emailBody: "dummy email body",
      attachmentName: "dummy attachment name",
    },

    createdOn: parseCustomDate("25/08/2023"),
  },
];
export const MailTracker: TableRowEmailTracker[] = [
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "open",
      colorClass: "#45C769",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "Pending",
      colorClass: "#FE9244",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "Failed",
      colorClass: "#FF376F",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "open",
      colorClass: "#45C769",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "open",
      colorClass: "#45C769",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "Failed",
      colorClass: "#FF376F",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "Pending",
      colorClass: "#FE9244",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "open",
      colorClass: "#45C769",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "Pending",
      colorClass: "#FE9244",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "open",
      colorClass: "#45C769",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "open",
      colorClass: "#45C769",
    },
  },
  {
    id: 1,
    recipient: "Rahal Ahmed",
    subject: "Test12@gmail.com",
    sendAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    viewedAt: {
      time: "08:34am",
      date: "25/08/2023",
    },
    status: {
      text: "Failed",
      colorClass: "#FF376F",
    },
  },

  // Add more rows as needed
];

export const sideBar: SideBar[] = [
  {
    icon: "Dashboard",
    title: "Dashboard",
    pathname: "/dashboard",
    role: [0, 1],
  },
  {
    icon: "Customers",
    title: "Customers",
    pathname: "/customers",
    role: [0, 1],
  },
  {
    icon: "Leads",
    title: "Leads",
    role: [ 1],
    inner: [
      {
        title: "Open",
        pathname: "/leads?open",

        role: [1],
      },
      {
        title: "Close",
        pathname: "/leads?close",

        role: [ 1],
      },
      {
        title: "Expire",
        pathname: "/leads?expire",

        role: [ 1],
      },
    ],
  },
  {
    icon: "Offers",
    title: "Offers",
    role: [1],

    inner: [
      {
        title: "Accepted",
        pathname: "/offers?accepted",

        role: [ 1],
      },
      {
        title: "Rejected",
        pathname: "/offers?rejected",

        role: [1],
      },
      {
        title: "Pending",
        pathname: "/offers?pending",

        role: [ 1],
      },
    ],
  },
  {
    icon: "Contracts",
    title: "Contracts",
    role: [1],
    inner: [
      {
        title: "Accepted",
        pathname: "/contract?accepted",

        role: [1],
      },
      {
        title: "Rejected",
        pathname: "/contract?rejected",

        role: [ 1],
      },
      {
        title: "Pending",
        pathname: "/contract?pending",

        role: [1],
      },
    ],
  },
  {
    icon: "Invoices",
    title: "Invoices",
    role: [1],
    inner: [
      {
        title: "Accepted",
        pathname: "/invoices?accepted",

        role: [ 1],
      },
      {
        title: "Rejected",
        pathname: "/invoices?rejected",

        role: [ 1],
      },
      {
        title: "Pending",
        pathname: "/invoices?pending",

        role: [1],
      },
    ],
  },
  {
    icon: "Services",
    title: "Services",
    pathname: "/services",
    role: [1],
  },
  {
    icon: "Employees",
    title: "Employees",
    pathname: "/employees",
    role: [ 1],
  },
  {
    icon: "Content",
    title: "Content",
    pathname: "/content",
    role: [ 1],
  },
  {
    icon: "MailTracker",
    title: "Mail Tracker",
    pathname: "/email-tracker",
    role: [1],
    className: "pb-6 border-b border-[#0000001A] ",
  },
  {
    icon: "Settings",
    title: "Settings",
    pathname: "/setting",
    role: [ 1],
    className: "",
  },
  
  {
    icon: "plans",
    title: "Plans",
    pathname: "/plans",
    role: [0],
  },
  {
    icon: "payment",
    title: "Payment",
    pathname: "/payments",
    role: [0],
  },
  {
    icon: "ContactSupports",
    title: "Contact Supports",
    pathname: "/contact-support",
    role: [0,1],
    // className:"mb-6 border-b border-[#0000001A]"
  },
  {
    icon: "dummy",
    role:[0],
    title: "divider",
  },
  {
    className:" ",
    icon: "setting",
    title: "Settings",
    pathname: "/admin-settings",
    role: [0],
  },
  
];
