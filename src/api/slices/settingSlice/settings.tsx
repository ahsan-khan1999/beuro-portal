import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types";
export interface TaxSetting {
    id: string;
    name: string;
    taxRate: String;
    createdAt: string
}
interface SettingsState {
    user: User | null;
    loading: boolean;
    error: Record<string, object>,
    templateSettings: object | null,
    systemSettings: SystemSetting | null,
    tax: TaxSetting[] | null

}
export interface SystemSetting {
    allowedDomains: string[];
    createdAt?: string;
    currency: string;
    daysLimit: number;
    isInvoiceOverDue: boolean;
    id: string;
    taxType: string
}

const initialState: SettingsState = {
    user: null,
    loading: false,
    error: {},
    templateSettings: null,
    systemSettings: null,
    tax: null

}


export const updateAccountSettings: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("account/settings/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.updateAccountSettings(data);
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
        
    },
    extraReducers(builder) {
        builder.addCase(updateAccountSettings.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateAccountSettings.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateAccountSettings.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateUserPassword.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateUserPassword.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateUserPassword.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(getTemplateSettings.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getTemplateSettings.fulfilled, (state, action) => {
            state.templateSettings = action.payload?.TemplateSetting
            state.loading = false;
        });
        builder.addCase(getTemplateSettings.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateTemplateSetting.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateTemplateSetting.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateTemplateSetting.rejected, (state) => {
            state.loading = false
        });

        builder.addCase(readSystemSettings.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readSystemSettings.fulfilled, (state, action) => {
            state.systemSettings = action.payload?.Setting
            state.loading = false;
        });
        builder.addCase(readSystemSettings.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateSystemSetting.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateSystemSetting.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateSystemSetting.rejected, (state) => {
            state.loading = false
        });



        builder.addCase(readTaxSettings.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readTaxSettings.fulfilled, (state, action) => {
            state.tax = action.payload?.Tax
            state.loading = false;
        });
        builder.addCase(readTaxSettings.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createTaxSetting.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createTaxSetting.fulfilled, (state, action) => {
            if (state.tax && action.payload) {
                state.tax = [...state.tax, action.payload]
            }
            state.loading = false;

        });
        builder.addCase(createTaxSetting.rejected, (state) => {
            state.loading = false
        });

    },
})

export default SettingSlice.reducer;
export const { setErrorMessage, setTaxSettings } = SettingSlice.actions