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
  EMAIL_TRACKER,
  REQUEST_SUBMITTED,
  PASSWORD_CHANGE_SUCCESSFULLY,
  LINK_SEND_TO_EMAIL,
  LEAD_CREATED,
  PASSWORD_RESET,
  NEW_PASSWORD
}
export type ModalConfigType = {
  [key in ModalType]?: JSX.Element;
};