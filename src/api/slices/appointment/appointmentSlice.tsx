import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_APPOINTMETNS } from "@/utils/static";
import { Appointments } from "@/types/appointments";

export interface AppointmentState {
  appointment: Appointments[];
  loading: boolean;
  isLoading: boolean;
  error: Record<string, object>;
  lastPage: number;
  totalCount: number;
  appointmentDetails: Appointments;
}

const initialState: AppointmentState = {
  appointment: [],
  loading: false,
  isLoading: true,
  error: {},
  lastPage: 1,
  totalCount: 10,
  //@ts-expect-error
  appointmentDetails: DEFAULT_APPOINTMETNS,
};

export const createAppointment: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("create/appointment", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const res = await apiServices.createCompanyAppointment(data);
      return res?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const updateAppointment: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("update/appointment", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.updateAppointment(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const readAppointments: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("view/appointments", async (args, thunkApi) => {
    try {
      const response = await apiServices.readCompanyAppointments({});
      return response?.data?.data?.Appointment;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const readSingleAppointment: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/appointment", async (args, thunkApi) => {
    try {
      const response = await apiServices.readAppointment({});
      return response?.data?.data?.Appointment;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },

    setAppointmentDetails: (state, action) => {
      state.appointmentDetails = action.payload;
    },
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(readAppointments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readAppointments.fulfilled, (state, action) => {
      state.appointmentDetails = action.payload;
      state.isLoading = false;
    });
    builder.addCase(readAppointments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(readSingleAppointment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readSingleAppointment.fulfilled, (state, action) => {
      state.appointmentDetails = action.payload;
      state.isLoading = false;
    });
    builder.addCase(readSingleAppointment.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createAppointment.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAppointment.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateAppointment.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default appointmentSlice.reducer;
export const { setErrorMessage, setAppointmentDetails } =
  appointmentSlice.actions;
