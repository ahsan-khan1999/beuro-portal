import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { contractTableTypes } from "@/types/contract";

interface ContractState {
    contract: contractTableTypes[];
    loading: boolean;
    error: Record<string, object>
}

const initialState: ContractState = {
    contract: [],
    loading: false,
    error: {}
}

export const readContract: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("contract/read", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.readContract(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const createContract: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("contract/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.createContract(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const updateContract: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("contract/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.updateContract(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const deleteContract: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("contract/delete", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.deleteContract(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });


const ContractSlice = createSlice({
    name: "ContractSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readContract.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readContract.fulfilled, (state, action) => {
            state.loading = false;
            state.contract = action.payload
        });
        builder.addCase(readContract.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createContract.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createContract.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createContract.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateContract.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateContract.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateContract.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteContract.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteContract.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteContract.rejected, (state) => {
            state.loading = false
        })

    },
})

export default ContractSlice.reducer;
export const { setErrorMessage } = ContractSlice.actions