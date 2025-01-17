import { FieldComponents, FieldProps, FieldType, FormField } from "@/types";
import {
  InputField,
  TextAreaField,
  CkEditor,
  PasswordField,
  SelectField,
  TelephoneInputField,
  SpanField,
  CheckBox,
  DragAndDropFileField,
  DragAndDropPdfField,
  ImageUploadField,
  MultiSelectField,
  AddFiled,
  ToggleButton,
  ColorPicker,
  AgentSelectField,
  QuantityInputField,
  CustomCheckBoxField,
  CustomFileUploadField,
  IconLabelFeild,
  ColourSelectField,
  RemainderSelectField,
  LocationSearchInputField,
  CustomTimePicker,
  ReactCalendarDatePickerField,
  IconFeild,
} from "./fields";
import { Button } from "../ui/button/button";
import { DatePicker } from "./fields/date-picker";
import { DivField } from "./fields/div-field";
import { CreditCardExpiryDateField } from "./fields/credit-card-expiry-date-field";
import { RadioButtonField } from "./fields/radioButton/radio-button-field";
import { LinkField } from "./fields/link-field";
import { CustomerInputField } from "./fields/customer-input-field";
import { ProfileControllerField } from "./fields/profile_field/profile_upload_controller";
import { TimePicker } from "./fields/time-picker";

const fieldComponents: FieldComponents = {
  input: InputField,
  colorPicker: ColorPicker,
  textArea: TextAreaField,
  ckEditor: CkEditor,
  customerInput: CustomerInputField,
  creditCardExpiryDateInput: CreditCardExpiryDateField,
  password: PasswordField,
  select: SelectField,
  phone: TelephoneInputField,
  date: DatePicker,
  checkbox: CheckBox,
  radio: RadioButtonField,
  dragAndDropFileField: DragAndDropFileField,
  dragAndDropPdfField: DragAndDropPdfField,
  profileUploadField: ProfileControllerField,
  imageUploadField: ImageUploadField,
  customFileUpload: CustomFileUploadField,
  span: SpanField,
  div: DivField,
  button: Button,
  addField: AddFiled,
  link: LinkField,
  multiSelect: MultiSelectField,
  toggleButton: ToggleButton,
  agentSelectField: AgentSelectField,
  timePicker: TimePicker,
  quantityInput: QuantityInputField,
  customCheckBox: CustomCheckBoxField,
  iconLabel: IconLabelFeild,
  icon: IconFeild,
  calendarDatePicker: ReactCalendarDatePickerField,
  colourSelectField: ColourSelectField,
  remainderSelectField: RemainderSelectField,
  locationSearchInput: LocationSearchInputField,
  reactTimePicker: CustomTimePicker,
};

export const getTypedFieldComponent = <T extends FieldProps>(
  type: FieldType,
  props: T,
  error?: string,
  errors?: Record<string, any>
): JSX.Element => {
  const Component = fieldComponents[type] as React.FC<Record<string, any>>;

  return (
    <>
      <Component {...props} errors={errors} />
      {error && <span className="mt-[3px] text-red text-sm">{error}</span>}
    </>
  );
};

export function isFieldType(type: any): type is FieldType {
  return [
    "input",
    "colorPicker",
    "textArea",
    "ckEditor",
    "creditCardExpiryDateInput",
    "password",
    "select",
    "phone",
    "date",
    "checkbox",
    "radio",
    "dragAndDropFileField",
    "dragAndDropPdfField",
    "profileUploadField",
    "imageUploadField",
    "span",
    "div",
    "button",
    "link",
    "multiSelect",
    "addField",
    "toggleButton",
    "customerSelectField",
    "timePicker",
    "quantityInput",
    "customCheckBox",
    "customFileUpload",
    "iconLabel",
    "icon",
    "calendarDatePicker",
    "colourSelectField",
    "remainderSelectField",
    "locationSearchInput",
  ].includes(type);
}

export const formatCardNumber = (cardNumber: string, format: number[]) => {
  const cleanNumber = cardNumber.replace(/\D+/g, "");

  return format.reduce((acc, sectionLength) => {
    const start = acc.replace(/\s/g, "").length;
    const end = start + sectionLength;
    const section = cleanNumber.slice(start, end);

    return section ? `${acc} ${section}`.trim() : acc;
  }, "");
};

export const renderField = (
  fieldData: FormField,
  error: string,
  errors?: Record<string, any>
) => {
  if (!fieldData?.field || !isFieldType(fieldData?.field?.type)) {
    return null;
  }
  return getTypedFieldComponent(
    fieldData?.field?.type,
    fieldData?.field,
    error,
    errors
  );
};
