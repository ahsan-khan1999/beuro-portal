// import { ModalType } from "@/enums";
import { ModalType } from "@/enums/ui";
import { BASEURL } from "@/services/HttpProvider";
import { GlobalState } from "@/types/global";
import { getRefreshToken, getToken, logout } from "@/utils/auth.util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: GlobalState = {
  loading: false,
  file: null,
  modal: {
    type: ModalType.NONE,
    data: "",
  },
  currentLanguage: "de",
  locationSearch: null,
  advertLocation: "None",
  filter: {
    location: "None",
  },
};

export const uploadFileToFirebase: any = createAsyncThunk(
  "file/upload",
  async (data) => {
    const [authToken, refreshToken] = await Promise.all([
      getToken(),
      getRefreshToken(),
    ]);
    try {
      const response = await axios.post(
        BASEURL + "/integrations/aws/storage/upload",
        data,
        {
          headers: {
            Accept: "multipart/form-data",
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            accessToken: authToken,
            refreshToken: refreshToken,
          },
        }
      );
      return response?.data?.data;
    } catch (response: any) {
      if (response?.response?.data?.code === 401) {
        logout();
      }
      return false;
    }
  }
);

export const uploadMultiFileToFirebase: any = createAsyncThunk(
  "file/upload/multi",
  async (data) => {
    const [authToken, refreshToken] = await Promise.all([
      getToken(),
      getRefreshToken(),
    ]);
    try {
      const response = await axios.post(
        BASEURL + "/integrations/aws/storage/upload-multiple",
        data,
        {
          headers: {
            Accept: "multipart/form-data",
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            accessToken: authToken,
            refreshToken: refreshToken,
          },
        }
      );
      return response?.data?.data;
    } catch (response: any) {
      if (response?.response?.data?.code === 401) {
        logout();
      }
      return false;
    }
  }
);
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateModalType: (state, action) => {
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data;
    },
    updateCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    updateLocation: (state, action) => {
      state.locationSearch = action.payload;
    },
    updateAdvertLocation: (state, action) => {
      state.advertLocation = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(uploadFileToFirebase.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadFileToFirebase.fulfilled, (state, action) => {
      state.file = action.payload;
      state.loading = false;
    });
    builder.addCase(uploadFileToFirebase.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(uploadMultiFileToFirebase.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadMultiFileToFirebase.fulfilled, (state, action) => {
      state.file = action.payload;
      state.loading = false;
    });
    builder.addCase(uploadMultiFileToFirebase.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default globalSlice.reducer;
export const {
  updateModalType,
  updateCurrentLanguage,
  updateLocation,
  updateAdvertLocation,
  setFilter,
} = globalSlice.actions;
