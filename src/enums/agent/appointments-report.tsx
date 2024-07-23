export enum AppointmentReportsFormStages {
  CONTACT_AND_ADDRESS = "CONTACT_AND_ADDRESS",
  HOUSE_DETAILS = "HOUSE_DETAILS",
  SERVICES = "SERVICES",
  ADDITIONAL_INFO = "ADDITIONAL_INFO",
}

export enum ReportContactDetailsFieldsId {
  NAME = "NAME",
  EMAIL = "EMAIL",
  TELEPHONE = "TELEPHONE",
  MOVE_OUT_STREET_NO = "MOVE_OUT_STREET_NO",
  MOVE_OUT_POSTAL_CODE = "MOVE_OUT_POSTAL_CODE",
  MOVE_OUT_FLOOR = "MOVE_OUT_FLOOR",
  MOVE_OUT_ROOM = "MOVE_OUT_ROOM",
  MOVE_OUT_LIFT = "MOVE_OUT_LIFT",
  MOVE_OUT_PARKING_PERMIT = "MOVE_OUT_PARKING_PERMIT",
  COLLECTION_STREET_NO = "COLLECTION_STREET_NO",
  COLLECTION_POSTAL_CODE = "COLLECTION_POSTAL_CODE",
  COLLECTION_FLOOR = "COLLECTION_FLOOR",
  COLLECTION_ROOM = "COLLECTION_ROOM",
  COLLECTION_LIFT = "COLLECTION_LIFT",
  COLLECTION_PARKING_PERMIT = "COLLECTION_PARKING_PERMIT",
}

export enum HouseDetailsFieldsId {
  LIVING_ROOM_SOFA = "LIVING_ROOM_SOFA",
  LIVING_ROOM_PUIT = "LIVING_ROOM_PUIT",
  LIVING_ROOM_FERNSEHTISCH = "LIVING_ROOM_FERNSEHTISCH",
  LIVING_ROOM_SESSEL = "LIVING_ROOM_SESSEL",
  LIVING_ROOM_TISCH = "LIVING_ROOM_TISCH",
  LIVING_ROOM_REGAL = "LIVING_ROOM_REGAL",
  LIVING_ROOM_L_SOFA = "LIVING_ROOM_L_SOFA",
  LIVING_ROOM_FERNSEHER = "LIVING_ROOM_FERNSEHER",
  LIVING_ROOM_DECO_GROSS = "LIVING_ROOM_DECO_GROSS",
  LIVING_ROOM_BOX = "LIVING_ROOM_BOX",
  LIVING_ROOM_REMARK = "LIVING_ROOM_REMARK",
  KITCHEN_BACKOFEN = "KITCHEN_BACKOFEN",
  KITCHEN_DEEP_FREEZER = "KITCHEN_DEEP_FREEZER",
  KITCHEN_HERD = "KITCHEN_HERD",
  KITCHEN_REFREGIRATOR = "KITCHEN_REFREGIRATOR",
  KITCHEN_MICROWAVE = "KITCHEN_MICROWAVE",
  KITCHEN_COFFEE_MACHINE = "KITCHEN_COFFEE_MACHINE",
  KITCHEN_WASHING_MACHINE = "KITCHEN_WASHING_MACHINE",
  KITCHEN_TUMBLER = "KITCHEN_TUMBLER",
  KITCHEN_REGAL = "KITCHEN_REGAL",
  KITCHEN_BOX = "KITCHEN_BOX",
  KITCHEN_REMARK = "KITCHEN_REMARK",
  BEDROOM_BETT = "BEDROOM_BETT",
  BEDROOM_DOPPEIBETT = "BEDROOM_DOPPEIBETT",
  BEDROOM_SESSEL = "BEDROOM_SESSEL",
  BEDROOM_SCHRANK_KELEIN = "BEDROOM_SCHRANK_KELEIN",
  BEDROOM_SCHRANK_MITTEL = "BEDROOM_SCHRANK_MITTEL",
  BEDROOM_SCHRANK_GROSS = "BEDROOM_SCHRANK_GROSS",
  BEDROOM_SCHMINKANLAGE = "BEDROOM_SCHMINKANLAGE",
  BEDROOM_NACHTTISCH = "BEDROOM_NACHTTISCH",
  BEDROOM_REGAL = "BEDROOM_REGAL",
  BEDROOM_PULT = "BEDROOM_PULT",
  BEDROOM_PFLANZEN = "BEDROOM_PFLANZEN",
  BEDROOM_BOX = "BEDROOM_BOX",
  BEDROOM_REMARK = "BEDROOM_REMARK",
  ZIMMER_BETT = "ZIMMER_BETT",
  ZIMMER_SCHRANK_KLEIN = "ZIMMER_SCHRANK_KLEIN",
  ZIMMER_REGAL = "ZIMMER_REGAL",
  ZIMMER_FERNSEHTISCH = "ZIMMER_FERNSEHTISCH",
  ZIMMER_DOPPEIBETT = "ZIMMER_DOPPEIBETT",
  ZIMMER_SCHRANK_MITTEL = "ZIMMER_SCHRANK_MITTEL",
  ZIMMER_PULT = "ZIMMER_PULT",
  ZIMMER_NACHTTISCH = "ZIMMER_NACHTTISCH",
  ZIMMER_SESSEL = "ZIMMER_SESSEL",
  ZIMMER_SCHRANK_GROSS = "ZIMMER_SCHRANK_GROSS",
  ZIMMER_FERNSEHER = "ZIMMER_FERNSEHER",
  ZIMMER_BOX = "ZIMMER_BOX",
  ZIMMER_REMARK = "ZIMMER_REMARK",
  BALKON_GRILL = "BALKON_GRILL",
  BALKON_TISCH = "BALKON_TISCH",
  BALKON_STUHLE = "BALKON_STUHLE",
  BALKON_SOFA = "BALKON_SOFA",
  BALKON_REGAL = "BALKON_REGAL",
  BALKON_SCHIRM = "BALKON_SCHIRM",
  BALKON_TOPFE = "BALKON_TOPFE",
  BALKON_PFLANZEN = "BALKON_PFLANZEN",
  BALKON_KRAUTERBEET = "BALKON_KRAUTERBEET",
  BALKON_RASENMAHER = "BALKON_RASENMAHER",
  BALKON_REMARK = "BALKON_REMARK",
  KELLER_WASH_MACHINE = "KELLER_WASH_MACHINE",
  KELLER_TUMBLER = "KELLER_TUMBLER",
  KELLER_REGAL = "KELLER_REGAL",
  KELLER_ENTSORGUNGEN = "KELLER_ENTSORGUNGEN",
  KELLER_FAHRRAD = "KELLER_FAHRRAD",
  KELLER_KINDERWAGEN = "KELLER_KINDERWAGEN",
  KELLER_MOBEL = "KELLER_MOBEL",
  KELLER_BOXEN = "KELLER_BOXEN",
  KELLER_REMARK = "KELLER_REMARK",
  SPEZIELL_AQUARIUM = "SPEZIELL_AQUARIUM",
  SPEZIELL_PIANO = "SPEZIELL_PIANO",
  SPEZIELL_SPORTGERAT = "SPEZIELL_SPORTGERAT",
  SPEZIELL_ELEKTRONISCHES = "SPEZIELL_ELEKTRONISCHES",
  SPEZIELL_POOL = "SPEZIELL_POOL",
  SPEZIELL_TRESSOR = "SPEZIELL_TRESSOR",
  SPEZIELL_LAMPE = "SPEZIELL_LAMPE",
  SPEZIELL_REMARK = "SPEZIELL_REMARK",
}

export enum ServiceDetailFieldsId {
  SERVICE_TYPE = "SERVICE_TYPE",
  SERVICE_TITLE = "SERVICE_TITLE",
  DESCRIPTION = "DESCRIPTION",
  COUNT = "COUNT",
  UNIT = "UNIT",
  PRICE = "PRICE",
  DISCOUNT = "DISCOUNT",
  TOTAL_PRICE = "TOTAL_PRICE",
}

export enum AdditionalInfoFieldsId {
  EMPLOYYES = "EMPLOYYES",
  REMARK = "REMARK",
  DELIVERT_VAN = "DELIVERT_VAN",
  HOURS = "HOURS",
  CLEANING_DELIVERY_GUARANTEE = "CLEANING_DELIVERY_GUARANTEE",
  BROOM_CLEAN = "BROOM_CLEAN",
  PRICE = "PRICE",
  NOTE_INFORMATION = "NOTE_INFORMATION",
  IMAGES = "IMAGES",
}
