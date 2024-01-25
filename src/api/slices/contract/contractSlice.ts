import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { contractTableTypes } from "@/types/contract";
import { DEFAULT_CONTRACT } from "@/utils/static";
import { updateQuery } from "@/utils/update-query";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums/ui";

interface ContractState {
    contract: contractTableTypes[];
    loading: boolean;
    error: Record<string, object>,
    lastPage: number,
    totalCount: number,
    contractDetails: contractTableTypes
}

const initialState: ContractState = {
    contract: [],
    loading: false,
    error: {},
    lastPage: 1,
    totalCount: 10,
    //@ts-expect-error
    contractDetails: DEFAULT_CONTRACT
}

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
            router.pathname = "/contract"
            updateQuery(router, router.locale)
            thunkApi.dispatch(updateModalType({
                type:
                    ModalType.NONE
            }));
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
            thunkApi.dispatch(setContractDetails(response?.data?.Contract))
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            return false;
        }
    });

export const updateContractPaymentStatus: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("contract/update/payment", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {

            const response = await apiServices.updateContractPaymentStatus(data);
            thunkApi.dispatch(setContractDetails(response?.data?.Contract))
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            return false;
        }
    });
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
    },
    extraReducers(builder) {
        builder.addCase(readContract.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readContract.fulfilled, (state, action) => {
            state.contract = action.payload.Contract;
            state.lastPage = action.payload.lastPage;
            state.totalCount = action.payload.totalCount;
            state.loading = false;
        });
        builder.addCase(readContract.rejected, (state) => {
            state.loading = false
        });

        builder.addCase(readContractDetails.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readContractDetails.fulfilled, (state, action) => {
            state.contractDetails = action.payload;
            state.loading = false;
        });
        builder.addCase(readContractDetails.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createContract.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createContract.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createContract.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateContract.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateContract.fulfilled, (state, action) => {
            let index = state.contract.findIndex((item) => item.id === action.payload?.id)
            if (index !== -1) {
                state.contract.splice(index, 1, action.payload)
            }
            state.loading = false;
        });
        builder.addCase(updateContract.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteContract.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteContract.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteContract.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(updateContractStatus.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateContractStatus.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateContractStatus.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(sendContractEmail.pending, (state) => {
            state.loading = true
        });
        builder.addCase(sendContractEmail.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(sendContractEmail.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(updateContractContent.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateContractContent.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateContractContent.rejected, (state) => {
            state.loading = false
        })


        builder.addCase(sendOfferByPost.pending, (state) => {
            state.loading = true
        });
        builder.addCase(sendOfferByPost.fulfilled, (state, action) => {
            if (action?.payload) state.contractDetails = action?.payload
            state.loading = false;
        });
        builder.addCase(sendOfferByPost.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(readQRCode.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readQRCode.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(readQRCode.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(updateContractDates.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateContractDates.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload)
                state.contractDetails = { ...state.contractDetails, offerID: action.payload };

        });
        builder.addCase(updateContractDates.rejected, (state) => {
            state.loading = false
        })

    },
})

export default ContractSlice.reducer;
export const { setErrorMessage, setContractDetails } = ContractSlice.actions