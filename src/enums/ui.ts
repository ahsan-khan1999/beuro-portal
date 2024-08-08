export enum DropDownKeys {
  LABEL = "label",
  ITEMS = "items",
  ON_ITEM_SELECTED = "onItemSelected",
  SELECTED_ITEM = "selectedItem",
  CHILDREN = "children",
  DROP_DOWN_CLASS_NAME = "dropDownClassName",
  DROP_DOWN_TEXT_CLASS_NAME = "dropDownTextClassName",
  DROP_DOWN_ICON_CLASS_NAME = "dropDownIconClassName",
  DROP_DOWN_ITEMS_Container_CLASS_NAME = "dropDownItemsContainerClassName",
  DROP_DOWN_DISABLED = "dropDownDisabled",
  SHOULD_NOT_SELECT_ITEM = "shouldNotSelectItem",
}

export enum ModalType {
  NONE,
  CONFIRM_DELETION,
  CREATION,
  UPLOAD_FILE,
  OFFER_ACCEPTED,
  OFFER_REJECTED,
  ADD_POSTSPONED_NOTE,
  ADD_REMARKS,
  FOLLOW_UPS,
  ADD_FOLLOW_UP,
  ALL_CUSTOMERS_LIST,
  SELECTED_CUSTOMER_DETAIL,
  ALL_LEADS_LIST,
  SELECTED_LEADS_DETAIL,
  FOLLOW_UPS_DETAILS,
  INFO_DELETED,
  CONFIRM_DELETE_NOTE,
  PASSWORD_CHANGE_SUCCESSFULLY,
  PASSWORD_SET,
  LINK_SEND_TO_EMAIL,
  PASSWORD_RESET,
  INVOICE_CREATE,
  CREATE_NEW_PASSWORD,
  INVOICE_CREATED_SUCCESSFULLY,
  EXISTING_NOTES,
  ADD_NOTE,
  EDIT_NOTE,
  SHARE_IMAGES,
  DOCUMENT_VIEWER,
  ARE_YOU_SURE,
  PASSWORD_CHANGE,
  ADD_TAX,
  EXCLUSIVE_TAX,
  EDIT_PAYMENT_METHOD,
  UPLOAD_IMAGE,
  IMAGE_SLIDER,
  DELETE_MAIL,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  EMPLOYEE_SUCCESS,
  UPLOAD_OFFER_IMAGE,
  ARE_YOU_SURE_CUSTOMER,
  SELECT_MONTH,
  DOWNLOAD_MODAL,
  RECURRING_INVOICE,
  RECURRING_INVOICE_FREQUENCY,
  INVOICE_UPDATE,
  EMAIL_CONFIRMATION,
  RECURRING_INVOICE_UPDATE,
  REJECT_OFFER,
  UPDATE_ADDITIONAL_DETAILS,
  EDIT_DATE,
  EDIT_CONTRACT_ADDITIONAL_DETAIL,
  OFFER_REJECT_SUCCESS,
  ADD_GENERAL_ADDRESS,
  EDIT_GENERAL_ADDRESS,
  GENERAL_SUCCESS_ADDRESS,
  GENERAL_SUCCESS_NOTES,
  ADD_GENERAL_NOTE,
  EDIT_GENERAL_NOTE,
  ARE_YOU_COMPANY,
  SCHEDULE_APPOINTMENTS,
  APPOINTMENT_SUCCESS,
  APPOINTMENT_CREATE,
  UPDATE_REPORT
}

export type ModalConfigType = {
  [key in ModalType]?: JSX.Element;
};

export enum EmptyStateType {
  hasNoData,
  hasData,
  loading,
}
