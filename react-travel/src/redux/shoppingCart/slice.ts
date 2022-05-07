import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShoppingCartState {
    loading: boolean,
    error: string | null,
    items: any[]
};

const initialState: ShoppingCartState = {
    loading: false,
    error: null,
    items: []
};

export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwt: string, thunkAPI) => {
        const response = await axios.get('http://123.56.149.216:8080/api/shoppingCart', {
            headers: {
                Authorization: `bearer ${jwt}`
            }
        });
        return response.data.shoppingCartItems;
    }
);

export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: { jwt: string, touristRouteId: string }, thunkAPI) => {
        const response = await axios.post('http://123.56.149.216:8080/api/shoppingCart/items', {
            touristRouteId: parameters.touristRouteId
        }, {
            headers: {
                Authorization: `bearer ${parameters.jwt}`
            }
        });
        return response.data.shoppingCartItems;
    }
);

export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: { jwt: string, itemIds: number[] }, thunkAPI) => {
        const response = await axios.delete(`http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(',')})`, {
            headers: {
                Authorization: `bearer ${parameters.jwt}`
            }
        });
        return response;
    }
);

export const checkout = createAsyncThunk(
    "shoppingCart/checkout",
    async (jwt: string, thunkAPI) => {
        const response = await axios.post('http://123.56.149.216:8080/api/shoppingCart/checkout', 
        null, 
        {
            headers: {
                Authorization: `bearer ${jwt}`
            }
        });
        return response.data;
    }
);

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: {
        [getShoppingCart.pending.type]: (state) => {
            // immer 框架：在底层帮我们进行转化，自动输出 state
            // return { ...state, loading: true };
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        [getShoppingCart.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addShoppingCartItem.pending.type]: (state) => {
            // immer 框架：在底层帮我们进行转化，自动输出 state
            // return { ...state, loading: true };
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        [addShoppingCartItem.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [clearShoppingCartItem.pending.type]: (state) => {
            // immer 框架：在底层帮我们进行转化，自动输出 state
            // return { ...state, loading: true };
            state.loading = true;
        },
        [clearShoppingCartItem.fulfilled.type]: (state) => {
            state.loading = false;
            state.items = [];
        },
        [clearShoppingCartItem.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [checkout.pending.type]: (state) => {
            // immer 框架：在底层帮我们进行转化，自动输出 state
            // return { ...state, loading: true };
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.items = [];
        },
        [checkout.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
