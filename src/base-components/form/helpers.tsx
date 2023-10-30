import {
  CreditCardIconsType,
  DetectedCardInfo,
  FieldComponents,
  FieldProps,
  FieldType,
  GetCreditCardIconProps,
} from "@/types";
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
} from "./fields";
import { Button } from "../ui/button/button";
import { DatePicker } from "./fields/date-picker";
import { DivField } from "./fields/div-field";
// import { CreditCardNumberField } from "./fields/credit-card-number-field";
// import { CardType } from "@/enums";
import Image from "next/image";
import { CreditCardExpiryDateField } from "./fields/credit-card-expiry-date-field";
import { RadioButtonField } from "./fields/radioButton/radio-button-field";
import { LinkField } from "./fields/link-field";
import { CustomerInputField } from "./fields/customer-input-field";
import { AddFiled } from "./fields/add-field-button";
import { ProfileControllerField } from "./fields/profile_field/profile_upload_controller";

const fieldComponents: FieldComponents = {
  input: InputField,
  textArea: TextAreaField,
  ckEditor: CkEditor,
  customerInput: CustomerInputField,
  // creditCardNumberInput: CreditCardNumberField,
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
  span: SpanField,
  div: DivField,
  button: Button,
  // addField: AddFiled,
  link: LinkField,
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
    "span",
    "div",
    "button",
    // "addField",
    "link",
  ].includes(type);
}

// const cardPatterns = [
//   { type: CardType.VISA, pattern: /^4/, format: [4, 4, 4, 4] },
//   { type: CardType.MASTERCARD, pattern: /^5[1-5]/, format: [4, 4, 4, 4] },
//   // Add more card patterns here...
// ];

// export const detectCardType = (cardNumber: string): DetectedCardInfo | null => {
//   const cleanNumber = cardNumber.replace(/\D+/g, "");

//   for (const card of cardPatterns) {
//     if (card.pattern.test(cleanNumber)) {
//       return { type: card.type, format: card.format };
//     }
//   }

//   return null;
// };

export const formatCardNumber = (cardNumber: string, format: number[]) => {
  const cleanNumber = cardNumber.replace(/\D+/g, "");

  return format.reduce((acc, sectionLength) => {
    const start = acc.replace(/\s/g, "").length;
    const end = start + sectionLength;
    const section = cleanNumber.slice(start, end);

    return section ? `${acc} ${section}`.trim() : acc;
  }, "");
};

// export const getCardIcon = ({
//   cardType,
//   icons: { visa, mastercard },
// }: GetCreditCardIconProps) => {
//   const creditCardIcons: CreditCardIconsType = {
//     [CardType.VISA]: visa,
//     [CardType.MASTERCARD]: mastercard,
//   };
//   const iconSrc = cardType && creditCardIcons[cardType?.type];
//   if (!iconSrc) return null;
//   return (
//     <Image
//       src={iconSrc}
//       alt={`${cardType.type} Icon`}
//       className="text-middle-green absolute top-2/4 right-4 transform -translate-y-2/4"
//     />
//   );
// };
