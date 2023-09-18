import { ActionPayload, Address, AddressTypes, ApiResponse, AuthenticationState, ErrorMessage, Header, OAuthId, UserResponse } from "@/enums/auth"
import { NextRouter } from 'next/router';
import { Dispatch } from "react";
import { CommercialSellerType, UserNotifications } from "./userAccount";
import { FormField } from "./form";
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";


export interface User extends CommercialSellerType {
    [UserResponse.id]: string,
    [UserResponse.role]: string,
    [UserResponse.email]: string,
    [UserResponse.addresses]: UserAddress,
    [UserResponse.isProfileComplete]: boolean,
    [UserResponse.isEmailVerified]: boolean,
    [UserResponse.isPhoneVerified]: boolean,
    [UserResponse.isGovernmentIdVerified]: boolean,
    [UserResponse.accountStatus]: string,
    [UserResponse.createdAt]: string,
    [UserResponse.fullName]: string,
    [UserResponse.salutation]: string,
    [UserResponse.username]: string,
    [UserResponse.dob]: string,
    [UserResponse.phoneNumber]: string,
    [UserResponse.oAuthIds]: UserOAuth,
    [UserResponse._isSocialLogin]: boolean,
    [UserResponse.isCommercialSellerRequested]: boolean,
    [UserResponse.notificationSettings]: UserNotifications
}
// [AddressType.primary]:{}
export interface UserAddress {
    [AddressTypes.primary]?: AddressType
    [AddressTypes.secondary1]?: AddressType
    [AddressTypes.secondary2]?: AddressType
    [AddressTypes.billing]?: AddressType
}
export interface UserOAuth {
    [OAuthId.apple]: boolean
    [OAuthId.google]: boolean
    [OAuthId.facebook]: boolean
}

export interface AddressType {
    [Address.city]: string,
    [Address.country]: string,
    [Address.streetAddress]: string,
    [Address.houseNumber]: string,
    [Address.postCode]: string,
    [Address.additionalAddress]: string,
    [Address.poBox]: string,
    [Address.emailAddress]: string,


}
export interface ApiResponseType {
    [Header.header]: { [Header.accesstoken]: string, [Header.refreshtoken]: string },
    [Header.data]: {
        [ApiResponse.success]: boolean,
        [ApiResponse.code]: number,
        [ApiResponse.message]: string,
        [Header.data]: {
            [Header.user]: User;
        };
    }
}

export interface ApiResponseTypePut {
    [Header.header]: { [Header.accesstoken]: string, [Header.refreshtoken]: string },
    [ApiResponse.success]: boolean,
    [ApiResponse.code]: number,
    [ApiResponse.message]: string,
    [Header.data]: {
        [Header.user]: User;
    };
}

export interface ApiResponseTypeProfile {
    [Header.header]: { [Header.accesstoken]: string, [Header.refreshtoken]: string },
    [ApiResponse.success]: boolean,
    [ApiResponse.code]: number,
    [ApiResponse.message]: string,
    [Header.data]: AddressType
}


export interface Action {
    [ActionPayload.type]: string,
    [ActionPayload.payload]: User
}

export interface ErrorPropType {
    [ErrorMessage.errorMessage]: string
}

export interface AuthState {
    [AuthenticationState.user]: User | null,
    [AuthenticationState.userRole]: string | null,
    [AuthenticationState.loading]: boolean,
    [AuthenticationState.error]: string | null,
    [AuthenticationState.seller]: User | null,
    [AuthenticationState.email]: boolean | null,
    [AuthenticationState.google]: boolean | null,
    [AuthenticationState.fb]: boolean | null,
    [AuthenticationState.apple]: boolean | null,


}

export interface RemoveOAuth {
    router: NextRouter,
    translate: Function,
    dispatch: Dispatch<any>
}




export interface LoginFormProps {
    fields: FormField[],
    onSubmit: SubmitHandler<FieldValues>,
    handleSubmit: UseFormHandleSubmit<FieldValues>,
    errors: object,
    className?: string

}

export interface RegistrationFormProps {
    fields: FormField[],
    onSubmit: SubmitHandler<FieldValues>,
    handleSubmit: UseFormHandleSubmit<FieldValues>,
    errors: object,
    className?: string
    error?: object
}