import {
  AnyAction,
  AsyncThunk,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import apiServices from "../../../services/requestHandler";
import {
  ApiResponseType,
  ApiResponseTypeProfile,
  ApiResponseTypePut,
  AuthState,
  User,
} from "@/types/auth";
import { updateQuery } from "@/utils/update-query";
import { conditionHandlerLogin, conditionHandlerRegistration, senitizePhone, setErrors } from "@/utils/utility";
import { getUser, saveUser, setRefreshToken, setToken } from "@/utils/auth.util";
import { formatDateString, isJSON } from "@/utils/functions";
import { getCookie } from "cookies-next";
import { SalutationValue } from "@/enums/form";
import { NextRouter } from "next/dist/client/router";
import { staticEnums } from "@/utils/static";

const initialState: AuthState = {
  user: undefined,
  userRole: null,
  loading: false,
  error: null,
  seller: null,
  email: false,
  google: false,
  fb: false,
  apple: false,
  dashboard: null,
  adminDashboard: null
};

export const loginUser: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("login/user", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any; //SignUpPayload

    try {
      const response: ApiResponseType = await apiServices.login(data);
      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      saveUser(response?.data?.data?.User);
      thunkApi.dispatch(setUser(response.data.data.User));
      thunkApi.dispatch(setErrorMessage(null));
      conditionHandlerLogin(router, response);

      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);

      // toast.info(e?.data?.message);
      return false;
    }
  });
export const resetPassword: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("reset/user", async (args, thunkApi) => {
    const { router, data } = args as any;
    try {
      const response = await apiServices.resetPassword({
        otp: router.asPath?.split("=")[1],
        data,
      });

      router.pathname = "/login";
      updateQuery(router, "en");

      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      return false;
    }
  });
export const forgotPassword: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("forgot/user", async (args, thunkApi) => {
    const { translate, data, setError } = args as any;
    try {
      const response = await apiServices.forgotPassword(data);
      thunkApi.dispatch(setErrorMessage(response?.data?.message));
      return true;
    } catch (e: any) {
      setErrors(setError, e?.data.data, translate);

      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      return false;
    }
  });
export const signUp: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("signup/user", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any; //SignUpPayload
    try {
      const response: ApiResponseType = await apiServices.singUp(data);

      thunkApi.dispatch(setErrorMessage(null));
      // conditionHandlerRegistration(router, response);
      router.pathname = "/login-success";
      updateQuery(router, router.locale as string)

      saveUser(response.data.data.User);

      return response;
    } catch (e: any) {
      setErrors(setError, e?.data.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.data?.message));
      return e;
    }
  });
export const updateProfileStep1: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("profileStep1/user", async (args, thunkApi) => {
    const { data, router, setError, translate, nextFormHandler } = args as any; //SignUpPayload
    try {
      const user = isJSON(getUser())

      const response = await apiServices.profileStep1(data);
      thunkApi.dispatch(setErrorMessage(null))
      thunkApi.dispatch(setUser({ ...user, "company": { ...response?.data?.Company } }));
      saveUser({ ...user, "company": { ...response?.data?.Company } });

      nextFormHandler();

      return true;
    } catch (e: any) {
      setErrors(setError, e?.data.data, translate)
      thunkApi.dispatch(setErrorMessage(e?.data?.message))

      return false;
    }
  });
export const updateProfileStep2: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("profileStep2/user", async (args, thunkApi) => {
    const { data, router, setError, translate, nextFormHandler } = args as any; //SignUpPayload
    try {
      const user = isJSON(getUser())

      const response = await apiServices.profileStep2(
        { address: { ...data } }
      );

      thunkApi.dispatch(setErrorMessage(null));

      thunkApi.dispatch(setUser({ ...user, "company": { ...response?.data?.Company } }));
      saveUser({ ...user, "company": { ...response?.data?.Company } });
      nextFormHandler();

      return true;
    } catch (e: any) {
      setErrors(setError, e?.data.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      return false;
    }
  });
export const updateProfileStep3: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("profileStep3/user", async (args, thunkApi) => {
    const { data, router, setError, translate, nextFormHandler } = args as any; //SignUpPayload
    try {
      const user = isJSON(getUser())

      let apiData = { ...data, "currency": staticEnums["currency"][data?.currency] }

      const response = await apiServices.profileStep3({ bankDetails: { ...apiData } });

      thunkApi.dispatch(setUser({ ...user, "company": { ...response?.data?.Company } }));
      saveUser({ ...user, "company": { ...response?.data?.Company } });

      thunkApi.dispatch(setErrorMessage(null));

      nextFormHandler();
      return true;
    } catch (e: any) {
      setErrors(setError, e?.data.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      return false;
    }
  });
export const signUpGoogle: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("signup/Google/user", async (args, thunkApi) => {
    const { router, oauthCode, translate } = args as any; //SignUpPayload

    try {
      const response: ApiResponseType = await apiServices.loginGoogle({
        oAuthCode: oauthCode,
      });

      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      saveUser(response?.data?.data?.User);
      thunkApi.dispatch(setUser(response.data.data.User));
      thunkApi.dispatch(setErrorMessage(null));

      // conditionHandler(router, response);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      // thunkApi.dispatch(setEmail(e?.data?.message));
      return false;
    }
  });
export const signUpFacebook: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("signup/Google/user", async (args, thunkApi) => {
    const { router, oauthCode, translate } = args as any; //SignUpPayload

    try {
      const response: ApiResponseType = await apiServices.loginFaceBook({
        oAuthCode: oauthCode,
      });

      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      saveUser(response?.data?.data?.User);
      thunkApi.dispatch(setUser(response.data.data.User));
      thunkApi.dispatch(setErrorMessage(null));
      // conditionHandler(router, response);

      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      // thunkApi.dispatch(setEmail(e?.data?.message));
      return false;
    }
  });
export const userDetails: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/details", async (data, thunkApi) => {
    try {
      const response: ApiResponseType = await apiServices.readUserProfile();
      saveUser(response?.data?.data?.User);
      thunkApi.dispatch(setUser(response.data.data.User));
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });
export const verifyOtp: AsyncThunk<boolean, NextRouter, object> | any =
  createAsyncThunk("verify/otp", async (router: NextRouter, thunkApi) => {
    try {

      const response: ApiResponseType = await apiServices.verifyEmailOtp(
        router.query.otp
      );

      saveUser(response.data.data.User);
      thunkApi.dispatch(setUser(response.data.data.User));
      // conditionHandlerLogin(router, response);

      // if (response.data.data.User?.isProfileComplete) {
      //   router.pathname = "/dashboard";
      //   updateQuery(router, "en");
      // } else if (!response.data.data.User?.isProfileComplete) {
      //   router.pathname = "/profile";
      //   updateQuery(router, "en");
      // }
      return response.data.data.User;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });
export const generateOtp: AsyncThunk<boolean, Object, object> | any =
  createAsyncThunk("generate/otp", async (args: any, thunkApi) => {
    const { phone, setError, translate } = args;
    try {
      const response = await apiServices.generateOtp({
        phoneNumber: phone?.includes("+") ? phone : "+" + phone,
      });
      setErrors(setError, { phoneNumber: null }, translate);
      thunkApi.dispatch(setErrorMessage(null));
      return true;
      // toast.info(response?.data?.message);
      return true;
    } catch (e: any) {
      setErrors(setError, e?.data.data, translate);

      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      return false;
    }
  });
export const updateProfile: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("update/profile/user", async (args, thunkApi) => {
    const { data, type, setError, translate } = args as any; //SignUpPayload
    try {
      let field = type;
      const response: ApiResponseTypePut = await apiServices.updateProfile({
        key: field,
        ...{
          [field]:
            field === "salutation"
              ? SalutationValue[data["salutation"]]
              : field === "phoneNumber"
                ? data?.[field]?.includes("+")
                  ? data?.[field]
                  : "+" + data?.[field]
                : field === "password"
                  ? {
                    currentPassword: data?.["currentPassword"],
                    newPassword: data?.["newPassword"],
                  }
                  : data?.[field],
        },
      });
      thunkApi.dispatch(setUser(response.data.User));
      saveUser(response.data.User);

      thunkApi.dispatch(setErrorMessage(null));

      saveUser(response.data.User);
      return true;
    } catch (e: any) {
      setErrors(setError, e?.data.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      return false;
    }
  });
export const updateProfileAddress: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("update/profile/address", async (args, thunkApi) => {
    const { data, setError, translate } = args as any; //SignUpPayload
    try {
      const response: ApiResponseTypePut =
        await apiServices.updateProfileAddress(data);
      saveUser(response.data.User);
      thunkApi.dispatch(setUser(response.data.User));
      thunkApi.dispatch(setErrorMessage(null));

      return true;
    } catch (e: any) {
      setErrors(setError, e?.data.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      return false;
    }
  });
export const connectGoogle: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("connect/Google/user", async (args, thunkApi) => {
    const { router, oauthCode, translate } = args as any; //SignUpPayload

    try {
      const response: ApiResponseType = await apiServices.connectGoogle({
        oAuthCode: oauthCode,
      });

      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      saveUser(response?.data?.data?.User);
      thunkApi.dispatch(setUser(response.data.data.User));
      thunkApi.dispatch(setErrorMessage(null));
      // conditionHandler(router, response, true);

      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      // thunkApi.dispatch(setEmail(e?.data?.message));
      return false;
    }
  });
export const disConnectGoogle: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("disConnect/Google/user", async (args, thunkApi) => {
    const { router, translate } = args as any; //SignUpPayload

    try {
      const response: ApiResponseType = await apiServices.disConnectGoogle({});

      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      saveUser(response?.data?.data?.User);
      thunkApi.dispatch(setUser(response.data.data.User));
      thunkApi.dispatch(setErrorMessage(null));
      // router.query = {}
      // conditionHandler(router, response, true);

      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      // thunkApi.dispatch(setEmail(e?.data?.message));
      return false;
    }
  });
export const connectFacebook: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("connect/facebook/user", async (args, thunkApi) => {
    const { router, oauthCode, translate } = args as any; //SignUpPayload

    try {
      const response: ApiResponseType = await apiServices.connectFb({
        oAuthCode: oauthCode,
      });

      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      saveUser(response?.data?.data?.User);
      thunkApi.dispatch(setUser(response.data.data.User));
      thunkApi.dispatch(setErrorMessage(null));
      // conditionHandler(router, response, true);

      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      // thunkApi.dispatch(setEmail(e?.data?.message));
      return false;
    }
  });
export const disConnectFacebook: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("disConnect/facebook/user", async (args, thunkApi) => {
    const { router, translate } = args as any; //SignUpPayload

    try {
      const response: ApiResponseType = await apiServices.disConnectFacebook(
        {}
      );

      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      saveUser(response?.data?.data?.User);
      thunkApi.dispatch(setUser(response.data.data.User));
      thunkApi.dispatch(setErrorMessage(null));
      // router.query = {}
      // conditionHandler(router, response, true);

      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      // thunkApi.dispatch(setEmail(e?.data?.message));
      return false;
    }
  });
export const verifyPhoneOtp: AsyncThunk<boolean, NextRouter, object> | any =
  createAsyncThunk(
    "verify/phone/otp",
    async (data: { otp: number }, thunkApi) => {
      try {
        const response: ApiResponseType = await apiServices.verifyPhone({
          otp: data,
        });
        saveUser(response.data.data.User);
        thunkApi.dispatch(setUser(response.data.data.User));
        return true;
      } catch (e: any) {
        thunkApi.dispatch(setErrorMessage(e?.data?.message));
        return false;
      }
    }
  );

export const changePassword: AsyncThunk<boolean, NextRouter, object> | any =
  createAsyncThunk(
    "change/passowrd",
    async (data: { password: string; newPassword: string }, thunkApi) => {
      try {
        const response: ApiResponseType = await apiServices.verifyPhone({
          data,
        });
        saveUser(response.data.data.User);
        thunkApi.dispatch(setUser(response.data.data.User));
        return true;
      } catch (e: any) {
        thunkApi.dispatch(setErrorMessage(e?.data?.message));
        return false;
      }
    }
  );
// export const logoutUser = createAsyncThunk(
//   "logout/user",
//   async (user, thunkApi) => {
//     logout();
//     Cookies.remove("kaufestoken");
//   }
// );
export const sendOtpViaEmail: AsyncThunk<boolean, NextRouter, object> | any = createAsyncThunk(
  "send/otp/email",
  async (data, thunkApi) => {


    try {
      await apiServices.sendEmailOtp({ data });

      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message))
      return false;
    }
  }
);
export const logoutUser: AsyncThunk<boolean, NextRouter, object> | any = createAsyncThunk(
  "user/logout",
  async (data, thunkApi) => {


    try {
      apiServices.logoutUser({ data });
      return true;
    } catch (e: any) {
      return false;
    }
  }
);


export const readDashboard: AsyncThunk<boolean, NextRouter, object> | any =
  createAsyncThunk(
    "read/dashboard",
    async (data, thunkApi) => {
      const { params, router, setError, translate } = data as any;

      try {
        const response = await apiServices.readDashboard(params);

        return response?.data?.data;
      } catch (e: any) {
        thunkApi.dispatch(setErrorMessage(e?.data?.message));
        return false;
      }
    }
  );

export const readAdminDashboard: AsyncThunk<boolean, NextRouter, object> | any =
  createAsyncThunk(
    "read/dashboard/admin",
    async (data, thunkApi) => {
      const { params, router, setError, translate } = data as any;

      try {
        const response = await apiServices.readAdminDashboard(params);

        return response?.data?.data;
      } catch (e: any) {
        thunkApi.dispatch(setErrorMessage(e?.data?.message));
        return false;
      }
    }
  );
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
    // builder.addCase(updateUserProfile.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(updateUserProfile.fulfilled, (state, action) => {
    //   state.loading = false;
    //   if (action.payload?.data?.user) {
    //     saveUser(action.payload?.data?.user);
    //     state.user = action.payload?.data?.user;
    //   }
    // });
    // builder.addCase(updateUserProfile.rejected, (state) => {
    //   state.loading = false;
    // });
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (action?.payload) state.user = action.payload.user;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(sendOtpViaEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendOtpViaEmail.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
    });
    builder.addCase(sendOtpViaEmail.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProfileStep1.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateProfileStep1.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
      }
    );
    builder.addCase(updateProfileStep1.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProfileStep2.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateProfileStep2.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
      }
    );
    builder.addCase(updateProfileStep2.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProfileStep3.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateProfileStep3.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
      }
    );
    builder.addCase(updateProfileStep3.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(verifyOtp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(userDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userDetails.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(userDetails.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateProfileAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfileAddress.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateProfileAddress.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(connectGoogle.pending, (state) => {
      state.google = true;
    });
    builder.addCase(connectGoogle.fulfilled, (state, action) => {
      state.google = false;
    });
    builder.addCase(connectGoogle.rejected, (state) => {
      state.google = false;
    });
    builder.addCase(connectFacebook.pending, (state) => {
      state.fb = true;
    });
    builder.addCase(connectFacebook.fulfilled, (state, action) => {
      state.fb = false;
    });
    builder.addCase(connectFacebook.rejected, (state) => {
      state.fb = false;
    });
    builder.addCase(disConnectGoogle.pending, (state) => {
      state.google = true;
    });
    builder.addCase(disConnectGoogle.fulfilled, (state, action) => {
      state.google = false;
    });
    builder.addCase(disConnectGoogle.rejected, (state) => {
      state.google = false;
    });
    builder.addCase(disConnectFacebook.pending, (state) => {
      state.fb = true;
    });
    builder.addCase(disConnectFacebook.fulfilled, (state, action) => {
      state.fb = false;
    });
    builder.addCase(disConnectFacebook.rejected, (state) => {
      state.fb = false;
    });
    builder.addCase(verifyPhoneOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyPhoneOtp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(verifyPhoneOtp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(generateOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(generateOtp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(generateOtp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readDashboard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readDashboard.fulfilled, (state, action) => {
      if (action?.payload) state.dashboard = action?.payload
      state.loading = false;
    });
    builder.addCase(readDashboard.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readAdminDashboard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readAdminDashboard.fulfilled, (state, action) => {
      if (action?.payload) state.adminDashboard = action?.payload
      state.loading = false;
    });
    builder.addCase(readAdminDashboard.rejected, (state) => {
      state.loading = false;
    });
  },
});
export default authSlice.reducer;
export const { setUser, setErrorMessage, setEmail } = authSlice.actions;
