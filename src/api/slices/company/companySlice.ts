import apiServices from "@/services/requestHandler";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CUSTOMER, staticEnums } from "@/utils/static";
import { updateQuery } from "@/utils/update-query";
import { updateModalType } from "../globalSlice/global";
import { ModalType } from "@/enums/ui";
import { CustomersAdmin } from "@/types/admin/customer";
import { Plan } from "@/types/admin/plans";
import { getKeyByValue } from "@/utils/auth.util";

interface CompanyState {
  company: CustomersAdmin[];
  loading: boolean;
  error: Record<string, object>;
  totalCount: number;
  lastPage: number;
  companyDetails: CustomersAdmin;
  plan: Plan[];
  planDetails: Plan | null;
}

const initialState: CompanyState = {
  company: [],
  loading: false,
  error: {},
  lastPage: 1,
  totalCount: 10,
  //@ts-expect-error
  companyDetails: DEFAULT_CUSTOMER,
  plan: [],
  planDetails: null,
};

export const readCompany: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("company/read", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;

    try {
      const response = await apiServices.readCompany(params);

      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const readCompanyDetail: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("company/read/details", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;

    try {
      const response = await apiServices.readCompanyDetail(params);
      return response?.data?.data.User;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateCompany: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("company/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      let apiData = { ...data };
      apiData = {
        ...apiData,
        customerType: staticEnums["CustomerType"][data?.customerType],
      };
      if (staticEnums["CustomerType"][data.customerType] == 0)
        delete apiData["companyName"];
      await apiServices.updateCustomer(apiData);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateAdminCompany: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("admin-company/update", async (args, thunkApi) => {
    const { data, setError, translate } = args as any;

    try {
      await apiServices.updateCompany(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const deleteCompany: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("company/delete", async (args, thunkApi) => {
    const { customerDetails: data, router, setError, translate } = args as any;

    try {
      await apiServices.deleteCustomer(data);
      router.pathname = "/customers";
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

export const readPlan: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("Plan/read", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;

    try {
      const response = await apiServices.readPlan(params);
      return response?.data?.data;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const readPlanDetail: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("plan/read/details", async (args, thunkApi) => {
    const { params, router, setError, translate } = args as any;

    try {
      const response = await apiServices.readPlanDetail(params);
      return response?.data?.data.Plan;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updatePlan: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("plan/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.updatePlan(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const createPlan: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("plan/create", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.createPlan(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const deletePlan: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("plan/delete", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.deletePlan(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const updateCompanyStatus: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("company/update/status", async (args, thunkApi) => {
    const { data, setError, translate } = args as any;

    try {
      const response = await apiServices.updateUserStatus(data);
      return response;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      setErrors(setError, e?.data.data, translate);
      return false;
    }
  });

export const chooseCompanyPlan: AsyncThunk<boolean, object, object> | any =
  createAsyncThunk("company/plan/update", async (args, thunkApi) => {
    const { data, router, setError, translate } = args as any;

    try {
      await apiServices.choosePlan(data);
      return true;
    } catch (e: any) {
      thunkApi.dispatch(setErrorMessage(e?.data?.message));
      return false;
    }
  });

const companySlice = createSlice({
  name: "CompanySlice",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.error = action.payload;
    },
    setCompanyDetails: (state, action) => {
      state.companyDetails = action.payload;
    },
    setCompnay: (state, action) => {
      state.company = action.payload;
    },
    setPlanDetails: (state, action) => {
      state.planDetails = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(readCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readCompany.fulfilled, (state, action) => {
      state.company = action.payload.Customer;
      state.lastPage = action.payload.lastPage;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    });
    builder.addCase(readCompany.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updateCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCompany.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateCompany.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateAdminCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAdminCompany.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateAdminCompany.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteCompany.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readCompanyDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readCompanyDetail.fulfilled, (state, action) => {
      state.plan = action.payload;
      state.loading = false;
    });
    builder.addCase(readCompanyDetail.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(readPlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readPlan.fulfilled, (state, action) => {
      state.plan = action.payload.Plan;
      state.lastPage = action.payload.lastPage;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    });
    builder.addCase(readPlan.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(readPlanDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readPlanDetail.fulfilled, (state, action) => {
      state.planDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(readPlanDetail.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deletePlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePlan.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deletePlan.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(updatePlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePlan.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updatePlan.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createPlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPlan.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createPlan.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCompanyStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCompanyStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.companyDetails = {
        ...state.companyDetails,
        status: action.payload,
      };
    });
    builder.addCase(updateCompanyStatus.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(chooseCompanyPlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(chooseCompanyPlan.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(chooseCompanyPlan.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default companySlice.reducer;
export const {
  setErrorMessage,
  setCompanyDetails,
  setCompnay,
  setPlanDetails,
} = companySlice.actions;
