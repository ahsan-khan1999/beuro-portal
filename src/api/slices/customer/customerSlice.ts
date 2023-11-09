import apiServices from "@/services/requestHandler";
import { Customers } from "@/types/customer"
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";

interface CustomerState {
    customer: Customers[];
    loading: boolean;
    error: Record<string, object>
}

const initialState: CustomerState = {
    customer: [],
    loading: false,
    error: {}
}

export const readCustomer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("customer/read", async (args, thunkApi) => {
        const { params, router, setError, translate } = args as any;

        try {
            await apiServices.readCustomer(params);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });

export const readCustomerDetail: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("customer/read/details", async (args, thunkApi) => {
        const { params, router, setError, translate } = args as any;

        try {
            await apiServices.readCustomerDetail(params);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const createCustomer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("customer/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.createCustomer(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const updateCustomer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("customer/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.updateCustomer(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const deleteCustomer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("customer/delete", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.deleteCustomer(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });


const customerSlice = createSlice({
    name: "CustomerSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readCustomer.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readCustomer.fulfilled, (state, action) => {
            state.loading = false;
            state.customer = action.payload
        });
        builder.addCase(readCustomer.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createCustomer.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createCustomer.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createCustomer.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateCustomer.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateCustomer.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateCustomer.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteCustomer.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteCustomer.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteCustomer.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(readCustomerDetail.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readCustomerDetail.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(readCustomerDetail.rejected, (state) => {
            state.loading = false
        })

    },
})

export default customerSlice.reducer;
export const { setErrorMessage } = customerSlice.actions