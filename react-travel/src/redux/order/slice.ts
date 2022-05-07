import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { checkout } from '../shoppingCart/slice';

interface OrderState {
    loading: boolean,
    error: string | null,
    currentOrder: any
};

const initialState: OrderState = {
    loading: false,
    error: null,
    currentOrder: null
};

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (parameters: { jwt: string, orderId: string }, thunkAPI) => {
        const response = await axios.post(`http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`, 
        null, 
        {
            headers: {
                Authorization: `bearer ${parameters.jwt}`
            }
        });
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: {
        [placeOrder.pending.type]: (state) => {
            // immer 框架：在底层帮我们进行转化，自动输出 state
            // return { ...state, loading: true };
            state.loading = true;
        },
        [placeOrder.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.currentOrder = action.payload;
        },
        [placeOrder.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // 当 checkout 这个 action 执行时，就会同时调用两个文件里的 reducer（因为此文件引用了 checkout 这个 action）
        [checkout.pending.type]: (state) => {
            // immer 框架：在底层帮我们进行转化，自动输出 state
            // return { ...state, loading: true };
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.currentOrder = action.payload;
        },
        [checkout.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
