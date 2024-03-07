import { StaticImageData } from "next/image";
import { User } from "./auth";
import { Country, State } from "@/enums/auth";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Fields } from "@/enums";
import { DropDownKeys } from "@/enums/ui";
import { Field } from "@/enums/form";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { FormField } from ".";
import { Maybe } from "yup";

export interface ContainerProps {
  children: ReactNode;
  containerClassName?: string;
  childClassName?: string;
}
export interface DropDownItem {
  item: {
    label: string;
    value: string;
  };
}

export interface DropDownProps {
  [DropDownKeys.LABEL]?: string;
  [DropDownKeys.ITEMS]: DropDownItem[];
  [DropDownKeys.ON_ITEM_SELECTED]: (data: string) => void;
  [DropDownKeys.SELECTED_ITEM]: string;
  [DropDownKeys.CHILDREN]?: React.ReactElement<SVGElement>;
  [DropDownKeys.DROP_DOWN_CLASS_NAME]?: string;
  [DropDownKeys.DROP_DOWN_TEXT_CLASS_NAME]?: string;
  [DropDownKeys.DROP_DOWN_ITEMS_Container_CLASS_NAME]?: string;
  [DropDownKeys.DROP_DOWN_ICON_CLASS_NAME]?: string;
  [DropDownKeys.DROP_DOWN_DISABLED]?: boolean;
  [DropDownKeys.SHOULD_NOT_SELECT_ITEM]?: boolean;
  [DropDownKeys.SHOULD_NOT_SELECT_ITEM]?: boolean;
}

export interface SelectDropDownProps {
  [DropDownKeys.ITEMS]: DropDownItem[];
  [DropDownKeys.ON_ITEM_SELECTED]: (data: string) => void;
  [DropDownKeys.SELECTED_ITEM]: string;
  [DropDownKeys.DROP_DOWN_CLASS_NAME]?: string;
  [DropDownKeys.DROP_DOWN_ITEMS_Container_CLASS_NAME]?: string;
}

export interface DropDownItemsProps {
  items: DropDownItem[];
  onItemClick: (data: string) => void;
  containerClassName?: string;
}
export interface SearchInputProps {
  onInputChange: (value: string) => void;
}
export interface ImageLinkProps {
  linkHref: string;
  linkText: string;
  children?: ReactNode;
  className?: string;
  loading?: boolean | null;
}

export interface ButtonProps {
  type?: Field.button;
  name?: string;
  inputType: "submit" | "button";
  text?: string;
  className?: string;
  loading?: boolean | null;
  success?: boolean;
  onClick?: Function;
  loaderColor?: string;
  icon?: any;
  iconAlt?: any;
  id: string;
  disabled?: boolean;
}

// Add field interface
export interface AddFieldProps {
  text?: string;
  className?: string;
  onClick?: Function;
  icon?: any;
  iconAlt?: any;
  type?: Field.button;
  name: string;
  id: string;
}

export interface Image {
  imageUrl: StaticImageData;
  imageAlt: string;
  width: number;
  height: number;
}

export interface Link {
  linkText: string;
  linkHref: string;
}

export interface CardBody {
  image: Image;
  heading: string;
  description: string;
  link: Link;
}

export interface CardProps {
  card?: CardBody;
  className?: string;
  image?: Image;
  heading?: string;
  description?: string;
  link?: Link;
}

export interface CardProps {
  className?: string;
  children: ReactNode;
}

export interface LoginAndRegisterCardProps {
  card: CardBody;
  className?: string;
  children?: ReactNode;
}
export interface VerificationCardProps {
  card: CardBody;
  className?: string;
  children?: ReactNode;
  loading?: boolean;
}

export interface LikeIconProps {
  like: boolean;
  onClick: () => void;
}

export interface SliderProps {
  text: string;
}

export interface MyComponentChildrenArray {
  children: ReactNode[];
  leftPaneClassName?: string;
  rightPaneClassName?: string;
}

export interface FooterLinksProps {
  title: string;
  links: Link[];
}

export type FooterMiddleSectionProps = {
  items: FooterLinksProps[];
};

export interface ArrowIconProps {
  isOpen: boolean;
}

interface BreadCrumb {
  name: string;
  href?: string;
}

export interface BreadcrumbProps {
  trail: BreadCrumb[];
  className?: string;
}

export interface BreadcrumbItem {
  name: string;
  href?: string; // href is optional because not all breadcrumbs might have it
  children?: BreadcrumbItem[]; // children is also optional
}
export interface countryType {
  [Country.Switzerland]: {
    [State.state]: CountryObject[];
  };
  [Country.Germany]: {
    [State.state]: CountryObject[];
  };
  [Country.Austria]: {
    [State.state]: CountryObject[];
  };
  [Country.Italy]: {
    [State.state]: CountryObject[];
  };
  [Country.France]: {
    [State.state]: CountryObject[];
  };
}

export interface CountryType {
  [Country.Switzerland]: string;
  [Country.Germany]: string;
  [Country.Austria]: string;
  [Country.Italy]: string;
  [Country.France]: string;
}
export interface CountryObject {
  label: string;
  value: string;
  key?: string;
}

export interface SuccessModal {
  show: boolean;
  onHide: Function;
  data: object;
}
export interface ProfileMenu {
  user: User | null;
  logoutHandler: Function;
}
interface WidgetBaseProps {
  children?: ReactNode;
  containerClassName?: string;
}

export interface BaseCardProps extends WidgetBaseProps {}

export type ButtonClickFunction = () => void;
export interface BaseButtonProps extends WidgetBaseProps {
  id?: string;
  onClick: ButtonClickFunction;
  buttonText: string;
  disabled?: boolean;
  textClassName?: string;
  loading?: boolean;
  loaderColor?: string;
}

export interface ButtonOnClick {
  onClick: ButtonClickFunction;
}

export interface IBaseModalProps {
  children: ReactNode;
  onClose: () => void;
  containerClassName?: string;
}

export interface IInfoModalProps extends IBaseModalProps {
  modalTitle: string;
}

export interface IConfirmationBaseModalProps {
  onCancel: ButtonClickFunction;
  imageSrc: StaticImageData;
  imageAlt: string;
  children: ReactNode;
  containerClassName?: string;
}
export interface IConfirmationModalProps extends IConfirmationBaseModalProps {
  onProceed: ButtonClickFunction;
}

export interface IBackdropProps {
  children: ReactNode;
  onClose: () => void;
}

export interface OnClick {
  onClick: () => void;
}

export interface LanguageName {
  name?: string;
}

export interface ToggleButtonProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  key?: string;
  disabled?: boolean;
}

export interface CheckBoxInputProps {
  onChange: (value: boolean) => void;
  isChecked?: boolean;
  className?: string;
  id: string;
}

export interface IconOnlyButtonProps {
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  buttonClassName?: string;
}
// sliderBase props
interface SliderBaseProps {
  goToNext: () => void;
  goToPrev: () => void;
}

// types for slider
export interface MainImageSliderProps extends SliderBaseProps {
  imageSrc: string;
  containerClassName?: string;
  handleMouseMove?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleMouseLeave?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

interface SliderImagesData {
  imageSrc: string;
}

// slider image props
export interface SliderImagesDataProps {
  noOfThumbNails: number;
  images: SliderImagesData[];
  activeIndex?: number;
  containerClasses?: string;
  mainImgSliderClasses?: string;
}

export interface ThumbnailSliderProps extends SliderBaseProps {
  sliderImages: SliderImagesData[];
  thumbnailStartIndex: number;
  noOfThumbnails: number;
  selectImage: (index: number) => void;
}

export interface ThumbnailProps {
  imageSrc: string;
  onClick: () => void;
  index: number;
}

export interface ImageSliderHook {
  selectedImage: string;
  thumbnailStartIndex: number;
  goToNext: () => void;
  goToPrev: () => void;
  selectImage: (index: number) => void;
  handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  currentPage:number
}

export interface ChildrenProp {
  children?: ReactNode;
}

export interface LinkUploadProps {
  inputLink: string;
  onAddLink: (e?: React.FormEvent<HTMLFormElement>) => void;
  enteredLinks: string[];
  onLinkDelete: (linkToDelete: number) => void;
  setEnteredLink: React.Dispatch<React.SetStateAction<string>>;
}

export interface ShareImagesViaWhatsapp {
  inputNumber: string;
  setEnteredNumber: React.Dispatch<React.SetStateAction<string>>;
  onSend: (e?: React.FormEvent<HTMLFormElement>) => void;
}
export interface ShareImagesViaEmail {
  inputEmail: string;
  setEnteredEmail: React.Dispatch<React.SetStateAction<string>>;
  onSend: (e?: React.FormEvent<HTMLFormElement>) => void;
}
