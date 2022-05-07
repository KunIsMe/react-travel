import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductDetailState {
    loading: boolean,
    error: string | null,
    data: any
};

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null
};

export const getProductDetail = createAsyncThunk(
    "productDetail/getProductDetail",
    async (touristRouteId: string | undefined, thunkAPI) => {
        const response = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`);
        return response.data;
    }
);

export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {
        // fetchStart: (state) => {
        //     // immer 框架：在底层帮我们进行转化，自动输出 state
        //     // return { ...state, loading: true };
        //     state.loading = true;
        // },
        // fetchSuccess: (state, action) => {
        //     state.loading = false;
        //     state.data = action.payload;
        // },
        // fetchFail: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // }
    },
    extraReducers: {
        [getProductDetail.pending.type]: (state) => {
            // immer 框架：在底层帮我们进行转化，自动输出 state
            // return { ...state, loading: true };
            state.loading = true;
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [getProductDetail.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
