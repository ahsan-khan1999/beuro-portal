import apiServices from "@/services/requestHandler";
import { setErrors, transformValidationMessages } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OffersTableRowTypes } from "@/types/offers";
import { DEFAULT_OFFER, staticEnums } from "@/utils/static";
import localStoreUtil from "@/utils/localstore.util";
import { updateQuery } from "@/utils/update-query";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums/ui";

interface OfferState {
    offer: OffersTableRowTypes[];
    loading: boolean;
    error: Record<string, object>,
    lastPage: number,
    totalCount: number,
    offerDetails: OffersTableRowTypes
}

const initialState: OfferState = {
    offer: [],
    loading: false,
    error: {},
    lastPage: 1,
    totalCount: 10,
    offerDetails: DEFAULT_OFFER
}

export const readOffer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("offer/read", async (args, thunkApi) => {
        const { params } = args as any;

        try {
            const response = await apiServices.readOffer(params);
            return response?.data?.data;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            return false;
        }
    });
export const readOfferDetails: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("offer/read/details", async (args, thunkApi) => {
        const { params } = args as any;

        try {
            const response = await apiServices.readOfferDetail(params);
            return response?.data?.data.Offer;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            return false;
        }
    });
export const createOffer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("offer/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            console.log("comming");
            
            const { offerId, step, stage } = data
            let apiData = { ...data, offerId: offerId, step: step }

            //@ts-expect-error 
            apiData = { ...apiData, customerType: staticEnums["CustomerType"][data.customerType] }
            //@ts-expect-error 
            if (staticEnums["CustomerType"][data.customerType] == 0) delete apiData["companyName"]
            const response = await apiServices.createOffer(apiData);
            let objectToUpdate = { ...response?.data?.data?.Offer, type: apiData?.type, stage: stage }
            localStoreUtil.store_data("offer", objectToUpdate)
            thunkApi.dispatch(setOfferDetails(objectToUpdate));


            return response?.data?.data?.Offer;
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
            const { stage } = data

            const response = await apiServices.updateOffer(data);
            const offerData = await localStoreUtil.get_data("offer")
            let objectToUpdate = { ...response?.data?.Offer, type: offerData?.type, stage: stage }

            localStoreUtil.store_data("offer", objectToUpdate)
            thunkApi.dispatch(setOfferDetails(objectToUpdate));


            return response?.data?.Offer;
        } catch (e: any) {
            if (Array.isArray(e?.data?.data?.address)) {
                let transformedValidationMessages = transformValidationMessages(e?.data?.data?.address)
                setErrors(setError, transformedValidationMessages, translate);
            } else {
                setErrors(setError, e?.data?.data, translate);
            }
            thunkApi.dispatch(setErrorMessage(e?.data?.data?.message));
            return false;
        }
    });
export const createOfferNotes: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("offer/notes", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            const response = await apiServices.updateOfferNotes(data);
            return response?.data?.Offer;
        } catch (e: any) {
            setErrors(setError, e?.data?.data, translate);
            thunkApi.dispatch(setErrorMessage(e?.data?.data?.message));
            return false;
        }
    });
export const deleteOffer: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("offer/delete", async (args, thunkApi) => {
        const { offerDetails: data, router, translate } = args as any;

        try {
            await apiServices.deleteOffer(data);
            router.pathname = "/offers"
            updateQuery(router, router.locale)
            thunkApi.dispatch(updateModalType({
                type:
                    ModalType.NONE
            }));
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            // setErrors(setError, e?.data.data, translate);
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
        setOfferDetails: (state, action) => {
            state.offerDetails = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readOffer.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readOffer.fulfilled, (state, action) => {
            state.offer = action.payload.Offer;
            state.lastPage = action.payload.lastPage;
            state.totalCount = action.payload.totalCount;
            state.loading = false;
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
            let index = state.offer.findIndex((item) => item.id === action.payload?.id)
            if (index !== -1) {
                state.offer.splice(index, 1, action.payload)
            }
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
        });
        builder.addCase(readOfferDetails.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readOfferDetails.fulfilled, (state, action) => {
            state.offerDetails = action.payload;
            state.loading = false;
        });
        builder.addCase(readOfferDetails.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createOfferNotes.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createOfferNotes.fulfilled, (state, action) => {
            let index = state.offer.findIndex((item) => item.id === action.payload?.id)
            if (index !== -1) {
                state.offer.splice(index, 1, action.payload)
            }
            state.loading = false;
        });
        builder.addCase(createOfferNotes.rejected, (state) => {
            state.loading = false
        });

    },
})

export default OfferSlice.reducer;
export const { setErrorMessage, setOfferDetails } = OfferSlice.actions