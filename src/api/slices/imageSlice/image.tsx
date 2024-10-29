import apiServices from "@/services/requestHandler";
import { User } from "@/types";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface Image {
  attachments: string[];
  images: string[];
  videos: string[];
  links: string[];
  contractID: string;
  createdAt: string;
  id: string;
  offerID: string;
  leadID: string;
}
interface NoteState {
  images: Image | null;
  loading: boolean;
  error: Record<string, object>;
  totalCount: number;
  lastPage: number;
}

const initialState: NoteState = {
  images: null,
  loading: false,
  error: {},
  lastPage: 1,
  totalCount: 10,
};

export const readImage: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("images/read", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;

    try {
      const response = await apiServices.readImage(params);
      return response?.data?.data?.Image;
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const createImage: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("image/create", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.createImage(data);
      return response?.data?.data?.Image;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

const imageSlice = createSlice({
  name: "imageSlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(readImage.pending, (state) => {
      state.loading = true;
      state.images = null;
    });
    builder.addCase(readImage.fulfilled, (state, action) => {
      state.images = action.payload;
      state.lastPage = action.payload?.lastPage;
      state.totalCount = action.payload?.totalCount;
      state.loading = false;
    });
    builder.addCase(readImage.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createImage.fulfilled, (state, action) => {
      if (action.payload) state.images = action.payload;
      state.loading = false;
    });
    builder.addCase(createImage.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default imageSlice.reducer;
export const { setErrorMessage, setImages } = imageSlice.actions;
