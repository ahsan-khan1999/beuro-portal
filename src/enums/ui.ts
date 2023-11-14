export enum DropDownKeys {
  LABEL = "label",
  ITEMS = "items",
  ON_ITEM_SELECTED = "onItemSelected",
  SELECTED_ITEM = "selectedItem",
  CHILDREN = "children",
  DROP_DOWN_CLASS_NAME = "dropDownClassName",
  DROP_DOWN_TEXT_CLASS_NAME = "dropDownTextClassName",
  DROP_DOWN_ICON_CLASS_NAME = "dropDownIconClassName",
  DROP_DOWN_DISABLED = 'dropDownDisabled',
  SHOULD_NOT_SELECT_ITEM = 'shouldNotSelectItem',
}


export enum ModalType {
  NONE,
  CONFIRM_DELETION,
  CREATION,
  ADD_POSTSPONED_NOTE,
  ADD_REMARKS,
  FOLLOW_UPS,
  FOLLOW_UPS_DETAILS,
  INFO_DELETED,
  PASSWORD_CHANGE_SUCCESSFULLY,
  PASSWORD_SET,
  LINK_SEND_TO_EMAIL,
  PASSWORD_RESET,
  INVOICE_CREATE,
  CREATE_NEW_PASSWORD,
  INVOICE_CREATED_SUCCESSFULLY,
  EXISTING_NOTES,
  ADD_NOTE,
  SHARE_IMAGES,
  ARE_YOU_SURE,
  PASSWORD_CHANGE,
  ADD_TAX,
  EXCLUSIVE_TAX,
  EDIT_PAYMENT_METHOD,
  UPLOAD_IMAGE,
  IMAGE_SLIDER,
  DELETE_MAIL,
}
export type ModalConfigType = {
  [key in ModalType]?: JSX.Element;
};