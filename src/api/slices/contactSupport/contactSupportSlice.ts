import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
// import { ContactSupportTableRowTypes } from "@/types/ContactSupport";

interface ContactSupportState {
    contactSupport: [];
    loading: boolean;
    error: Record<string, object>
}

const initialState: ContactSupportState = {
    contactSupport: [],
    loading: false,
    error: {}
}

export const readContactSupport: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("contactSupport/read", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.readContactSupport(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const createContactSupport: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("contactSupport/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.createContactSupport(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const updateContactSupport: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("contactSupport/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.updateContactSupport(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const deleteContactSupport: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("contactSupport/delete", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.deleteContactSupport(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });


const ContactSupportSlice = createSlice({
    name: "ContactSupportSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readContactSupport.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readContactSupport.fulfilled, (state, action) => {
            state.loading = false;
            state.contactSupport = action.payload
        });
        builder.addCase(readContactSupport.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createContactSupport.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createContactSupport.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createContactSupport.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateContactSupport.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateContactSupport.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateContactSupport.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteContactSupport.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteContactSupport.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteContactSupport.rejected, (state) => {
            state.loading = false
        })

    },
})

export default ContactSupportSlice.reducer;
export const { setErrorMessage } = ContactSupportSlice.actions