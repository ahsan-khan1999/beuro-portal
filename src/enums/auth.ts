export enum ApiResponse {
    success = "success",
    code = "code",
    message = "message"
}

export enum UserResponse {
    id = "id",
    role = "role",
    email = "email",
    addresses = "addresses",
    isProfileComplete = "isProfileComplete",
    isEmailVerified = "isEmailVerified",
    isPhoneVerified = "isPhoneVerified",
    isGovernmentIdVerified = "isGovernmentIdVerified",
    accountStatus = "accountStatus",
    createdAt = "createdAt",
    fullName = "fullName",
    salutation = "salutation",
    username = "username",
    dob = "dob",
    phoneNumber = "phoneNumber",
    oAuthIds = "oAuthIds",
    _isSocialLogin = "_isSocialLogin",
    isCommercialSellerRequested = "isCommercialSellerRequested",
    companyName = "companyName",
    companyNumber = "companyNumber",
    taxNumber = "taxNumber",
    websiteUrl = "websiteLink",
    companyLogo = "logoLink",
    notificationSettings = "notificationSettings"

}

export enum LoginFields {
    email = "email",
    password = "password",
}

export enum Address {
    streetAddress = "streetAddress",
    houseNumber = "houseNumber",
    postCode = "postCode",
    city = "state",
    country = "country",
    poBox = "poBox",
    additionalAddress = "additionalAddress",
    emailAddress = "emailAddress",



}
export enum AddressTypes {
    primary = "primary",
    secondary1 = "secondary1",
    secondary2 = "secondary2",
    billing = "billing",

}
export enum Header {
    header = "headers",
    accesstoken = "accesstoken",
    refreshtoken = "refreshtoken",
    data = "data",
    user = "User",
}


export enum ActionPayload {
    type = "type",
    payload = "payload",

}

export enum ErrorMessage {
    errorMessage = "errorMessage",

}

export enum AuthenticationState {
    user = "user",
    userRole = "userRole",
    loading = "loading",
    error = "error",
    seller = "seller",
    email = "email",
    google = "google",
    fb = "fb",
    apple = "apple",


}

export enum Country {
    Swizterland = "Swizterland",
    Germany = "Germany",
    Austria = "Austria",
    Italy = "Italy",
    France = "France",


}

export enum State {
    state = "state"
}

export enum OAuthId {
    apple = "apple",
    google = "google",
    facebook = "facebook",
}