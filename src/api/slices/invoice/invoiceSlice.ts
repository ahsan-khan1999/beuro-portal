import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  InvoiceDetailTableRowTypes,
  InvoiceTableRowTypes,
  SubInvoiceTableRowTypes,
} from "@/types/invoice";
import { DEFAULT_INVOICE, staticEnums } from "@/utils/static";
import localStoreUtil from "@/utils/localstore.util";
import { updateQuery } from "@/utils/update-query";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums/ui";

interface InvoiceState {
  invoice: InvoiceTableRowTypes[];
  loading: boolean;
  isLoading: boolean;
  error: Record<string, object>;
  lastPage: number;
  totalCount: number;
  invoiceDetails: InvoiceDetailTableRowTypes;
  collectiveInvoice: SubInvoiceTableRowTypes[];
  collectiveInvoiceDetails: SubInvoiceTableRowTypes;
  collectiveReciept: SubInvoiceTableRowTypes[];
  invoiceInfo: { subject: string; description: string };
  invoiceSum: {
    pageSum: number;
    totalSum: number;
    sumOfOpenInvoices: number;
    sumOfOverdueInvoices: number;
    sumOfPaidInvoices: number;
    sumOfPendingInvoices: number;
    sumOfSendingInvoices: number;
  };
  loadingInvoice: boolean;
  loadingReceipt: boolean;
}

const initialState: InvoiceState = {
  invoice: [],
  loading: false,
  isLoading: true,
  error: {},
  lastPage: 1,
  totalCount: 10,
  //@ts-expect-error
  invoiceDetails: DEFAULT_INVOICE,
  collectiveInvoice: [],
  //@ts-expect-error
  collectiveInvoiceDetails: DEFAULT_INVOICE,
  collectiveReciept: [],
  invoiceInfo: {
    subject: "",
    description: "",
  },
  invoiceSum: {
    pageSum: 0,
    totalSum: 0,
    sumOfOpenInvoices: 0,
    sumOfOverdueInvoices: 0,
    sumOfPaidInvoices: 0,
    sumOfPendingInvoices: 0,
    sumOfSendingInvoices: 0,
  },
  loadingInvoice: true,
  loadingReceipt: true,
};

export const readInvoice: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/read", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readInvoice(params);

      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const downloadInvoiceReports: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/download-excel", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.downloadInvoice(params);
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

// invoice calculation
export const invoiceCalculation: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/calculation", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.calculateInvoiceData(params);

      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const readInvoiceDetails: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/read/details", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readInvoiceDetails(params);
      return response?.data?.data.Invoice;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const createInvoice: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/create", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.createInvoiceCollection(data);
      return response?.data?.data?.InvoiceCollection;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const createRecuringInvoice: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/create/recurring", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.createRecurringInvoiceCollection(data);
      return response?.data?.data?.InvoiceCollection;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateParentInvoice: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/update/parent", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateInvoice(data);
      return response?.data?.InvoiceCollection;
    } catch (e: any) {
      setErrors(setError, e?.data?.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateInvoice: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateInvoiceCollection(data);
      return response?.data?.Invoice;
    } catch (e: any) {
      setErrors(setError, e?.data?.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

// here we can create the main invoice
export const createMainInvoice: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/create", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const { invoiceId, step, stage } = data;
      let apiData = { ...data, invoiceId: invoiceId, step: step };

      apiData = {
        ...apiData,
        customerType: staticEnums["CustomerType"][data.customerType],
      };
      if (staticEnums["CustomerType"][data.customerType] == 0)
        delete apiData["companyName"];
      const response = await apiServices.createMainInvoice(apiData);
      let objectToUpdate = {
        ...response?.data?.data?.Invoice,
        type: apiData?.type,
        stage: stage,
      };
      localStoreUtil.store_data("invoice", objectToUpdate);
      thunkApi.dispatch(setInvoiceDetails(objectToUpdate));

      return response?.data?.data?.Invoice;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

//  here we update the main invoice
export const updateMainInvoice: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const { stage } = data;

      const response = await apiServices.updateMainInvoice(data);
      const invoiceData = await localStoreUtil.get_data("invoice");
      let objectToUpdate = {
        ...response?.data?.Invoice,
        type: invoiceData?.type,
        stage: stage,
      };

      localStoreUtil.store_data("invoice", objectToUpdate);
      thunkApi.dispatch(setInvoiceDetails(objectToUpdate));
      return response?.data?.Invoice;
    } catch (e: any) {
      setErrors(setError, e?.data?.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const deleteInvoice: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/delete", async (args, thunkApi) => {
    const { invoiceDetails: data, router, setError, translate } = args as any;

    try {
      await apiServices.deleteInvoice(data);
      router.pathname = "/invoices";
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

export const readCollectiveInvoice: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("collective/invoice/read", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readCollectiveInvoices(params);
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const readCollectiveReciept: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("collective/reciept/read", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readCollectiveInvoices(params);
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const readCollectiveInvoiceDetails:
  | AsyncThunk<boolean, object, object>
  | any = createAsyncThunk(
  "collective/read/details",
  async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readCollectiveInvoicesDetails(params);
      return response?.data?.data.InvoiceCollection;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  }
);

export const updateInvoiceStatus: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/update/status", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateInvoiceStatus(data);
      return response?.data?.InvoiceCollection;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateRecieptStatus: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("reciept/update/status", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateInvoiceStatus(data);
      return response?.data?.InvoiceCollection;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateInvoicePaymentStatus:
  | AsyncThunk<boolean, object, object>
  | any = createAsyncThunk("invoice/update/payment", async (args, thunkApi) => {
  const { data, router, setError, translate } = args as any;

  try {
    const response = await apiServices.updateInvoicePaymentStatus(data);
    return response?.data?.InvoiceCollection;

    // thunkApi.dispatch(setContractDetails(response?.data?.Contract))
    return true;
  } catch (e: any) {
    thunkApi.dispatch(setErrorMessage(e?.data?.message));
    return false;
  }
});

export const updateRecieptPaymentStatus:
  | AsyncThunk<boolean, object, object>
  | any = createAsyncThunk("reciept/update/payment", async (args, thunkApi) => {
  const { data, router, setError, translate } = args as any;

  try {
    const response = await apiServices.updateInvoicePaymentStatus(data);
    return response?.data?.InvoiceCollection;
  } catch (e: any) {
    thunkApi.dispatch(setErrorMessage(e?.data?.message));
    return false;
  }
});
export const stopRecurringInvoices: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("stop/recurring/invoice", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.stopRecurringInvoice(data);
      return response?.data?.Invoice;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const sendInvoiceEmail: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("send/invoice/email", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.sendInvoiceEmail(data);
      return true;
    } catch (e: any) {
      setErrors(setError, e?.data?.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateInvoiceContent: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/update/content", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateInvoiceContent(data);
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
      const response = await apiServices.invoiceSendByPost(data);
      return response?.data?.InvoiceCollection;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const readQRCode: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/qr/code", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;
    try {
      const response = await apiServices.readInvoiceQRCode(params);
      return response?.data?.data?.qrcode;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const readMainInvoiceQRCode: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/qr/code", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;
    try {
      const response = await apiServices.readMainQRCode(params);
      return response?.data?.data?.qrcode;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const createInvoiceDetial: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/create/detail", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const { invoiceId, step, stage } = data;
      let apiData = { ...data, invoiceId: invoiceId, step: step };

      apiData = {
        ...apiData,
        customerType: staticEnums["CustomerType"][data.customerType],
      };
      if (staticEnums["CustomerType"][data.customerType] == 0)
        delete apiData["companyName"];
      const response = await apiServices.createInvoiceDetail(apiData);
      let objectToUpdate = {
        ...response?.data?.data?.Invoice,
        type: apiData?.type,
        stage: stage,
      };
      localStoreUtil.store_data("invoice", objectToUpdate);
      thunkApi.dispatch(setInvoiceDetails(objectToUpdate));

      return response?.data?.data?.Invoice;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });
export const updateInvoiceDetials: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("invoice/details/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const { stage } = data;

      const response = await apiServices.updateInvoiceDetails(data);
      const invoiceData = await localStoreUtil.get_data("invoice");
      let objectToUpdate = {
        ...response?.data?.Invoice,
        type: invoiceData?.type,
        stage: stage,
      };

      localStoreUtil.store_data("invoice", objectToUpdate);
      thunkApi.dispatch(setInvoiceDetails(objectToUpdate));
      return response?.data?.Invoice;
    } catch (e: any) {
      setErrors(setError, e?.data?.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

const InvoiceSlice = createSlice({
  name: "InvoiceSlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setInvoiceDetails: (state, action) => {
      state.invoiceDetails = action.payload;
    },
    setInvoiceInfo: (state, action) => {
      state.invoiceInfo = action.payload;
    },
    setCollectiveInvoiceDetails: (state, action) => {
      state.collectiveInvoiceDetails = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(readInvoice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readInvoice.fulfilled, (state, action) => {
      state.invoice = action.payload.Invoice;
      state.lastPage = action.payload.lastPage;
      state.totalCount = action.payload.totalCount;
      state.isLoading = false;
    });
    builder.addCase(readInvoice.rejected, (state) => {
      state.isLoading = false;
    });

    // invoice calculation
    builder.addCase(invoiceCalculation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(invoiceCalculation.fulfilled, (state, action) => {
      state.invoiceSum.sumOfOpenInvoices = action.payload.sumOfOpenInvoices;
      state.invoiceSum.sumOfPaidInvoices = action.payload.sumOfPaidInvoices;
      state.invoiceSum.sumOfOverdueInvoices =
        action.payload.sumOfOverdueInvoices;
      state.invoiceSum.sumOfPendingInvoices =
        action.payload.sumOfPendingInvoices;
      state.invoiceSum.sumOfSendingInvoices =
        action.payload.sumOfSendingInvoices;
      state.invoiceSum.pageSum = action.payload.pageSum;
      state.invoiceSum.totalSum = action.payload.totalSum;
      state.loading = false;
    });
    builder.addCase(invoiceCalculation.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readInvoiceDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readInvoiceDetails.fulfilled, (state, action) => {
      state.invoiceDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(readInvoiceDetails.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      if (action.payload) {
        state.collectiveInvoice = [...state.collectiveInvoice, action.payload];
      }
      state.loading = false;
    });
    builder.addCase(createInvoice.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateInvoice.fulfilled, (state, action) => {
      // let index = state.collectiveInvoice.findIndex((item) => item.id === action.payload?.id)
      // if (index !== -1) {
      //     state.collectiveInvoice.splice(index, 1, action.payload)
      // }
      state.loading = false;
    });
    builder.addCase(updateInvoice.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteInvoice.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteInvoice.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readCollectiveInvoice.pending, (state) => {
      state.loadingInvoice = true;
    });
    builder.addCase(readCollectiveInvoice.fulfilled, (state, action) => {
      state.collectiveInvoice = action.payload.InvoiceCollection;
      state.lastPage = action.payload.lastPage;
      state.totalCount = action.payload.totalCount;
      state.loadingInvoice = false;
    });
    builder.addCase(readCollectiveInvoice.rejected, (state) => {
      state.loadingInvoice = false;
    });

    builder.addCase(readCollectiveInvoiceDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readCollectiveInvoiceDetails.fulfilled, (state, action) => {
      state.collectiveInvoiceDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(readCollectiveInvoiceDetails.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readCollectiveReciept.pending, (state) => {
      state.loadingReceipt = true;
    });
    builder.addCase(readCollectiveReciept.fulfilled, (state, action) => {
      state.collectiveReciept = action.payload.InvoiceCollection;
      state.lastPage = action.payload.lastPage;
      state.totalCount = action.payload.totalCount;
      state.loadingReceipt = false;
    });
    builder.addCase(readCollectiveReciept.rejected, (state) => {
      state.loadingReceipt = false;
    });
    builder.addCase(updateInvoiceStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateInvoiceStatus.fulfilled, (state, action) => {
      if (
        action.payload?.invoiceStatus === "Overdue" ||
        action.payload?.invoiceStatus === "Pending"
      ) {
        let index = state.collectiveInvoice.findIndex(
          (item) => item.id === action.payload?.id
        );
        if (index !== -1) {
          state.collectiveInvoice.splice(index, 1, action?.payload);
        }
        state.loading = false;
      } else {
        let index = state.collectiveInvoice.findIndex(
          (item) => item.id === action.payload?.id
        );
        if (index !== -1) {
          state.collectiveInvoice.splice(index, 1);
          state.collectiveReciept = [
            ...state.collectiveReciept,
            action.payload,
          ];
        }
        state.loading = false;
      }
    });
    builder.addCase(updateInvoiceStatus.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateRecieptStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateRecieptStatus.fulfilled, (state, action) => {
      if (
        action.payload?.invoiceStatus === "Overdue" ||
        action.payload?.invoiceStatus === "Pending"
      ) {
        let index = state.collectiveReciept.findIndex(
          (item) => item.id === action.payload?.id
        );
        if (index !== -1) {
          state.collectiveInvoice = [
            ...state.collectiveInvoice,
            action.payload,
          ];
          state.collectiveReciept.splice(index, 1);
        }
        state.loading = false;
      } else {
        let index = state.collectiveReciept.findIndex(
          (item) => item.id === action.payload?.id
        );
        if (index !== -1) {
          state.collectiveInvoice = [
            ...state.collectiveInvoice,
            action?.payload,
          ];
        }
        state.loading = false;
      }
    });
    builder.addCase(updateRecieptStatus.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createRecuringInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createRecuringInvoice.fulfilled, (state, action) => {
      if (action.payload) {
        state.collectiveInvoice = [...state.collectiveInvoice, action.payload];
        state.invoiceDetails = { ...action.payload?.invoiceID };
      }
      state.loading = false;
    });
    builder.addCase(createRecuringInvoice.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(stopRecurringInvoices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(stopRecurringInvoices.fulfilled, (state, action) => {
      if (action.payload) {
        state.invoiceDetails = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(stopRecurringInvoices.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateInvoicePaymentStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateInvoicePaymentStatus.fulfilled, (state, action) => {
      let index = state.collectiveInvoice.findIndex(
        (item) => item.id === action.payload?.id
      );
      if (index !== -1) {
        state.collectiveInvoice.splice(index, 1, action.payload);
      }
      state.loading = false;
    });
    builder.addCase(updateInvoicePaymentStatus.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateRecieptPaymentStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateRecieptPaymentStatus.fulfilled, (state, action) => {
      let index = state.collectiveReciept.findIndex(
        (item) => item.id === action.payload?.id
      );
      if (index !== -1) {
        state.collectiveReciept.splice(index, 1, action.payload);
      }
      state.loading = false;
    });
    builder.addCase(updateRecieptPaymentStatus.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateParentInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateParentInvoice.fulfilled, (state, action) => {
      let index = state.collectiveInvoice.findIndex(
        (item) => item.id === action.payload?.id
      );

      if (index !== -1) {
        state.collectiveInvoice.splice(index, 1, action.payload);
      }
      state.loading = false;
    });
    builder.addCase(updateParentInvoice.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(sendInvoiceEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendInvoiceEmail.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendInvoiceEmail.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateInvoiceContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateInvoiceContent.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateInvoiceContent.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(sendOfferByPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendOfferByPost.fulfilled, (state, action) => {
      // if(action?.payload) state.collectiveInvoiceDetails  =action?.payload
      state.loading = false;
    });
    builder.addCase(sendOfferByPost.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readQRCode.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readQRCode.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(readQRCode.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createInvoiceDetial.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createInvoiceDetial.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createInvoiceDetial.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateInvoiceDetials.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateInvoiceDetials.fulfilled, (state, action) => {
      // let index = state.in.findIndex((item) => item.id === action.payload?.id)
      // if (index !== -1) {
      //     state.offer.splice(index, 1, action.payload)
      // }
      state.loading = false;
    });
    builder.addCase(updateInvoiceDetials.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default InvoiceSlice.reducer;
export const {
  setErrorMessage,
  setInvoiceDetails,
  setInvoiceInfo,
  setCollectiveInvoiceDetails,
} = InvoiceSlice.actions;
