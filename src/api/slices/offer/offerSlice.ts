import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  OfferActivity,
  OffersTableRowTypes,
  PublicOffersTableRowTypes,
} from "@/types/offers";
import { DEFAULT_OFFER, staticEnums } from "@/utils/static";
import localStoreUtil from "@/utils/localstore.util";
import { updateQuery } from "@/utils/update-query";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums/ui";
import axios from "axios";
import { BASEURL } from "@/services/HttpProvider";
import { getRefreshToken, getToken } from "@/utils/auth.util";
import toast from "react-hot-toast";

interface OfferState {
  offer: OffersTableRowTypes[];
  loading: boolean;
  isLoading: boolean;
  error: Record<string, object>;
  lastPage: number;
  totalCount: number;
  offerDetails: OffersTableRowTypes;
  offerActivity: OfferActivity | null;
  publicOffer: PublicOffersTableRowTypes | null;
  loadingPublicOffer: boolean;
}

const initialState: OfferState = {
  offer: [],
  loading: false,
  isLoading: true,
  error: {},
  lastPage: 1,
  totalCount: 10,
  //@ts-expect-error
  offerDetails: DEFAULT_OFFER,
  offerActivity: null,
  loadingPublicOffer: false,
};

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

export const readOfferPublicDetails: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/read/details/public", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readOfferDetailPublic(params);
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });
export const rejectOfferPublic: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/reject/public", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      await apiServices.rejectOfferPublic(params);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });
export const createOffer: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/create", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const { offerId, step, stage } = data;
      let apiData = { ...data, offerId: offerId, step: step };

      apiData = {
        ...apiData,
        customerType: staticEnums["CustomerType"][data.customerType],
      };
      if (staticEnums["CustomerType"][data.customerType] == 0)
        delete apiData["companyName"];
      const response = await apiServices.createOffer(apiData);
      let objectToUpdate = {
        ...response?.data?.data?.Offer,
        type: apiData?.type,
        stage: stage,
      };
      localStoreUtil.store_data("offer", objectToUpdate);
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
      const { stage } = data;

      const response = await apiServices.updateOffer(data);
      const offerData = await localStoreUtil.get_data("offer");
      let objectToUpdate = {
        ...response?.data?.Offer,
        type: offerData?.type,
        stage: stage,
      };

      localStoreUtil.store_data("offer", objectToUpdate);
      thunkApi.dispatch(setOfferDetails(objectToUpdate));
      return response?.data?.Offer;
    } catch (e: any) {
      setErrors(setError, e?.data?.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateOfferStatus: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/update/status", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateOfferStatus(data);
      thunkApi.dispatch(setOfferDetails(response?.data?.Offer));
      return response?.data?.Offer;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updatePaymentStatus: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/update/payment", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updatePaymentStatus(data);
      thunkApi.dispatch(setOfferDetails(response?.data?.Offer));
      return response?.data?.Offer;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });
export const sendOfferEmail: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/email/", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.sendOfferEmail(data);
      // return response?.data?.Offer;
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const sendOfferByPost: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/post/", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.offerSendByPost(data);
      return response?.data?.Offer;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
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
      router.pathname = "/offers";
      updateQuery(router, router.locale);
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

export const signOffer: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/signOffer", async (args, thunkApi) => {
    const { data, router, translate, formData } = args as any;

    try {
      const [authToken, refreshToken] = await Promise.all([
        getToken(),
        getRefreshToken(),
      ]);

      await axios.put(BASEURL + `/offer/add-signature/${data?.id}`, formData, {
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          accessToken: authToken,
          refreshToken: refreshToken,
        },
      });

      return true;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      thunkApi.dispatch(setErrorMessage(e?.response?.data?.message));
      // setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const readOfferActivity: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/activity", async (args, thunkApi) => {
    const { params, router, translate } = args as any;

    try {
      const response = await apiServices.readOfferActivity(params);

      return response?.data?.data?.OfferActivity;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      // setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateOfferDiscount: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/update/discount", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.updateDiscounts(params);
      return response?.data?.Offer;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateOfferContent: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/update/content", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.updateOfferContent(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updatePublicOfferDates: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("offer/update/public/dates", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateContractDate(data);
      return response?.data?.Offer;
    } catch (e: any) {
      setErrors(setError, e?.data?.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const uploadOfferPdf: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("upload/offer/pdf", async (args, thunkApi) => {
    const { data, router, translate, formData } = args as any;

    try {
      const [authToken, refreshToken] = await Promise.all([
        getToken(),
        getRefreshToken(),
      ]);

      await axios.put(BASEURL + `/offer/upload-file/${data}`, formData, {
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          accessToken: authToken,
          refreshToken: refreshToken,
        },
      });

      return true;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
      thunkApi.dispatch(setErrorMessage(e?.response?.data?.message));
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
    setPublicOfferDetails: (state, action) => {
      state.publicOffer = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(readOffer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readOffer.fulfilled, (state, action) => {
      state.offer = action.payload.Offer;
      state.lastPage = action.payload.lastPage;
      state.totalCount = action.payload.totalCount;
      state.isLoading = false;
    });
    builder.addCase(readOffer.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOffer.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createOffer.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOffer.fulfilled, (state, action) => {
      let index = state.offer.findIndex(
        (item) => item.id === action.payload?.id
      );
      if (index !== -1) {
        state.offer.splice(index, 1, action.payload);
      }
      state.loading = false;
    });
    builder.addCase(updateOffer.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOffer.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteOffer.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readOfferDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readOfferDetails.fulfilled, (state, action) => {
      state.offerDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(readOfferDetails.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createOfferNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOfferNotes.fulfilled, (state, action) => {
      let index = state.offer.findIndex(
        (item) => item.id === action.payload?.id
      );
      if (index !== -1) {
        state.offer.splice(index, 1, action.payload);
      }
      state.loading = false;
    });
    builder.addCase(createOfferNotes.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateOfferStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOfferStatus.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateOfferStatus.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(sendOfferEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendOfferEmail.fulfilled, (state, action) => {
      if (action?.payload) state.offerDetails = action?.payload;
      state.loading = false;
    });
    builder.addCase(sendOfferEmail.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePaymentStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePaymentStatus.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updatePaymentStatus.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signOffer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signOffer.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(signOffer.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readOfferActivity.pending, (state) => {
      // state.loading = true
    });
    builder.addCase(readOfferActivity.fulfilled, (state, action) => {
      state.offerActivity = action?.payload;
      // state.loading = false;
    });
    builder.addCase(readOfferActivity.rejected, (state) => {
      // state.loading = false
    });

    builder.addCase(sendOfferByPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendOfferByPost.fulfilled, (state, action) => {
      if (action?.payload) state.offerDetails = action?.payload;
      state.loading = false;
    });
    builder.addCase(sendOfferByPost.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readOfferPublicDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readOfferPublicDetails.fulfilled, (state, action) => {
      state.publicOffer = action.payload;
      state.loading = false;
    });
    builder.addCase(readOfferPublicDetails.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(rejectOfferPublic.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(rejectOfferPublic.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(rejectOfferPublic.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateOfferDiscount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOfferDiscount.fulfilled, (state, action) => {
      state.loading = false;
      if (action?.payload) state.offerDetails = action?.payload;
    });
    builder.addCase(updateOfferDiscount.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateOfferContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOfferContent.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateOfferContent.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updatePublicOfferDates.pending, (state) => {
      state.loadingPublicOffer = true;
    });
    builder.addCase(updatePublicOfferDates.fulfilled, (state, action) => {
      state.loadingPublicOffer = false;
      // if (action.payload) state.publicOffer = { "Mail": state.publicOffer?.Mail as EmailTemplate, "Template": state.publicOffer?.Template as TemplateType, "setting": state.publicOffer?.setting as SystemSetting, "Offer": action.payload }
    });
    builder.addCase(updatePublicOfferDates.rejected, (state) => {
      state.loadingPublicOffer = false;
    });

    builder.addCase(uploadOfferPdf.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadOfferPdf.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(uploadOfferPdf.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default OfferSlice.reducer;
export const { setErrorMessage, setOfferDetails, setPublicOfferDetails } =
  OfferSlice.actions;
