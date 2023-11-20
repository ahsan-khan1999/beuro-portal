import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { Lead } from "@/types/leads";

interface LeadState {
    lead: Lead[];
    loading: boolean;
    error: Record<string, object>,
    lastPage: number,
    totalCount: number
}

const initialState: LeadState = {
    lead: [],
    loading: false,
    error: {},
    lastPage: 1,
    totalCount: 10,
}

export const readLead: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("lead/read", async (args, thunkApi) => {
        const { params } = args as any;

        try {
            const response = await apiServices.readLead(params);
            return response?.data?.data;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            return false;
        }
    });
export const createLead: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("lead/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.createLead(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const updateLead: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("lead/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.updateLead(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const deleteLead: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("lead/delete", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.deleteLead(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });


const leadSlice = createSlice({
    name: "leadSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readLead.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readLead.fulfilled, (state, action) => {
            state.lead = action.payload.Lead;
            state.lastPage = action.payload.lastPage,
                state.totalCount = action.payload.totalCount,
                state.loading = false;
        });
        builder.addCase(readLead.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createLead.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createLead.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createLead.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateLead.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateLead.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateLead.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteLead.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteLead.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteLead.rejected, (state) => {
            state.loading = false
        })

    },
})

export default leadSlice.reducer;
export const { setErrorMessage } = leadSlice.actions