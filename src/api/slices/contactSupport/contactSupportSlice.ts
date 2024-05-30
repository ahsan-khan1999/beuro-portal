import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomersAdmin } from "@/types/admin/customer";
import { getKeyByValue } from "@/utils/auth.util";
import { DEFAULT_CONTACT_SUPPORT, staticEnums } from "@/utils/static";
// import { ContactSupportTableRowTypes } from "@/types/ContactSupport";

interface ContactSupportState {
  contactSupport: ContactSupport[];
  loading: boolean;
  error: Record<string, object>;
  lastPage: number;
  totalCount: number;
  contactSupportDetails: ContactSupport | null;
}
export interface ContactSupport {
  reason: string;
  message: string;
  id: string;
  createdAt: string;
  createdBy: CustomersAdmin;
  status: string;
  refID: string;
}
const initialState: ContactSupportState = {
  contactSupport: [],
  loading: false,
  error: {},
  lastPage: 1,
  totalCount: 10,
  contactSupportDetails: null,
};

export const readContactSupport: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contactSupport/read", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;

    try {
      const response = await apiServices.readContactSupport(params);
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const readContactSupportDetail:
  | AsyncThunk<boolean, object, object>
  | any = createAsyncThunk("request/read/details", async (args, thunkApi) => {
  const { params, router, setError, translate } = args as any;

  try {
    const response = await apiServices.readContactSupportDetail(params);
    return response?.data?.data.ContactSupport;
  } catch (e: any) {
    thunkApi.dispatch(setErrorMessage(e?.data?.message));
    setErrors(setError, e?.data.data, translate);
    return false;
  }
});

export const createContactSupport: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contactSupport/create", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.createContactSupport(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateContactSupport: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contactSupport/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateContactSupport(data);
      thunkApi.dispatch(setSupportReqDetails(response?.data?.ContactSupport));
      return response?.data?.ContactSupport;
      // return getKeyByValue(staticEnums["SupportRequest"], data.status);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const deleteContactSupport: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contactSupport/delete", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.deleteContactSupport(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

const ContactSupportSlice = createSlice({
  name: "ContactSupportSlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setSupportReqDetails: (state, action) => {
      state.contactSupportDetails = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(readContactSupport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readContactSupport.fulfilled, (state, action) => {
      state.contactSupport = action.payload?.ContactSupport;
      state.lastPage = action.payload?.lastPage;
      state.totalCount = action.payload?.totalCount;
      state.loading = false;
    });
    builder.addCase(readContactSupport.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createContactSupport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createContactSupport.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createContactSupport.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateContactSupport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContactSupport.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateContactSupport.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteContactSupport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteContactSupport.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteContactSupport.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readContactSupportDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readContactSupportDetail.fulfilled, (state, action) => {
      state.contactSupportDetails = action?.payload;
      state.loading = false;
    });
    builder.addCase(readContactSupportDetail.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default ContactSupportSlice.reducer;
export const { setErrorMessage, setSupportReqDetails } =
  ContactSupportSlice.actions;
