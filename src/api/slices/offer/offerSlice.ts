import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { OffersTableRowTypes } from "@/types/offers";

interface OfferState {
    offer: OffersTableRowTypes[];
    loading: boolean;
    error: Record<string, object>
}

const initialState: OfferState = {
    offer: [],
    loading: false,
    error: {}
}

export const readOffer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("offer/read", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.readOffer(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const createOffer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("offer/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.createOffer(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const updateOffer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("offer/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.updateOffer(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const deleteOffer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("offer/delete", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.deleteOffer(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });


const OfferSlice = createSlice({
    name: "OfferSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readOffer.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readOffer.fulfilled, (state, action) => {
            state.loading = false;
            state.offer = action.payload
        });
        builder.addCase(readOffer.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createOffer.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createOffer.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createOffer.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateOffer.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateOffer.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateOffer.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteOffer.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteOffer.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteOffer.rejected, (state) => {
            state.loading = false
        })

    },
})

export default OfferSlice.reducer;
export const { setErrorMessage } = OfferSlice.actions