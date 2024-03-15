import apiServices from "@/services/requestHandler";
import { setErrors, transformValidationMessages } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ContentTableRowTypes } from "@/types/content";
import { DEFAULT_CONTENT } from "../../../utils/static";
import localStoreUtil from "@/utils/localstore.util";
import { updateQuery } from "@/utils/update-query";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums/ui";

interface ContentState {
  content: ContentTableRowTypes[];
  loading: boolean;
  isLoading: boolean;
  error: Record<string, object>;
  totalCount: number;
  lastPage: number;
  contentDetails: ContentTableRowTypes;
}

const initialState: ContentState = {
  content: [],
  loading: false,
  isLoading: true,
  error: {},
  lastPage: 1,
  totalCount: 10,
  //@ts-expect-error
  contentDetails: DEFAULT_CONTENT,
};

export const readContent: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("content/read", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;

    try {
      const response = await apiServices.readContent(params);
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const readContentDetails: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("content/read/details", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readContentDetail(params);
      return response?.data?.data.Content;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });
export const createContent: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("content/create", async (args, thunkApi) => {
    const { data, router, setError, translate, isUpdate } = args as any;

    try {
      const { contentId, step, stage } = data;
      let apiData = { ...data, contentId: contentId, step: step };

      const response = await apiServices.createContent(apiData);
      let objectToUpdate = {
        ...response?.data?.data?.Content,
        type: apiData?.type,
        stage: stage,
      };
      thunkApi.dispatch(setContentDetails(objectToUpdate));
      localStoreUtil.store_data("content", objectToUpdate);
      // thunkApi.dispatch(setContentDetails(data));

      return response?.data?.data?.Content;
    } catch (e: any) {
      // if (Array.isArray(e?.data?.data?.offerContent.address)) {
      //     let transformedValidationMessages = transformValidationMessages(e?.data?.data?.offerContent.address)
      //     setErrors(setError, transformedValidationMessages, translate);
      //     setErrors(setError, e?.data?.data, translate);

      // }
      setErrors(setError, e?.data?.data, translate);

      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateContentInfo: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("content/udpate/info", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const { contentId, step, stage } = data;
      let apiData = { ...data, contentId: contentId, step: step };

      await apiServices.createContent(apiData);

      return true;
    } catch (e: any) {
      // if (Array.isArray(e?.data?.data?.offerContent.address)) {
      //     let transformedValidationMessages = transformValidationMessages(e?.data?.data?.offerContent.address)
      //     setErrors(setError, transformedValidationMessages, translate);
      //     setErrors(setError, e?.data?.data, translate);

      // }
      setErrors(setError, e?.data?.data, translate);

      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });
export const updateContent: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("content/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const { stage } = data;

      const response = await apiServices.updateContent(data);
      const contentData = await localStoreUtil.get_data("content");
      let objectToUpdate = {
        ...response?.data?.Content,
        type: contentData?.type,
        stage: stage,
      };

      thunkApi.dispatch(setContentDetails(objectToUpdate));
      localStoreUtil.store_data("content", objectToUpdate);

      return response?.data?.Content;
    } catch (e: any) {
      if (Array.isArray(e?.data?.data?.address)) {
        let transformedValidationMessages = transformValidationMessages(
          e?.data?.data?.address
        );
        setErrors(setError, transformedValidationMessages, translate);
      } else {
        setErrors(setError, e?.data?.data, translate);
      }
      thunkApi.dispatch(setErrorMessage(e?.data?.data?.message));
      return false;
    }
  });
export const deleteContent: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("content/delete", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.deleteContent(data);
      router.pathname = "/content";
      updateQuery(router, router.locale);
      thunkApi.dispatch(
        updateModalType({
          type: ModalType.NONE,
        })
      );
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

const contentSlice = createSlice({
  name: "contentSlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setContentDetails: (state, action) => {
      state.contentDetails = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(readContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readContent.fulfilled, (state, action) => {
      state.content = action.payload.Content;
      state.lastPage = action.payload.lastPage;
      state.totalCount = action.payload.totalCount;
      state.isLoading = false;
    });
    builder.addCase(readContent.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createContent.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createContent.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateContentInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContentInfo.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateContentInfo.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContent.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateContent.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteContent.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteContent.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readContentDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readContentDetails.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(readContentDetails.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default contentSlice.reducer;
export const { setErrorMessage, setContentDetails } = contentSlice.actions;
