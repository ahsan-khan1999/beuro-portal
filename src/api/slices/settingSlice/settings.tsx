import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types";

interface SettingsState {
    user: User | null;
    loading: boolean;
    error: Record<string, object>,
    templateSettings: object | null
}

const initialState: SettingsState = {
    user: null,
    loading: false,
    error: {},
    templateSettings: null

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
        const { data, router, setError, translate } = args as any;

        try {
            const response = await apiServices.getTemplateSettings(data);
            return response?.data?.data;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
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

const SettingSlice = createSlice({
    name: "SettingSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
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

    },
})

export default SettingSlice.reducer;
export const { setErrorMessage } = SettingSlice.actions