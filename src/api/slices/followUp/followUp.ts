import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_FOLLOWUP, staticEnums } from "@/utils/static";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums/ui";
import { FollowUps } from "@/types/follow-up";
import moment from "moment";

interface CustomerState {
  followUp: FollowUps[];
  loading: boolean;
  error: Record<string, object>;
  totalCount: number;
  lastPage: number;
  followUpDetails: FollowUps;
}

const initialState: CustomerState = {
  followUp: [],
  loading: false,
  error: {},
  lastPage: 1,
  totalCount: 10,
  //@ts-expect-error
  followUpDetails: DEFAULT_FOLLOWUP,
};

export const readFollowUp: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("followUp/read", async (args, thunkApi) => {
    const { params, router, translate } = args as any;

    try {
      const response = await apiServices.readFollowUp(params);

      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const readFollowUpDetail: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("followUp/read/details", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;

    try {
      const response = await apiServices.readFollowUpDetail(params);
      return response?.data?.data.FollowUp;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const createFollowUp: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("followUp/create", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      let apiData = { ...data, dateTime: moment(data?.dateTime).toISOString() };
      await apiServices.createFollowUp(apiData);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const updateFollowUp: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("followUp/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      let apiData = { ...data };
      apiData = {
        ...apiData,
        customerType: staticEnums["CustomerType"][data?.customerType],
      };
      if (staticEnums["CustomerType"][data.customerType] == 0)
        delete apiData["companyName"];
      await apiServices.updateFollowUp(apiData);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const deleteFollowUp: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("followUp/delete", async (args, thunkApi) => {
    const { data } = args as any;

    try {
      await apiServices.deleteFollowUp(data);

      thunkApi.dispatch(
        updateModalType({
          type: ModalType.NONE,
        })
      );

      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      // setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const createPostpondNotes: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("followUp/create/postpond/notes", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.createPostPondNotes(data);
      return response?.data?.FollowUp;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const markComplete: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("followUp/markComplete", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.markComplete(data);
      return response?.data?.FollowUp;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
const followUpSlice = createSlice({
  name: "FollowUpSlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setFollowUpDetails: (state, action) => {
      state.followUpDetails = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(readFollowUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readFollowUp.fulfilled, (state, action) => {
      (state.followUp = action.payload.FollowUp),
        (state.lastPage = action.payload.lastPage),
        (state.totalCount = action.payload.totalCount),
        (state.loading = false);
    });
    builder.addCase(readFollowUp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createFollowUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createFollowUp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createFollowUp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateFollowUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFollowUp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateFollowUp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteFollowUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFollowUp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteFollowUp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readFollowUpDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readFollowUpDetail.fulfilled, (state, action) => {
      state.followUpDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(readFollowUpDetail.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createPostpondNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPostpondNotes.fulfilled, (state, action) => {
      state.followUpDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(createPostpondNotes.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(markComplete.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markComplete.fulfilled, (state, action) => {
      state.followUpDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(markComplete.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default followUpSlice.reducer;
export const { setErrorMessage, setFollowUpDetails } = followUpSlice.actions;
