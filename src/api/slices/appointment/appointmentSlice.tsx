import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_APPOINTMETNS, DEFAULT_REPOT } from "@/utils/static";
import { Appointments, Report } from "@/types/appointments";

export interface AppointmentState {
  appointment: Appointments[];
  loading: boolean;
  isLoading: boolean;
  error: Record<string, object>;
  lastPage: number;
  totalCount: number;
  appointmentDetails: Appointments;
  reportDetails: Report;
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
  //@ts-expect-error
  reportDetails: DEFAULT_REPOT,
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

export const readAppointments: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("view/appointments", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readCompanyAppointments(params);
      return response?.data?.data?.Appointment;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const readAppointmentDetails: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("read/appointment/details", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readAppointmentDetails(params);

      return response?.data?.data?.Appointment;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateAppointment: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("update/appointment", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const res = await apiServices.updateAppointment(data);
      return res?.data?.Appointment;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateAppointmentStatus:
  | AsyncThunk<boolean, object, object>
  | any = createAsyncThunk("lead/update/status", async (args, thunkApi) => {
  const { data } = args as any;

  try {
    const response = await apiServices.updateAppointmentStatus(data);
    thunkApi.dispatch(setAppointmentDetails(response?.data?.Appointment));
    // thunkApi.dispatch(setReportDetails(response?.data?.Report));
    return response?.data?.Appointment;
  } catch (e: any) {
    thunkApi.dispatch(setErrorMessage(e?.data?.message));
    return false;
  }
});

export const createReport: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("report/create", async (args, thunkApi) => {
    const { data, setError, translate } = args as any;

    try {
      const response = await apiServices.createAppointmentReport(data);

      return response?.data?.data?.Report;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const readReportdetails: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("report/read/details", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readReportDetail(params);
      return response?.data?.data.Report;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateReport: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("report/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateAppointmentReport(data);
      return response?.data?.Report;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data?.data, translate);
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
    setReportDetails: (state, action) => {
      state.reportDetails = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReport.fulfilled, (state, action) => {
      state.reportDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(createReport.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readAppointments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readAppointments.fulfilled, (state, action) => {
      state.appointment = action.payload;
      state.isLoading = false;
    });
    builder.addCase(readAppointments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(readReportdetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readReportdetails.fulfilled, (state, action) => {
      state.reportDetails = action.payload;
      state.isLoading = false;
    });
    builder.addCase(readReportdetails.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(readAppointmentDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readAppointmentDetails.fulfilled, (state, action) => {
      state.appointmentDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(readAppointmentDetails.rejected, (state) => {
      state.loading = false;
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
      const index = state.appointment.findIndex(
        (item) => item.id === action?.payload?.id
      );
      if (index !== -1) {
        state.appointment[index] = action.payload;
      }

      state.loading = false;
    });
    builder.addCase(updateAppointment.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateReport.fulfilled, (state, action) => {
      state.reportDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(updateReport.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default appointmentSlice.reducer;
export const {
  setErrorMessage,
  setAppointmentDetails,
  setAppointment,
  setReportDetails,
} = appointmentSlice.actions;
