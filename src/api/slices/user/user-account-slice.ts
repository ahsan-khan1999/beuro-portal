import apiServices from "@/services/requestHandler";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setErrorMessage, setUser } from "../authSlice/auth";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums";
import { setErrors } from "@/utils/utility";
import { updateQuery } from "@/utils/update-query";
import { isJSON } from "@/utils/functions";
import { getUser, saveUser } from "@/utils/auth.util";

const initialState = {
    loading: false,
    notications: []
}

export const commercialSellerRequest: AsyncThunk<boolean, object, object> = createAsyncThunk(
    "commerical/seller/request",
    async (args: any, thunkApi) => {
        const { data, setError, translate } = args
        try {
            await apiServices.commercialSellerRequest(data)
            thunkApi.dispatch(setErrorMessage(null))
            thunkApi.dispatch(updateModalType(ModalType.COMMERCIAL_SELLER_SUCCESS))

            return true;
        } catch (e: any) {
            setErrors(setError, e?.data.data, translate)

            thunkApi.dispatch(setErrorMessage(e?.data?.message))
            return false;
        }
    }
);
export const userProfileNotification: AsyncThunk<boolean, { data: object }, object> = createAsyncThunk(
    "user/profile/notification",
    async (args: { data: object }, thunkApi) => {
        const { data } = args
        try {
            const response = await apiServices.profileNotification(data)
            thunkApi.dispatch(setErrorMessage(null))
            const user = isJSON(getUser())
            saveUser({ ...user, notificationSettings: response?.data?.NotificationSettings });
            thunkApi.dispatch(setUser({ ...user, notificationSettings: response?.data?.NotificationSettings }))
            // thunkApi.dispatch(updateModalType(ModalType.COMMERCIAL_SELLER_SUCCESS))

            return true;
        } catch (e: any) {
            // setErrors(setError, e?.data.data, translate)

            thunkApi.dispatch(setErrorMessage(e?.data?.message))
            return false;
        }
    }
);
export const idVarificationRequest: AsyncThunk<boolean, object, object> = createAsyncThunk(
    "id/varification/request",
    async (args: any, thunkApi) => {
        const { apiData, setError, translate, router } = args
        try {
            await apiServices.idVarificationRequest(apiData)
            thunkApi.dispatch(setErrorMessage(null))
            // thunkApi.dispatch(updateModalType(ModalType.COMMERCIAL_SELLER_SUCCESS))
            router.pathname = "/user-account-settings/personal-details"
            updateQuery(router, "en")
            return true;
        } catch (e: any) {
            setErrors(setError, e?.data.data, translate)

            thunkApi.dispatch(setErrorMessage(e?.data?.message))
            return false;
        }
    }
);
const userAccountSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(commercialSellerRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(commercialSellerRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(commercialSellerRequest.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(idVarificationRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(idVarificationRequest.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(idVarificationRequest.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(userProfileNotification.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userProfileNotification.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(userProfileNotification.rejected, (state) => {
            state.loading = false;
        });
    },

});

export default userAccountSlice.reducer;