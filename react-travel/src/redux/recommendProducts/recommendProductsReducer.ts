import { RecommendProductsAction, FETCH_RECOMMEND_PRODUCTS_START, FETCH_RECOMMEND_PRODUCTS_SUCCESS, FETCH_RECOMMEND_PRODUCTS_FAIL } from './recommendProductsActions';

interface RecommendProductsState {
    productList: any[],
    loading: boolean,
    error: string | null
}

const defaultState: RecommendProductsState = {
    loading: true,
    error: null,
    productList: []
}

const recommendProductsReducer = (state = defaultState, action: RecommendProductsAction) => {
    switch (action.type) {
        case FETCH_RECOMMEND_PRODUCTS_START: 
            return { ...state, loading: true };
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, productList: action.payload };
        case FETCH_RECOMMEND_PRODUCTS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default recommendProductsReducer;
