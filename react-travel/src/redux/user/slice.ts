import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
    loading: boolean,
    error: string | null,
    token: string | null
};

const initialState: UserState = {
    loading: false,
    error: null,
    token: null
};

export const signIn = createAsyncThunk(
    "user/signIn",
    async (paramaters: {
        email: string,
        password: string
    }, thunkAPI) => {
        const response = await axios.post('http://123.56.149.216:8080/auth/login', {
            email: paramaters.email,
            password: paramaters.password
        });
        return response.data.token;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: (state) => {
            state.loading = false;
            state.error = null;
            state.token = null;
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state) => {
            // immer 框架：在底层帮我们进行转化，自动输出 state
            // return { ...state, loading: true };
            state.loading = true;
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.token = action.payload;
        },
        [signIn.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
