// import { ModalType } from "@/enums";
import { ModalType } from "@/enums/ui";
import { BASEURL } from "@/services/HttpProvider";
import { GlobalState } from "@/types/global";
import { getRefreshToken, getToken, logout } from "@/utils/auth.util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next";

const initialState: GlobalState = {
  loading: false,
  file: null,
  modal: {
    type: ModalType.NONE,
    data: ""
  },
};

// file upload connect with the firebase
export const uploadFileToFirebase: any = createAsyncThunk(
  "file/upload",
  async (data) => {
    const [authToken, refreshToken] = await Promise.all([getToken(), getRefreshToken()])
    try {
      const response = await axios.post(
        BASEURL + "/integrations/aws/storage",
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
      return response?.data?.data?.url;
    } catch (response: any) {
      if (response?.response?.data?.code === 401) {
        logout();
        // window.location  = "/";
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
      state.modal.type = action.payload;
      state.modal.data = action.payload.data;

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
  },
});

export default globalSlice.reducer;
export const { updateModalType } = globalSlice.actions;
