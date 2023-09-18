import { Country, State } from "@/enums/auth";
import { countryType } from "@/types";
import personalDetailsIcon from "@/assets/personel-details-icon.png";
import securityIcon from "@/assets/security-icon.png";
import locationIcon from "@/assets/location-icon.png";
import paymentIcon from "@/assets/payments-icon.png";
import notificationIcon from "@/assets/notifications-icon.png";

export const countryList: countryType =
{
    [Country.Swizterland]:
    {
        [State.state]: [
            {
                label: "Zürich",
                value: "Zürich",
                key: "Zürich"
            },
            {
                label: "Bern",
                value: "Bern",
                key: "Bern"
            },
            {
                label: "Luzern",
                value: "Luzern",
                key: "Luzern"
            },
            {
                label: "Uri",
                value: "Uri",
                key: "Uri"
            }, {
                label: "Schwyz",
                value: "Schwyz",
                key: "Schwyz"
            }, {
                label: "Obwalden",
                value: "Obwalden",
                key: "Obwalden"
            }, {
                label: "Nidwalden",
                value: "Nidwalden",
                key: "Nidwalden"
            }, {
                label: "Glarus",
                value: "Glarus",
                key: "Glarus"
            }, {
                label: "Zug",
                value: "Zug",
                key: "Zug"
            }, {
                label: "Fribourg",
                value: "Fribourg",
                key: "Fribourg"
            }, {
                label: "Solothurn",
                value: "Solothurn",
                key: "Solothurn"
            }, {
                label: "Basel",
                value: "Basel",
                key: "Basel"
            }, {
                label: "Schaffhausen",
                value: "Schaffhausen",
                key: "Schaffhausen"
            }, {
                label: "Appenzell Ausserrhoden",
                value: "Appenzell Ausserrhoden",
                key: "Appenzell Ausserrhoden"
            }, {
                label: "Appenzell Innerrhoden",
                value: "Appenzell Innerrhoden",
                key: "Appenzell Innerrhoden"
            }, {
                label: "St. Gallen",
                value: "St. Gallen",
                key: "St. Gallen"
            }, {
                label: "Graubünden",
                value: "Graubünden",
                key: "Graubünden"
            }, {
                label: "Aargau",
                value: "Aargau",
                key: "Aargau"
            }, {
                label: "Thurgau",
                value: "Thurgau",
                key: "Thurgau"
            }, {
                label: "Ticino",
                value: "Ticino",
                key: "Ticino"
            }, {
                label: "Vaud",
                value: "Vaud",
                key: "Vaud"
            }, {
                label: "Valais",
                value: "Valais",
                key: "Valais"
            }, {
                label: "Neuchâtel",
                value: "Neuchâtel",
                key: "Neuchâtel"
            }
            , {
                label: "Genève",
                value: "Genève",
                key: "Genève"
            }
            , {
                label: "Jura",
                value: "Jura",
                key: "Jura"
            }
        ]
    },
    [Country.Germany]: {
        [State.state]: [
            {
                label: "Baden-Württemberg",
                value: "Baden-Württemberg",
                key: "Baden-Württemberg"
            },
            {
                label: "Bavaria",
                value: "Bavaria",
                key: "Bavaria"
            },
            {
                label: "Berlin",
                value: "Berlin",
                key: "Berlin"
            },
            {
                label: "Brandenburg",
                value: "Brandenburg",
                key: "Brandenburg"
            },
            {
                label: "Bremen",
                value: "Bremen",
                key: "Bremen"
            },
            {
                label: "Hamburg",
                value: "Hamburg",
                key: "Hamburg"
            },
            {
                label: "Hesse",
                value: "Hesse",
                key: "Hesse"
            },
            {
                label: "Lower Saxony",
                value: "Lower Saxony",
                key: "Lower Saxony"
            },
            {
                label: "Mecklenburg-Vorpommern",
                value: "Mecklenburg-Vorpommern",
                key: "Mecklenburg-Vorpommern"
            },
            {
                label: "North Rhine-Westphalia",
                value: "North Rhine-Westphalia",
                key: "North Rhine-Westphalia"
            },
            {
                label: "Rhineland-Palatinate",
                value: "Rhineland-Palatinate",
                key: "Rhineland-Palatinate"
            },
            {
                label: "Saarland",
                value: "Saarland",
                key: "Saarland"
            },
            {
                label: "Saxony",
                value: "Saxony",
                key: "Saxony"
            },
            {
                label: "Saxony-Anhalt",
                value: "Saxony-Anhalt",
                key: "Saxony-Anhalt"
            },
            {
                label: "Schleswig-Holstein",
                value: "Schleswig-Holstein",
                key: "Schleswig-Holstein"
            },
            {
                label: "Thuringia",
                value: "Thuringia",
                key: "Thuringia"
            }
        ]
    },
    [Country.Austria]: {
        [State.state]: [
            {
                label: "Burgenland",
                value: "Burgenland",
                key: "Burgenland"
            },
            {
                label: "Carinthia",
                value: "Carinthia",
                key: "Carinthia"
            },
            {
                label: "Lower Austria",
                value: "Lower Austria",
                key: "Lower Austria"
            },
            {
                label: "Upper Austria",
                value: "Upper Austria",
                key: "Upper Austria"
            },
            {
                label: "Salzburg",
                value: "Salzburg",
                key: "Salzburg"
            },
            {
                label: "Styria",
                value: "Styria",
                key: "Styria"
            },
            {
                label: "Tyrol",
                value: "Tyrol",
                key: "Tyrol"
            },
            {
                label: "Vorarlberg",
                value: "Vorarlberg",
                key: "Vorarlberg"
            },
            {
                label: "Vienna",
                value: "Vienna",
                key: "Vienna"
            }
        ]
    },
    [Country.Italy]: {
        [State.state]: [
            {
                label: "Abruzzo",
                value: "Abruzzo",
                key: "Abruzzo"
            },
            {
                label: "Aosta Valley",
                value: "Aosta Valley",
                key: "Aosta Valley"
            },
            {
                label: "Apulia",
                value: "Apulia",
                key: "Apulia"
            },
            {
                label: "Basilicata",
                value: "Basilicata",
                key: "Basilicata"
            },
            {
                label: "Calabria",
                value: "Calabria",
                key: "Calabria"
            },
            {
                label: "Campania",
                value: "Campania",
                key: "Campania"
            },
            {
                label: "Emilia-Romagna",
                value: "Emilia-Romagna",
                key: "Emilia-Romagna"
            },
            {
                label: "Friuli Venezia Giulia",
                value: "Friuli Venezia Giulia",
                key: "Friuli Venezia Giulia"
            },
            {
                label: "Lazio",
                value: "Lazio",
                key: "Lazio"
            },
            {
                label: "Liguria",
                value: "Liguria",
                key: "Liguria"
            },
            {
                label: "Lombardy",
                value: "Lombardy",
                key: "Lombardy"
            },
            {
                label: "Marche",
                value: "Marche",
                key: "Marche"
            },
            {
                label: "Molise",
                value: "Molise",
                key: "Molise"
            },
            {
                label: "Piedmont",
                value: "Piedmont",
                key: "Piedmont"
            },
            {
                label: "Sardinia",
                value: "Sardinia",
                key: "Sardinia"
            },
            {
                label: "Sicily",
                value: "Sicily",
                key: "Sicily"
            },
            {
                label: "Trentino-Alto Adige",
                value: "Trentino-Alto Adige",
                key: "Trentino-Alto Adige"
            },
            {
                label: "Tuscany",
                value: "Tuscany",
                key: "Tuscany"
            },
            {
                label: "Umbria",
                value: "Umbria",
                key: "Umbria"
            },
            {
                label: "Veneto",
                value: "Veneto",
                key: "Veneto"
            }
        ]
    },
    [Country.France]: {
        [State.state]: [
            {
                label: "Zürich",
                value: "Zürich",
                key: "Zürich"
            },
            {
                label: "Bern",
                value: "Bern",
                key: "Bern"
            },
            {
                label: "Luzern",
                value: "Luzern",
                key: "Luzern"
            },
            {
                label: "Uri",
                value: "Uri",
                key: "Uri"
            }, {
                label: "Schwyz",
                value: "Schwyz",
                key: "Schwyz"
            }, {
                label: "Obwalden",
                value: "Obwalden",
                key: "Obwalden"
            }, {
                label: "Nidwalden",
                value: "Nidwalden",
                key: "Nidwalden"
            }, {
                label: "Glarus",
                value: "Glarus",
                key: "Glarus"
            }, {
                label: "Zug",
                value: "Zug",
                key: "Zug"
            }, {
                label: "Fribourg",
                value: "Fribourg",
                key: "Fribourg"
            }, {
                label: "Solothurn",
                value: "Solothurn",
                key: "Solothurn"
            }, {
                label: "Basel",
                value: "Basel",
                key: "Basel"
            }, {
                label: "Schaffhausen",
                value: "Schaffhausen",
                key: "Schaffhausen"
            }, {
                label: "Appenzell Ausserrhoden",
                value: "Appenzell Ausserrhoden",
                key: "Appenzell Ausserrhoden"
            }, {
                label: "Appenzell Innerrhoden",
                value: "Appenzell Innerrhoden",
                key: "Appenzell Innerrhoden"
            }, {
                label: "St. Gallen",
                value: "St. Gallen",
                key: "St. Gallen"
            }, {
                label: "Graubünden",
                value: "Graubünden",
                key: "Graubünden"
            }, {
                label: "Aargau",
                value: "Aargau",
                key: "Aargau"
            }, {
                label: "Thurgau",
                value: "Thurgau",
                key: "Thurgau"
            }, {
                label: "Ticino",
                value: "Ticino",
                key: "Ticino"
            }, {
                label: "Vaud",
                value: "Vaud",
                key: "Vaud"
            }, {
                label: "Valais",
                value: "Valais",
                key: "Valais"
            }, {
                label: "Neuchâtel",
                value: "Neuchâtel",
                key: "Neuchâtel"
            }
            , {
                label: "Genève",
                value: "Genève",
                key: "Genève"
            }
            , {
                label: "Jura",
                value: "Jura",
                key: "Jura"
            }
        ]
    },
}
export const staticEnums = {
    "User": {
        "role": {
            "Admin": 0,
            "Private": 1,
            "Commercial": 2
        },
        "salutation": {
            "Mr": 0,
            "Ms": 1,
            "Other": 2
        },
        "accountStatus": {
            "blocked": 0,
            "active": 1,
            "deactivated": 2
        },
        "oAuthIds": {
            "google": "google",
            "facebook": "facebook",
            "apple": "apple"
        },
        "idVerificationStatus": {
            "notSubmitted": 0,
            "submittedProcessing": 1,
            "approved": 2,
            "rejected": 3
        }
    },
    "OTP": {
        "purpose": {
            "resetPwd": 0,
            "emailVerification": 1,
            "phoneVerification": 2
        }
    },
    "IdVerificationRequest": {
        "typeOfDocument": {
            "drivingLicense": 0,
            "passport": 1,
            "idCard": 2
        },
        "status": {
            "pending": 0,
            "approved": 1,
            "rejected": 2,
            "deprecated": 3
        }
    },
    "CommercialSellerRequest": {
        "status": {
            "pending": 0,
            "approved": 1,
            "rejected": 2
        }
    },
    "gender": {
        "Male": 0,
        "Female": 1,
        "Other": 2
    }
}


export const USER_ACCOUNT_CARDS = [
    {
      link: "/user-account-settings/personal-details",
      imageSrc: personalDetailsIcon,
      imageAlt: "Personal Details Icon",
      title: "Persönliche Details",
      description: 'Lorem Ipsum has been the industry"s standard dummy.',
      role: [0, 1]
    },
    {
      link: "/user-account-settings/login-and-security-settings",
      imageSrc: securityIcon,
      imageAlt: "Security Icon",
      title: "Anmeldung und Sicherheit",
      description: 'Lorem Ipsum has been the industry"s standard dummy.',
      role: [1, 2]
  
    },
    {
      link: "/user-account-settings/address-settings",
      imageSrc: locationIcon,
      imageAlt: "location Icon",
      title: "Adresseinstellungen",
      description: 'Lorem Ipsum has been the industry"s standard dummy.',
      role: [1, 2]
  
    },
    {
      link: "/user-account-settings/payment-settings",
      imageSrc: paymentIcon,
      imageAlt: "payment Icon",
      title: "Zahlungen",
      description: 'Lorem Ipsum has been the industry"s standard dummy.',
      role: [1, 2]
  
    },
    {
      link: "/user-account-settings/notification-settings",
      imageSrc: notificationIcon,
      imageAlt: "notification Icon",
      title: "Benachrichtigungen",
      description: 'Lorem Ipsum has been the industry"s standard dummy.',
      role: [1, 2]
  
    },
    {
      link: "/user-account-settings/commercial-seller",
      imageSrc: notificationIcon,
      imageAlt: "notification Icon",
      title: "Details zur Firma",
      description: 'Lorem Ipsum has been the industry"s standard dummy.',
      role: [2]
  
    },
  ];


  