import { Country, State } from "@/enums/auth";
import { SideBar, countryType } from "@/types";
import { PaymentsAdmin } from "@/types/admin/payments";
import { Task } from "@/types/contract";

// Function for handling the date format
function parseCustomDate(dateString: string) {
  const separators = ["/", "-"];

  for (const separator of separators) {
    const parts = dateString.split(separator);
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
  }

  // If neither format is matched, return null
  return null;
}

export const countryList: countryType = {
  [Country.Switzerland]: {
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

export const staticEnums: Record<string, any> = {
  User: {
    role: {
      Admin: 0,
      Company: 1,
      Employee: 2,
      Agent: 3,
    },
    salutation: {
      Mr: 0,
      Ms: 1,
      Other: 2,
    },
    status: {
      Block: 0,
      Active: 1,
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
  gender: {
    Male: 0,
    Female: 1,
    Other: 2,
  },
  currency: {
    USD: 0,
    EUR: 1,
    CHF: 2,
  },
  LeadStatus: {
    Open: 0,
    InProcess: 3,
    Close: 1,
    Expired: 2,
  },
  AppointmentStatus: {
    Pending: 0,
    Completed: 1,
    Cancelled: 2,
  },
  MailStatus: {
    pending: 0,
    opend: 1,
    failed: 2,
  },
  open: 0,
  closed: 1,
  expied: 2,
  CustomerType: {
    none: "None",
    individual: 0,
    company: 1,
    // undefined: "Undefined",
  },

  TaskType: {
    Task: 0,
    Appointment: 1,
    Contract: 2,
  },

  Designation: {
    CEO: 0,
    Administration: 1,
    HRManager: 2,
    Agent: 3,
    FinanceManager: 4,
    OperationsManager: 5,
    ITManager: 6,
    MarketingManager: 7,
    SalesManager: 8,
    ProjectManager: 9,
    BusinessAnalyst: 10,
    CustomerSupportRepresentative: 11,
    AdministrativeAssistant: 12,
    Intern: 13,
  },
  OfferStatus: {
    Open: 0,
    Accepted: 1,
    Expired: 2,
    Rejected: 3,
  },
  EmailStatus: {
    Pending: 0,
    Sent: 1,
    Post: 2,
    Failed: 3,
  },
  TaxType: {
    Inclusive: 0,
    Exclusive: 1,
    NoTax: 2,
  },
  PaymentType: {
    Cash: 0,
    Online: 1,
    Twint: 2,
  },

  ContractStatus: {
    Open: 0,
    Confirmed: 1,
    Cancelled: 2,
  },
  ContractSignedStatus: {
    Deprecated: 0,
    Active: 1,
  },
  InvoiceMainStatus: {
    Pending: 0,
    Overdue: 1,
    Paid: 2,
    Open: 3,
    sending: 10,
  },
  InvoiceStatus: {
    Pending: 0,
    Overdue: 1,
    Paid: 2,
    Open: 3,
  },
  Frequency: {
    Weekly: 0,
    FourtennDays: 2,
    Monthly: 3,
    Yearly: 4,
  },
  AmountType: {
    Percent: 0,
    Amount: 1,
  },
  DiscountType: {
    Percent: 0,
    Amount: 1,
  },
  ContractType: {
    indivdual: 0,
    comapny: 1,
  },
  InvoiceType: {
    indivdual: 0,
    comapny: 1,
  },
  FollowUp: {
    Status: {
      Upcoming: 0,
      Pending: 1,
      Overdue: 2,
      today: 10,
      complete: 4,
    },
  },
  ContentStatus: {
    Open: 0,
    Close: 1,
    Expired: 2,
  },
  InvoiceOverDueLimit: {
    "1": 1,
    "2": 2,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "11": 11,
    "12": 12,
    "13": 13,
    "14": 14,
    "15": 15,
    "16": 16,
    "17": 17,
    "18": 18,
    "20": 20,
    "21": 21,
    "22": 22,
    "23": 23,
    "24": 24,
    "25": 25,
    "26": 26,
    "27": 27,
    "28": 28,
    "29": 29,
    "30": 30,
  },
  remainderDays: {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "11": 11,
    "12": 12,
    "13": 13,
    "14": 14,
    "15": 15,
    "16": 16,
    "17": 17,
    "18": 18,
    "20": 20,
    "21": 21,
    "22": 22,
    "23": 23,
    "24": 24,
    "25": 25,
    "26": 26,
    "27": 27,
    "28": 28,
    "29": 29,
    "30": 30,
  },
  SettingStatus: {},
  Country: {
    Switzerland: "countries.swiz",
    Germany: "countries.ger",
    Austria: "countries.aust",
    Italy: "countries.ita",
    France: "countries.fran",
  },
  SupportRequest: {
    pending: 0,
    resolved: 1,
  },
  Gender: {
    Mr: 0,
    Mrs: 1,
  },
  // RejectReason: {
  //   "Cost Concerns": "Cost Concerns",
  //   "Hidden Fees": "Hidden Fees",
  //   "Service Scope": "Service Scope",
  //   "Negative Reviews": "Negative Reviews",
  //   "Unreliable Schedule": "Unreliable Schedule",
  //   "Customer Service": "Customer Service",
  //   "Inadequate Equipment": "Inadequate Equipment",
  //   Other: "Other",
  // },
  RejectReason: {
    "Cost Concerns": "Kostenaspekte",
    "Hidden Fees": "Versteckte Gebühren",
    "Service Scope": "Umfang der Dienstleistung",
    "Negative Reviews": "Negative Bewertunge",
    "Unreliable Schedule": "Unzuverlässiger Zeitplan",
    "Customer Service": "Kundenbetreuung",
    "Inadequate Equipment": "Unzureichende Ausrüstung",
    Other: "Andere",
  },
  LeadSource: {
    Umzugsfuchs: "Umzugsfuchs",
    Webvermarktung: "Webvermarktung",
    "Offerten-365": "Offerten-365",
    Umzugshero: "Umzugshero",
    "Via Call": "via_phone",
  },
};

export const paymentsAdminData: PaymentsAdmin[] = [
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
  {
    id: 1,
    companyName: "CloudMeshSolutions",
    ownerName: "Hamza Naeem",
    plans: "Diamond",
    pricing: "49 CHF",
    payments: "Stripe",
    subscriptionAt: parseCustomDate("15-06-2023"),
    status: "Active",
  },
];

export const sideBar: SideBar[] = [
  {
    icon: "Dashboard",
    title: "sidebar.customer.dashboard",
    pathname: "/dashboard",
    role: [1, 2],
  },
  {
    icon: "Calendar",
    title: "sidebar.customer.calendar",
    pathname: "/calendar",
    role: [1, 2],
  },
  {
    icon: "Dashboard",
    title: "sidebar.admin.dashboard",
    pathname: "/admin/dashboard",
    role: [0],
  },
  {
    icon: "Customers",
    title: "sidebar.customer.customers",
    pathname: "/customers",
    role: [1, 2],
  },

  {
    icon: "Customers",
    title: "sidebar.admin.customers",
    pathname: "/admin/customers",
    role: [0],
    query: "None",
    queryName: "status",
  },
  {
    icon: "Leads",
    title: "sidebar.customer.leads.leads",
    pathname: "/leads",
    role: [1, 2],
    query: "None",
    queryName: "status",
    inner: [
      {
        title: "sidebar.customer.leads.open",
        pathname: "/leads",
        query: "0",
        role: [1, 2],
        queryName: "status",
      },
      {
        title: "sidebar.customer.leads.InProcess",
        pathname: "/leads",
        query: "3",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.leads.close",
        pathname: "/leads",
        query: "1",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.leads.expire",
        pathname: "/leads",
        query: "2",
        queryName: "status",
        role: [1, 2],
      },
    ],
  },

  {
    icon: "Appointments",
    title: "sidebar.customer.appointments.appointment",
    pathname: "/appointments",
    role: [1, 2],
    query: "None",
    queryName: "status",
    inner: [
      {
        title: "sidebar.customer.appointments.pending",
        pathname: "/appointments",
        query: "0",
        role: [1, 2],
        queryName: "status",
      },
      {
        title: "sidebar.customer.appointments.completed",
        pathname: "/appointments",
        query: "1",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.appointments.cancelled",
        pathname: "/appointments",
        query: "2",
        queryName: "status",
        role: [1, 2],
      },
    ],
  },

  // agent route
  {
    icon: "Dashboard",
    title: "sidebar.agent.dashboard",
    pathname: "/agent/dashboard",
    role: [3],
  },
  {
    icon: "Calendar",
    title: "sidebar.customer.calendar",
    pathname: "/agent/calendar",
    role: [3],
  },
  {
    icon: "Leads",
    title: "sidebar.agent.leads.leads",
    pathname: "/agent/leads",
    role: [3],
    query: "None",
    queryName: "status",
    inner: [
      {
        title: "sidebar.agent.leads.open",
        pathname: "/agent/leads",
        query: "0",
        role: [3],
        queryName: "status",
      },
      {
        title: "sidebar.agent.leads.InProcess",
        pathname: "/agent/leads",
        query: "3",
        queryName: "status",
        role: [3],
      },
      {
        title: "sidebar.agent.leads.close",
        pathname: "/agent/leads",
        query: "1",
        queryName: "status",
        role: [3],
      },
      {
        title: "sidebar.agent.leads.expire",
        pathname: "/agent/leads",
        query: "2",
        queryName: "status",
        role: [3],
      },
    ],
  },
  {
    icon: "Appointments",
    title: "sidebar.agent.appointments.appointment",
    pathname: "/agent/appointments",
    role: [3],
    query: "None",
    queryName: "status",
    inner: [
      {
        title: "sidebar.agent.appointments.pending",
        pathname: "/agent/appointments",
        query: "0",
        role: [3],
        queryName: "status",
      },
      {
        title: "sidebar.agent.appointments.completed",
        pathname: "/agent/appointments",
        query: "1",
        queryName: "status",
        role: [3],
      },
      {
        title: "sidebar.agent.appointments.cancelled",
        pathname: "/agent/appointments",
        query: "2",
        queryName: "status",
        role: [3],
      },
    ],
  },
  {
    icon: "Settings",
    title: "sidebar.agent.settings",
    pathname: "/agent/setting",
    role: [3],
  },
  {
    icon: "ContactSupports",
    title: "sidebar.agent.contact_supports",
    pathname: "/agent/contact-support",
    role: [3],
  },

  {
    icon: "Offers",
    title: "sidebar.customer.offers.offers",
    role: [1, 2],
    pathname: "/offers",
    query: "None",
    queryName: "status",
    inner: [
      {
        title: "sidebar.customer.offers.open",
        pathname: "/offers",
        query: "0",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.offers.signed",
        pathname: "/offers",
        query: "1",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.offers.expired",
        pathname: "/offers",
        query: "2",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.offers.rejected",
        pathname: "/offers",
        query: "3",
        queryName: "status",
        role: [1, 2],
      },
    ],
  },
  {
    icon: "Contracts",
    title: "sidebar.customer.contracts.contracts",
    role: [1, 2],
    pathname: "/contract",
    query: "None",
    queryName: "status",
    inner: [
      {
        title: "sidebar.customer.contracts.open",
        pathname: "/contract",
        query: "0",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.contracts.confirmed",
        pathname: "/contract",
        query: "1",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.contracts.cancelled",
        pathname: "/contract",
        query: "2",
        queryName: "status",
        role: [1, 2],
      },
    ],
  },
  {
    icon: "Invoices",
    title: "sidebar.customer.invoices.invoices",
    role: [1, 2],
    pathname: "/invoices",
    query: "None",
    queryName: "status",
    inner: [
      {
        title: "sidebar.customer.invoices.pending",
        pathname: "/invoices",
        query: "0",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.invoices.sending",
        pathname: "/invoices",
        query: "10",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.invoices.open",
        pathname: "/invoices",
        query: "3",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.invoices.overdue",
        pathname: "/invoices",
        query: "1",
        queryName: "status",
        role: [1, 2],
      },
      {
        title: "sidebar.customer.invoices.paid",
        pathname: "/invoices",
        role: [1, 2],
        query: "2",
        queryName: "status",
      },
    ],
  },
  {
    icon: "Services",
    title: "sidebar.customer.services",
    pathname: "/services",
    role: [1, 2],
  },
  {
    icon: "Employees",
    title: "sidebar.customer.employees",
    pathname: "/employees",
    role: [1],
  },
  {
    icon: "Content",
    title: "sidebar.customer.content",
    pathname: "/content",
    role: [1, 2],
  },
  {
    icon: "MailTracker",
    title: "sidebar.customer.mail_tracker",
    pathname: "/email-tracker",
    query: "None",
    queryName: "mailStatus",
    role: [1, 2],
  },
  {
    icon: "Settings",
    title: "sidebar.customer.settings",
    pathname: "/setting",
    role: [1],
  },

  {
    icon: "plans",
    title: "sidebar.admin.plans",
    pathname: "/admin/plans",
    role: [0],
  },
  {
    icon: "payment",
    title: "sidebar.admin.payments",
    pathname: "/admin/payments",
    role: [],
  },
  {
    icon: "ContactSupports",
    title: "sidebar.customer.contact_supports",
    pathname: "/contact-support",
    role: [1, 2],
  },
  {
    icon: "ContactSupports",
    title: "sidebar.admin.support_requests",
    pathname: "/admin/support-request",
    role: [0],
  },
  {
    icon: "dummy",
    role: [],
    title: "",
    query: "1",
    queryName: "page",
  },
  {
    className: " ",
    icon: "setting",
    title: "sidebar.admin.Settings",
    pathname: "/admin/settings",
    role: [0],
  },
];

export const DEFAULT_CUSTOMER = {
  id: 0,
  refID: "",
  createdAt: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  date: "",
  mobileNumber: "",
  status: "",
  editImg: "",
  editNote: "",
  customerType: "",
  companyName: "",
  mobile: "",
  address: {
    streetNumber: "",
    country: "",
    postalCode: "",
  },
  edit: false,
  lead: {
    id: "",
    name: "",
    source: "",
    status: "",
    expires: "",
  },
};

// export const DEFAULT_CONTACT_SUPPORT = {
//   reason: "",
//   message: "",
//   id: "",
//   createdAt: "",
//   createdBy: {
//     id: "",
//     email: "",
//     status: "",
//     role: "",
//     employee: "",
//     createdAt: "",
//     company: "",
//     fullName: "",
//     isProfileComplete: false,
//     isEmailVerified: false,
//     refID: "",
//     plan: {
//       planName: "",
//       monthlyPrice: 0,
//       discount: 0,
//       numberOfEmployees: 0,
//       numberOfRequests: 0,
//       accountingReport: false,
//       customizedEmail: false,
//       watermark: false,
//       apiFeatures: false,
//       description: "",
//       id: "",
//       refID: "",
//       yearlyPrice: 0,
//       createdAt: "",
//     },
//   },
//   status: "",
//   refID: "",
// };
export const DEFAULT_EMPLOYEE = {
  id: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  mobileNumber: "",
  designation: "",
  creationDate: "",
  action: "",
  employeeID: "",
  createdBy: "",
  picture: "",
};

export const DEFAULT_FOLLOWUP = {
  id: "",
  dateAndTime: "",
  title: "",
  status: "",
  delete: "",
  details: "",
  dateTime: "",
  customer: {
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    createdOn: "",
    location: "",
    type: "",
    refID: "",
  },
};

export const DEFAULT_LEAD = {
  id: "",
  refID: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  date: "",
  mobileNumber: "",
  status: "",
  editImg: "",
  editNote: "",
  customerType: "",
  companyName: "",
  mobile: "",
  address: {
    streetNumber: "",
    country: "",
    postalCode: "",
  },
  edit: false,
  lead: {
    id: "",
    name: "",
    source: "",
    status: "",
    expires: "",
  },
  leadStatus: "",
  images: [""],
  createdAt: "",
};

export const DEFAULT_SERVICE = {
  id: "",
  serviceName: "",
  unit: 0,
  createdOn: "",
  price: 0,
  description: "",
  createdAt: "",
};

export const DEFAULT_CONTENT = {
  refID: "",
  contentName: "",
  id: "",
  name: "",
  contentTitle: "",
  createdOn: "",
  createdAt: "",

  offerContent: {
    name: "",
    address: [""],
    title: "",
    description: "",
    body: "",
    attachments: [""],
  },
  confirmationContent: {
    title: "",
    description: "",
    body: "",
    attachments: [""],
  },
  invoiceContent: {
    title: "",
    description: "",
    body: "",
    attachments: [""],
  },
  receiptContent: {
    title: "",
    description: "",
    body: "",
    attachments: [""],
  },
  stage: 0,
  createdBy: "",
};

export const DEFAULT_OFFER = {
  id: "",
  customer: "",
  offerTitle: "",
  totalPrice: "",
  createdOn: "",
  email: "",
  payment: "",
  status: "",
  type: "",
};

export const DEFAULT_CONTRACT = {
  id: "",
  customer: "",
  offerTitle: "",
  totalPrice: "",
  createdOn: "",
  email: "",
  payment: "",
  status: "",
  type: "",
};

export const DEFAULT_CONTRACT_TASK: Task = {
  id: "",
  taskID: "",
  isContrcatCreated: false,
  title: "",
  date: [
    {
      startDate: "",
      endDate: "",
    },
  ],
  isAllDay: true,
  colour: "",
  createdAt: "",
  createdBy: {
    id: "",
    fullName: "",
    company: {
      id: "",
      companyName: "",
    },
  },
  note: "",
  alertTime: 0,
  address: {
    streetNumber: "",
    postalCode: "",
    country: "",
  },
  type: "",
  contractID: "",
};

export const DEFAULT_INVOICE = {
  id: "",
  invoiceNumber: "",
  customer: "",
  invoiceTitle: "",
  totalPrice: "",
  emailStatus: "",
  paid: {
    initialValue: "",
    finalValue: "",
  },
  status: "",
  editNote: "",
  type: "",
};

export const HeaderLabelNr = {
  contract: "pdf.label_nr_contract",
  invoice: "pdf.label_nr_invoice",
  receipt: "pdf.label_nr_receipt",
};

export const HeaderLabel = {
  contract: "pdf.label_contract",
  invoice: "pdf.label_invoice",
  receipt: "pdf.label_receipt",
};

export const GenderLabel = {
  Mr: "Herr",
  Mrs: "Frau",
};

export const DEFAULT_CONTACT_SUPPORT = {
  id: "",
  message: "",
  reason: "",
  refID: "",
  status: "",
  createdBy: {
    company: {
      companyName: "",
      id: "",
    },
    fullName: "",
    id: "",
  },
};

export const DEFAULT_APPOINTMETNS = {
  id: "",
  date: "",
  isReportSubmitted: "",
  startTime: "",
  endTime: "",
  leadID: {
    id: "",
    refID: "",
    isOfferCreated: "",
    customerDetail: {
      gender: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      mobileNumber: "",
      customerType: "",
      address: {
        streetNumber: "",
        postalCode: "",
        country: "",
      },
      companyName: "",
    },
  },
  agent: {
    id: "",
    picture: "",
    fullName: "",
  },
  appointmentRouter: "",
  createdAt: "",
  createdBy: {
    id: "",
    fullName: "",
    company: {
      id: "",
      companyName: "",
    },
  },
};

export const DEFAULT_REPOT = {
  id: "",
  createdAt: "",
  // livingRoomDetails: {
  //   grill: 1,
  //   table: 1,
  //   chairs: 1,
  //   sofa: 1,
  //   shelf: 1,
  //   umbrella: 1,
  //   pots: 1,
  //   plants: 1,
  //   herbGarden: 1,
  //   lawnmower: 1,
  //   descriptions: "",
  // },
  generalRoomDetails: [],
  kitchenDetails: {
    oven: 1,
    refrigerator: 1,
    freezer: 1,
    stove: 1,
    microwave: 1,
    coffeeMachine: 1,
    washingMachine: 1,
    tumbler: 1,
    shelf: 1,
    box: 1,
    descriptions: "",
  },
  bedRoomDetails: {
    bed: 1,
    doubleBed: 1,
    armchair: 1,
    smallWardrobe: 1,
    mediumWardrobe: 1,
    largeWardrobe: 1,
    dressingTable: 1,
    nightstand: 1,
    shelf: 1,
    desk: 1,
    plants: 1,
    box: 1,
    descriptions: "",
  },
  roomDetails: {
    bed: 1,
    doubleBed: 1,
    armchair: 1,
    smallWardrobe: 1,
    mediumWardrobe: 1,
    largeWardrobe: 1,
    shelf: 1,
    desk: 1,
    tv: 1,
    tvTable: 1,
    nightstand: 1,
    box: 1,
    descriptions: "",
  },
  basementAtticDetails: {
    washingMachine: 1,
    tumbler: 1,
    shelf: 1,
    disposal: 1,
    bicycle: 1,
    stroller: 1,
    furniture: 1,
    boxes: 1,
    descriptions: "",
  },
  specialItemsDetails: {
    aquarium: 1,
    piano: 1,
    gymEquipment: 1,
    electronics: 1,
    pool: 1,
    safe: 1,
    lamp: 1,
    descriptions: "",
  },
  appointmentID: {
    id: "",
    date: "",
    isReportSubmitted: false,
    startTime: "",
    endTime: "",
    leadID: {
      id: "",
      refID: "",
      isOfferCreated: false,
      customerDetail: {
        gender: 0,
        fullName: "",
        email: "",
        phoneNumber: "",
        mobileNumber: "",
        customerType: 0,
        address: {
          streetNumber: "",
          postalCode: "",
          country: "",
        },
      },
    },
    agent: {
      id: "",
      picture: "",
      fullName: "",
    },
    appointmentStatus: "",
    createdAt: "",
    createdBy: {
      id: "",
      fullName: "",
      company: {
        id: "",
        companyName: "",
      },
    },
  },
  addressID: {
    id: "",
    address: [
      {
        streetNumber: "",
        postalCode: "",
        country: "",
        description: "",
        floor: "",
        room: "",
        lift: false,
      },
    ],
    createdBy: {
      id: "",
      fullName: "",
    },
    createdAt: "",
  },
};

export const hoursArr = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];

export const minsArr = ["00", "15", "30", "45"];

// export const itemImages = {
//   sofa: sofaIcon,
//   teacherDesk: teacherDesckIcon,
//   tvTable: tvTableIcon,
//   armchair: armChairIcon,
//   table: tableIcon,
//   shelf: shelfIcon,
//   LSofa: lSofaIcon,
//   TV: tvIcon,
//   decoBig: decoGrossIcon,
//   box: boxIcon,
//   oven: ovenIcon,
//   refrigerator: refrigeratorIcon,
//   freezer: freezerIcon,
//   stove: herdIcon,
//   microwave: microOvenIcon,
//   coffeeMachine: coffeMacIcon,
//   washingMachine: washMacIcon,
//   tumbler: tumblerIcon,
//   bed: bedIcon,
//   doubleBed: doublebedIcon,
//   smallWardrobesmallWardrobe: singWoodDrobeIcon,
//   mediumWardrobe: medWoodDrobeIcon,
//   largeWardrobe: largeWoodDrobeIcon,
//   dressingTable: macupTableIcon,
//   nightstand: tableIcon,
//   desk: deskIcon,
//   plants: plantIcon,
//   tv: tvIcon,
//   grill: grillIcon,
//   chairs: chairIcon,
//   umbrella: umbellaIcon,
//   pots: cupIcon,
//   herbGarden: grossyIcon,
//   lawnmower: gymEquIcon,
//   disposal: disposibleIcon,
//   bicycle: cycleIcon,
//   stroller: chilWalkerIcon,
//   furniture: mobelIcon,
//   boxes: boxIcon,
//   aquarium: aquairumIcon,
//   piano: pianoIcon,
//   gymEquipment: gymSportIcon,
//   electronics: electronicsIcon,
//   pool: poolIcon,
//   safe: safeIcon,
//   lamp: lampIcon,
// };
