import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { InvoiceTableRowTypes } from "@/types/invoice";

interface InvoiceState {
    invoice: InvoiceTableRowTypes[];
    loading: boolean;
    error: Record<string, object>
}

const initialState: InvoiceState = {
    invoice: [],
    loading: false,
    error: {}
}

export const readInvoice: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("invoice/read", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.readInvoice(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const createInvoice: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("invoice/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.createInvoice(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const updateInvoice: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("invoice/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.updateInvoice(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const deleteInvoice: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("invoice/delete", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.deleteInvoice(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });


const InvoiceSlice = createSlice({
    name: "InvoiceSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readInvoice.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readInvoice.fulfilled, (state, action) => {
            state.loading = false;
            state.invoice = action.payload
        });
        builder.addCase(readInvoice.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createInvoice.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createInvoice.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createInvoice.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateInvoice.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateInvoice.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateInvoice.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteInvoice.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteInvoice.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteInvoice.rejected, (state) => {
            state.loading = false
        })

    },
})

export default InvoiceSlice.reducer;
export const { setErrorMessage } = InvoiceSlice.actions