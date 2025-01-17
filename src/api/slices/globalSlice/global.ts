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
  map: false,
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

interface UploadArgs {
  data: FormData;
  onProgress: (percent: number | null) => void;
}

export const uploadMultiFileToFirebase: any = createAsyncThunk<
  string | null,
  UploadArgs
>("file/upload/multi", async ({ data, onProgress }, thunkApi) => {
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
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
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
});

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
    isMapLoaded: (state, action) => {
      state.map = action.payload;
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
  isMapLoaded,
} = globalSlice.actions;
