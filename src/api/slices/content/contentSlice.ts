import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { ContentTableRowTypes } from "@/types/content";

interface ContentState {
    content: ContentTableRowTypes[];
    loading: boolean;
    error: Record<string, object>
}

const initialState: ContentState = {
    content: [],
    loading: false,
    error: {}
}

export const readContent: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("content/read", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.readContent(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const createContent: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("content/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.createContent(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const updateContent: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("content/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.updateContent(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const deleteContent: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("content/delete", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.deleteContent(data);
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
    },
    extraReducers(builder) {
        builder.addCase(readContent.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readContent.fulfilled, (state, action) => {
            state.loading = false;
            state.content = action.payload
        });
        builder.addCase(readContent.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createContent.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createContent.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createContent.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateContent.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateContent.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateContent.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteContent.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteContent.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteContent.rejected, (state) => {
            state.loading = false
        })

    },
})

export default contentSlice.reducer;
export const { setErrorMessage } = contentSlice.actions