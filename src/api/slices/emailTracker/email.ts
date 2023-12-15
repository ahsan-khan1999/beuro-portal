import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types";
import { TableRowEmailTracker } from "@/types/emailTracker";
import { updateQuery } from "@/utils/update-query";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums/ui";

interface SettingsState {
    email: TableRowEmailTracker[];
    loading: boolean;
    error: Record<string, object>,
    totalCount: number;
    lastPage: number;
    emailDetails: TableRowEmailTracker | null
}

const initialState: SettingsState = {
    email: [],
    loading: false,
    error: {},
    lastPage: 1,
    totalCount: 10,
    emailDetails: null
}


export const readEmail: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("email/read", async (args, thunkApi) => {
        const { params, router, setError, translate } = args as any;

        try {
            const response = await apiServices.getEmails(params);
            return response?.data?.data;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });

export const readEmailDetail: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("email/read/details", async (args, thunkApi) => {
        const { params, router, setError, translate } = args as any;

        try {
            const response = await apiServices.getEmailDetails(params);
            return response?.data?.data.MailTracker;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const deleteEmail: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("email/delete", async (args, thunkApi) => {
        const {  data, router, setError, translate } = args as any;

        try {
            await apiServices.deleteEmail(data);
            router.pathname = "/email-tracker"
            updateQuery(router, router.locale)
            thunkApi.dispatch(updateModalType({
                type:
                    ModalType.NONE
            }));
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });

const EmailSlice = createSlice({
    name: "EmailSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readEmail.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readEmail.fulfilled, (state, action) => {
            state.email = action.payload.MailTracker;
            state.lastPage = action.payload.lastPage;
            state.totalCount = action.payload.totalCount;
            state.loading = false;
        });
        builder.addCase(readEmail.rejected, (state) => {
            state.loading = false
        });

        builder.addCase(readEmailDetail.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readEmailDetail.fulfilled, (state, action) => {
            state.emailDetails = action.payload
            state.loading = false

        });
        builder.addCase(readEmailDetail.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteEmail.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteEmail.fulfilled, (state, action) => {
            state.loading = false

        });
        builder.addCase(deleteEmail.rejected, (state) => {
            state.loading = false
        });


    },
})

export default EmailSlice.reducer;
export const { setErrorMessage } = EmailSlice.actions