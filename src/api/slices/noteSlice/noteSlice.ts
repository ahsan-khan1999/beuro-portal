import apiServices from "@/services/requestHandler";
import { User } from "@/types";
import { setErrors } from "@/utils/utility";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface Note {
    description: string;
    createdBy: User;
    refID: string;
    id: string;
    createdAt:string
}
interface NoteState {
    notes: Note[];
    loading: boolean;
    error: Record<string, object>,
    totalCount: number;
    lastPage: number;
}

const initialState: NoteState = {
    notes: [],
    loading: false,
    error: {},
    lastPage: 1,
    totalCount: 10,
}

export const readNotes: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("notes/read", async (args, thunkApi) => {
        const { params, router, setError, translate } = args as any;

        try {

            const response = await apiServices.readNotes(params);
            return response?.data?.data;
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            return false;
        }
    });

export const createNote: AsyncThunk<boolean, object, object> | any =
    createAsyncThunk("note/create", async (args, thunkApi) => {
        const { data, router, setError, translate } = args as any;

        try {
            await apiServices.createNotes(data);
            return true;
        } catch (e: any) {
            thunkApi.dispatch(setErrorMessage(e?.data?.message));
            setErrors(setError, e?.data.data, translate);
            return false;
        }
    });



const NoteSlice = createSlice({
    name: "NoteSlice",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.error = action.payload;
        },

    },
    extraReducers(builder) {
        builder.addCase(readNotes.pending, (state) => {
            state.loading = true
        });
        builder.addCase(readNotes.fulfilled, (state, action) => {
            state.notes = action.payload.Note
            state.lastPage = action.payload.lastPage
            state.totalCount = action.payload.totalCount
            state.loading = false;
        });
        builder.addCase(readNotes.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(createNote.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createNote.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createNote.rejected, (state) => {
            state.loading = false
        });


    },
})

export default NoteSlice.reducer;
export const { setErrorMessage } = NoteSlice.actions