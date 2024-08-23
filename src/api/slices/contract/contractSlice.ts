import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contractTableTypes, Task, Tasks } from "@/types/contract";
import { DEFAULT_CONTRACT, DEFAULT_CONTRACT_TASK } from "@/utils/static";
import { updateQuery } from "@/utils/update-query";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums/ui";

interface ContractState {
  contract: contractTableTypes[];
  loading: boolean;
  isLoading: boolean;
  error: Record<string, object>;
  lastPage: number;
  totalCount: number;
  contractDetails: contractTableTypes;
  task: Tasks[];
  taskDetail: Task;
}

const initialState: ContractState = {
  contract: [],
  task: [],
  loading: false,
  isLoading: true,
  error: {},
  lastPage: 1,
  totalCount: 10,
  //@ts-expect-error
  contractDetails: DEFAULT_CONTRACT,
  taskDetail: DEFAULT_CONTRACT_TASK,
};

export const readContract: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract/read", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readContract(params);
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const readContractDetails: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract/read/details", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const response = await apiServices.readContractDetail(params);
      return response?.data?.data.Contract;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const createContract: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract/create", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.createContract(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateContract: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateOffer(data);
      return response?.data?.Contract;
    } catch (e: any) {
      setErrors(setError, e?.data?.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateContractDetail: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateContractDetails(data);
      thunkApi.dispatch(setContractDetails({ ...response?.data?.Contract }));
      return response?.data?.Contract;
    } catch (e: any) {
      setErrors(setError, e?.data?.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

// export const updateContractDetail: AsyncThunk<boolean, object, object> | any =
//   createAsyncThunk("contract/update", async (args, thunkApi) => {
//     const { data, router, setError, translate } = args as any;

//     try {
//       const { stage } = data;

//       const response = await apiServices.updateContractDetails(data);
//       const contractData = await localStoreUtil.get_data("contract");
//       let objectToUpdate = {
//         ...response?.data?.Contract,
//         type: contractData?.type,
//       };

//       localStoreUtil.store_data("contract", objectToUpdate);
//       thunkApi.dispatch(setContractDetails(objectToUpdate));

//       return response?.data?.Contract;
//     } catch (e: any) {
//       setErrors(setError, e?.data?.data, translate);
//       thunkApi.dispatch(setErrorMessage(e?.data?.message));
//       return false;
//     }
//   });

export const updateContractDates: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract/update/dates", async (args, thunkApi) => {
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

export const deleteContract: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract/delete", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.deleteContract(data);
      router.pathname = "/contract";
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

export const updateContractStatus: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract/update/status", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateContractStatus(data);
      thunkApi.dispatch(setContractDetails(response?.data?.Contract));
      return response?.data?.Contract;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateContractPaymentStatus:
  | AsyncThunk<boolean, object, object>
  | any = createAsyncThunk(
  "contract/update/payment",
  async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateContractPaymentStatus(data);
      thunkApi.dispatch(setContractDetails(response?.data?.Contract));
      return response?.data?.Contract;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  }
);

export const sendContractEmail: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("send/contract/email", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.sendContractEmail(data);
      return true;
    } catch (e: any) {
      setErrors(setError, e?.data?.data, translate);
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const updateContractContent: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract/update/content", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      const response = await apiServices.updateContractContent(data);
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
      const response = await apiServices.contractSendByPost(data);
      return response?.data?.Contract;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

export const readQRCode: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract/qr/code", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;

    try {
      const response = await apiServices.readContractQRCode(params);
      return response?.data?.data?.qrcode;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

// Create contract task
export const createContractTask: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract-task/create", async (args, thunkApi) => {
    const { data, setError, translate } = args as any;

    try {
      const res = await apiServices.createContractTask(data);
      return res.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateContractTask: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract-task/update", async (args, thunkApi) => {
    const { data, setError, translate } = args as any;

    try {
      await apiServices.updateContractTask(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const readContractTasks: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract-task/read", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const res = await apiServices.readContractTask(params);
      return res.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      return false;
    }
  });

export const readContractTaskDetail: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("contract-task/detail", async (args, thunkApi) => {
    const { params } = args as any;

    try {
      const res = await apiServices.readContractTaskDetail(params);
      return res?.data?.data?.Task;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));

      return false;
    }
  });

const ContractSlice = createSlice({
  name: "ContractSlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setContractDetails: (state, action) => {
      state.contractDetails = action.payload;
    },
    setContractTaskDetails: (state, action) => {
      state.taskDetail = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(readContract.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readContract.fulfilled, (state, action) => {
      state.contract = action.payload.Contract;
      state.lastPage = action.payload.lastPage;
      state.totalCount = action.payload.totalCount;
      state.isLoading = false;
    });
    builder.addCase(readContract.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(readContractDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readContractDetails.fulfilled, (state, action) => {
      state.contractDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(readContractDetails.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createContract.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createContract.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createContract.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateContract.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContract.fulfilled, (state, action) => {
      let index = state.contract.findIndex(
        (item) => item.id === action.payload?.id
      );
      if (index !== -1) {
        state.contract.splice(index, 1, action.payload);
      }
      state.loading = false;
    });
    builder.addCase(updateContract.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteContract.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteContract.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteContract.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateContractStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContractStatus.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateContractStatus.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(sendContractEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendContractEmail.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendContractEmail.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateContractContent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContractContent.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateContractContent.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(sendOfferByPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendOfferByPost.fulfilled, (state, action) => {
      if (action?.payload) state.contractDetails = action?.payload;
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

    builder.addCase(updateContractDates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContractDates.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload)
        state.contractDetails = {
          ...state.contractDetails,
          offerID: action.payload,
        };
    });
    builder.addCase(updateContractDates.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(createContractTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createContractTask.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createContractTask.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateContractTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContractTask.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateContractTask.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readContractTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readContractTasks.fulfilled, (state, action) => {
      state.task = action.payload.data.Task;
      state.lastPage = action.payload.lastPage;
      state.totalCount = action.payload.totalCount;
      state.isLoading = false;
    });
    builder.addCase(readContractTasks.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(readContractTaskDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readContractTaskDetail.fulfilled, (state, action) => {
      state.taskDetail = action.payload;
      state.loading = false;
    });
    builder.addCase(readContractTaskDetail.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default ContractSlice.reducer;
export const { setErrorMessage, setContractDetails, setContractTaskDetails } =
  ContractSlice.actions;
