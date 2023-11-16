import {
  ActionPayload,
  Address,
  AddressTypes,
  ApiResponse,
  AuthenticationState,
  BankFields,
  ErrorMessage,
  Header,
  OAuthId,
  UserResponse,
} from "@/enums/auth";
import { NextRouter } from "next/router";
import { Dispatch } from "react";
import { FormField } from "./form";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

export interface User {
  [UserResponse.id]: string;
  [UserResponse.role]: string;
  [UserResponse.email]: string;
  [UserResponse.role]: string;

  [UserResponse.bank]: string;
  [UserResponse.company]: UserCompany;
  [UserResponse.employee]: string;

  [UserResponse.addresses]: UserAddress;
  [UserResponse.isProfileComplete]: boolean;
  [UserResponse.isEmailVerified]: boolean;
  [UserResponse.isPhoneVerified]: boolean;
  [UserResponse.isGovernmentIdVerified]: boolean;
  [UserResponse.accountStatus]: string;
  [UserResponse.createdAt]: string;
  [UserResponse.fullName]: string;
  [UserResponse.salutation]: string;
  [UserResponse.username]: string;
  [UserResponse.dob]: string;
  [UserResponse.phoneNumber]: string;
  [UserResponse.mobileNumber]: string;
  [UserResponse.oAuthIds]: UserOAuth;
  [UserResponse._isSocialLogin]: boolean;
  [UserResponse.isCommercialSellerRequested]: boolean;
}
// [AddressType.primary]:{}

export interface UserCompany {
  [UserResponse.companyName]: string;
  [UserResponse.websiteUrl]: string;
  [UserResponse.companyLogo]: string;
  [UserResponse.taxNumber]: number;
  [UserResponse.phoneNumber]: string;
  [UserResponse.mobileNumber]: string;
  [UserResponse.addresses]: UserAddress;
  [UserResponse.bank]: UserBankDetail;


}
export interface UserAddress {
  [AddressTypes.city]: string;
  [AddressTypes.postalCode]: string;
  [AddressTypes.streetNumber]: string;
  [AddressTypes.houseNumber]: string;

}
export interface UserBankDetail {
  [BankFields.bankName]: string;
  [BankFields.accountNumber]: string;
  [BankFields.ibanNumber]: string;
  [BankFields.currency]: string;
}
export interface UserOAuth {
  [OAuthId.apple]: boolean;
  [OAuthId.google]: boolean;
  [OAuthId.facebook]: boolean;
}

export interface AddressType {
  [Address.city]: string;
  [Address.country]: string;
  [Address.streetAddress]: string;
  [Address.houseNumber]: string;
  [Address.postCode]: string;
  [Address.additionalAddress]: string;
  [Address.poBox]: string;
  [Address.emailAddress]: string;
}
export interface ApiResponseType {
  [Header.header]: {
    [Header.accesstoken]: string;
    [Header.refreshtoken]: string;
  };
  [Header.data]: {
    [ApiResponse.success]: boolean;
    [ApiResponse.code]: number;
    [ApiResponse.message]: string;
    [Header.data]: {
      [Header.user]: User;
    };
  };
}

export interface ApiResponseTypePut {
  [Header.header]: {
    [Header.accesstoken]: string;
    [Header.refreshtoken]: string;
  };
  [ApiResponse.success]: boolean;
  [ApiResponse.code]: number;
  [ApiResponse.message]: string;
  [Header.data]: {
    [Header.user]: User;
  };
}

export interface ApiResponseTypeProfile {
  [Header.header]: {
    [Header.accesstoken]: string;
    [Header.refreshtoken]: string;
  };
  [ApiResponse.success]: boolean;
  [ApiResponse.code]: number;
  [ApiResponse.message]: string;
  [Header.data]: AddressType;
}

export interface Action {
  [ActionPayload.type]: string;
  [ActionPayload.payload]: User;
}

export interface ErrorPropType {
  [ErrorMessage.errorMessage]: string;
}

export interface AuthState {
  [AuthenticationState.user]: User | undefined;
  [AuthenticationState.userRole]: string | null;
  [AuthenticationState.loading]: boolean;
  [AuthenticationState.error]: string | null;
  [AuthenticationState.seller]: User | null;
  [AuthenticationState.email]: boolean | null;
  [AuthenticationState.google]: boolean | null;
  [AuthenticationState.fb]: boolean | null;
  [AuthenticationState.apple]: boolean | null;
}

export interface RemoveOAuth {
  router: NextRouter;
  translate: Function;
  dispatch: Dispatch<any>;
}

export interface LoginFormProps {
  fields: FormField[];
  onSubmit: SubmitHandler<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: object;
  className?: string;
}

export interface RegistrationFormProps {
  fields: FormField[];
  onSubmit: SubmitHandler<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  errors: object;
  className?: string;
  error?: object;
}
