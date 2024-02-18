import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types";
import {
  CompanyQrSettings,
  EmailSetting,
  EmailTemplate,
  FollowUp,
  QRSettings,
  TemplateSettings,
} from "@/types/settings";
import { setUser } from "../authSlice/auth";
import { saveUser } from "@/utils/auth.util";
export interface TaxSetting {
  id: string;
  name: string;
  taxRate: String;
  createdAt: string;
}

interface SettingsState {
  user: User | null;
  loading: boolean;
  error: Record<string, object>;
  templateSettings: TemplateSettings | null;
  systemSettings: SystemSetting | null;
  tax: TaxSetting[] | null;
  followUps: FollowUp | null;
  emailSettings: EmailSetting | null;
  emailTemplate: EmailTemplate | null;
  qrSettings: CompanyQrSettings | null;
}

export interface SystemSetting {
  allowedDomains: string[];
  createdAt?: string;
  currency: string;
  daysLimit: number;
  reminderText: string;
  offerReminderFrequency: number;
  secondWarningDays: number;
  thirdWarningDays: number;
  isInvoiceOverDue: boolean;
  id: string;
  taxType: string;
}

const initialState: SettingsState = {
  user: null,
  loading: false,
  error: {},
  templateSettings: null,
  systemSettings: null,
  tax: null,
  followUps: null,
  emailSettings: null,
  emailTemplate: null,
  qrSettings: null,
};

export const updateAccountSettings: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("account/settings/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateAccountSettings(data);
      thunkApi.dispatch(setUser(response?.data?.User));
      saveUser(response?.data?.User);

      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateUserPassword: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/password/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.updatePassword(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const getTemplateSettings: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/template/setting", async (args, thunkApi) => {
    try {
      const response = await apiServices.getTemplateSettings({});
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });
export const updateTemplateSetting: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/template/settings", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.updateTemplateSettings(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const readSystemSettings: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/System/setting", async (args, thunkApi) => {
    // const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.getSystemSettings({});
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      // setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const updateSystemSetting: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/System/settings", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.updateSystemSettings(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const readTaxSettings: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/tax/setting", async (args, thunkApi) => {
    try {
      const response = await apiServices.readTaxSettings({});
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });
export const createTaxSetting: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/tax/settings", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const res = await apiServices.createTaxSettings(data);
      return res?.data?.data?.Tax;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const readFollowUpSettings: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/followup/setting", async (args, thunkApi) => {
    // const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.getFollowUpSettings({});
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      // setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const updateFollowUpSetting: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/followup/settings", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateFollowUpSettings(data);
      return response?.data?.data?.FollowUpSetting;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const readEmailSettings: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/email/setting/read", async (args, thunkApi) => {
    try {
      const response = await apiServices.readMailSettings({});
      return response?.data?.data?.MailSetting;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });
export const updateEmailSetting: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/email/settings/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.createMailSettings(data);
      return response?.data?.data?.MailSetting;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateEmailTemplateSetting:
  | AsyncThunk<boolean, object, object>
  | any = createAsyncThunk(
  "add/user/email/template/setting",
  async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.createEmailTemplateSettings(data);
      return response?.data?.data?.MailSetting;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  }
);

export const updateAdminSetting: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("admin/setting", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateAdminSettings(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const readQrCodeSettings: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("user/qrcode/setting/read", async (args, thunkApi) => {
    try {
      const response = await apiServices.readSettingsQrCode({});
      return response?.data?.data?.QrCode;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const createQrCodeSetting: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("create/qrcode/setting", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.createSettingsQrCode(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
const SettingSlice = createSlice({
  name: "SettingSlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setTaxSettings: (state, action) => {
      state.tax = action.payload;
    },
    setFollowUpSettings: (state, action) => {
      state.followUps = action.payload;
    },
    setSystemSettings: (state, action) => {
      state.systemSettings = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateAccountSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAccountSettings.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateAccountSettings.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateUserPassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getTemplateSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTemplateSettings.fulfilled, (state, action) => {
      state.templateSettings = action.payload?.Template;
      state.loading = false;
    });
    builder.addCase(getTemplateSettings.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateTemplateSetting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTemplateSetting.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateTemplateSetting.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readSystemSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readSystemSettings.fulfilled, (state, action) => {
      state.systemSettings = action.payload?.Setting;
      state.loading = false;
    });
    builder.addCase(readSystemSettings.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateSystemSetting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSystemSetting.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateSystemSetting.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readTaxSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readTaxSettings.fulfilled, (state, action) => {
      state.tax = action.payload?.Tax;
      state.loading = false;
    });
    builder.addCase(readTaxSettings.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createTaxSetting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTaxSetting.fulfilled, (state, action) => {
      if (state.tax && action.payload) {
        state.tax = [...state.tax, action.payload];
      }
      state.loading = false;
    });
    builder.addCase(createTaxSetting.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readFollowUpSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readFollowUpSettings.fulfilled, (state, action) => {
      state.followUps = action.payload?.FollowUpSetting;
      state.loading = false;
    });
    builder.addCase(readFollowUpSettings.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateFollowUpSetting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFollowUpSetting.fulfilled, (state, action) => {
      state.followUps = action?.payload;
      state.loading = false;
    });
    builder.addCase(updateFollowUpSetting.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readEmailSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readEmailSettings.fulfilled, (state, action) => {
      state.emailSettings = action.payload;
      state.loading = false;
    });
    builder.addCase(readEmailSettings.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateEmailSetting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateEmailSetting.fulfilled, (state, action) => {
      state.emailSettings = action.payload;
      state.loading = false;
    });
    builder.addCase(updateEmailSetting.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateEmailTemplateSetting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateEmailTemplateSetting.fulfilled, (state, action) => {
      state.emailTemplate = action.payload;
      state.loading = false;
    });
    builder.addCase(updateEmailTemplateSetting.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateAdminSetting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAdminSetting.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateAdminSetting.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readQrCodeSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readQrCodeSettings.fulfilled, (state, action) => {
      state.qrSettings = action.payload;
      state.loading = false;
    });
    builder.addCase(readQrCodeSettings.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createQrCodeSetting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createQrCodeSetting.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createQrCodeSetting.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default SettingSlice.reducer;
export const {
  setErrorMessage,
  setTaxSettings,
  setFollowUpSettings,
  setSystemSettings,
} = SettingSlice.actions;
