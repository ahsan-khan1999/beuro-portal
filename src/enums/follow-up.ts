// add follow up
export enum AddPostPonedNote {
  date = "dateTime",
  detail = "postPonedNote",
}

// add remarks
export enum AddRemarks {
  remark = "completeRemarks",
}

// Add follow-up
export enum AddFollowUp {
  selectCustomer = "customer",
  title = "title",
  selectLead = "lead",
  dateAndTime = "dateTime",
  followUpType = "type",
  addititionalDetails = "additionalDetails",
}

// add follow enums
export enum Modals {
  customer = "customer",
  leads = "leads",
}

export enum StatusColors {
  "Upcoming" = "#4A13E7",
  "Pending" = "#FE9244",
  "Overdue" = "#FF376F",
  "complete" = "#45C769",
  "today" = "#45C769",
}
