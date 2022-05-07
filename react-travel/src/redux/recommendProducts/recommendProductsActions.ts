import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START"; // 正在调用推荐信息 api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; // 推荐信息 api 调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL"; // 推荐信息 api 调用失败

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any
}

export type RecommendProductsAction = FetchRecommendProductsStartAction | FetchRecommendProductsSuccessAction | FetchRecommendProductsFailAction;

export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}

export const fetchRecommendProductsSuccessActionCreator = (data): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const fetchRecommendProductsFailActionCreator = (error): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}

// thunk 可以返回一个函数，而不一定是 js 对象
// 在一个 thunk action 中可以完成一系列连续的 action 操作
// 并且可以处理异步逻辑
// 业务逻辑可以从 UI 层面挪到这里，代码分层会更清晰 
export const giveMeDataActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductsAction> => async (dispatch, getState) => {
    dispatch(fetchRecommendProductsStartActionCreator());
    try {
        const response = await axios.get("http://123.56.149.216:8080/api/productCollections");
        dispatch(fetchRecommendProductsSuccessActionCreator(response.data));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(fetchRecommendProductsFailActionCreator(error.message));
        }
    }
};
