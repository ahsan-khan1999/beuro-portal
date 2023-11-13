import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { Employee } from "@/types/employee";

interface EmployeeState {
    employee: Employee[];
    loading: boolean;
    error: Record<string, object>
}

const initialState: EmployeeState = {
    employee: [],
    loading: false,
    error: {}
}

export const readEmployee: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("employee/read", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.readEmployee(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const createEmployee: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("employee/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.createEmployee(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const updateEmployee: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("employee/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.updateEmployee(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const deleteEmployee: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("employee/delete", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.deleteEmployee(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });


const EmployeeSlice = createSlice({
    name: "EmployeeSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readEmployee.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.employee = action.payload
        });
        builder.addCase(readEmployee.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createEmployee.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createEmployee.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createEmployee.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateEmployee.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateEmployee.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteEmployee.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteEmployee.rejected, (state) => {
            state.loading = false
        })

    },
})

export default EmployeeSlice.reducer;
export const { setErrorMessage } = EmployeeSlice.actions