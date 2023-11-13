import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { Service } from "@/types/service";

interface ServiceState {
    service: Service[];
    loading: boolean;
    error: Record<string, object>
}

const initialState: ServiceState = {
    service: [],
    loading: false,
    error: {}
}

export const readService: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("service/read", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.readService(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const createService: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("service/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.createService(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const updateService: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("service/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.updateService(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const deleteService: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("service/delete", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.deleteService(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });


const ServiceSlice = createSlice({
    name: "ServiceSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readService.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readService.fulfilled, (state, action) => {
            state.loading = false;
            state.service = action.payload
        });
        builder.addCase(readService.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createService.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createService.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createService.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateService.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateService.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateService.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteService.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteService.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteService.rejected, (state) => {
            state.loading = false
        })

    },
})

export default ServiceSlice.reducer;
export const { setErrorMessage } = ServiceSlice.actions