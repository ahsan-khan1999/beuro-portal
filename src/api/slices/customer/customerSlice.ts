import apiServices from "@/services/requestHandler";
import { Customers } from "@/types/customer"
import { senitizePhone, setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { staticEnums } from "@/utils/static";

interface CustomerState {
    customer: Customers[];
    loading: boolean;
    error: Record<string, object>,
    totalCount: number;
    lastPage: number;

}

const initialState: CustomerState = {
    customer: [],
    loading: false,
    error: {},
    lastPage: 1,
    totalCount: 10

}

export const readCustomer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("customer/read", async (args, thunkApi) => {
        const { params, router, setError, translate } = args as any;

        try {
            const response = await apiServices.readCustomer(params);
            return response?.data?.data;
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
            let apiData = { ...data }
            //@ts-expect-error 
            apiData = { ...apiData, customerType: staticEnums["CustomerType"][data.customerType] }
            //@ts-expect-error 
            if (staticEnums["CustomerType"][data.customerType] == 1) delete apiData["companyName"]
            await apiServices.createCustomer(apiData);
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
            state.customer = action.payload.Customer,
                state.lastPage = action.payload.lastPage,
                state.totalCount = action.payload.totalCount,
                state.loading = false;
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