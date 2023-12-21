import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { Employee } from "@/types/employee";
import { DEFAULT_EMPLOYEE } from "@/utils/static";

interface EmployeeState {
    employee: Employee[];
    loading: boolean;
    error: Record<string, object>;
    totalCount: number;
    lastPage: number;
    employeeDetails: Employee;
}

const initialState: EmployeeState = {
    employee: [],
    loading: false,
    error: {},
    lastPage: 1,
    totalCount: 10,
    //@ts-expect-error
    employeeDetails: DEFAULT_EMPLOYEE

}

export const readEmployee: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("employee/read", async (args, thunkApi) => {
        const { params, router, setError, translate } = args as any;


        try {
            const response = await apiServices.readEmployee(params);
            return response?.data?.data;

        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const readEmployeeDetail: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("employee/read/details", async (args, thunkApi) => {
        const { params, router, setError, translate } = args as any;

        try {
            const response = await apiServices.readEmployeeDetail(params);
            return response?.data?.data.Employee;
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
export const updateEmployeePassword: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("employee/update/passowrd", async (args, thunkApi) => {
        const { apiData, router, setError, translate } = args as any;

        try {
            await apiServices.updateEmployeePassword(apiData);
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

            await apiServices.deleteEmployee(data?.id);
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
        setEmployeeDetails: (state, action) => {
            state.employeeDetails = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readEmployee.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readEmployee.fulfilled, (state, action) => {
            state.employee = action.payload.Customer,
                state.lastPage = action.payload.lastPage,
                state.totalCount = action.payload.totalCount,
                state.loading = false;

        });
        builder.addCase(readEmployee.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(readEmployeeDetail.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readEmployeeDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.employeeDetails = action.payload
        });
        builder.addCase(readEmployeeDetail.rejected, (state) => {
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
        builder.addCase(updateEmployeePassword.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateEmployeePassword.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateEmployeePassword.rejected, (state) => {
            state.loading = false
        })

    },
})

export default EmployeeSlice.reducer;
export const { setErrorMessage, setEmployeeDetails } = EmployeeSlice.actions