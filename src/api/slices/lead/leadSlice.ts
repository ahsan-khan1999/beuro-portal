import apiServices from "@/services/requestHandler";
import { setErrors, transformValidationMessages } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalApiResponseType } from "@/types/global";
import { Lead } from "@/types/leads";
import { DEFAULT_LEAD, staticEnums } from "@/utils/static";
import localStoreUtil from "@/utils/localstore.util";
import { updateQuery } from "@/utils/update-query";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums/ui";

interface LeadState {
    lead: Lead[];
    loading: boolean;
    error: Record<string, object>,
    lastPage: number,
    totalCount: number,
    leadDetails: Lead,
    loadingDetails: boolean;

}

const initialState: LeadState = {
    lead: [],
    loading: false,
    error: {},
    lastPage: 1,
    totalCount: 10,
    //@ts-expect-error
    leadDetails: DEFAULT_LEAD,
    loadingDetails: false
}

export const readLead: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("lead/read", async (args, thunkApi) => {
        const { params } = args as any;

        try {
            const response = await apiServices.readLead(params);
            return response?.data?.data;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            return false;
        }
    });
export const readLeadDetails: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("lead/read/details", async (args, thunkApi) => {
        const { params } = args as any;

        try {
            const response = await apiServices.readLeadDetail(params);
            return response?.data?.data.Lead;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            return false;
        }
    });
export const createLead: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("lead/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            const { leadId, step, stage } = data
            let apiData = { ...data, leadId: leadId, step: step }
            apiData = { ...apiData, customerType: staticEnums["CustomerType"][data.customerType] }
            if (staticEnums["CustomerType"][data.customerType] == 0) delete apiData["companyName"]
            const response = await apiServices.createLead(apiData);
            let objectToUpdate = { ...response?.data?.data?.Lead, type: apiData?.type, stage: stage }
            localStoreUtil.store_data("lead", objectToUpdate)
            thunkApi.dispatch(setLeadDetails(objectToUpdate));


            return response?.data?.data?.Lead;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });
export const updateLead: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("lead/update", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            const { stage } = data

            const response = await apiServices.updateLead(data);
            const leadData = await localStoreUtil.get_data("lead")
            let objectToUpdate = { ...response?.data?.Lead, type: leadData?.type, stage: stage }

            localStoreUtil.store_data("lead", objectToUpdate)
            thunkApi.dispatch(setLeadDetails(objectToUpdate));


            return response?.data?.Lead;
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
export const createLeadNotes: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("lead/notes", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            const response = await apiServices.updateNotes(data);
            return response?.data?.Lead;
        } catch (e: any) {
            setErrors(setError, e?.data?.data, translate);
            thunkApi.dispatch(setErrorMessage(e?.data?.data?.message));
            return false;
        }
    });
export const deleteLead: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("lead/delete", async (args, thunkApi) => {
        const { leadDetails: data, router, translate } = args as any;

        try {
            await apiServices.deleteLead(data);
            router.pathname = "/leads"
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


const leadSlice = createSlice({
    name: "leadSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },
        setLeadDetails: (state, action) => {
            state.leadDetails = action.payload;
        },
        setLeads: (state, action) => {
            state.lead = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(readLead.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readLead.fulfilled, (state, action) => {
            state.lead = action.payload.Lead;
            state.lastPage = action.payload.lastPage;
            state.totalCount = action.payload.totalCount;
            state.loading = false;
        });
        builder.addCase(readLead.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(readLeadDetails.pending, (state) => {
            state.loadingDetails = true
        });
        builder.addCase(readLeadDetails.fulfilled, (state, action) => {
            state.leadDetails = action.payload;
            state.loadingDetails = false;
        });
        builder.addCase(readLeadDetails.rejected, (state) => {
            state.loadingDetails = false
        });
        builder.addCase(createLead.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createLead.fulfilled, (state, action) => {

            state.loading = false;
        });
        builder.addCase(createLead.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(updateLead.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateLead.fulfilled, (state, action) => {
            let index = state.lead.findIndex((item) => item.id === action.payload?.id)
            if (index !== -1) {
                state.lead.splice(index, 1, action.payload)
            }
            state.loading = false;


        });
        builder.addCase(updateLead.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(deleteLead.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteLead.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteLead.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(createLeadNotes.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createLeadNotes.fulfilled, (state, action) => {
            let index = state.lead.findIndex((item) => item.id === action.payload?.id)
            if (index !== -1) {
                state.lead.splice(index, 1, action.payload)
            }
            state.loading = false;


        });
        builder.addCase(createLeadNotes.rejected, (state) => {
            state.loading = false
        });
    },
})

export default leadSlice.reducer;
export const { setErrorMessage, setLeadDetails, setLeads } = leadSlice.actions